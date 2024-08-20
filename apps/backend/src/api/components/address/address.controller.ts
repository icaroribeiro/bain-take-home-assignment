import express from "express";
import { OK } from "http-status";
import {
  Body,
  Controller,
  Example,
  Get,
  Middlewares,
  Post,
  Query,
  Request,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { injectable } from "tsyringe";

import { PaginationConfig } from "../../../services/pagination";
import { DistsBtwAddrsHistEntity } from "../../entities";
import { validateRequestMiddleware } from "../../middlewares";
import { ErrorResponse, FailResponse } from "../../models";
import { paginationQueryStringValidator } from "../../validators";
import {
  CalcDistanceBetweenAddressesRequest,
  calcDistanceBetweenAddressesRequestSchema,
  CalcDistanceBetweenAddressesResponse,
  GetDistacesBetweenAddressesHistoryResponse,
} from "./address.models";
import { AddressService } from "./address.service";

@injectable()
@Route("addresses")
@Tags("address")
class AddressController extends Controller {
  constructor(private addressService: AddressService) {
    super();
  }

  /**
   * Calculatethe distances between two addresses.
   */
  @SuccessResponse("200", "OK")
  @Example<CalcDistanceBetweenAddressesResponse>({
    status: "success",
    result: {
      distance: 1,
    },
  })
  @Response<FailResponse>("400", "Bad Reqsuest", {
    status: "fail",
    message: "Bad Request",
    details: "",
  })
  @Response<FailResponse>("422", "Validation Failed", {
    status: "fail",
    message: "Validation failed",
    details: {
      reqBody: {
        message:
          "srcAddresss is an excess property and therefore is not allowed",
        value: {
          srcAddresss: {
            amenity: "",
            street: "17, Strada Pictor Alexandru Romano",
            city: "",
            county: "",
            state: "",
            country: "",
            postalcode: "",
          },
        },
      },
    },
  })
  @Response<ErrorResponse>("500", "Internal Server Error", {
    status: "error",
    message: "Internal Server Error",
    details: undefined,
  })
  @Post("/calculate-distance")
  @Middlewares(
    validateRequestMiddleware(calcDistanceBetweenAddressesRequestSchema),
  )
  async calcDistanceBetweenAddresses(
    @Body() body: CalcDistanceBetweenAddressesRequest,
  ): Promise<CalcDistanceBetweenAddressesResponse> {
    const { srcAddress, dstAddress } = body;
    const distance = await this.addressService.calcDistanceBetweenAddresses(
      srcAddress,
      dstAddress,
    );
    await this.addressService.saveDistanceBetweenAddresses(
      srcAddress,
      dstAddress,
      distance,
    );
    this.setStatus(OK);
    const response: CalcDistanceBetweenAddressesResponse = {
      status: "success",
      result: {
        distance: distance,
      },
    };
    return response;
  }

  /**
   * Retrieve the history of the distances between two addresses using pagination schema.
   * Supply the page number and page size and receive the corresponding history details.
   * @param pageNumber The number of the page. If nothing is provided, it will be set to 1.
   * @param pageSize The size of the page. nothing is provided, it will be set to 1.
   */
  @SuccessResponse("200", "OK")
  @Example<GetDistacesBetweenAddressesHistoryResponse<DistsBtwAddrsHistEntity>>(
    {
      status: "success",
      result: {
        pageNumber: 1,
        pageSize: 1,
        totalPages: 1,
        totalRecords: 1,
        records: [
          {
            id: "a074e5db-a074-40cf-b889-30e1e07046a3",
            created_at: new Date("2024-08-20T03:37:33.679Z"),
            updated_at: new Date("2024-08-20T03:37:33.679Z"),
            src_address_amenity: "",
            src_address_street: "17, Strada Pictor Alexandru Romano",
            src_address_city: "",
            src_address_county: "",
            src_address_state: "",
            src_address_country: "",
            src_address_postalcode: "",
            dst_address_amenity: "",
            dst_address_street: "",
            dst_address_city: "",
            dst_address_county: "",
            dst_address_state: "",
            dst_address_country: "Brazil",
            dst_address_postalcode: "",
            distance: 10252539,
          },
        ],
      },
    },
  )
  @Get("/distances/history")
  @Middlewares(validateRequestMiddleware(paginationQueryStringValidator))
  async getDistancesBetweenAddressesHistory(
    @Request() req: express.Request,
    @Query() pageNumber?: number,
    @Query() pageSize?: number,
  ): Promise<
    GetDistacesBetweenAddressesHistoryResponse<DistsBtwAddrsHistEntity>
  > {
    const parsedQuery = paginationQueryStringValidator.parse({
      query: { pageNumber: pageNumber, pageSize: pageSize },
    });
    const paginationConfig: PaginationConfig = {
      pageNumber: parsedQuery.query.pageNumber,
      pageSize: parsedQuery.query.pageSize,
      req: req,
    };
    const result =
      await this.addressService.retrieveDistancesBetweenAddressesHistory(
        paginationConfig,
      );
    this.setStatus(OK);
    const response: GetDistacesBetweenAddressesHistoryResponse<DistsBtwAddrsHistEntity> =
      {
        status: "success",
        result: result,
      };
    return response;
  }
}

export { AddressController };
