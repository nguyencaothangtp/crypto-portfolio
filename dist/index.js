"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const crypto_compare_service_1 = require("./services/crypto-compare.service");
const calculate_service_1 = require("./services/calculate.service");
const portfolio_service_1 = require("./services/portfolio.service");
const results = [];
fs_1.default.createReadStream('data/transactions.csv')
    .pipe((0, csv_parser_1.default)())
    .on('data', (data) => results.push(data))
    .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
    const portfolioService = new portfolio_service_1.PortfolioService();
    const portfolio = portfolioService.getPortfolio(results);
    const tokenKeys = Object.keys(portfolio).join(',');
    const cryptoService = new crypto_compare_service_1.CryptoCompareService();
    const rate = yield cryptoService.getRate(tokenKeys, 'USD');
    const calculateService = new calculate_service_1.CalculateService();
    const result = calculateService.compute(portfolio, rate);
    console.log(result);
}));
