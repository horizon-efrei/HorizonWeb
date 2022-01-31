/* eslint-disable max-classes-per-file */
import { IsArray, IsEmail, IsString } from 'class-validator';
import type { UserCreationOptions } from '../../shared/lib/types/user-creation-options.interface';
import { SchoolRole } from '../../shared/modules/authorization/types/school-role.enum';

class MyEfreiAuthorityDto {
  @IsString()
  authority: string;
}

export class MyEfreiDto {
  private static readonly schoolRoles = {
    ROLE_ADMIN: SchoolRole.Staff,
    ROLE_TEACHER: SchoolRole.Teacher,
    ROLE_STUDENT: SchoolRole.Student,
  };

  @IsString()
  username: string;

  @IsString()
  firstname: string;

  @IsString()
  name: string;

  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsArray()
  authorities: MyEfreiAuthorityDto[];

  public static normalize(data: MyEfreiDto): UserCreationOptions {
    return {
      username: data.username,
      firstname: data.firstname,
      lastname: data.name,
      fullname: data.fullName,
      email: data.email,
      schoolRoles: this.getSchoolRoles(data.authorities),
    };
  }

  public static getSchoolRoles(authorities: MyEfreiAuthorityDto[]): SchoolRole[] {
    type AuthorityRole = keyof typeof MyEfreiDto.schoolRoles;

    return authorities
      .map(authority => authority.authority)
      .filter((authority): authority is AuthorityRole => Object.keys(this.schoolRoles).includes(authority))
      .map(authority => this.schoolRoles[authority] ?? null);
  }
}
