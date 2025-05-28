import { Button, Image, useDisclosure } from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import AddProductModal from './product-modal';

import { useEffect, useState } from 'react';
import { Subtitle, Subtitle2 } from '../../components/typography';
import { Link, useNavigate } from 'react-router-dom';
import { authAxios } from '../../serverUrl';

type FarmerProduct = {
  image: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  tel: string;
};

const FarmersPageView = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [farmerProducts, setFarmerProducts] = useState<FarmerProduct[]>([]);
  const navigate = useNavigate();

  const handleFarmerProducts = async () => {
    try {
      const response = await authAxios.get('products/my-products/');
      setFarmerProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching farmer products:', error);
    }
  };

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    console.log(user)

    if (!user || user.role !== "farmer") {
      navigate("/");
      return;
    }

    handleFarmerProducts();
  }, [navigate]);

  return (
    <section className="">
      <div className="container">
        <div className="py-3">
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
        <section className="grid md:grid-cols-3 gap-2 gap-y-4 py-3">
          {farmerProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-lg pb-4">
              <Image
                src={product.image}
                radius="none"
                className="w-full rounded-t-xl"
              />
              <div className="w-[90%] mx-auto">
                <div className="flex justify-between font-semibold pt-2">
                  <Subtitle>{product.name}</Subtitle>
                  <Subtitle2>KSH {product.price}/fruit</Subtitle2>
                </div>
                <Subtitle2 className="text-graytext">
                  {product.description}
                </Subtitle2>
                <div className="flex justify-between items-center py-4">
                  <Subtitle2 className="flex items-center gap-1 pt-3">
                    <Icon
                      icon="material-symbols:star-rounded"
                      color="#fcce10"
                    />
                    {product.rating}
                  </Subtitle2>
                  <Button
                    radius="none"
                    isIconOnly
                    size="sm"
                    className="bg-none text-green-600 border-none"
                    variant='ghost'
                    as={Link}
                    to={`tel:${product.tel}`}
                  >
                    <Icon 
                      icon="weui:like-filled"
                      fontSize={20}
                    />
                  </Button>
                  <Button
                    radius="none"
                    isIconOnly
                    size="sm"
                    className="bg-none text-blue-600 border-none"
                    variant='ghost'
                  >
                    <Icon 
                      icon="material-symbols:edit-outline-rounded"
                      fontSize={20}
                    />
                  </Button>
                  <Button
                    radius="none"
                    isIconOnly
                    size="sm"
                    className="bg-none text-red-600 border-none"
                    variant='ghost'
                  >
                    <Icon
                      icon="material-symbols:delete-outline"
                      fontSize={20}
                    />
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
