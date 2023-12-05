import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import { ITableRow } from "./tableSlice";

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
  }),
  endpoints: (builder) => ({
    // addRow: builder.mutation<ITableRow, Omit<ITableRow, "id">>({
    //   query: (body) => ({
    //     url: `/table/`,
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       accept: "application/json",
    //     },
    //     body,
    //   }),
    // }),

    // login: builder.mutation<any, any>({
    //   query: (bodyData) => ({
    //     url: "/login/",
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       accept: "application/json",
    //     },
    //     body: bodyData,
    //   }),
    // }),

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
  //useAddRowMutation,
  useGetUsersQuery,
  //useLoginMutation,
  useGetPositionsQuery,
} = abzApi;
