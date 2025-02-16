export type SelectedRegimen = {
  brandId: string;
  productId: string;
  productImage: string;
};
export type RegimenState = {
  productCount: string;
  personalRegimen: { [key: string]: SelectedRegimen } | Record<string, never>;
};

export type RegimenProduct = {
  productImage: string;
  productTitle: string;
  desc: string;
  brand: string;
  guide: string;
};
