interface ProductPayment {
};

const assessRisk = async (payment: ProductPayment): Promise<boolean> => {
  return true;
};

export { assessRisk };
