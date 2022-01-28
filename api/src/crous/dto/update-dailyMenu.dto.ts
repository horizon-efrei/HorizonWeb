import { PartialType } from '@nestjs/swagger';
import { CreateDailyMenuDto } from './create-dailyMenu.dto';

export class UpdateDailyMenuDto extends PartialType(CreateDailyMenuDto) {}
