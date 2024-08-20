import express from "express";
import { injectable } from "tsyringe";

import { PaginatedResult } from "./paginated-result.model";

@injectable()
class PaginationService {
  constructor() {}

  public paginate<PaginatedEntity>(
    req: express.Request,
    pageNumber: number,
    pageSize: number,
    totalRecords: number,
    records: PaginatedEntity[],
  ): PaginatedResult<PaginatedEntity> {
    const result: PaginatedResult<PaginatedEntity> = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalPages: this.getTotalPages(pageSize, totalRecords),
      totalRecords: totalRecords,
      records: records,
      previous: this.getPreviousPage(req, pageNumber),
      next: this.getNextPage(req, pageNumber, pageSize, totalRecords),
    };
    return result;
  }

  public getTotalPages(pageSize: number, totalRecords: number): number {
    return Math.ceil(totalRecords / pageSize);
  }

  public getPreviousPage(
    req: express.Request,
    pageNumber: number,
  ): string | undefined {
    if (pageNumber == 1) {
      return undefined;
    }
    const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    if (url.includes("pageNumber")) {
      return url.replace(/(pageNumber=)[^&]+/, "$1" + `${pageNumber - 1}`);
    } else {
      return url + `&pageNumber=${pageNumber - 1}`;
    }
  }

  public getNextPage(
    req: express.Request,
    pageNumber: number,
    pageSize: number,
    totalRecords: number,
  ): string | undefined {
    if (pageNumber * pageSize >= totalRecords) {
      return undefined;
    }
    const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    if (url.includes("pageNumber")) {
      return url.replace(/(pageNumber=)[^&]+/, "$1" + `${pageNumber + 1}`);
    } else {
      return url + `&pageNumber=${pageNumber + 1}`;
    }
  }
}

export { PaginationService };
