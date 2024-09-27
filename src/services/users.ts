import axios from "axios";

import { apiBaseUrl } from "../constants";
import { User } from "../types";

const getUsers = async () => {
  const { data } = await axios.get<User[]>(
    `${apiBaseUrl}/users`
  )
  return data;
}

export default {
  getUsers
}