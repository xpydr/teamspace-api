import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TeamMember } from './team-member.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TeamMember, (teamMember) => teamMember.team)
  members: TeamMember[];
}
