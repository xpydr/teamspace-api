import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { TeamMember, Role } from './entities/team-member.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private teamRepo: Repository<Team>,
    @InjectRepository(TeamMember) private teamMemberRepo: Repository<TeamMember>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createTeam(name: string, owner: User): Promise<Team> {
    const team = this.teamRepo.create({ name });
    await this.teamRepo.save(team);

    const membership = this.teamMemberRepo.create({
      user: owner,
      team,
      role: Role.OWNER,
    });
    await this.teamMemberRepo.save(membership);

    return team;
  }

  async addUserToTeam(teamId: number, userId: number, role: Role = Role.MEMBER) {
    const team = await this.teamRepo.findOne({ where: { id: teamId } });
    if (!team) throw new NotFoundException('Team not found');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const membership = this.teamMemberRepo.create({ team, user, role });
    return this.teamMemberRepo.save(membership);
  }

  async getTeamMembers(teamId: number) {
    return this.teamMemberRepo.find({
      where: { team: { id: teamId } },
      relations: ['user'],
    });
  }

  async isUserInTeam(userId: number, teamId: number): Promise<boolean> {
    const member = await this.teamMemberRepo.findOne({
      where: { team: { id: teamId }, user: { id: userId } },
    });
    return !!member;
  }
}
