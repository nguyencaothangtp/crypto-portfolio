"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateService = void 0;
class CalculateService {
    compute(portfolio, rate) {
        const result = {};
        for (let token in portfolio) {
            if (portfolio.hasOwnProperty(token)) {
                let amount = portfolio[token];
                let rateToken = rate.tokens.find(e => e.name === token);
                if (rateToken) {
                    const price = rateToken.prices.find(e => e.name === 'USD');
                    if (price) {
                        result[token] = amount * price.value;
                    }
                }
            }
        }
        return result;
    }
}
exports.CalculateService = CalculateService;
