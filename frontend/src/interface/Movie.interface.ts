export interface Movie {
  _id: string;
  name: string;
  description: string;
  image: string;
  genre: string;
  director: {
    name: string;
    _id: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
