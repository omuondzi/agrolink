import {
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Card,
  CardBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import { H2, H3, SubHeading, Subtitle2 } from "../../components/typography";
import { authAxios } from "../../serverUrl";
import { useEffect, useState } from "react";
import EditProfileModal from "./update-profile";

export interface USER {
  avatar_url: string;
  name: string;
  role: string;
  email: string;
  phone_number: string;
}

const orders = [
  {
    product: "Fresh Tomatoes",
    units: 10,
    pricePerUnit: 50,
    total: 500,
    seller: "Mary Wanjiku",
  },
  {
    product: "Organic Kale",
    units: 5,
    pricePerUnit: 80,
    total: 400,
    seller: "John Odhiambo",
  },
];

const salesData = [
  {
    product: "Fresh Tomatoes",
    units: 20,
    pricePerUnit: 30,
    totalAmount: 600,
    buyerName: "Jane Doe",
  },
  {
    product: "Red Onions",
    units: 15,
    pricePerUnit: 25,
    totalAmount: 375,
    buyerName: "John Smith",
  },
];

const ProfilePageView = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userData, setUserData] = useState<USER>();

  const fetchProfileData = async () => {
    try {
      const response = await authAxios.get("/user/profile/");
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      // setError('Failed to load profile data.');
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12">
      <section>
        <div className="container max-w-4xl mx-auto px-4">
          <H2 className="text-primary mb-6">User Profile</H2>

          <Card className="rounded-3xl shadow-md border border-gray-100">
            {userData && (
              <CardBody className="p-8">
                {/* Top section */}
                <section className=" flex justify-between">
                  <div className="flex flex-col md:flex-row items-center  gap-[1rem] mb-8">
                    {" "}
                    <Image
                      src={userData.avatar_url || "/images/dp.png"}
                      className="w-32 h-32 rounded-full object-cover border border-gray-300"
                      alt="Profile Picture"
                    />
                    <div className="text-center md:text-left">
                      <SubHeading className="text-gray-900">
                        {userData.name}
                      </SubHeading>
                      <Subtitle2 className="text-gray-500">
                        {userData.role} account
                      </Subtitle2>
                    </div>
                  </div>
                  <div>
                    <Button onPress={onOpen} className="bg-black text-white">
                      Edit profile
                    </Button>
                  </div>
                </section>

                {/* Details Table */}
                <div>
                  <Table
                    hideHeader
                    isStriped
                    removeWrapper
                    aria-label="User Profile Table"
                    className="bg-white"
                  >
                    <TableHeader>
                      <TableColumn>Field</TableColumn>
                      <TableColumn>Value</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold text-gray-700">
                          Name
                        </TableCell>
                        <TableCell>{userData.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold text-gray-700">
                          Email
                        </TableCell>
                        <TableCell>{userData.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold text-gray-700">
                          Phone
                        </TableCell>
                        <TableCell>{userData.phone_number}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold text-gray-700">
                          Role
                        </TableCell>
                        <TableCell>{userData.role}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardBody>
            )}
          </Card>
        </div>
      </section>

      {userData?.role === "buyer" && (
        <section className="container py-6">
          <H3 className="mb-4">Orders Made</H3>
          <Table isStriped aria-label="Orders Made Table">
            <TableHeader>
              <TableColumn>Product</TableColumn>
              <TableColumn>No of Units</TableColumn>
              <TableColumn>Price per Unit (KSH)</TableColumn>
              <TableColumn>Total Amount (KSH)</TableColumn>
              <TableColumn>Seller Name</TableColumn>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.units}</TableCell>
                  <TableCell>{order.pricePerUnit}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.seller}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
      {userData?.role === "farmer" && (
        <section className="container py-6">
          <H3 className="mb-4">Sales Made</H3>
          <Table aria-label="Sales made table" isStriped shadow="sm">
            <TableHeader>
              <TableColumn>Product</TableColumn>
              <TableColumn>No. of Units</TableColumn>
              <TableColumn>Price/Unit (KSH)</TableColumn>
              <TableColumn>Total Amount (KSH)</TableColumn>
              <TableColumn>Buyer Name</TableColumn>
            </TableHeader>
            <TableBody>
              {salesData.map((sale, index) => (
                <TableRow key={index}>
                  <TableCell>{sale.product}</TableCell>
                  <TableCell>{sale.units}</TableCell>
                  <TableCell>{sale.pricePerUnit}</TableCell>
                  <TableCell>{sale.totalAmount}</TableCell>
                  <TableCell>{sale.buyerName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
      <EditProfileModal
        title="Edit Your Profile"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </section>
  );
};

export default ProfilePageView;
