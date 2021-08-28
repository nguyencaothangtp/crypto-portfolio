import { TokenInterface } from '../interfaces/rate.interface';
import { Price } from './price';

export class Token implements TokenInterface {
  name: string = '';
  prices: Price[] = [];
}
