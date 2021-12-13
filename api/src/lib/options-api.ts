export interface ProductMetadata {
  id: number;
  color: string;
  priceCents: number;
}

const getRandomMetadata = (): ProductMetadata => {
  const id = Math.floor(Math.random() * 100);
  const colors = ['red', 'blue', 'yellow', 'green', 'black'];
  const color = colors[Math.floor(Math.random() * 4)];
  const priceCents = 100 + Math.floor(Math.random() * 10000);

  return {
    id,
    priceCents,
    color
  };
};

const getDelayedMetadata = async (metadata: ProductMetadata): Promise<ProductMetadata> => {
  return new Promise((resolve) => {
    const timeout = 100 + (Math.random() * 400);

    setTimeout(() => resolve(metadata), timeout);
  });
};

export const getProductMetadata = async (url: string): Promise<ProductMetadata> => {
  console.log(`Getting metadata for product with URL ${url}`);

  const metadata = getRandomMetadata();

  return getDelayedMetadata(metadata);
};
