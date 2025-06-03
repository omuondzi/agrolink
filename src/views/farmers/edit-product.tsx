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
} from '@heroui/react';

import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { handleErrors } from '../../libs/handle-errors';
import { authAxios } from '../../serverUrl';
import { Product as FarmerProduct } from './AddProductModal';
import { enqueueSnackbar } from 'notistack';

interface ProductModalProps {
  isOpen: boolean;
  title: string;
  productId: number;
  onOpenChange: (isOpen: boolean) => void;
  onEditSuccess: (updatedProduct: FarmerProduct) => void;
}

interface ProductData {
  image?: File | string | null;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

export const animals = [
  { key: 'vegetables', label: 'Vegetable' },
  { key: 'fruits', label: 'Fruit' },
  { key: 'dairy', label: 'Dairy' },
  { key: 'grains', label: 'Grain' },
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
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductData, string>>>({});

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authAxios.get<FarmerProduct>(`/products/${productId}/`);
      setProduct(response.data);
      setFormData({
        name: response.data.name,
        description: response.data.description,
        price: parseFloat(response.data.price),
        category: response.data.category,
        stock: 0,
        image: response.data.image || null,
      });
      setErrors({});
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
        name: '',
        description: '',
        price: 0,
        category: '',
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
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, image: undefined }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Partial<Record<keyof ProductData, string>> = {};

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

    if (formData.image instanceof File) {
      if (!formData.image.type.startsWith('image/')) {
        newErrors.image = 'Unsupported file format. Only images are allowed.';
        isValid = false;
      } else if (formData.image.size > 5 * 1024 * 1024) {
        newErrors.image = 'Image is too large. Max 5MB.';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append('name', formData.name);
      dataToSend.append('description', formData.description);
      dataToSend.append('price', formData.price.toString());
      dataToSend.append('category', formData.category);
      dataToSend.append('stock', formData.stock.toString());

      if (formData.image instanceof File) {
        dataToSend.append('image', formData.image);
      } else if (formData.image === null) {
        dataToSend.append('image', '');
      }

      const response = await authAxios.patch<FarmerProduct>(
        `/products/${productId}/update/`,
        dataToSend
      );
      onOpenChange(false);
      enqueueSnackbar('Product updated successfully', { variant: 'success' });
      onEditSuccess(response.data);
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="lg" scrollBehavior="inside">
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
                  label="Product Name"
                  className="mb-4"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name}
                />
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  label="Description"
                  className="mb-4"
                  isInvalid={!!errors.description}
                  errorMessage={errors.description}
                />
                <Input
                  name="price"
                  type="number"
                  value={formData.price.toString()}
                  onChange={handleInputChange}
                  label="Price"
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
                  onSelectionChange={(selectedKeys) => {
                    const selected = Array.from(selectedKeys)[0] as string;
                    setFormData((prev) => ({
                      ...prev,
                      category: selected,
                    }));
                    setErrors((prev) => ({ ...prev, category: undefined }));
                  }}
                  isInvalid={!!errors.category}
                  errorMessage={errors.category}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.key} value={animal.key}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>

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
                      <p className="text-gray-500 text-sm">
                        No image selected. Current image will be cleared if saved.
                      </p>
                    )}
                    {!!errors.image && (
                      <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                    )}
                    {typeof formData.image === 'string' && formData.image && (
                      <Button
                        onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
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
