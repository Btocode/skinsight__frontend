export type Gender = "male" | "female" | "I do prefer not to say";
export type Region = {
  country: string;
  city: string;
};

export type AddPreferenceType = {
  brand: string;
  product: string;
};

export type ProductPreference = {
  id?: string;
  brandId: string;
  productId: string;
  productImage: string;
  reaction: string;
};

export type ProductState = {
  userSkinProfile: {
    gender: Gender | null;
    skinType: string | null;
    complexion: string | null;
    skinConcern: string[];
    age: string | null;
    region: Region | null;
  };
  findAlternatives: FindAlternativesState;
  preferences: ProductPreference[];
};

export type UserSkinProfileKey = keyof ProductState["userSkinProfile"];

export type UserSkinProfileValue =
  ProductState["userSkinProfile"][UserSkinProfileKey];

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
  id?: string;
  productImage: string;
  productTitle: string;
  brand: string;
  price: string;
  matched: boolean;
  most_viewed: boolean;
  best_rated: boolean;
};

export type RecommendationComponentProps = {
  value: UserSkinProfileValue;
  onChange: (key: UserSkinProfileKey, value: UserSkinProfileValue) => void;
};
