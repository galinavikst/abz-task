import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
};

type TokenResponse = {
  success: string;
  token: string;
};

export type PositionResponse = {
  id: number;
  name: string;
};
interface IPositionsResponse {
  success: boolean;
  positions: PositionResponse[];
}

export interface IResponse {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url: string | null;
    prev_url: string | null;
  };
  users: UserResponse[];
}

const countByPage = 6;
export const baseUrl = "https://frontend-test-assignment-api.abz.agency/api/v1";

export const abzApi = createApi({
  reducerPath: "abzApi",
  baseQuery: fetchBaseQuery({
    baseUrl,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).form.token;
      if (token) {
        headers.set("Token", token);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    addUser: builder.mutation<any, any>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
    }),

    getToken: builder.query<TokenResponse, void>({
      query: () => "/token",
    }),

    getPositions: builder.query<IPositionsResponse, void>({
      query: () => "/positions",
    }),

    getUsers: builder.query<IResponse, number>({
      query: (page) => `/users/?page=${page}&count=${countByPage}`,
    }),
  }),
});

export const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const {
  useAddUserMutation,
  useGetTokenQuery,
  useGetUsersQuery,
  useGetPositionsQuery,
} = abzApi;
