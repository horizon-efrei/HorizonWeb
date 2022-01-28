import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { CreateDailyInfoDto } from './create-daily-info.dto';

export class UpdateDailyInfoDto extends IntersectionType(
  PartialType(OmitType(CreateDailyInfoDto, ['normalizeDates'])),
  PickType(CreateDailyInfoDto, ['normalizeDates']),
) {}
