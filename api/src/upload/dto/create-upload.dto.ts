import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUploadDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    body: string;
}
