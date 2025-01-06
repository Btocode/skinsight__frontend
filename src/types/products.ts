export type Gender = "male" | "female" | "I do prefer not to say";
export type Region = {
  country: string;
  city: string;
};

export type ProductState = {
  gender: Gender | null;
  skinType: string | null;
  complexion: string | null;
  skinConcern: string[];
  age: string | null;
  region: Region | null;
};

export type ProductStateKeyType = keyof ProductState;
export type ProductStateValueType = ProductState[ProductStateKeyType];

export type Complexion = {
  title: string;
  description: string;
  icon: string;
};
