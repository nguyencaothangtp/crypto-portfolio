# Crypto Profile #

A command line program that returns the latest portfolio value per token in USD

## Prerequisites

* [Nodejs](https://nodejs.org/en/) ^12.19.1

## Getting Started

To run the program, execute this command in side the project folder

```
npm run start
```

That's it!

The program will read the data from *data/transaction.csv* which has the following columns:

- timestamp: Integer number of seconds since the Epoch
- transaction_type: Either a DEPOSIT or a WITHDRAWAL
- token: The token symbol
- amount: The amount transacted

### Services

| Service Name             | Interface implemented     |  Method using | Description
| ------------------------ | ------------------------- |---------------| -------------------------- |
| Calculate Service        | CalculateServiceInterface | compute()     | Convert token to USD value
| Crypto Compare Service   | RateServiceInterface      | getRate()     | Get rate from [Cryptocompare](https://min-api.cryptocompare.com/documentation) website.
| Portfolio Service        |                           | getPortfolio()| Process the array of data. Where the data from is not its concern. Could be from a file, database, API..

### Interfaces

- RateInterface: Define all the data type that will be used in Calculate Service
- RateServiceInterface: Define a contract for getting rate
- CalculateServiceInterface: Define a contract for calculating the rate
- ..

Reason for defining these interfaces: To separate the interface from the actual implementations for maintainability and
extendability. We could easily swap to another Services later on without having to change much as long as the new
services implemented our pre-defined interfaces.

### Decision-making process

- Crypto Compare Service is currently getting the rate though
  an [external API](https://min-api.cryptocompare.com/documentation). The Service should be developed in a way that it
  calls the API only ONE time to increase performance. It implemented RateServiceInterface so that if we want to use
  another third party service to get the rate, we just need to introduce it and implement RateServiceInterface. Other
  part of the system will not need to change.
  
- Portfolio Service with dynamic types that should be extended easily.

    ```
    static TYPES: any = {
        DEPOSIT: 1,
        WITHDRAWAL: -1
      }
    ```
  There might be many more types to come (ex: transfer, receive, auto-deduction, auto-funding...), so they should be
  dynamic. Even though we will have more types, there are basically 2 actions with all types (add and subtract funds),
  represented by +1 and -1.

### Things that could be improved in the app if given more time

- Add dependency injection though some kind of App Service Provider to auto-bind the Class and Interface
    ```
    function boot() {
         app.singleton(RateServiceInterface, CryptoCompareService);
         app.singleton(CalculateServiceInterface, CalculateService);
         ..
    }
    ```
- Currently, 'USD' is fixed in the system when computing the token value. Should be dynamic to support more currency.
