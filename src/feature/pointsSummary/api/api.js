import { fetch } from "../../../core/api/fetch";

const GET_CLIENTS_URL = '/clients';

export const getClients = () => fetch.get(GET_CLIENTS_URL); 