"use client";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const AddFavorite = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const onClose = useCallback(() => setOpen(false), []);

  const onConfirm = () => {
    router.push("/find-products/add-preference");
    onClose();
  };

  // Reset modal state on mount and clear localStorage
  useEffect(() => {
    localStorage.removeItem('hasShownFavoriteModal');
    setOpen(false);
  }, []);

  // Show modal once after 4 seconds if not previously closed
  useEffect(() => {
    const hasShownModal = localStorage.getItem('hasShownFavoriteModal');
    if (!hasShownModal) {
      const timer = setTimeout(() => {
        setOpen(true);
        localStorage.setItem('hasShownFavoriteModal', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Modal isOpen={open} onClose={onClose}>
        <div className="bg-white rounded-3xl  max-w-[440px] w-full mx-auto py-8 lg:p-8 relative">
          {/* User Icon */}
          <div className="flex justify-center mb-2">
            <svg
              width="48"
              height="49"
              viewBox="0 0 48 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_596_11436)">
                <rect
                  width="48"
                  height="48"
                  transform="translate(0 0.5)"
                  fill="white"
                />
                <path
                  d="M24.0243 25.1285C23.1046 25.1285 22.2552 24.89 21.4762 24.413C20.7079 23.9361 20.0911 23.2984 19.6259 22.5C19.1714 21.7016 18.9442 20.8047 18.9442 19.8093C18.9334 18.8347 19.1606 17.9482 19.6259 17.1498C20.0911 16.3514 20.7079 15.7189 21.4762 15.2523C22.2552 14.7857 23.1046 14.5524 24.0243 14.5524C24.9333 14.5524 25.7718 14.7857 26.5401 15.2523C27.3083 15.7085 27.9251 16.3306 28.3904 17.1187C28.8665 17.9067 29.1045 18.7932 29.1045 19.7782C29.1045 20.784 28.8665 21.6912 28.3904 22.5C27.9251 23.2984 27.3083 23.9361 26.5401 24.413C25.7718 24.89 24.9333 25.1285 24.0243 25.1285ZM15.8766 36C15.1517 36 14.5782 35.8393 14.1562 35.5179C13.745 35.2068 13.5394 34.7713 13.5394 34.2114C13.5394 33.4338 13.7829 32.625 14.2698 31.7851C14.7567 30.9349 15.4546 30.1417 16.3635 29.4055C17.2833 28.659 18.3869 28.0576 19.6746 27.6014C20.9622 27.1348 22.4121 26.9015 24.0243 26.9015C25.6149 26.9015 27.054 27.1348 28.3417 27.6014C29.6401 28.0576 30.7438 28.659 31.6527 29.4055C32.5616 30.1417 33.2595 30.9349 33.7464 31.7851C34.2334 32.625 34.4768 33.4338 34.4768 34.2114C34.4768 34.7713 34.2658 35.2068 33.8438 35.5179C33.4218 35.8393 32.8484 36 32.1234 36H15.8766ZM1.05813 35.72C0.625317 35.72 0.257425 35.5749 -0.0455449 35.2846C-0.348515 35.0046 -0.5 34.6521 -0.5 34.227C-0.5 31.4482 -0.0888263 28.8041 0.733521 26.2949C1.56669 23.7753 2.72988 21.4631 4.22309 19.3583C5.72712 17.2535 7.50166 15.4286 9.5467 13.8836C11.5918 12.3283 13.8316 11.1256 16.2661 10.2753C18.7115 9.42512 21.2868 9 23.9919 9C26.6862 9 29.256 9.42512 31.7014 10.2753C34.1468 11.1256 36.392 12.3283 38.4371 13.8836C40.4821 15.4286 42.2567 17.2535 43.7607 19.3583C45.2647 21.4631 46.4279 23.7753 47.2502 26.2949C48.0834 28.8041 48.5 31.4482 48.5 34.227C48.5 34.6521 48.3431 35.0046 48.0293 35.2846C47.7263 35.5749 47.353 35.72 46.9094 35.72C46.4874 35.72 46.1249 35.5749 45.822 35.2846C45.5298 35.0046 45.3837 34.6521 45.3837 34.227C45.3837 31.7696 45.0213 29.4315 44.2963 27.2126C43.5713 24.9937 42.5542 22.9614 41.2449 21.1158C39.9357 19.2598 38.3884 17.6526 36.603 16.2944C34.8177 14.9257 32.8592 13.8681 30.7276 13.1215C28.5959 12.3646 26.3507 11.9862 23.9919 11.9862C21.633 11.9862 19.3824 12.3646 17.24 13.1215C15.1084 13.8681 13.1499 14.9257 11.3645 16.2944C9.58999 17.6526 8.04808 19.2598 6.73882 21.1158C5.42956 22.9614 4.41244 24.9937 3.68748 27.2126C2.97334 29.4315 2.61626 31.7696 2.61626 34.227C2.61626 34.6521 2.46478 35.0046 2.16181 35.2846C1.85884 35.5749 1.49095 35.72 1.05813 35.72ZM8.5891 35.72C8.16711 35.72 7.80463 35.5749 7.50166 35.2846C7.19869 35.0046 7.0472 34.6573 7.0472 34.2425C7.0472 32.0132 7.44755 29.8929 8.24826 27.8813C9.05979 25.8698 10.1959 24.0709 11.6567 22.4844C13.1282 20.898 14.8379 19.6382 16.7855 18.7051C16.6773 19.265 16.634 19.8249 16.6557 20.3848C16.6881 20.9343 16.7963 21.4891 16.9803 22.049C15.5953 22.8992 14.3888 23.9568 13.3609 25.2218C12.3438 26.4764 11.5593 27.871 11.0075 29.4055C10.4556 30.9401 10.1797 32.5524 10.1797 34.2425C10.1797 34.6573 10.0228 35.0046 9.70901 35.2846C9.39522 35.5749 9.02192 35.72 8.5891 35.72ZM39.3947 35.72C38.9727 35.72 38.6048 35.5749 38.291 35.2846C37.9772 35.0046 37.8203 34.6573 37.8203 34.2425C37.8203 32.5628 37.5444 30.9556 36.9925 29.4211C36.4407 27.8865 35.6562 26.4919 34.6391 25.2373C33.6328 23.9724 32.4372 22.9147 31.0522 22.0645C31.2253 21.515 31.3281 20.9603 31.3605 20.4003C31.393 19.8301 31.3605 19.2753 31.2632 18.7362C33.2108 19.6797 34.9096 20.9395 36.3596 22.5156C37.8203 24.0916 38.951 25.8854 39.7517 27.8969C40.5633 29.9084 40.969 32.0236 40.969 34.2425C40.969 34.6573 40.8121 35.0046 40.4983 35.2846C40.1954 35.5749 39.8275 35.72 39.3947 35.72Z"
                  fill="#E77CCF"
                />
              </g>
              <defs>
                <clipPath id="clip0_596_11436">
                  <rect
                    width="48"
                    height="48"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Content */}
          <div className="text-center space-y-2">
            <h2 className="text-lg lg:text-2xl font-semibold leading-[26px] lg:leading-[32px] tracking-[-0.03em] text-center text-accent">
              Would you like to add your favorite products now and match with
              hundreds of skintwins?
            </h2>
            <p className="text-base font-normal leading-[24px] tracking-[-0.03em] text-center text-accent">
              Add your product preferences and get more accurate results. You
              can also see how popular these products are with your skintwins.
            </p>
            {/* Buttons */}
            <div className="flex  gap-4 justify-center pt-4">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm();
                }}
              >
                Yes, Let&apos;s go
              </Button>
              <Button variant={"outline"} onClick={onClose}>
                No, thanks
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddFavorite;
