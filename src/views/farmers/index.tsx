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
// import { handleErrors } from '../../libs/handle-errors';

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
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token !== null);

    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    if (!user || user.role !== 'farmer') {
      navigate('/');
      enqueueSnackbar('Only farmers can access this page.', {
        variant: 'error',
      });
      return;
    }

    handleFarmerProducts();
  }, [navigate]);

  const handleFarmerProducts = async () => {
    try {
      const response = await authAxios.get('products/my-products/');
      setFarmerProducts(response.data);

      const likeMap = Object.fromEntries(
        response.data.map((product: FarmerProduct) => [
          product.id,
          product.liked,
        ])
      );
      setLike(likeMap);
    } catch (error) {
      console.error('Error fetching farmer products:', error);
    }
  };

  const handleProductDeleted = (deletedId: number) => {
    setFarmerProducts((prev) =>
      prev.filter((product) => product.id !== deletedId)
    );
  };

  const handleProductEdited = (updatedProduct: FarmerProduct) => {
    setFarmerProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
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

        <section className="min-h-[80vh] grid md:grid-cols-3 gap-5 gap-y-4 py-3">
          {farmerProducts.length == 0 && (
            <div className="h-[100%] flex flex-col justify-center items-center mx-auto col-span-3">
              <h4>No products added.</h4>
              <h4>Please post and come back.</h4>
            </div>
          )}
          {farmerProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg pb-4 shadow-md"
            >
              <Image
                src={product.image}
                height={200}
                width={400}
                radius="none"
                className="w-full rounded-t-xl"
              />
              <div className="w-[90%] mx-auto">
                <div className="flex justify-between font-semibold pt-2">
                  <Subtitle>{product.name}</Subtitle>
                  <Subtitle2>KSH {product.price}</Subtitle2>
                </div>
                <Subtitle2 className="text-graytext">
                  {product.description}
                </Subtitle2>
                <div className="flex justify-around items-center py-4">
                  {/* <Subtitle2 className="flex items-center gap-1 pt-3">
                    <Icon
                      icon="material-symbols:star-rounded"
                      color="#fcce10"
                    />
                    {product.rating}
                  </Subtitle2> */}
                  {/* <Button
                    onClick={() => handleLike(product.id)}
                    isIconOnly
                    className="bg-transparent"
                  >
                    <Icon
                      icon={
                        like[product.id]
                          ? 'flat-color-icons:like'
                          : 'icon-park-outline:like'
                      }
                      color={like[product.id] ? 'red' : 'black'}
                      fontSize="30"
                    />
                  </Button> */}
                  <div className="flex justify-end gap-2 w-[100%]">
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
                      <Icon icon="fluent-mdl2:edit" fontSize={20} />
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
                      <Icon
                        icon="material-symbols-light:delete-outline"
                        fontSize={28}
                      />
                    </Button>
                  </div>
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
