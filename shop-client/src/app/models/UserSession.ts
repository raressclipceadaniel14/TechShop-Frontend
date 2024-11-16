import { UserRoleEnum } from "../enums/UserRoleEnum";

export class UserSession {
  id: number;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId: UserRoleEnum;
}
