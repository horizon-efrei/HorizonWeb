import { PartialType } from '@nestjs/mapped-types';
import { CreateWikiDto } from './create-wiki.dto';

export class UpdateWikiDto extends PartialType(CreateWikiDto) {}
