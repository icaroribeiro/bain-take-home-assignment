import express from "express";

type PaginationConfig = {
  req: express.Request;
  pageNumber: number;
  pageSize: number;
};

export { PaginationConfig };
