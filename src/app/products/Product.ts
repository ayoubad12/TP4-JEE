export interface Product {
  id: string;
  name: string;
  price: number;
  checked: boolean;
}
export interface ProductApiResponse {
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Product[];
}
