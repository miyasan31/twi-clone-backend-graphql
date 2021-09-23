import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('follow')
@ObjectType()
export class Follow extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  followingUserId: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
