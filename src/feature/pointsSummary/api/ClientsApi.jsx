import { createContext, useContext, useEffect, useState } from "react";
import { fetch } from "../../../core/api/fetch";

const STATUS = { reeady: 'ready', busy: 'busy', error: 'error' };

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
    points: pointsSum
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
  // const [status, setStatus] = useState({status: STATUS.READY, msg: ''})

  useEffect(() => {
    const fetchClients = async () => {
      const clients = await fetch.get('/clients');

      setClientsTransactions(appendPointsValues(clients));
    };

    fetchClients();
  }, []);

  return (
    <ClientsAPIContext.Provider value={clientsTransactions}>
      {children}
    </ClientsAPIContext.Provider>
  )
}

export const useClientsApi = () => useContext(ClientsAPIContext);