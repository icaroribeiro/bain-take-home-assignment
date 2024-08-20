import { Column, Entity } from "typeorm";

import { BaseEntity } from "./base.entity";

@Entity("dists_btw_addrs_hist")
class DistsBtwAddrsHistEntity extends BaseEntity {
  @Column()
  src_address_amenity: string;

  @Column()
  src_address_street: string;

  @Column()
  src_address_city: string;

  @Column()
  src_address_county: string;

  @Column()
  src_address_state: string;

  @Column()
  src_address_country: string;

  @Column()
  src_address_postalcode: string;

  @Column()
  dst_address_amenity: string;

  @Column()
  dst_address_street: string;

  @Column()
  dst_address_city: string;

  @Column()
  dst_address_county: string;

  @Column()
  dst_address_state: string;

  @Column()
  dst_address_country: string;

  @Column()
  dst_address_postalcode: string;

  @Column()
  distance: number;
}

export { DistsBtwAddrsHistEntity };
