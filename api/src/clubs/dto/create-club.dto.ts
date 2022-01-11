import { IsArray, IsString } from 'class-validator';

export class CreateClubDto {
  @IsString()
  clubName: string;

  @IsString()
  clubType: string;

  @IsString()
  slug: string;

  @IsString()
  clubDescription: string;

  @IsString()
  iconFilename: string;

  @IsArray()
  @IsString({ each: true })
  socials: string[];
}
