import { Button, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import AddProductModal from "./product-modal";

const FarmersPageView = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="h-dvh">
      <div className="container">
        <div className="py-3">
          {" "}
          <Button
            radius="full"
            color="primary"
            endContent={<Icon icon="ic:baseline-plus" fontSize={20} />}
            onPress={onOpen}
          >
            Add Product
          </Button>
          <AddProductModal
            title="Post Your Produce"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        </div>
      </div>
    </section>
  );
};

export default FarmersPageView;
