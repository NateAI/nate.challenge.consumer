const getDelayedNumber = async (num: number): Promise<number> => {
  return new Promise((resolve) => {
    const timeout = 100 + Math.random() * 400;

    setTimeout(() => resolve(num), timeout);
  });
};

const getRiskScore = async (paymentMethodId: string): Promise<number> => {
  console.log(`Getting risk score for payment method ${paymentMethodId}`);

  const possibleScores = [
    ...Array.from(new Array(60), () => Math.floor(Math.random() * 80)),
    ...Array.from(new Array(20), () => Math.floor(Math.random() * 90)),
    ...Array.from(new Array(20), () => Math.floor(Math.random() * 100)),
  ]

  return getDelayedNumber(possibleScores[Math.floor(Math.random() * possibleScores.length)]);
};

const getAccountBalance = async (userId: string): Promise<number> => {
  console.log(`Getting account balance for customer ${userId}`);

  const rawBalance = Math.random() * 1000;
  const balance = Math.round((rawBalance + Number.EPSILON) * 100) / 100;

  return getDelayedNumber(balance);
};

const getNumMissedPayments = async (userId: string): Promise<number> => {
  console.log(`Getting number of missed payments for customer ${userId}`);

  const missedPayments = [0, 0, 0, 1, 5, 3, 0, 0, 0, 0, 20, 5]

  return getDelayedNumber(missedPayments[Math.floor(Math.random() * missedPayments.length)]);
};

export { getRiskScore, getAccountBalance, getNumMissedPayments };
