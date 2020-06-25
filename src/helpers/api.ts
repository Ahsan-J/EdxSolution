import axios, {AxiosRequestConfig} from 'axios';
import {BASE_URL} from '../configuration/core';
import {AppThunkDispatch} from '../redux/types';

// eslint-disable-next-line prettier/prettier
export interface IApiParam{
  path: AxiosRequestConfig['url'];
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}

// eslint-disable-next-line prettier/prettier
export const apiCall = (params: IApiParam, onSuccess: Function, onFailure: Function) => (dispatch: AppThunkDispatch) => new Promise<Object>(async (resolve, reject) => {
    const requestingObject: AxiosRequestConfig = {
      url: getURL(params.path + ''),
      headers: dispatch(getHeaders(params)),
      method: params.method ? params.method : 'GET',
      data: params.data ? params.data : {},
      params: params.params ? params.params : {},
    };

    return axios(requestingObject)
      .then((response) => {
        // OnSuccess common validations
        dispatch(onSuccess(response, params));
        resolve(response);
      })
      .catch((err) => {
        // onFailure common validations
        dispatch(onFailure(err, params));
        reject(err);
      });
  });

const getURL = (path: string) => {
  if (path) {
    return BASE_URL + path;
  } else {
    throw 'Port or Path is undefined';
  }
};

const getHeaders = (params: IApiParam) => (dispatch: AppThunkDispatch) => {
  const a = {};
  params;
  dispatch;
  return a;
};
