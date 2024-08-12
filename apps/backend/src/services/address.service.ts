import { PostgresDataSource } from "../data-sources";
import { AddrsDistanceHistory } from "../entities";
import { Address } from "../schemas";

const repository = PostgresDataSource.getRepository(AddrsDistanceHistory);

const createAddrsDistanceHistory = async (
  srcAddress: Address,
  dstAddress: Address,
  distance: number,
) => {
  const newAddrsDistanceHistory = AddrsDistanceHistory.create({
    src_addr_amenity: srcAddress.amenity || "",
    src_addr_street: srcAddress.street || "",
    src_addr_city: srcAddress.city || "",
    src_addr_county: srcAddress.county || "",
    src_addr_state: srcAddress.state || "",
    src_addr_country: srcAddress.country || "",
    src_addr_postalcode: srcAddress.postalcode || "",
    dst_addr_amenity: dstAddress.amenity || "",
    dst_addr_street: dstAddress.street || "",
    dst_addr_city: dstAddress.city || "",
    dst_addr_county: dstAddress.county || "",
    dst_addr_state: dstAddress.state || "",
    dst_addr_country: dstAddress.country || "",
    dst_addr_postalcode: dstAddress.postalcode || "",
    distance: distance,
  });
  return await repository.save(newAddrsDistanceHistory);
};

export { createAddrsDistanceHistory };
