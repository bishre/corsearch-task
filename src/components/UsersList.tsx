/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  .controller-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding: 2rem;

    .sort-menu {
      margin-right: 0.5rem;
    }
  }
  .users-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }

  .user-item {
    width: 100%;
    padding: 1rem;
    margin: 1rem;
    list-style: none;
    background-color: violet;
    color: white;
    border-radius: 0.8rem;
  }
  
  @media (min-width: 1024px) {
    .user-item {
      width: 42%;
    }
  }

  @media (min-width: 1440px) {
    .user-item {
      width: 28%;
    }
  }
`

interface User {
  name: string;
  email: string;
  phone: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("ASC");

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSearch((prev) => event.target.value);
  };

  useEffect(() => {
    const filteredItems = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  }, [search, users]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy((prev) => e.target.value);
  };

  const sortUsers = (users: User[], sortBy: string): User[] => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortBy === "name") {
        return orderBy === "ASC"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "email") {
        return orderBy === "ASC"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.name);
      }
      return 0;
    });
    return sortedUsers;
  };

  const sortedUsers = sortUsers(filteredUsers, sortBy);

  const handleToggle = () => {
    setOrderBy(orderBy === "ASC" ? "DESC" : "ASC");
  };

  return (
    <Wrapper>
      <div className="controller-container">
        <div>
          <span>Sort: </span>
          <select className="sort-menu" id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="" defaultChecked>
              None
            </option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
          {sortBy && (
            <button className="order-button" onClick={handleToggle}>
              {orderBy === "ASC" ? "Z>A" : "A>Z"}
            </button>
          )}
        </div>
        <div>
          <input 
            type="text"
            placeholder="search"
            value={search} onChange={handleInputChange} />
        </div>
      </div>
      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul className="users-list">
          {sortedUsers.map((user, i) => (
            <li key={i} className="user-item">
              <div className="card-item">
                <h2>{user.name}</h2>
                <h3>{user.email}</h3>
                <p>{user.phone}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

export default UsersList;
