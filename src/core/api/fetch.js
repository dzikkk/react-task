import { delayFn } from "../helpers/delayFn";
import { generateRandomClient } from "../randomDataGeneration/generateRandomClient";

const INVALID_URL_ERR_MSG = 'Invalid request url: ';

function generateRandomizedClientData() {
  const NUMBER_OF_CLIENTS = 10;

  return new Array(NUMBER_OF_CLIENTS).fill(null).map(generateRandomClient)
}

export const fetch = (function() {
  let clientsTransactions = generateRandomizedClientData();

  function getClients() {
    return clientsTransactions;
  };

  const FUNCTIONS_BY_URL = {
    '/clients': getClients,
  };

  return {
    async get(url = '', params = {}) {
      const getFn = FUNCTIONS_BY_URL[url];
  
      if (!getFn) {
        throw new Error(`${INVALID_URL_ERR_MSG}${url}`)
      }

      await delayFn(3000);

      return getFn(params);
    }
  }
})()