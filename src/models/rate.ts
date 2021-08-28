import { RateInterface } from '../interfaces/rate.interface';
import { Token } from './token';

export class Rate implements RateInterface {
  public tokens: Token[] = [];
}
