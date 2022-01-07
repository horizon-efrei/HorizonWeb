import { Transform } from 'class-transformer';
import {
 IsEmail, IsOptional, IsString, Matches,
} from 'class-validator';
import { OPAQUE_HEX_COLOR_REGEX } from '../../shared/lib/constants';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  signature: string;

  @IsOptional()
  @Matches(OPAQUE_HEX_COLOR_REGEX)
  @Transform(({ value }: { value: string }) => (value.startsWith('#') ? value.slice(1) : value))
  color: string;
}
