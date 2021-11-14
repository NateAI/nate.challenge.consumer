interface ProductPayment {
};

const assessRisk = async (payment: ProductPayment): Promise<boolean> => {
  console.log(payment);
  return true;
};

export { assessRisk };
