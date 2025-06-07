export type IPagenation<T> = {
  items: T;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
};
