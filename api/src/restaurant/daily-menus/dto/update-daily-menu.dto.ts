import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { CreateDailyMenuDto } from './create-daily-menu.dto';

export class UpdateDailyMenuDto extends IntersectionType(
  PartialType(OmitType(CreateDailyMenuDto, ['normalizeDates'])),
  PickType(CreateDailyMenuDto, ['normalizeDates']),
) {}
