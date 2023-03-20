import { Loading } from "../../../../layout/Loading/Loading";
import { useClientsApi } from "../../api/ClientsApi";
import { GridItem } from "./GridItem";

function createGridItem({name, pointsPerMonth, pointsSum, id}) { 
  return (
    <GridItem
      clientName={name}
      pointsPerMonth={pointsPerMonth}
      pointsSum={pointsSum}
      key={id}
    />
  );
}

export function ClientsGrid() {
  const {clientsTransactions, isLoading} = useClientsApi();

  if(isLoading) {
    return (<Loading />)
  }

  if(!clientsTransactions || clientsTransactions.length === 0) {
    return (<h3>NO DATA...</h3>)
  }

  return (
    <div className="grid-wrapper">
      {clientsTransactions.map(createGridItem)}
    </div>)
}