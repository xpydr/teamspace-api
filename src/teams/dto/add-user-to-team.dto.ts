import { IsInt, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../entities/team-member.entity';

export class AddUserToTeamDto {
  @IsInt()
  userId: number;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
