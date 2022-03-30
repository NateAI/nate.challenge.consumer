export enum PurchaseStatus {
  SUCCESS = 'success',
  MERCHANT_REJECTED = 'merchant-rejected',
  CHARGE_FAILED = 'charge-failed',
  INVALID_DETAILS = 'invalid-details',
  PENDING = 'pending',
  REJECTED = 'rejected'
}

const getRandomPurchaseStatus = (): PurchaseStatus => {
    const statuses: PurchaseStatus[] = [
      ...Array.from(new Array(50), () => PurchaseStatus.SUCCESS),
      ...Array.from(new Array(5), () => PurchaseStatus.MERCHANT_REJECTED),
      ...Array.from(new Array(5), () => PurchaseStatus.CHARGE_FAILED),
      ...Array.from(new Array(5), () => PurchaseStatus.INVALID_DETAILS),
    ]

    return statuses[Math.floor(Math.random() * statuses.length)];
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
