import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import { Combobox } from "@/components/common/Combobox";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Modal from "@/components/common/Modal";

type AddProductProps = {
  open: boolean;
  onClose: () => void;
};

const AddProduct = ({ open, onClose }: AddProductProps) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <div className="max-w-2xl flex items-center justify-center min-h-[450px] gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <BackButton buttonProps={{ className: "self-start" }} />
            <HeadingPrimary className="lg:text-4xl">
              Select a product you currently use
            </HeadingPrimary>
          </div>
          <Combobox
            options={[
              { label: "Brand 1", value: "brand1" },
              { label: "Brand 2", value: "brand2" },
              { label: "Brand 3", value: "brand3" },
              { label: "Brand 4", value: "brand4" },
              { label: "Brand 5", value: "brand5" },
            ]}
            placeholder="Select brand"
            className="max-w-full"
          />
          <Combobox
            options={[
              { label: "Product 1", value: "product1" },
              { label: "Product 2", value: "product2" },
              { label: "Product 3", value: "product3" },
              { label: "Product 4", value: "product4" },
            ]}
            placeholder="Select product"
            className="max-w-full"
          />
          <div className="flex items-center gap-4">
            <Button className="px-8">Next</Button>
            <Button onClick={onClose} className="px-8" variant="outline">
              Cancel
            </Button>
          </div>
        </div>
        <div className="w-[200px] h-[260px] border border-primary flex items-center justify-center rounded-xl mt-4 cursor-pointer">
          <span className="inline-block text-4xl text-primary">+</span>
        </div>
      </div>
    </Modal>
  );
};

export default AddProduct;
