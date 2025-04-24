const API_PREFIX = "/api/v1";

export const API_ROUTE = {
  AUTH: {
    REGISTER: {
      ENDPOINT: API_PREFIX + "/auth/register",
      KEY: ["register"],
    },
  },
} as const;
