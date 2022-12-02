import Role from "./permission";

interface User {
  userName: string;
  roleList: Role[];
}

export default User;