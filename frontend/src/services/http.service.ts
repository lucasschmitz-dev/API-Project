import Axios, { AxiosError } from "axios";
import _ from "lodash";
import { parseResponse } from "@/services/http.utils";
import type { ParseFunction } from "@/services/http.utils";

export function get<T>(
  url: string,
  params?: any,
  parseFn?: ParseFunction<T>
): Promise<T | Array<T>> {
  return doRequest({
    url,
    method: "GET",
    useToken: true,
    params: params,
    parseFn: parseFn,
  });
}

export function post<T>(
  url: string,
  body: any,
  headers?: any,
  parseFn?: ParseFunction<T>
): Promise<T | Array<T>> {
  return doRequest({
    url,
    method: "POST",
    useToken: true,
    body: body,
    headers: headers,
    parseFn: parseFn,
  });
}

interface RequestOptions<T> {
  url: string;
  method: "GET" | "POST";
  useToken: boolean;
  headers?: { [headerfield: string]: string };
  params?: any;
  body?: any;
  parseFn?: ParseFunction<T>;
}
export async function doRequest<T>(
  options: RequestOptions<T>
): Promise<T | Array<T>> {
  // eslint-disable-next-line prefer-const
  let { url, headers, parseFn } = options;

  if (_.isNil(headers)) {
    headers = {};
  }

  /*     if (options.useToken) {
        const token = await auth.getToken();
        headers["Authorization"] = `Bearer ${token}`;
    } */

  const response = await Axios.request({
    url: url,
    method: options.method,
    headers: headers,
    params: options.params,
    data: options.body,
  }).catch((err: AxiosError) => {
    if (err.response?.status === 401) {
      alert(err.response?.statusText + ", API Keys überprüfen!");
    } else if (err.response?.status === 400) {
      alert(err.response?.statusText + ", API Request überprüfen!");
    } else {
      alert(err.code);
    }
  });

  const parsedResponse = parseResponse(response?.data, parseFn);
  if (parsedResponse === null) {
    throw new Error("Empty response body");
  }
  return parsedResponse;
}

export default {
  get,
  post,
  doRequest,
};
