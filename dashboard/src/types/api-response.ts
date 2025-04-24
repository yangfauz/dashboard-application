export type BaseApiResponse<T = any> = {
  status: string;
  data: T;
};

export type Pagination<T = any> = {
  current_page: number;
  page_size: number;
  first_page: number;
  last_page: number;
  total_records: number;
  records: T;
};

export type PaginatedResponse<T = any> = {
  status: string;
  data: Pagination<T>;
}
