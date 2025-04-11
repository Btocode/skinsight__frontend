import { GetProductsByBrandParams, ProductType } from "@/types/products";
import { baseApi } from "../redux/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makeRecommendation: builder.mutation({
      query: (userSkinProfile) => ({
        url: "/recommendations/make",
        method: "POST",
        body: userSkinProfile,
      }),
    }),
    getRecommendationById: builder.mutation({
      query: ({ id, sort_by }) => ({
        url: `/recommendations/get/${id}`,
        method: "POST",
        params: { sort_by },
      }),
    }),
    getMyRecommendations: builder.query({
      query: () => ({
        url: "/recommendations/me",
        method: "GET",
      }),
    }),
    getRecommendationByUserId: builder.query({
      query: (userId) => ({
        url: `/recommendations/get/${userId}`,
        method: "GET",
      }),
    }),
    getProductsBrands: builder.query<string[], void>({
      query: () => ({
        url: "/products/brands",
        method: "GET",
        cache: "reload",
      }),
    }),
    getProductsByBrand: builder.query<ProductType[], GetProductsByBrandParams>({
      query: ({ brand_name, partial_product_name }) => {
        const params = new URLSearchParams();
        if (brand_name) params.append("brand_name", brand_name);
        if (partial_product_name)
          params.append("partial_product_name", partial_product_name);
        return {
          url: `/products/?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getProductById: builder.query<ProductType, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useMakeRecommendationMutation,
  useGetRecommendationByIdMutation,
  useGetMyRecommendationsQuery,
  useGetRecommendationByUserIdQuery,
  useGetProductsBrandsQuery,
  useGetProductsByBrandQuery,
  useGetProductByIdQuery,
} = productApi;
