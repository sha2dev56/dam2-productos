export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  image: string;
  username: string;
  company: {
    name: string;
    title: string;
  };
}