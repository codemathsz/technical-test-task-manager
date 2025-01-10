import axios from "axios";

export const API = axios.create({
  baseURL: 'https://technical-test-task-manager-api-production.up.railway.app/'
});