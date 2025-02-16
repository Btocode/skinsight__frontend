import ReviewProductCard from "../_components/ReviewProductCard";

export type ReviewProduct = {
  productImage: string;
  productTitle: string;
};

const getMyReviews = async (): Promise<ReviewProduct[]> => {
  const response = await fetch("http://localhost:3000/api/my-reviews");
  return response.json();
};

const MyReviewsPage = async () => {
  const reviews = await getMyReviews();
  return reviews.length == 0 ? (
    <div className="flex items-center justify-center min-h-[40svh]">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-semibold text-accent">
          You don’t have any reviews yet
        </h2>
        <p className="text-lg font-normal text-accent">
          Click on the button below to get started
        </p>
        <button className="border border-[#8599FE33] py-3 px-8 rounded-lg  text-blue-400 flex items-center gap-4 mt-2">
          <svg width="41" height="40" viewBox="0 0 41 40" fill="none">
            <path
              d="M12.1667 20H20.5M20.5 20H28.8333M20.5 20V28.3333M20.5 20V11.6667M20.5 38.75C10.1447 38.75 1.75 30.3553 1.75 20C1.75 9.64466 10.1447 1.25 20.5 1.25C30.8553 1.25 39.25 9.64466 39.25 20C39.25 30.3553 30.8553 38.75 20.5 38.75Z"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth={2}
            />
          </svg>

          <span>Write a new review</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold text-[#2C2C2C] mb-4">Your Reviews</h3>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 pt-4 pb-8">
        {reviews.map((item, index) => (
          <ReviewProductCard key={index} item={item} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button className="border-2 border-dashed  border-[#8599FE33] py-3 px-8 rounded-lg  text-blue-400 flex items-center gap-4 mt-4">
          <svg width="41" height="40" viewBox="0 0 41 40" fill="none">
            <path
              d="M12.1667 20H20.5M20.5 20H28.8333M20.5 20V28.3333M20.5 20V11.6667M20.5 38.75C10.1447 38.75 1.75 30.3553 1.75 20C1.75 9.64466 10.1447 1.25 20.5 1.25C30.8553 1.25 39.25 9.64466 39.25 20C39.25 30.3553 30.8553 38.75 20.5 38.75Z"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth={2}
            />
          </svg>

          <span className="text-lg font-medium text-[#8599FE]">
            Write a new review
          </span>
        </button>
      </div>
    </div>
  );
};

export default MyReviewsPage;
