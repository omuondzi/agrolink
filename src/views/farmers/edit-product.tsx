import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";

import React, { useCallback, useEffect, useState, ChangeEvent } from "react";
import { handleErrors } from "../../libs/handle-errors";
import { authAxios } from "../../serverUrl";
import { Product as FarmerProduct } from "./AddProductModal"; // Re-using the Product interface from AddProductModal

interface ProductModalProps {
  isOpen: boolean;
  title: string;
  productId: number;
  onOpenChange: (isOpen: boolean) => void;
  onEditSuccess: (updatedProduct: FarmerProduct) => void;
}

// Updated ProductData interface to handle File objects for image updates
interface ProductData {
  image?: File | string | null; // Can be a File, a URL string, or null
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

// Helper for category options (re-using from AddProductModal)
export const animals = [
  { key: 'vegetable', label: 'Vegetable' },
  { key: 'fruit', label: 'Fruit' },
  { key: 'dairy', label: 'Dairy' },
  { key: 'grain', label: 'Grain' },
];


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
    image: "", // Initial state for image, will be overwritten by fetched data
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductData, string>>>({}); // State for validation errors

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authAxios.get<FarmerProduct>(`/products/${productId}/`);
      setProduct(response.data);
      setFormData({
        name: response.data.name,
        description: response.data.description,
        price: parseFloat(response.data.price), // Ensure price is a number
        category: response.data.category,
        stock: 0, // Assuming stock is not in FarmerProduct, or needs to be fetched
        image: response.data.image || null, // Set image to URL or null
      });
      setErrors({}); // Clear errors on fresh fetch
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
      // Reset form data and errors when modal closes or productId is cleared
      setProduct(null);
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
        image: null,
      });
      setErrors({});
    }
  }, [fetchProduct, isOpen, productId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined })); // Clear error on change
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, image: undefined })); // Clear image error
  };

  // Manual validation function for EditProductModal
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Partial<Record<keyof ProductData, string>> = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter product name.';
      isValid = false;
    }

    // Validate category
    if (!formData.category.trim()) {
      newErrors.category = 'Please choose a category.';
      isValid = false;
    }

    // Validate price
    if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Please enter a valid positive price.';
      isValid = false;
    }

    // Validate description
    if (!formData.description.trim()) {
      newErrors.description = 'Add a description.';
      isValid = false;
    }

    // Validate image (only if a new file is selected or if it's explicitly null)
    if (formData.image instanceof File) {
      if (!formData.image.type.startsWith('image/')) {
        newErrors.image = 'Unsupported file format. Only images are allowed.';
        isValid = false;
      } else if (formData.image.size > 5 * 1024 * 1024) { // 5 MB limit
        newErrors.image = 'Image is too large. Max 5MB.';
        isValid = false;
      }
    } else if (formData.image === null) {
      // If image is explicitly set to null (e.g., user clicked a "clear image" button)
      // You might want to add a specific validation if image is required even on edit
      // For now, if null, it means no image is set, and we allow it unless required.
    }


    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setLoading(true);
    try {
      const dataToSend = new FormData();

      // Append only changed fields or fields that are always sent
      // For PATCH, only send fields that are being updated.
      // For PUT, send all fields. Your Django view supports PATCH.
      // So, we'll append all current form data, but handle image specifically.

      dataToSend.append('name', formData.name);
      dataToSend.append('description', formData.description);
      dataToSend.append('price', formData.price.toString());
      dataToSend.append('category', formData.category);
      dataToSend.append('stock', formData.stock.toString()); // Ensure stock is sent

      // Handle image:
      if (formData.image instanceof File) {
        // A new file was selected
        dataToSend.append('image', formData.image);
      } else if (formData.image === null) {
        // Image was explicitly cleared by the user (send empty string or null to backend to clear it)
        // Django's ImageField will clear if an empty string or False is passed.
        // For FormData, appending an empty string is common to clear.
        dataToSend.append('image', '');
      }
      // If formData.image is a string (original URL) and no new file selected,
      // we do NOT append the 'image' field to FormData. This allows Django's PATCH
      // to keep the existing image untouched.

      const response = await authAxios.patch<FarmerProduct>( // Use PATCH for partial updates
        `/products/${productId}/update/`,
        dataToSend
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        scrollBehavior="inside"
      >
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
                  isInvalid={!!errors.name}
                  errorMessage={errors.name}
                />
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="mb-4"
                  isInvalid={!!errors.description}
                  errorMessage={errors.description}
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
                  isInvalid={!!errors.price}
                  errorMessage={errors.price}
                />
                <Select
                  name="category"
                  radius="full"
                  className="max-w-xs mb-4"
                  label="Product category"
                  selectedKeys={[formData.category]}
                  onChange={(e) => handleInputChange(e as ChangeEvent<HTMLSelectElement>)}
                  isInvalid={!!errors.category}
                  errorMessage={errors.category}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.key} value={animal.key}>{animal.label}</SelectItem>
                  ))}
                </Select>
                <Input
                  name="stock"
                  type="number"
                  value={formData.stock.toString()}
                  onChange={handleInputChange}
                  placeholder="Stock"
                  className="mb-4"
                  min={0}
                  step={1}
                />

                {/* Image Upload Section */}
                <div className="mb-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="edit-image-upload" className="font-medium text-gray-500">
                      Product Image
                    </label>
                    <input
                      id="edit-image-upload"
                      name="image"
                      type="file"
                      className="border-none text-sm"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {/* Display preview of new image or existing image */}
                    {formData.image instanceof File ? (
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="New Image Preview"
                        className="mt-2 w-32 h-32 object-cover rounded-md border"
                      />
                    ) : formData.image ? (
                      <img
                        src={formData.image}
                        alt={formData.name}
                        className="mt-2 w-32 h-32 object-cover rounded-md border"
                      />
                    ) : (
                      <p className="text-gray-500 text-sm">No image selected. Current image will be cleared if saved.</p>
                    )}
                    {!!errors.image && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.image}
                      </p>
                    )}
                    {/* Option to clear current image if one exists */}
                    {typeof formData.image === 'string' && formData.image && (
                        <Button
                            onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                            size="sm"
                            color="danger"
                            variant="light"
                            className="mt-2"
                        >
                            Clear Current Image
                        </Button>
                    )}
                  </div>
                </div>
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
