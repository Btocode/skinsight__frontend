"use client"
import { notFound } from "next/navigation";
import MatchesProductFilter from "./_components/MatchesProductFilter";
import MatchesProductHeader from "./_components/MatchesProductHeader";
import TonersProducts from "./_components/TonersProducts";
import CleansersProducts from "./_components/CleansersProducts";
import MoisturisersProducts from "./_components/MoisturisersProducts";
import Advertisement from "@/components/common/Advertisement";
import GradientImage from "@/components/common/GradientImage";
import AddFavorite from "./_components/AddFavorite";
import Button from "@/components/common/Button";
import Link from "next/link";
import { useGetRecommendationByIdMutation } from "@/lib/services/productApi";
import { useEffect, useState } from "react";
import ProductsByCategory from "./_components/ProuctsByCategory";
import Loading from "./loading";
import { removeStorageItem } from "@/utils/storage";

const YourSkinMatchesPage = () => {
  const [getRecommendation, { isLoading: isLoadingRecommendation }] =
    useGetRecommendationByIdMutation();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const quizId = localStorage.getItem('quizId');

        if (!quizId) {
          return;
        }

        const response = await getRecommendation({
          id: quizId,
          sort_by: 'best_rated'
        }).unwrap();

        setProducts(response?.recommended_products);
      } catch (err) {
        console.log("Failed to fetch recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [getRecommendation]);

  // Handle empty products array
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="container py-10">Error loading products: {error}</div>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-xl font-semibold text-accent">
          No product recommendations found
        </h2>
        <Link href="/find-products/gender" className="mt-4 inline-block">
          <Button className="h-[40px] px-4">Take Skin Quiz</Button>
        </Link>
      </div>
    );
  }

  const categorizedProducts = {
    Cleansing: [
        "cleansing_gel_foam",
        "cleansing_oil_balm",
        "micellar_water"
    ],
    Hydration_And_Moisturiser: [
        "moisturiser"
    ],
    Sunscreens: [
        "chemical_sunscreen",
        "physical_sunscreen"
    ],
    Treatment: [
        "serum",
        "toner"
    ],
    Exfoliation: [
        "physical_scrub",
        "chemical_exfoliator",
        "enzyme_peel"
    ],
    EyeCare: [
        "eye_care"
    ],
    LipCare: [
        "lip_care"
    ],
    Masks: [
        "mask"
    ],
};

  if (products?.length === 0) {
    notFound();
  }

  // Initialize an object to hold categorized products with subcategories
  const productsByCategory = {
    Cleansing: {
      all: [],
      cleansing_gel_foam: [],
      cleansing_oil_balm: [],
      micellar_water: []
    },
    Hydration_And_Moisturiser: {
      all: [],
      moisturiser: []
    },
    Sunscreens: {
      all: [],
      chemical_sunscreen: [],
      physical_sunscreen: []
    },
    Treatment: {
      all: [],
      serum: [],
      toner: []
    },
    Exfoliation: {
      all: [],
      physical_scrub: [],
      chemical_exfoliator: [],
      enzyme_peel: []
    },
    Masks: {
      all: [],
      mask: []
    },
    EyeCare: {
      all: [],
      eye_care: []
    },
    LipCare: {
      all: [],
      lip_care: []
    }
  };

  // Initialize productsBySubCategory with all possible subcategories
  const productsBySubCategory = {
    cleansing_gel_foam: [],
    cleansing_oil_balm: [],
    micellar_water: [],
    moisturiser: [],
    chemical_sunscreen: [],
    physical_sunscreen: [],
    serum: [],
    toner: [],
    physical_scrub: [],
    chemical_exfoliator: [],
    enzyme_peel: [],
    mask: [],
    eye_care: [],
    lip_care: []
  };

  // Categorize products based on existing categories
  products.forEach(item => {
    // Check if the product and its category exist
    if (item && item.product && item.product.category) {
      const category = item.product.category;

      // Check each predefined category and add the product to the corresponding array
      for (const [parentCategory, subcategories] of Object.entries(categorizedProducts)) {
        if (subcategories.includes(category)) {
          // Add to parent category's "all" array
          productsByCategory[parentCategory].all.push(item);

          // Add to specific subcategory array
          productsByCategory[parentCategory][category].push(item);

          break; // Exit the loop once the product is categorized
        }
      }
    }
  });

  // Categorize products based on subcategories
  products.forEach(item => {
    if (item && item.product && item.product.category) {
      const category = item.product.category;

      // Use category as subcategory since that's what we have
      if (productsBySubCategory[category]) {
        productsBySubCategory[category].push(item);
      } else {
        console.log(`Unknown category: ${category}`);
      }
    }
  });

  const handleReviewClick = () => {
    console.log("Review button clicked");
    removeStorageItem('hasClosedFavoriteModal');
    setShowModal(true);

  };

  return (
    <div className="container relative mt-4 lg:mt-[40px]">
      <MatchesProductHeader />
      <div className="flex items-center justify-between mt-[30px] lg:mt-[54px]">
        <h4 className="text-base lg:text-2xl font-semibold leading-[19.04px] lg:leading-[26px] tracking-[-0.02em] lg:tracking-normal text-accent">
          Top products for you
        </h4>
        <div className="flex items-center gap-4">
          {/* Review button */}
          <Button
            className="h-[40px] px-4"
            variant="outline"
            onClick={() => {
              handleReviewClick();
            }}
          >
            Review
          </Button>

          {/* Filter button */}
          <MatchesProductFilter
            productsByCategory={productsByCategory}
            categories={categorizedProducts}
            productsBySubcategory={productsBySubCategory}
          />

          {/* Retake button */}
          <Link href={"/find-products/gender"}>
            <Button
              icon={
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 14H1.5V19M10.5 6H15.5V1M1.08301 7.0034C1.64369 5.61566 2.58244 4.41304 3.79255 3.53223C5.00266 2.65141 6.43686 2.12752 7.92975 2.02051C9.42265 1.9135 10.9147 2.2274 12.2381 2.92661C13.5615 3.62582 14.6612 4.68254 15.4141 5.97612M15.9176 12.9971C15.3569 14.3848 14.4181 15.5874 13.208 16.4682C11.9979 17.3491 10.5652 17.8723 9.07227 17.9793C7.57937 18.0863 6.08606 17.7725 4.7627 17.0732C3.43933 16.374 2.33882 15.3175 1.58594 14.0239"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-white"
                  />
                </svg>
              }
              className="h-[40px] px-4"
            >
              Retake
            </Button>
          </Link>
        </div>
      </div>

      {Object.entries(productsBySubCategory).map(([category, products]) => (
        <ProductsByCategory
          key={category}
          products={products}
          categoryName={category.split('_').join(' ')}
          categoryId={category}
        />
      ))}

      <GradientImage secondImage={{ className: "lg:-right-52" }} />
      <AddFavorite showModal={showModal} setShowModal={setShowModal}/>
    </div>
  );
};

export default YourSkinMatchesPage;
