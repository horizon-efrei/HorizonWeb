import type { SchoolRole } from '../../modules/authorization/types/school-role.enum';

export interface UserCreationOptions {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  fullname: string;
  password?: string;
  schoolRoles: SchoolRole[];
}
