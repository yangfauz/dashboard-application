"use client"

import httpClient from "@/utils/http-client"
import { CUSTOMER_API_ROUTES } from "../config/api-route"
import { useQuery } from "@tanstack/react-query"

const customerListApi = (queryParams:any) => httpClient.get(CUSTOMER_API_ROUTES.LIST.ENDPOINT, {params: queryParams})

export default function useCustomerList(queryParams:any) {
  return useQuery({
    queryKey: [...CUSTOMER_API_ROUTES.LIST.KEY, ...Object.values(queryParams)],
    queryFn: () => customerListApi(queryParams)
  })
}