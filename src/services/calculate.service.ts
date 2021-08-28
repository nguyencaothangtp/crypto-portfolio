import { Rate } from '../models/rate';
import { Token } from '../models/token';
import { Price } from '../models/price';
import { CalculateServiceInterface } from '../interfaces/calculate-service.interface';

export class CalculateService implements CalculateServiceInterface {
  public compute(portfolio: any, rate: Rate) {
    const result: any = {};
    for (let token in portfolio) {
      if (portfolio.hasOwnProperty(token)) {
        let amount = portfolio[token];

        let rateToken: Token | undefined = rate.tokens.find(e => e.name === token);
        if (rateToken) {
          const price: Price | undefined = rateToken.prices.find(e => e.name === 'USD');

          if (price) {
            result[token] = amount * price.value;
          }
        }
      }
    }

    return result;
  }
}
