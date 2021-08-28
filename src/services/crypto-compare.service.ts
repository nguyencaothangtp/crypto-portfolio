import axios from 'axios';
import { Rate } from '../models/rate';
import { RateServiceInterface } from '../interfaces/rate-service.interface';
import { RateInterface } from '../interfaces/rate.interface';
import { Price } from '../models/price';
import { Token } from '../models/token';

export class CryptoCompareService implements RateServiceInterface {
  private endPoint: string = "https://min-api.cryptocompare.com/data/pricemulti";

  public async getRate(tokensString: string, currenciesString: string): Promise<RateInterface> {
    const response = await axios.get(`${this.endPoint}?fsyms=${tokensString}&tsyms=${currenciesString}`);

    const rate = new Rate();
    for (let keyToken in response.data) {
      if (response.data.hasOwnProperty(keyToken)) {
        let token: Token = new Token();

        let currencies: Price[] = [];
        for (let keyCurrency in response.data[keyToken]) {

          if (response.data[keyToken].hasOwnProperty(keyCurrency)) {
            let currency = new Price();

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
  }
}
