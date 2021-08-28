import fs from 'fs';
import csv from 'csv-parser';
import { CryptoCompareService } from './services/crypto-compare.service';
import { CalculateService } from './services/calculate.service';
import { PortfolioService } from './services/portfolio.service';

const results: any = [];

fs.createReadStream('data/transactions.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    const portfolioService = new PortfolioService();
    const portfolio = portfolioService.getPortfolio(results);

    const tokenKeys = Object.keys(portfolio).join(',');

    const cryptoService = new CryptoCompareService();
    const rate = await cryptoService.getRate(tokenKeys, 'USD');

    const calculateService = new CalculateService();
    const result = calculateService.compute(portfolio, rate);

    console.log(result);
  });
