import bodyParser from 'body-parser';
import express from 'express';
import request from 'supertest';
import errorHandler from '../src/middleware/error-handler';
import purchaseApi from '../src/routes/purchase';
import { Product } from '../src/lib/products-api';
import { PurchaseStatus } from '../src/lib/purchase-api';

const mockExecutePurchase = jest.fn();
const mockPerformRiskAssessment = jest.fn();
const mockFindById = jest.fn();
jest.mock('../src/lib/products-api', () => ({
    __esModule: true,
    default: {
        findById: async (...params) => mockFindById(...params),
    },
}));
jest.mock('../src/lib/purchase-api', () => ({
    __esModule: true,
    // @ts-ignore
    ...jest.requireActual('../src/lib/purchase-api'),
    executePurchase: async (...params) => mockExecutePurchase(...params),
}));
jest.mock('../src/lib/risk-service', () => ({
    __esModule: true,
    performRiskAssessment: async (...params) => mockPerformRiskAssessment(...params),
}));
const fakeProduct: Product = {
    productPrice: 100,
    productId: 1,
    productUrl: 'https://fake.url.com',
};
// @ts-ignore
const app = new express();
app.use(bodyParser.json());
app.use('/purchase', purchaseApi, errorHandler);

describe('Purchase API =>', () => {
    afterEach(() => {
        mockExecutePurchase.mockReset();
        mockPerformRiskAssessment.mockReset();
        mockFindById.mockReset();
    });
    describe('POST /:productId', () => {
        let res;
        const fakeId = '12';
        const fakeUserId = 'fakeUserId';
        const fakePaymentMethod = 'fakePaymentMethod';

        describe('product not found', () => {
            beforeEach(async () => {
                mockFindById.mockReturnValue(null);
                res = request(app).post(`/purchase/${fakeId}`).send({ userId: fakeUserId, paymentMethod: fakePaymentMethod });
            });

            it('should return status 404', async () => {
                const response = await res;
                expect(response.status).toBe(404);
            });
        });

        describe('product exist', () => {
            const fakePurchaseStatus: PurchaseStatus = PurchaseStatus.SUCCESS;

            beforeEach(async () => {
                fakeProduct.productId = parseInt(fakeId, 10);
                mockFindById.mockReturnValue(fakeProduct);
                mockExecutePurchase.mockImplementation(async () => fakePurchaseStatus);
                res = request(app).post(`/purchase/${fakeId}`).send({ userId: fakeUserId, paymentMethod: fakePaymentMethod });
            });

            it('should call executePurchase', async () => {
                await res;
                expect(mockExecutePurchase).toHaveBeenCalledWith(fakeUserId, fakeProduct.productId, fakePaymentMethod);
            });

            it('should perform risk assesment calculation', async () => {
                await res;
                expect(mockPerformRiskAssessment).toHaveBeenCalledWith(fakeUserId, fakeProduct, fakePaymentMethod);
            });

            it('should return correct status', async () => {
                const response = await res;
                expect(response.status).toBe(200);
            });

            it('should return correct response', async () => {
                const response = await res;
                const { body: responseBody } = response;
                expect(responseBody).toEqual({status: 'success', purchaseStatus: fakePurchaseStatus});
            });
        });

        describe('error handling', () => {
            const fakeError = new Error('fake error');
            beforeEach(async () => {
                mockFindById.mockImplementation(() => { throw fakeError });
                res = request(app).post(`/purchase/${fakeId}`).send({ userId: fakeUserId, paymentMethod: fakePaymentMethod });
            });

            it('should respond with correct error', async () => {
                const response = await res;
                const { status } = response;
                expect(status).toBe(500);
            });

            it('should respond with correct body', async () => {
                const response = await res;
                const { body: responseBody } = response;
                expect(responseBody).toEqual({ status: 'failed' });
            });
        });
    });
});
