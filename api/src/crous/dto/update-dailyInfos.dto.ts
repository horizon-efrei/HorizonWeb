import { PartialType } from '@nestjs/swagger';
import { CreateDailyInfosDto } from './create-dailyInfos.dto';

export class UpdateDailyInfosDto extends PartialType(CreateDailyInfosDto) {}
