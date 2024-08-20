type PaginatedResult<PaginatedEntity> = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  records: PaginatedEntity[];
  previous?: string;
  next?: string;
};

export { PaginatedResult };
