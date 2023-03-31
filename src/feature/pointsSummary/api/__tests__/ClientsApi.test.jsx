import { renderHook, waitFor } from "@testing-library/react"
import { ClientsApiProvider, useClientsApi } from "../ClientsApi"

import { getClients } from '../api';

jest.mock('../api');
jest.mock('../../../../core/errorHandling/context/ErrorsRegister', () => ({
  useErrors: () => ({
    addError: jest.fn(),
    removeError: jest.fn(),
  })
}));

const mockedClientsData = [{
  id: 'test-id-1',
  name: 'test name 1',
  transactions: { '01/2023': ['20.01'], '02/2023': ['300.99', '40'], '03/2023': ['0', '60', '210.1'] },
}, {
  id: 'test-id-2',
  name: 'test name 2',
  transactions: { '01/2023': ['90', '10'], '02/2023': ['0'], '03/2023': ['20', '20'] },
}];

describe("API Clients", () => {
  it("returns default values on initialisation", () => {
    const {result} = renderHook(() => useClientsApi());

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.clientsTransactions).toHaveLength(0);
  });

  it("sets isLoading true and calls getClients while mounting", async () => {
    const {result } = renderHook(() => useClientsApi(), {wrapper: ClientsApiProvider});

    await waitFor(() => {
      expect(result.current.isLoading).toBeTruthy();
      expect(getClients).toBeCalled();
    });
  });

  it("sets isLoading to false when getClient succeed and returns data", async () => {
    const expectedTransactionsData = [{
      id: 'test-id-1',
      name: 'test name 1',
      transactions: { '01/2023': ['20.01'], '02/2023': ['300.99', '40'], '03/2023': ['0', '60', '210.1'] },
      pointsPerMonth: { '01/2023': 0, '02/2023': 450, '03/2023': 280 },
      pointsSum: 730,
    }, {
      id: 'test-id-2',
      name: 'test name 2',
      transactions: { '01/2023': ['90', '10'], '02/2023': ['0'], '03/2023': ['20', '20'] },
      pointsPerMonth: { '01/2023': 40, '02/2023': 0, '03/2023': 0 },
      pointsSum: 40,
    }];

    getClients.mockImplementation(() => mockedClientsData);
    const {result } = renderHook(() => useClientsApi(), {wrapper: ClientsApiProvider});

    await waitFor(() => {
      expect(getClients).toBeCalled();
      expect(result.current.isLoading).toBeTruthy();
    });

    await waitFor(() => {
      expect(result.current.clientsTransactions).toEqual(expectedTransactionsData);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });
});
