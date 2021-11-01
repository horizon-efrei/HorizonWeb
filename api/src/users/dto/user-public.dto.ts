import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class UserPublicDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Expose()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsNotEmpty()
  avatar: string;

  @Expose()
  @IsNotEmpty()
  reputation: string;
}
