import { Button, Image, useDisclosure } from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import AddProductModal, { Product } from './product-modal';
import DeleteProductModal from './delete-product-modal';
import EditProductModal from './edit-product';

import { useEffect, useState } from 'react';
import { Subtitle, Subtitle2 } from '../../components/typography';
import { useNavigate } from 'react-router-dom';
import { authAxios } from '../../serverUrl';

import { enqueueSnackbar } from 'notistack';

export type FarmerProduct = {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  tel: string;
  liked: boolean;
};

const FarmersPageView = () => {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const [farmerProducts, setFarmerProducts] = useState<FarmerProduct[]>([]);
  const [, setLike] = useState<{ [productId: number]: boolean }>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token !== null);

    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    if (!user || user.role !== 'farmer') {
      enqueueSnackbar('Only farmers can access this page.', { variant: 'error' });
      navigate('/');
      return;
    }

    handleFarmerProducts();
  }, [navigate]);

  const handleFarmerProducts = async () => {
    try {
      const response = await authAxios.get('products/my-products/');
      setFarmerProducts(response.data);

      const likeMap = Object.fromEntries(
        response.data.map((product: FarmerProduct) => [product.id, product.liked])
      );
      setLike(likeMap);
    } catch (error) {
      console.error('Error fetching farmer products:', error);
    }
  };

  const handleProductDeleted = (deletedId: number) => {
    setFarmerProducts((prev) => prev.filter((product) => product.id !== deletedId));
  };

  const handleProductEdited = (updatedProduct: FarmerProduct) => {
    setFarmerProducts((prev) =>
      prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  };

  // NEW: add new product directly to the list
  const handleProductAdded = (newProduct: Product) => {
    setFarmerProducts((prev) => [
      {
        id: newProduct.id,
        image: newProduct.image ?? '',
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description,
        rating: 0,
        tel: '',
        liked: newProduct.liked,
      },
      ...prev,
    ]);
  };

  return (
    <section>
      <div className="container">
        <div className="py-3">
          <Button
            radius="full"
            color="primary"
            endContent={<Icon icon="ic:baseline-plus" fontSize={20} />}
            onPress={onAddOpen}
          >
            Add Product
          </Button>

          <AddProductModal
            title="Post Your Produce"
            isOpen={isAddOpen}
            onOpenChange={onAddOpenChange}
            onProductAdded={handleProductAdded}
          />

          <DeleteProductModal
            title="Delete product"
            isOpen={isDeleteOpen}
            onOpenChange={onDeleteOpenChange}
            productId={selectedProductId ?? 0}
            onDeleteSuccess={handleProductDeleted}
          />

          <EditProductModal
            title="Edit product details"
            isOpen={isEditOpen}
            onOpenChange={onEditOpenChange}
            productId={selectedProductId ?? 0}
            onEditSuccess={handleProductEdited}
          />
        </div>

        <section className="grid md:grid-cols-3 gap-2 gap-y-4 py-3">
          {farmerProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg pb-4">
              <Image
                src={product.image}
                radius="none"
                className="w-full rounded-t-xl"
              />
              <div className="w-[90%] mx-auto">
                <div className="flex justify-between font-semibold pt-2">
                  <Subtitle>{product.name}</Subtitle>
                  <Subtitle2>KSH {product.price}</Subtitle2>
                </div>
                <Subtitle2 className="text-graytext">{product.description}</Subtitle2>
                <div className="flex justify-around items-center py-4">
                  <Button
                    radius="none"
                    isIconOnly
                    size="sm"
                    className="bg-none text-blue-600 border-none"
                    variant="ghost"
                    onPress={() => {
                      setSelectedProductId(product.id);
                      onEditOpen();
                    }}
                  >
                    <Icon icon="material-symbols:edit-outline-rounded" fontSize={20} />
                  </Button>
                  <Button
                    radius="none"
                    isIconOnly
                    size="sm"
                    className="bg-none text-red-600 border-none"
                    variant="ghost"
                    onPress={() => {
                      setSelectedProductId(product.id);
                      onDeleteOpen();
                    }}
                  >
                    <Icon icon="material-symbols:delete-outline" fontSize={20} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};

export default FarmersPageView;
