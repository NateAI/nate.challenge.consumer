const getDelayedVoid = async (): Promise<void> => {
  return new Promise((resolve) => {
    const timeout = 100 + (Math.random() * 400);

    setTimeout(() => resolve(), timeout);
  });
};

interface PurchaseDetails {
};

const acceptPurchase = async (purchaseDetails: PurchaseDetails): Promise<void> => getDelayedVoid();

const rejectPurchase = async (purchaseDetails: PurchaseDetails): Promise<void> => getDelayedVoid();

const flagPurchaseForReview = async (purchaseDetails: PurchaseDetails): Promise<void> => getDelayedVoid();

export { acceptPurchase, rejectPurchase, flagPurchaseForReview };
