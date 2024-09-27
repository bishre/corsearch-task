export interface User {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
