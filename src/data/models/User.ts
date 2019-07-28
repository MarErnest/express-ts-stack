import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, BaseEntity, JoinTable } from 'typeorm';
import { Role } from './Role';
import { IsNotEmpty, Validate } from 'class-validator';
import { LoginValidator } from '../validators/loginValidator';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty({
    message: 'Username is required.',
    groups: ['login']
  })
  @Column()
  public username: string;

  @IsNotEmpty({
    message: 'Password is required.',
    groups: ['login']
  })
  @Validate(LoginValidator, { groups: ['login'] })
  @Column()
  public password: string;

  @ManyToMany(type => Role, role => role.users)
  @JoinTable({name: 'user_role'})
  public roles: Role[];

}
