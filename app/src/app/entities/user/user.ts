
export class User {
  id!: number;
  name: string;
  email: string;
  password: string;
  userType: string;

  constructor(name: string, email: string, password: string, userType: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.userType = userType;
  }
}


