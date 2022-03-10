const getDelayedNumber = async (num: number): Promise<number> => {
  return new Promise((resolve) => {
    const timeout = 100 + Math.random() * 400;

    setTimeout(() => resolve(num), timeout);
  });
};

const getRiskScore = async (paymentMethodId: string): Promise<number> => {
  console.log(`Getting risk score for payment method ${paymentMethodId}`);

  const score = Math.floor(Math.random() * 100);

  return getDelayedNumber(score);
};

const getAccountBalance = async (userId: string): Promise<number> => {
  console.log(`Getting account balance for customer ${userId}`);

  const rawBalance = Math.random() * 1000;
  const balance = Math.round((rawBalance + Number.EPSILON) * 100) / 100;

  return getDelayedNumber(balance);
};

const getNumMissedPayments = async (userId: string): Promise<number> => {
  console.log(`Getting number of missed payments for customer ${userId}`);

  const numMissedPayments = Math.floor(Math.random() * 10);

  return getDelayedNumber(numMissedPayments);
};

export { getRiskScore, getAccountBalance, getNumMissedPayments };
