export type Gender = "male" | "female" | "I do prefer not to say";
export type Region = {
  country: string;
  city: string;
};

export type AddPreferenceType = {
  brand: string;
  product: string;
};

export type ProductState = {
  gender: Gender | null;
  skinType: string | null;
  complexion: string | null;
  skinConcern: string[];
  age: string | null;
  region: Region | null;
  findAlternatives: FindAlternativesState;
};

export type ProductStateKeyType = keyof ProductState;
export type ProductStateValueType = ProductState[ProductStateKeyType];

export type Complexion = {
  title: string;
  description: string;
  icon: string;
};

export type FindAlternativesState = {
  brand: string;
  product: string;
};

export type Product = {
  productImage: string;
  productTitle: string;
  brand: string;
  price: string;
  matched: boolean;
  most_viewed: boolean;
  best_rated: boolean;
};
