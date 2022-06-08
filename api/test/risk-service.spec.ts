import { performRiskAssessment } from '../src/lib/risk-service';
import { Product } from '../src/lib/products-api';

const mockGetNumMissedPayments = jest.fn();
const mockGetRiskScore = jest.fn();
const mockGetAccountBalance = jest.fn();
const mockAcceptPurchase = jest.fn();
const mockRejectPurchase = jest.fn();
const mockFlagPurchaseForReview = jest.fn();
jest.mock('../src/lib/risk-api', () => ({
    __esModule: true,
    getRiskScore: (...params) => mockGetRiskScore(...params),
    getAccountBalance: (...params) => mockGetAccountBalance(...params),
    getNumMissedPayments: (...params) => mockGetNumMissedPayments(...params),
}));
jest.mock('../src/lib/action-api', () => ({
    __esModule: true,
    acceptPurchase: (...params) => mockAcceptPurchase(),
    rejectPurchase: (...params) => mockRejectPurchase(),
    flagPurchaseForReview: (...params) => mockFlagPurchaseForReview(),
}));
const fakeToken: string = 'fake token';
const userId: string = '100';
const fakeProduct: Product = {
    productPrice: 100,
    productId: 1,
    productUrl: 'https://fake.url.com',
};
describe('Risk Service => performRiskAssessment():', () => {
    afterEach(() => {
        mockGetNumMissedPayments.mockReset();
        mockGetRiskScore.mockReset();
        mockGetAccountBalance.mockReset();
        mockAcceptPurchase.mockReset();
        mockRejectPurchase.mockReset();
        mockFlagPurchaseForReview.mockReset();
    });
    describe('number of missed payment validation', () => {
        beforeEach(() => {
            mockGetRiskScore.mockReturnValue(5);
            mockGetAccountBalance.mockReturnValue(Number.MAX_SAFE_INTEGER);
        });
        describe('more than 1 payment missed', () => {
            beforeEach(async () => {
                mockGetNumMissedPayments.mockReturnValue(2);
                await performRiskAssessment(userId, fakeProduct, fakeToken);
            });

            afterEach(() => {
                mockGetNumMissedPayments.mockReset();
            });
            it('should reject purchase', () => {
                expect(mockRejectPurchase).toHaveBeenCalled();
            });
            it('should NOT approve purchase', () => {
                expect(mockAcceptPurchase).not.toHaveBeenCalled();
            });
            it('should NOT flag purchase for review', () => {
                expect(mockFlagPurchaseForReview).not.toHaveBeenCalled();
            });
        });
        describe('less than 2 payment missed', () => {
            beforeEach(async () => {
                mockGetNumMissedPayments.mockReturnValue(1);
                await performRiskAssessment(userId, fakeProduct, fakeToken);
            });
            it('should NOT reject purchase', () => {
                expect(mockRejectPurchase).not.toHaveBeenCalled();
            });
            it('should approve purchase', () => {
                expect(mockAcceptPurchase).toHaveBeenCalled();
            });
            it('should NOT flag purchase for review', () => {
                expect(mockFlagPurchaseForReview).not.toHaveBeenCalled();
            });
        });
    });

    describe('account balance validation', () => {
        beforeEach(() => {
            mockGetRiskScore.mockReturnValue(5);
            mockGetNumMissedPayments.mockReturnValue(0);
        });

        describe('balance less than product price', () => {
            beforeEach(async () => {
                mockGetAccountBalance.mockReturnValue(fakeProduct.productPrice - 1);
                await performRiskAssessment(userId, fakeProduct, fakeToken);
            });

            it('should reject purchase', () => {
                expect(mockRejectPurchase).toHaveBeenCalled();
            });
            it('should NOT approve purchase', () => {
                expect(mockAcceptPurchase).not.toHaveBeenCalled();
            });
            it('should NOT flag purchase for review', () => {
                expect(mockFlagPurchaseForReview).not.toHaveBeenCalled();
            });
        });
        describe('balance less than product price', () => {
            beforeEach(async () => {
                mockGetAccountBalance.mockReturnValue(fakeProduct.productPrice + 1);
                await performRiskAssessment(userId, fakeProduct, fakeToken);
            });

            it('should NOT reject purchase', () => {
                expect(mockRejectPurchase).not.toHaveBeenCalled();
            });
            it('should approve purchase', () => {
                expect(mockAcceptPurchase).toHaveBeenCalled();
            });
            it('should NOT flag purchase for review', () => {
                expect(mockFlagPurchaseForReview).not.toHaveBeenCalled();
            });
        });
    });
    describe('payment method risk score validation', () => {
        beforeEach(() => {
            mockGetNumMissedPayments.mockReturnValue(0);
            mockGetAccountBalance.mockReturnValue(Number.MAX_SAFE_INTEGER);
        });

        describe('risk is high', () => {
            beforeEach(async () => {
                mockGetRiskScore.mockReturnValue(91);
                await performRiskAssessment(userId, fakeProduct, fakeToken);
            });

            it('should reject purchase', () => {
                expect(mockRejectPurchase).toHaveBeenCalled();
            });
            it('should NOT approve purchase', () => {
                expect(mockAcceptPurchase).not.toHaveBeenCalled();
            });
            it('should NOT flag purchase for review', () => {
                expect(mockFlagPurchaseForReview).not.toHaveBeenCalled();
            });
        });

        describe('risk is moderate', () => {
            beforeEach(async () => {
                mockGetRiskScore.mockReturnValue(89);
                await performRiskAssessment(userId, fakeProduct, fakeToken);
            });

            it('should NOT reject purchase', () => {
                expect(mockRejectPurchase).not.toHaveBeenCalled();
            });
            it('should approve purchase', () => {
                expect(mockAcceptPurchase).toHaveBeenCalled();
            });
            it('should flag purchase for review', () => {
                expect(mockFlagPurchaseForReview).toHaveBeenCalled();
            });
        });
    });
});
