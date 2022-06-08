import { getRiskScore, getAccountBalance, getNumMissedPayments } from './risk-api';
import { acceptPurchase, rejectPurchase, flagPurchaseForReview } from './action-api';
import { Product } from './products-api';
const MISSED_PAYMENT_THRESHOLD = 1;
const RISK_REJECT_THRESHOLD = 90;
const RISK_FLAG_THRESHOLD = 80;

const performRiskAssessment = async (userId: string, { productPrice }: Product, paymentMethod: string): Promise<void> => {
    const [ numberOfMissedPayments, accountBalance, riskScore ] = await Promise.all([
        getNumMissedPayments(userId),
        getAccountBalance(userId),
        getRiskScore(paymentMethod),
    ]);

    if (numberOfMissedPayments > MISSED_PAYMENT_THRESHOLD ||
        accountBalance < productPrice ||
        riskScore > RISK_REJECT_THRESHOLD) {
        return rejectPurchase({userId, paymentMethod, productPrice});
    }

    if (riskScore > RISK_FLAG_THRESHOLD) {
        await flagPurchaseForReview({userId, paymentMethod, productPrice});
    }

    return acceptPurchase({userId, paymentMethod, productPrice});
};

export { performRiskAssessment };
