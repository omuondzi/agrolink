import React, { useState, ChangeEvent } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react';

import { handleErrors } from '../../libs/handle-errors';
import { authAxios } from '../../serverUrl';

// Form data interface
interface PostProductFormData {
  name: string;
  description: string;
  price: number;
  image: File | null;
  category: string;
}

// Default form values
const DefaultPostProductData: PostProductFormData = {
  name: '',
  description: '',
  price: 0,
  image: null,
  category: '',
};

// Category options
export const animals = [
  { key: 'vegetable', label: 'Vegetable' },
  { key: 'fruit', label: 'Fruit' },
  { key: 'dairy', label: 'Dairy' },
  { key: 'grain', label: 'Grain' },
];

// Product type (as returned from API)
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  farmer: { id: number; username: string };
  category: string;
  created_at: string;
  liked: boolean;
}

interface AddProductModalProps {
  title: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: (newProduct: Product) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  onProductAdded,
}) => {
  const [formData, setFormData] = useState<PostProductFormData>(DefaultPostProductData);
  const [errors, setErrors] = useState<Partial<Record<keyof PostProductFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
    setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Partial<Record<keyof PostProductFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter product name.';
      isValid = false;
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Please choose a category.';
      isValid = false;
    }

    if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Please enter a valid positive price.';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Add a description.';
      isValid = false;
    }

    if (!formData.image) {
      newErrors.image = 'Please select an image.';
      isValid = false;
    } else if (!formData.image.type.startsWith('image/')) {
      newErrors.image = 'Unsupported file format. Only images are allowed.';
      isValid = false;
    } else if (formData.image.size > 5 * 1024 * 1024) {
      newErrors.image = 'Image is too large. Max 5MB.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append('name', formData.name);
      dataToSend.append('category', formData.category);
      dataToSend.append('price', formData.price.toString());
      dataToSend.append('description', formData.description);

      if (formData.image) {
        dataToSend.append('image', formData.image);
      }

      const response = await authAxios.post<Product>('products/create/', dataToSend);

      // Pass new product to parent
      onProductAdded(response.data);

      onOpenChange(false);
      setFormData(DefaultPostProductData);
      setErrors({});
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="lg">
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <form onSubmit={handlePost} className="w-full md:w-[300px] mt-5 mb-2 container">
              <div className="mb-3">
                <Input
                  name="name"
                  label="Enter Product Name"
                  type="text"
                  radius="full"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name}
                />
              </div>

              <div className="mb-3">
                <Select
                  name="category"
                  radius="full"
                  className="max-w-xs"
                  label="Enter product category"
                  selectedKeys={[formData.category]}
                  onChange={(e) => handleChange(e as ChangeEvent<HTMLSelectElement>)}
                  isInvalid={!!errors.category}
                  errorMessage={errors.category}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.key}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="mb-3">
                <Input
                  name="price"
                  label="Enter Product Price"
                  type="number"
                  value={formData.price.toString()}
                  onChange={handleChange}
                  placeholder="2,500.00"
                  radius="full"
                  isInvalid={!!errors.price}
                  errorMessage={errors.price}
                />
              </div>

              <div className="mb-3">
                <Textarea
                  name="description"
                  label="Enter Product Description"
                  radius="full"
                  value={formData.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="image-upload" className="font-medium text-gray-500">
                  Upload Product Image
                </label>
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  className="border-none text-sm"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {formData.image && (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-md border"
                  />
                )}
                {!!errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>

              <Button
                className="my-4 text-white"
                color="primary"
                fullWidth
                radius="full"
                type="submit"
                isLoading={isSubmitting}
              >
                Post
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default AddProductModal;
