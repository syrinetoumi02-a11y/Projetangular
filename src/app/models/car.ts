export interface Comment {
  author: string;
  message: string;
  date: Date;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  available: boolean;
  releaseDate: Date;
  description: string;

  specifications: {
    engine: string;
    horsepower: number;
    transmission: string;
    fuel: string;
  };

  comments: Comment[];
}
