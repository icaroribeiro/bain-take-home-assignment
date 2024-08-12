import {
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  setID() {
    this.id = uuidv4();
  }

  @BeforeInsert()
  setCreatedAt() {
    this.created_at = new Date();
  }
}

export { Model };
