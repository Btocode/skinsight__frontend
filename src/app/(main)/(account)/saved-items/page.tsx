import { ProductCard } from "../_components/ProductCard";

export type Product = {
  productImage: string;
  brandName: string;
  productTitle: string;
  price: string;
};

const getSavedItems = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:3000/api/saved-items");
  return response.json();
};

const SavedItemsPage = async () => {
  const products = await getSavedItems();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 pb-8">
      {products.map((item, index) => (
        <ProductCard key={index} item={item} />
      ))}
    </div>
  );
};

export default SavedItemsPage;