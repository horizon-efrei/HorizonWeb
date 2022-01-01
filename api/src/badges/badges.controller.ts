import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Action, CheckPolicies, PoliciesGuard } from '../shared/modules/authorization';
import { Badge } from './badge.entity';
import { BadgesService } from './badges.service';
import { CreateBadgesDto } from './dto/create-badges.dto';

@ApiTags('Badges')
@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('badges')
export class BadgesController {
	constructor(private readonly badgesService: BadgesService) {}

	// Create badges
	// Be careful : everybody can create a badge now
	@Post('/create')
	@CheckPolicies((ability) => ability.can(Action.Create, Badge))
	public create(@Body() createTagDto: CreateBadgesDto): Promise<Badge[]> {
		return this.badgesService.createMany(createTagDto);
	}
}
