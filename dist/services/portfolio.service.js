"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioService = void 0;
class PortfolioService {
    getPortfolio(rows) {
        let results = {};
        for (let row of rows) {
            if (!results[row.token]) {
                results[row.token] = 0;
            }
            results[row.token] += row.amount * PortfolioService.TYPES[row.transaction_type];
        }
        return results;
    }
}
exports.PortfolioService = PortfolioService;
PortfolioService.TYPES = {
    DEPOSIT: 1,
    WITHDRAWAL: -1
};
