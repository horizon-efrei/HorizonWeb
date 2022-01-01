import { Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsNumber, IsString, ValidateNested } from 'class-validator';
import { METALS } from '../../shared/lib/constants';

class CreateSingleBadgeDto {
	@IsString()
	name: string;

	@IsString()
	slug: string;

	@IsString()
	description: string;

	@IsInt()
	@IsNumber()
	value: number;

	@IsString()
	type: string;

	// @IsString({each: true})
	@IsString()
	class: string;

	@IsString()
	@IsIn(METALS)
	level: typeof METALS[number];

	@IsString()
	iconFilename: string;
}

export class CreateBadgesDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateSingleBadgeDto)
	badges: CreateSingleBadgeDto[];
}
