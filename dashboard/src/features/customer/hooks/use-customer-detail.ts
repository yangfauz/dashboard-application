"use client"

import httpClient from "@/utils/http-client"
import { CUSTOMER_API_ROUTES } from "../config/api-route"
import { useQuery } from "@tanstack/react-query"
import { BaseApiResponse } from "@/types/api-response"
import { CustomerSchema } from "../schema/customer.schema"

const customerDetailApi = async (id:number) => {
  return await httpClient.get<BaseApiResponse<CustomerSchema>>(CUSTOMER_API_ROUTES.DETAIL.ENDPOINT(id))
}

export default function useCustomerDetail(id:number) {
  return useQuery({
    queryKey: [...CUSTOMER_API_ROUTES.DETAIL.KEY, id],
    queryFn: () => customerDetailApi(id),
    enabled: !!id
  })
}