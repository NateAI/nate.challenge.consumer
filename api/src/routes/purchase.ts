import { Request, Response, NextFunction, Router } from 'express';
import productsApi from '../lib/products-api';
import { executePurchase } from '../lib/purchase-api';
import { performRiskAssessment } from '../lib/risk-service';

const router = Router();

router.post('/:productId', async (req: Request, res: Response, next: NextFunction) => {
    const { params: { productId: rawProductId }, body: { userId, paymentMethod } } = req;
    const productId = parseInt(rawProductId);

    try {
        const product = await productsApi.findById(productId);
        if (!product) {
            return res.status(404).send({ message: 'Product Not Found' });
        }

        const status = await executePurchase(userId, productId, paymentMethod);
        const riskAssessment = performRiskAssessment(userId, product, paymentMethod);
        return res.send({ status: 'success', purchaseStatus: status });
    } catch(err) {
        console.error(`Purchase error`, err)
        next();
    }
});

export default router;
