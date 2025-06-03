import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Textarea,
} from "@heroui/react";

import { useCallback, useEffect, useState } from "react";
import { handleErrors } from "../../libs/handle-errors";
import { authAxios } from "../../serverUrl";
import { FarmerProduct } from ".";

interface ProductModalProps {
  isOpen: boolean;
  title: string;
  productId: number;
  onOpenChange: (isOpen: boolean) => void;
  onEditSuccess: (updatedProduct: FarmerProduct) => void;
}

interface ProductData {
  image?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

const EditProductModal = ({
  isOpen,
  onOpenChange,
  title,
  productId,
  onEditSuccess,
}: ProductModalProps) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [formData, setFormData] = useState<ProductData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    image: "",
  });
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
const fetchProduct = useCallback(async () => {
  try {
    setLoading(true);
    const response = await authAxios.get(`/products/${productId}/`);
    setProduct(response.data);
    setFormData({
      name: response.data.name,
      description: response.data.description,
      price: response.data.price,
      category: response.data.category,
      stock: response.data.stock,
      image: response.data.image || "",
    });
  } catch (error) {
    handleErrors(error);
  } finally {
    setLoading(false);
  }
}, [productId]);

useEffect(() => {
  if (isOpen && productId) {
    fetchProduct();
  } else {
    setProduct(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      image: "",
    });
  }
}, [fetchProduct, isOpen, productId]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await authAxios.put(
        `/products/${productId}/update/`,
        formData
      );
      console.log("Updated:", response.data);
      onOpenChange(false);
      onEditSuccess(response.data);
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="lg">
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {loading ? (
              <p>Loading...</p>
            ) : product ? (
              <>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                  className="mb-4"
                />
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="mb-4"
                />
                <Input
                  name="price"
                  type="number"
                  value={formData.price.toString()}
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="mb-4"
                  min={0}
                  step={0.01}
                />
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                  className="mb-4"
                />
                {/* <Input
                  name="stock"
                  type="number"
                  value={formData.stock.toString()}
                  onChange={handleInputChange}
                  placeholder="Stock"
                  className="mb-4"
                  min={0}
                /> */}
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: 200,
                      marginBottom: 20,
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </>
            ) : (
              <p>Loading product...</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              className="my-4"
              color="default"
              fullWidth
              radius="full"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className="my-4"
              color="primary"
              fullWidth
              radius="full"
              onClick={handleSubmit}
              disabled={loading}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default EditProductModal;
