import {
  Button,
 
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
 
} from '@heroui/react';

import { handleErrors } from '../../libs/handle-errors';


interface ProductModalProps {
  isOpen: boolean;
  title: string;
  onOpenChange: (isOpen: boolean) => void;
}
const DeleteProductModal = ({
  isOpen,
  onOpenChange,
  title,
}: ProductModalProps) => {


  const handleDelete = async () => {
    try {
      // const formData = new FormData();
      // formData.append("name", data.name);
      // formData.append("category", data.category);
      // formData.append("price", data.price.toString());
      // formData.append("description", data.description);
      // if (data.image) {
      //   formData.append("image", data.image);
      // }
   
      onOpenChange(false);
      console.log();
    } catch (errors) {
      handleErrors(errors);
    }
  };

  return (
    <section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="lg">
        <ModalContent>
          {' '}
          <ModalHeader>{title}</ModalHeader>
          
          <ModalBody>
         Arev you sure you want to delete this product? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
           <Button
              className=" my-4  text-white"
              color="primary"
              fullWidth
              radius="full"
              type="submit"
              onClick={() => {
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>

            <Button
              className=" my-4  text-white"
              color="primary"
              fullWidth
              radius="full"
              type="submit"
              onClick={() => {
                handleDelete();
                onOpenChange(false);
              }}
            >
              Delete
            </Button>
          </ModalFooter>{' '}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default DeleteProductModal;
