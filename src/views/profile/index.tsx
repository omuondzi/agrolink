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
} from "@heroui/react";
import {
  H2,
  SubHeading,
  Subtitle2,
  Paragraph,
} from "../../components/typography";

const user = {
  name: "Hillary Omondi",
  email: "omondih401@gmail.com",
  phone: "+254 712 345 678",
  role: "Buyer account owner",
  location: "Nairobi, Kenya",
};

const ProfilePageView = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <H2 className="text-primary mb-6">User Profile</H2>

        <Card className="rounded-3xl shadow-md border border-gray-100">
          <CardBody className="p-8">
            {/* Top section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-8">
              <Image
                src="/images/dp.png"
                className="w-32 h-32 rounded-full object-cover border border-gray-300"
                alt="Profile Picture"
              />
              <div className="text-center md:text-left">
                <SubHeading className="text-gray-900">{user.name}</SubHeading>
                <Subtitle2 className="text-gray-500">{user.role}</Subtitle2>
                <Paragraph className="text-sm text-gray-600 mt-1">
                  {user.location}
                </Paragraph>
              </div>
            </div>

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
                    <TableCell>{user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold text-gray-700">
                      Email
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold text-gray-700">
                      Phone
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold text-gray-700">
                      Role
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold text-gray-700">
                      Location
                    </TableCell>
                    <TableCell>{user.location}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default ProfilePageView;
