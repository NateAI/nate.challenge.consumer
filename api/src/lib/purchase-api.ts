export enum PurchaseStatus {
  SUCCESS = 'success',
  MERCHANT_REJECTED = 'merchant-rejected',
  CHARGE_FAILED = 'charge-failed',
  INVALID_DETAILS = 'invalid-details'
}

const getRandomPurchaseStatus = (): PurchaseStatus => {
    const statuses = ['success', 'merchant-rejected', 'charge-failed', 'invalid-details'];
    const status = statuses[Math.floor(Math.random() * 4)];

    return status as PurchaseStatus;
};

const getDelayedPurchaseStatus = async (status: PurchaseStatus): Promise<PurchaseStatus> => {
  return new Promise((resolve) => {
    const timeout = 100 + (Math.random() * 400);

    setTimeout(() => resolve(status), timeout);
  });
};

export const executePurchase = async (userId: string, productId: number, paymentMethodId: string): Promise<PurchaseStatus> => {
  console.log(`Executing purchase for product with ID ${productId}`);

  const status = getRandomPurchaseStatus();

  return getDelayedPurchaseStatus(status);
};
