import { PriceInterface } from '../interfaces/rate.interface';

export class Price implements PriceInterface {
  public name: string = '';
  public value: number = 0;
}
