import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';

import { useEffect, useState } from 'react';
import { handleErrors } from '../../libs/handle-errors';
import { authAxios } from '../../serverUrl';
import { FarmerProduct } from '.';

interface ProductModalProps {
  isOpen: boolean;
  title: string;
  productId: number;
  onOpenChange: (isOpen: boolean) => void;
  onDeleteSuccess: (id: number) => void;
}

const DeleteProductModal = ({
  isOpen,
  onOpenChange,
  // title,
  productId,
  onDeleteSuccess,
}: ProductModalProps) => {
  const [product, setProduct] = useState<FarmerProduct>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProduct = async () => {
    try {
      const response = await authAxios.get(`/products/${productId}/`);
      setProduct(response.data);
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await authAxios.delete(`/products/${id}/delete/`);
      onOpenChange(false);
      onDeleteSuccess(id);
    } catch (error) {
      handleErrors(error);
    }
  };

  useEffect(() => {
    if (isOpen && productId) {
      fetchProduct();
    }
  }, [fetchProduct, isOpen, productId]);

  return (
    <section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="lg">
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
          <ModalBody>
            {product ? (
              <>
                <p>Are you sure you want to delete this product?</p>
                <strong>{product.name}</strong> – {product.description}
              </>
            ) : (
              <p>Loading product...</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              className="my-4 text-white"
              color="default"
              fullWidth
              radius="full"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              className="my-4 text-white"
              color="danger"
              fullWidth
              radius="full"
              onClick={() => handleDelete(productId)}
              disabled={!product}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default DeleteProductModal;
