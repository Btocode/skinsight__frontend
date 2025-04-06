export type Gender = "male" | "female" | "unknown";
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

// {
//   "quiz_id": "string",
//   "user_id": "string",
//   "gender": "male",
//   "skin_type": "combination",
//   "skin_complexion": "pale",
//   "concern_acne": true,
//   "concern_dark_spots": true,
//   "concern_pores": true,
//   "concern_wrinkles": true,
//   "concern_dullness": true,
//   "concern_dryness": true,
//   "concern_sensitive": true,
//   "age_group": "13-17",
//   "region": "string",
//   "creation_date": "2025-04-03T04:38:56.119Z"
// }

export type ProductState = {
  userSkinProfile: {
    age_group: string | null;
    gender: Gender | null;
    skin_type: string | null;
    skin_complexion: string | null;
    skin_concern: string[];
    region: string | null;
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

export type ProductType = {
  benefits: string;
  brand_name: string;
  brand_price_category: string;
  buy_links: string; // Consider using string[] if the links should be an array
  category: string;
  description: string;
  ingredients: string;
  popularity: number;
  product_id: string;
  product_name: string;
  rating: number;
  suitable_for: string; // Could be made into string[] of SkinType
  targets: string; // Could be made into string[] for specific skin concerns
  image_url?: string; // Optional image URL if needed
};

// First, define the query parameter type
export type GetProductsByBrandParams = {
  brand_name: string;
  partial_product_name?: string;
};
