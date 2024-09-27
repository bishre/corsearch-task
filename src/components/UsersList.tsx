/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import usersService from "../services/users";
import utils from "../utils";
import styled from "styled-components";
import Address from "./Address";


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
    background-color: #31572c;
    color: white;
    border-radius: 0.8rem;
    text-align: center;

    h2 {
      margin-top: 0;
    }

    h3 {
      margin: 0.5rem;
    }

    p {
      margin: 0;
    }
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
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("ASC");

  useEffect(() => {
    const getUsersList = async () => {
      const users = await usersService.getUsers();
      setUsers(users)
    }
    void getUsersList()
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

  const sortedUsers = utils.sortUsers(filteredUsers, sortBy, orderBy);

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
              {orderBy === "ASC" ? "Z > A" : "A > Z"}
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
                <p>{user.website}</p>
              </div>
              <Address {...user.address}/>
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

export default UsersList;
