import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Team } from './team.entity';

export enum Role {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

@Entity()
@Unique(['user', 'team'])
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.teams)
  user: User;

  @ManyToOne(() => Team, (team) => team.members)
  team: Team;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.MEMBER,
  })
  role: Role;
}
