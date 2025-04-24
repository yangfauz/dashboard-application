const API_PREFIX = "/api/v1"

export const CUSTOMER_API_ROUTES = {
  LIST: {
    ENDPOINT: API_PREFIX + "/customers",
    KEY: ["customer-list"]
  },
  DETAIL : {
    ENDPOINT: (id: number) => API_PREFIX + `/customers/${id}`,
    KEY: ["customer-detail"]
  }
}