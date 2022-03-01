/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios';
import Config from 'react-native-config';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.params = { ...config.params, api_key: Config.THEMOVIEDB_API_KEY }
    return config;
  },
  (error: any) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response: any) => response,
  async (error: { response: { status: number; }; }) => Promise.reject(error),
);

export default instance;
