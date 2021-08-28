import { Rate } from '../models/rate';

export interface CalculateServiceInterface {
  compute(portfolio: any, rate: Rate): any
}
