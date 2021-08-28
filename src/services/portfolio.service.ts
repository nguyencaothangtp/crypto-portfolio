export class PortfolioService {
  static TYPES: any = {
    DEPOSIT: 1,
    WITHDRAWAL: -1
  }

  public getPortfolio(rows: any[]): any {
    let results: any = {};

    for (let row of rows) {
      if (!results[row.token]) {
        results[row.token] = 0;
      }

      results[row.token] += row.amount * PortfolioService.TYPES[row.transaction_type];
    }

    return results;
  }
}
