import { getPreciseDistance } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";
import { INTERNAL_SERVER_ERROR } from "http-status";
import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import { AppError } from "../../../app-error";
import { LocationService, PaginatedResult } from "../../../services";
import { PaginationConfig, PaginationService } from "../../../services";
import { DistsBtwAddrsHistEntity } from "../../entities";
import { Address } from "../../models";

@injectable()
class AddressService {
  private readonly addressesDistanceCalcRepository: Repository<DistsBtwAddrsHistEntity>;

  constructor(
    @inject("DataSource") private dataSource: DataSource,
    private locationService: LocationService,
    private paginationService: PaginationService,
  ) {
    this.addressesDistanceCalcRepository = this.dataSource.getRepository(
      DistsBtwAddrsHistEntity,
    );
  }

  public async calcDistanceBetweenAddresses(
    srcAddress: Address,
    dstAddress: Address,
  ): Promise<number> {
    let srcGeoCoordinates: GeolibInputCoordinates;
    try {
      srcGeoCoordinates =
        await this.locationService.getAddressGeoCoordinates(srcAddress);
    } catch (error) {
      const message =
        "An error occurred when obtaining the source address geo coordinates";
      if (error instanceof Error) {
        console.error(message, error.message);
      }
      throw new AppError(INTERNAL_SERVER_ERROR, message);
    }

    let dstGeoCoordinates: GeolibInputCoordinates;
    try {
      dstGeoCoordinates =
        await this.locationService.getAddressGeoCoordinates(dstAddress);
    } catch (error) {
      const message =
        "An error occurred when obtaining the destination address geo coordinates";
      if (error instanceof Error) {
        console.error(message, error.message);
      }
      throw new AppError(INTERNAL_SERVER_ERROR, message);
    }

    let distance: number;
    try {
      distance = getPreciseDistance(srcGeoCoordinates, dstGeoCoordinates);
    } catch (error) {
      const message =
        "An error occurred when calculating the distance between addresses";
      if (error instanceof Error) {
        console.error(message, error.message);
      }
      throw new AppError(INTERNAL_SERVER_ERROR, message);
    }

    return distance;
  }

  public async saveDistanceBetweenAddresses(
    srcAddress: Address,
    dstAddress: Address,
    distance: number,
  ): Promise<void> {
    try {
      const newAddressesDistanceCalc = {
        src_address_amenity: srcAddress.amenity || "",
        src_address_street: srcAddress.street || "",
        src_address_city: srcAddress.city || "",
        src_address_county: srcAddress.county || "",
        src_address_state: srcAddress.state || "",
        src_address_country: srcAddress.country || "",
        src_address_postalcode: srcAddress.postalcode || "",
        dst_address_amenity: dstAddress.amenity || "",
        dst_address_street: dstAddress.street || "",
        dst_address_city: dstAddress.city || "",
        dst_address_county: dstAddress.county || "",
        dst_address_state: dstAddress.state || "",
        dst_address_country: dstAddress.country || "",
        dst_address_postalcode: dstAddress.postalcode || "",
        distance: distance,
      };
      const result = this.addressesDistanceCalcRepository.create(
        newAddressesDistanceCalc,
      );
      await this.addressesDistanceCalcRepository.save(result);
    } catch (error) {
      const message =
        "An error occurred when saving a new addresses distance calculation";
      if (error instanceof Error) {
        console.error(message, error.message);
      }
      throw new AppError(INTERNAL_SERVER_ERROR, message);
    }
  }

  public async retrieveDistancesBetweenAddressesHistory(
    paginationConfig: PaginationConfig,
  ): Promise<PaginatedResult<DistsBtwAddrsHistEntity>> {
    try {
      const take = paginationConfig.pageSize;
      const skip = (paginationConfig.pageNumber - 1) * take;
      const [results, total] =
        await this.addressesDistanceCalcRepository.findAndCount({
          take: take,
          skip: skip,
          order: {
            created_at: "DESC",
          },
        });
      return this.paginationService.paginate<DistsBtwAddrsHistEntity>(
        paginationConfig.req,
        paginationConfig.pageNumber,
        paginationConfig.pageSize,
        total,
        results,
      );
    } catch (error) {
      const message =
        "An error occurred when listing addresses distance calculations";
      if (error instanceof Error) {
        console.error(message, error.message);
      }
      throw new AppError(INTERNAL_SERVER_ERROR, message);
    }
  }
}

export { AddressService };
