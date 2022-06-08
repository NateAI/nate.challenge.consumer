import products from '../data/products.json';
export interface Product {
    productId: number
    productUrl: string
    productPrice: number
    discountCode?: string
}

const getAll = async (): Promise<Product[]> => products;

const findById = async (id: number): Promise<Product> => {
    return products.find(({ productId }) => productId === id);
};

export default { findById, getAll };
