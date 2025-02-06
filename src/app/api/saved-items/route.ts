const products = [
  {
    productImage: "/products/product1.png",
    brandName: "Glow Recipe",
    productTitle: "Watermelon Glow PHA+BHA Toner",
    price: "$$",
  },
  {
    productImage: "/products/product2.png",
    brandName: "The Ordinary",
    productTitle: "Niacinamide 10% + Zinc 1%",
    price: "$$$",
  },
  {
    productImage: "/products/product3.png",
    brandName: "La Roche-Posay",
    productTitle: "Effaclar Duo Acne Treatment",
    price: "$$$",
  },
  {
    productImage: "/products/product1.png",
    brandName: "CeraVe",
    productTitle: "Hydrating Facial Cleanser",
    price: "$$$",
  },
  {
    productImage: "/products/product2.png",
    brandName: "Paula's Choice",
    productTitle: "Skin Perfecting 2% BHA Liquid Exfoliant",
    price: "$$$",
  },
  {
    productImage: "/products/product3.png",
    brandName: "Neutrogena",
    productTitle: "Hydro Boost Water Gel",
    price: "$$$",
  },
  {
    productImage: "/products/product1.png",
    brandName: "Bioderma",
    productTitle: "Sensibio H2O Micellar Water",
    price: "$$$",
  },
  {
    productImage: "/products/product2.png",
    brandName: "First Aid Beauty",
    productTitle: "Ultra Repair Cream",
    price: "$$$",
  },
  {
    productImage: "/products/product3.png",
    brandName: "Sunday Riley",
    productTitle: "Good Genes All-In-One Lactic Acid Treatment",
    price: "$$$",
  },
  {
    productImage: "/products/product1.png",
    brandName: "Drunk Elephant",
    productTitle: "C-Firma Fresh Day Serum",
    price: "$$$",
  },
  {
    productImage: "/products/product2.png",
    brandName: "Eucerin",
    productTitle: "Advanced Repair Lotion",
    price: "$$$",
  },
  {
    productImage: "/products/product3.png",
    brandName: "Clinique",
    productTitle: "Dramatically Different Moisturizing Gel",
    price: "$$$",
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return new Response(JSON.stringify(products));
}
