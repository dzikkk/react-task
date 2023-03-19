import { generateClientsName } from "./generateClientsName";
import { generateClientsTransactions } from "./generateClientsTransactions";
import { generateId } from "./generateId";

export function generateRandomClient() {
  const clientName = generateClientsName();

  return {
    id: generateId(clientName),
    name: clientName,
    transactions: generateClientsTransactions(),
  }
};
