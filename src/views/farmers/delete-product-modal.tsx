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
import { enqueueSnackbar } from 'notistack';

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
  productId,
  onDeleteSuccess,
}: ProductModalProps) => {
  const [product, setProduct] = useState<FarmerProduct>();
  const [hasDeleted, setHasDeleted] = useState(false);

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
      setHasDeleted(true);
      onOpenChange(false);
      onDeleteSuccess(id);
      enqueueSnackbar('Product deleted successfully', {
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHasDeleted(false); // Reset flag when modal opens
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && productId && !hasDeleted) {
      fetchProduct();
    }
  }, [isOpen, productId, hasDeleted]);

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
