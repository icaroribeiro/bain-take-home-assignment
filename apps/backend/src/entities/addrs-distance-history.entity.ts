import { Column, Entity } from "typeorm";

import { Model } from "./model.entity";

@Entity("addrs_distance_history")
class AddrsDistanceHistory extends Model {
  @Column()
  src_addr_amenity: string;

  @Column()
  src_addr_street: string;

  @Column()
  src_addr_city: string;

  @Column()
  src_addr_county: string;

  @Column()
  src_addr_state: string;

  @Column()
  src_addr_country: string;

  @Column()
  src_addr_postalcode: string;

  @Column()
  dst_addr_amenity: string;

  @Column()
  dst_addr_street: string;

  @Column()
  dst_addr_city: string;

  @Column()
  dst_addr_county: string;

  @Column()
  dst_addr_state: string;

  @Column()
  dst_addr_country: string;

  @Column()
  dst_addr_postalcode: string;

  @Column()
  distance: number;
}

export { AddrsDistanceHistory };
