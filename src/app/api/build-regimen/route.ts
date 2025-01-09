const products = [
  {
    productImage: "/regimen/img1.png",
    productTitle: "Glucoside Foaming Cleanser",
    desc: "Use a gentle face wash with glucoside for even skintone",
    brand: "The Ordinary",
    guide: "Step1",
  },
  {
    productImage: "/regimen/img2.png",
    productTitle: "Unseen Sunscreen SPF 40",
    desc: "Protect your skin with SPF 40 after drying your face",
    guide: "Step2",
    brand: "Supergoop",
  },
  {
    productImage: "/regimen/img3.png",
    productTitle: "Great Skin Firming Moisturizer",
    guide: "Step3",
    desc: "Use a moisturizer with peptide for your skin concerns",
    brand: "MERIT",
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return new Response(JSON.stringify(products));
}
