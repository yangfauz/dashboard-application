export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  order_by?: OrderBy;
}

export enum OrderBy {
  ASC = "asc",
  DESC = "desc",
}
