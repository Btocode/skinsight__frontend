import { FindAlternativesProduct } from "@/types/alternatives";

const products: FindAlternativesProduct[] = [
  {
    productImage: "/find-alternatives/img1.png",
    productTitle: "Bio-lifting cream",
    brand: "CHANTECAILLE",
    price: "$$$",
    matched: true,
    popular: true,
    best_rated: false,
  },
  {
    productImage: "/find-alternatives/img2.png",
    productTitle: "Intensive Age Defying Hydrating Cream",
    brand: "June Jacobs",
    price: "$$$",
    popular: false,
    best_rated: true,
    matched: false,
  },
  {
    productImage: "/find-alternatives/img3.png",
    productTitle: "Collagenesis 24 hr Youth Preservation",
    brand: "SKINN",
    price: "$$$",
    popular: false,
    best_rated: false,
    matched: false,
  },
  {
    productImage: "/find-alternatives/img4.png",
    productTitle: "Protini Polypeptide Cream",
    brand: "Drunk Elephant",
    price: "$$$",
    popular: false,
    best_rated: false,
    matched: false,
  },
  {
    productImage: "/find-alternatives/img5.png",
    productTitle: "Hydroboost Water Gel",
    brand: "Neutrogena",
    price: "$$$",
    popular: false,
    best_rated: false,
    matched: false,
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return new Response(JSON.stringify(products));
}
