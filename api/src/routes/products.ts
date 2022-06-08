import { Router, Request, Response, NextFunction } from 'express';
import productsApi from '../lib/products-api';
const router = Router();

router.get('/', async (_, res: Response, next: NextFunction) => {
    try {
        const allProducts = await productsApi.getAll();
        res.send(allProducts);
    } catch(err) {
        console.error('Failed to get all products', err)
        next();
    }
});

router.get('/:productId', async (req: Request, res: Response, next: NextFunction) => {
    const { params: { productId: rawProductId } } = req;
    const productId = parseInt(rawProductId);

    try {
        const product = await productsApi.findById(productId);
        if (product) {
            return res.send(product);
        }
        return res.sendStatus(404);
    } catch (err) {
        console.error(`Filed to get product`, err);
        next();
    }
});

export default router;
