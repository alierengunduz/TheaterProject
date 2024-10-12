export interface ChildrenTheatreType {
  _id: string;
  name: string;
  description?: string;
  image: string[];
  detail?: string;
  createdAt: string;
  type?: string;
  category?: string;
  theaterId: string;
  age: string;
  time: string;
  eventtype: string;
}

export interface RegisterUserType {
  name: string;
  email: string;
  password: string;
}
export interface UserType {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
