import { randomFloatBetween, randomIntegerBetween } from "../helpers/randomNumbers";
const MAX_TRANSACTION_VALUE = 250;
const MIN_TRANSACTION_VALUE = 1;
const MAX_TRANSACTIONS_NUMBER = 10;
const MIN_TRANSACTION_NUMBER = 1;

function generateRandomTransactions() {
  const numberOfTransactions = randomIntegerBetween(MIN_TRANSACTION_NUMBER, MAX_TRANSACTIONS_NUMBER);
  const generateTransaction = () => randomFloatBetween(MIN_TRANSACTION_VALUE, MAX_TRANSACTION_VALUE);

  return new Array(numberOfTransactions).fill(null).map(generateTransaction);
}

export function generateClientsTransactions() {
  return {
    '01/2023': generateRandomTransactions(),
    '02/2023': generateRandomTransactions(),
    '03/2023': generateRandomTransactions(),
  }
}