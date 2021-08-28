import { RateInterface } from './rate.interface';

export interface RateServiceInterface {
  getRate(tokensString: string, currenciesString: string): Promise<RateInterface>;
}
