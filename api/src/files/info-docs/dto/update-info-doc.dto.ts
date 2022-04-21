import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoDocDto } from '../../documents/dto/create-info-doc.dtoreate-info-doc.dto';

export class UpdateInfoDocDto extends PartialType(CreateInfoDocDto) {}
