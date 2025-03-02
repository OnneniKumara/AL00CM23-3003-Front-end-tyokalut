export interface User {

  id?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  joinDate?: Date;
  lastLogin?: Date;
  updated?: Date;
  isDeleted?: boolean;
  deletionDate?: Date;
  roles?: string[];

}
