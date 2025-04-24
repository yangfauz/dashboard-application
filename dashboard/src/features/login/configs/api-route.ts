const API_PREFIX = "/api/v1";

export const API_ROUTE = {
  AUTH: {
    LOGIN: {
      ENDPOINT: API_PREFIX + "/auth/login",
      KEY: ["login"],
    },
  },
} as const;
