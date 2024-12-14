const reviews = [
  {
    productImage: "/products/product1.png",
    productTitle: "Sensibio H2O Micellar Water",
  },
  {
    productImage: "/products/product2.png",
    productTitle: "Ultra Repair Cream",
  },
  {
    productImage: "/products/product3.png",
    productTitle: "Good Genes All-In-One Lactic Acid Treatment",
  },
  {
    productImage: "/products/product1.png",
    productTitle: "C-Firma Fresh Day Serum",
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return new Response(JSON.stringify(reviews));
}
