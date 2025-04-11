"use client";

import { Product } from "@/types/products";
import { MatchesProductCard } from "./MatchesProductCard";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductsByCategoryProps {
  products: Product[];
  categoryName: string;
  categoryId: string;
}

const ProductsByCategory = ({ products, categoryName, categoryId }: ProductsByCategoryProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [duplicatedProducts, setDuplicatedProducts] = useState<Product[]>([]);

//   {
//     "product": {
//         "product_id": "p473133",
//         "product_name": "Fruit-Tox Resurfacing Facial Remedy",
//         "brand_name": "Naturally Serious",
//         "brand_price_category": "Mid-Range",
//         "source": null,
//         "category": "physical_scrub",
//         "image_link": null,
//         "buy_links": [
//             "https://www.sephora.com/product/naturally-serious-fruit-tox-resurfacing-facial-remedy-P473133?skuId=2480812&icid2=products%20grid:p473133:product"
//         ],
//         "description": "This detoxifying facial peel utilizes a powerful blend of red clay, volcanic pumice, and fruit AHAs to deeply cleanse, exfoliate, and brighten your skin. The formula physically removes dead skin cells with volcanic pumice while simultaneously providing chemical exfoliation with fruit AHAs, revealing a smoother, more luminous complexion.  Perfect for those seeking a revitalizing boost and a visibly brighter appearance. Use 2-3 times per week as part of your regular skincare routine.",
//         "ingredients": "Water/Aqua/Eau, Kaolin, Glycerin, C9-12 Alkane, Hydrated Silica, Caprylic/Capric Triglyceride, Butyrospermum Parkii (Shea) Butter, Pumice, Glyceryl Stearate SE, Vaccinium Myrtillus Fruit/Leaf Extract, Cetearyl Alcohol, Magnesium Aluminum Silicate, Propanediol, Stearic Acid, Pentylene Glycol, Saccharium Officinarum (Sugarcane) Extract, Volcanic Sand, Citrus Aurantium Dulcis (Orange) Fruit Extract, Citrus Limon (Lemon) Fruit Extract, Acer Saccharum (Sugar Maple) Extract, Aspalathus Linearis Leaf Extract, Lycium Barbarum Fruit Extract, Punica Granatum Extract, Vitis Vinifera (Grape) Seed Extract, Leuconostoc/Radish Root Ferment FiltratE, Camellia Sinensis Leaf Extract, Colloidal Oatmeal, Ceramide NP, Palmitic Acid, Cetearyl Olivate, Cetearyl Glucoside, Sorbitan Olivate, Allantoin, Sodium PCA, Coco-Caprylate/Caprate, Phenethyl Alcohol, Sodium Phytate, Sodium Hyaluronate, Linoleic Acid, Lecithin, Phytosteryl Canola Glycerides, Oleic Acid, Tocopherol, Triolein, Limonene, Titanium Dioxide (CI 77891), Zinc Oxide (CI 77947)",
//         "benefits": "This facial peel offers a dual-action approach to skin rejuvenation. It effectively removes dirt, oil, and impurities through physical exfoliation with volcanic pumice and provides chemical exfoliation with fruit AHAs, resulting in a smoother, brighter, and more even-toned complexion. It’s formulated with vegan and cruelty-free ingredients and comes in recyclable packaging.",
//         "targets": "Pores, Dullness, and Uneven Texture",
//         "suitable_for": "Normal, Dry, Combination, and Oily",
//         "rating": 4.833333333333333,
//         "popularity": 6
//     },
//     "labels": []
// },

  const productInfoList: Product[] = []
  products.forEach(product => {
    productInfoList.push({
      productImage: product.product.image_link || "/noproductpreview.png",
      productTitle: product.product.product_name,
      brand: product.product.brand_name,
      price: product.product.brand_price_category === "Mid-Range" ? "$" : product.product.brand_price_category === "High-End" ? "$$" : "$$",
      matched: product.product.matched,
      most_viewed: product.product.most_viewed,
      best_rated: product.product.best_rated,
      product_id: product.product.product_id,
      buy_links: product.product.buy_links,
      description: product.product.description,
      ingredients: product.product.ingredients,
      benefits: product.product.benefits,
      targets: product.product.targets,
      suitable_for: product.product.suitable_for,
      rating: product.product.rating,
      popularity: product.product.popularity,
    })
  })

  useEffect(() => {
    // Duplicate the products array three times for smooth infinite scroll
    setDuplicatedProducts([...productInfoList, ...productInfoList, ...productInfoList]);
  }, [products]);

  useEffect(() => {
    if (sliderRef.current) {
      // Set the initial scroll position to the middle of the duplicated content
      const container = sliderRef.current;
      container.scrollLeft = container.scrollWidth / 3;
    }
  }, [duplicatedProducts]); // Run this effect once duplicated products are set

  const handleScroll = () => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      if (container.scrollLeft === 0) {
        container.scrollLeft = container.scrollWidth / 3;
      } else if (container.scrollLeft >= (container.scrollWidth * 2) / 3) {
        container.scrollLeft = container.scrollWidth / 3;
      }
    }
  };

  const slide = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 0;
      const scrollAmount = cardWidth + 20; // Adjust for gap between cards

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // If no products, don't render the section
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section id={categoryId} className="mt-[27px] lg:mt-[46px] relative">
      <div className="flex items-center justify-between mb-[17px] lg:mb-[48px] px-4 lg:px-[40px]">
        <h4 className="text-base lg:text-2xl font-semibold leading-[19.04px] lg:leading-[26px] tracking-[-0.02em] lg:tracking-normal text-accent">
          {/* capitalize the first letter of each word */}
          {categoryName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </h4>
      </div>

      <div className="px-4 lg:px-[40px] relative">
        <button
          onClick={() => slide("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex overflow-x-scroll snap-x snap-mandatory gap-4 lg:gap-[40px] no-scrollbar"
        >
          {duplicatedProducts.map((item, index) => (
            <div
              key={index}
              className="flex-none w-[85%] md:w-[calc(33.33%-27px)] snap-center"
            >
              <MatchesProductCard item={item} />
            </div>
          ))}
        </div>

        <button
          onClick={() => slide("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default ProductsByCategory;