import { IsString } from 'class-validator';

export class CreateSocialAccountDto {
  @IsString()
  link: string;

  @IsString()
  pseudo: string;

  @IsString()
  name: string;
}
