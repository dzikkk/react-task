import { createContext, useContext, useEffect, useState } from "react";
import { useErrors } from "../../../core/errorHandling/context/ErrorsRegister";
import { getClients } from "./api";

const ClientsAPIContext = createContext([]);

function getPointsFromTransaction(value) {
  const rounded = Math.floor(value);

  return Math.max(rounded-50, 0) + Math.max(rounded-100, 0);
}

function calculatePointsSum(transactionsList) {
  return transactionsList.reduce((points, transaction) => points += getPointsFromTransaction(transaction), 0);
}

function calculatePointsFromTransaction(transactions) {
  let pointsSum = 0;
  const pointsPerMonth = {};

  Object.keys(transactions).forEach(date => {
      const pointsfromMonth = calculatePointsSum(transactions[date]);
      pointsSum += pointsfromMonth;
      pointsPerMonth[date] = pointsfromMonth;
  });

  return {
    pointsPerMonth,
    pointsSum,
  }
}

function appendPointsToClientData({transactions, ...rest}){
  return {
    ...rest,
    transactions,
    ...calculatePointsFromTransaction(transactions),
  }
};

function appendPointsValues(clients) {
  return clients.map(appendPointsToClientData)
}

export function ClientsApiProvider({children}) {
  const [clientsTransactions, setClientsTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addError } = useErrors();

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const clients = await getClients();

        setClientsTransactions(appendPointsValues(clients));
      } catch (err) {
        addError(err.message);
      }
      setIsLoading(false);
    };

    fetchClients();
  }, [addError]);

  const clientsValue = {
    clientsTransactions,
    isLoading,
  }

  return (
    <ClientsAPIContext.Provider value={clientsValue}>
      {children}
    </ClientsAPIContext.Provider>
  )
}

export const useClientsApi = () => useContext(ClientsAPIContext);