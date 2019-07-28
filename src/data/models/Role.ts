import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, BaseEntity } from 'typeorm';
import { User } from './User';

export enum Roles {
  GUEST = 'Guest',
  ADMIN = 'Admin'
}

@Entity()
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToMany(type => User, user => user.roles)
  public users: User[];

}
