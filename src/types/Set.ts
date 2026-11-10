// export interface Set {
//   id: string;
//   title: string;
//   description?: string;
//   imageUrl?: string;
//   category?: string;
//   pieces?: number;
//   minifigs?: number;
//   price?: number;
//   weight?: number | null;
//   theme?: string;
// }

export interface Set {
  id: string;
  title: string;
  pieces: number;
  minifigs: number;
  imageUrl: string;
  price: number;
  weight: number;
  theme?: string;
  description?: string;
}
