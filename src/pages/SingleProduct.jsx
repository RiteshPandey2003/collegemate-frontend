import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsByUserIdQuery } from "../redux/api/api";
import { FiUser, FiPhone, FiDollarSign, FiMapPin, FiTag } from "react-icons/fi";
import Layout from "../layout/Layout";

const SingleProduct = () => {
  const { productId, userId } = useParams();
  const { data, error, isLoading } = useGetProductsByUserIdQuery({
    productId,
    userId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading seller's products</div>;

  const { seller } = data;

  return (
    <Layout>
      <div className="p-6 w-full bg-gray-900 text-white min-h-screen">
        <h3 className="text-3xl font-semibold mb-4">Seller Details:</h3>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex flex-wrap md:flex-no-wrap gap-4 w-full">
            {seller.avatar.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Avatar ${index + 1}`}
                className="w-full h-[320px] lg:w-[30%] object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold flex items-center">
            <FiUser className="mr-2" />
            Name: {seller.name}
          </p>
          <p className="text-lg font-semibold flex items-center">
            <FiTag className="mr-2" />
            Category: {seller.category}
          </p>
          <p className="text-lg font-semibold flex items-center">
            <FiPhone className="mr-2" />
            Contact Details: {seller.contactDetails}
          </p>
          <p className="text-lg font-semibold flex items-center">
            <FiMapPin className="mr-2" />
            Address: {seller.address}
          </p>
          <p className="text-lg font-semibold flex items-center">
            <FiDollarSign className="mr-2" />
            Price: {seller.price}
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-lg font-semibold">Description:</p>
          <p>{seller.description}</p>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
