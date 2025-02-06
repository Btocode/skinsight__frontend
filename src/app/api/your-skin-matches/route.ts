import { Product } from "@/types/products";

const products: Product[][] = [
  [
    {
      productImage: "/products/product1.png",
      productTitle: "Sensibio H2O Micellar Water",
      brand: "Sensibio",
      price: "$$",
      matched: true,
      most_viewed: true,
      best_rated: false,
    },
    {
      productImage: "/products/product2.png",
      productTitle: "Ultra Repair Cream",
      brand: "La Roche-Posay",
      price: "$$",
      most_viewed: false,
      best_rated: true,
      matched: false,
    },
    {
      productImage: "/products/product3.png",
      productTitle: "Good Genes All-In-One Lactic Acid Treatment",
      brand: "Good Genes",
      price: "$$",
      most_viewed: false,
      best_rated: false,
      matched: false,
    },
  ],
  [
    {
      productImage: "/products/product1.png",
      productTitle: "C-Firma Fresh Day Serum",
      brand: "C-Firma",
      price: "$$",
      best_rated: true,
      matched: true,
      most_viewed: false,
    },
    {
      productImage: "/products/product1.png",
      productTitle: "Sensibio H2O Micellar Water",
      brand: "Sensibio",
      price: "$$",
      most_viewed: false,
      best_rated: false,
      matched: false,
    },
    {
      productImage: "/products/product2.png",
      productTitle: "Ultra Repair Cream",
      brand: "La Roche-Posay",
      price: "$$",
      matched: false,
      best_rated: true,
      most_viewed: false,
    },
  ],
  [
    {
      productImage: "/products/product1.png",
      productTitle: "Sensibio H2O Micellar Water",
      brand: "Sensibio",
      price: "$$",
      most_viewed: true,
      best_rated: true,
      matched: false,
    },
    {
      productImage: "/products/product2.png",
      productTitle: "Ultra Repair Cream",
      brand: "La Roche-Posay",
      price: "$$",
      most_viewed: false,
      best_rated: true,
      matched: false,
    },
    {
      productImage: "/products/product3.png",
      productTitle: "Good Genes All-In-One Lactic Acid Treatment",
      brand: "Good Genes",
      price: "$$",
      most_viewed: false,
      best_rated: false,
      matched: false,
    },
  ],
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return new Response(JSON.stringify(products));
}
