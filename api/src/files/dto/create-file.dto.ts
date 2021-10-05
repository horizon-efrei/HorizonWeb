import {
 IsDate, IsInt, IsNotEmpty, IsOptional, IsString,
} from 'class-validator';

export class CreateUploadDto {
    @IsNotEmpty()
    @IsString()
    originalName: string;

    @IsString()
    type: string;

    @IsString()
    encoding: string;

    @IsNotEmpty()
    @IsInt()
    fileSize: number;

    @IsOptional()
    @IsDate()
    lastModified: Date;
}
