import { PartialType } from '@nestjs/swagger';
import { CreateClubMemberDto } from './create-club-member.dto';

export class UpdateClubMemberDto extends PartialType(CreateClubMemberDto) {}
