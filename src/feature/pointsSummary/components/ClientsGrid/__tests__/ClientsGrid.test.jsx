import { render } from "@testing-library/react";
import { ClientsGrid } from "../ClientsGrid";
import { useClientsApi } from "../../../api/ClientsApi";
import { randomIntegerBetween } from "../../../../../core/helpers/randomNumbers";

jest.mock("../../../api/ClientsApi");

function createTransactionData(name) {
  const pointsA = randomIntegerBetween(0, 100);
  const pointsB = randomIntegerBetween(0, 100);
  const pointsC = randomIntegerBetween(0, 100);

  return {
    name,
    pointsPerMonth: {"01/2023": pointsA, "02/2023": pointsB, "03/2023": pointsC},
    pointsSum: pointsA + pointsB + pointsC,
    id: `test-id-${name}`,
  };
}

const mockedTransactionDataShort = [createTransactionData('nameA')];
const mockedTransactionDataLong = [
  createTransactionData('nameA'),
  createTransactionData('nameB'),
  createTransactionData('nameC'),
];

describe("COMPONENT ClientsGrid", () => {
  it('displays loading spinner if api is loading data', () => {
    useClientsApi.mockImplementationOnce(() => ({
      clientsTransactions: null, isLoading: true
    }));

    const { queryByTestId, getByTestId } = render(<ClientsGrid />);

    expect(queryByTestId("clients-grid")).toBeNull();
    expect(getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it('displays empty data text if no data are present', () => {
    const noDataText = "NO DATA...";
    useClientsApi.mockImplementationOnce(() => ({
      clientsTransactions: null, isLoading: false
    }));

    const { queryByTestId, container, rerender } = render(<ClientsGrid />);

    expect(queryByTestId("clients-grid")).toBeNull();
    expect(container.textContent).toEqual(noDataText);

    useClientsApi.mockImplementationOnce(() => ({
      clientsTransactions: [], isLoading: false
    }));

    rerender(<ClientsGrid />);

    expect(queryByTestId("clients-grid")).toBeNull();
    expect(container.textContent).toEqual(noDataText);

  });

  it('displays grid, when transaction data are available', () => {
    useClientsApi.mockImplementationOnce(() => ({
      clientsTransactions: mockedTransactionDataShort, isLoading: false
    }));

    const { getByTestId } = render(<ClientsGrid />);

    expect(getByTestId("clients-grid")).toBeInTheDocument();
  })

  it('create one grid item per transaction data', () => {
    useClientsApi.mockImplementationOnce(() => ({
      clientsTransactions: mockedTransactionDataShort, isLoading: false,
    }));

    const { getAllByTestId, rerender } = render(<ClientsGrid />);

    expect(getAllByTestId("transaction-item")).toHaveLength(mockedTransactionDataShort.length);

    useClientsApi.mockImplementationOnce(() => ({
      clientsTransactions: mockedTransactionDataLong, isLoading: false,
    }));

    rerender(<ClientsGrid />);

    expect(getAllByTestId("transaction-item")).toHaveLength(mockedTransactionDataLong.length);
  })
});