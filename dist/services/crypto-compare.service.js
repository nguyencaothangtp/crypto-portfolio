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
exports.CryptoCompareService = void 0;
const axios_1 = __importDefault(require("axios"));
const rate_1 = require("../models/rate");
const price_1 = require("../models/price");
const token_1 = require("../models/token");
class CryptoCompareService {
    constructor() {
        this.endPoint = "https://min-api.cryptocompare.com/data/pricemulti";
    }
    getRate(tokensString, currenciesString) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.endPoint}?fsyms=${tokensString}&tsyms=${currenciesString}`);
            const rate = new rate_1.Rate();
            for (let keyToken in response.data) {
                if (response.data.hasOwnProperty(keyToken)) {
                    let token = new token_1.Token();
                    let currencies = [];
                    for (let keyCurrency in response.data[keyToken]) {
                        if (response.data[keyToken].hasOwnProperty(keyCurrency)) {
                            let currency = new price_1.Price();
                            currency.name = keyCurrency;
                            currency.value = response.data[keyToken][keyCurrency];
                            currencies.push(currency);
                        }
                    }
                    token.prices = currencies;
                    token.name = keyToken;
                    rate.tokens.push(token);
                }
            }
            return rate;
        });
    }
}
exports.CryptoCompareService = CryptoCompareService;
