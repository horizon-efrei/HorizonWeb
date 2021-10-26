import {
 IsDate, IsInt, IsNotEmpty, IsOptional, IsString,
} from 'class-validator';

export class CreateFileUploadDto {
    @IsNotEmpty()
    @IsString()
    originalName: string;

    @IsString()
    type: string;

    @IsString()
    encoding: string;

    @IsString()
    fileKind: string;

    @IsNotEmpty()
    @IsInt()
    fileSize: number;

    @IsOptional()
    @IsDate()
    lastModified: Date;
}
