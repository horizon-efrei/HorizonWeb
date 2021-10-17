import { Type } from 'class-transformer';
import {
 IsArray, IsNotEmpty, IsNumber, IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  type: number;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
