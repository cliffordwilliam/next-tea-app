export interface Tea {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type TeaResponse = Tea[];
