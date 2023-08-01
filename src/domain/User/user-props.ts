export type UserRoles = "user" | "admin";

export interface UserProps {
  id?: string;
  user: string;
  password: string;
  role: UserRoles;
}
