import { User } from "../types";

const sortUsers = (users: User[], sortBy: string, order: string): User[] => {
  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === "name") {
      return order === "ASC"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "email") {
      return order === "ASC"
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    }
    return 0;
  });
  return sortedUsers;
};

export default {
  sortUsers
}