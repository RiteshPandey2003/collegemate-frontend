import { useState } from "react"; // Import useState hook
import { useGetPostsQuery } from "../redux/api/api";
import { FiMapPin, FiDollarSign, FiPhone } from "react-icons/fi"; // Importing additional icons from react-icons
import Layout from "../layout/Layout";

const Product = () => {
  // Fetching product data
  const { isLoading, isSuccess, data } = useGetPostsQuery("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Success state
  if (isSuccess) {
    // Filtered products based on search query
    const filteredProducts = data.products.filter(
      (product) =>
        product.collageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Layout>
        <div className="bg-gray-900 text-white min-h-screen py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between">
              <h1 className="text-2xl lg:text-3xl font-bold mb-8">Products</h1>
              {/* Search box */}
              <input
                type="text"
                placeholder="college name or city"
                className="bg-gray-800 text-white px-4 lg:py-2 rounded-md mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className=" w-full grid grid-cols-1  gap-8">
              {" "}
              {/* Increased gap */}
              {filteredProducts.map((product) => (
                <div className="flex flex-wrap justify-center items-center mb-4 w-full">
                  {product.sellers.map((seller, sellerIndex) => (
                    <div
                      key={sellerIndex}
                      className="mb-2 m-4 gap-10 border-2 border-blue-950 p-2 rounded-lg"
                    >
                      <img
                        key={sellerIndex}
                        src={seller.avatar[0]} // Assuming seller avatar is an array
                        alt={`Seller ${sellerIndex + 1} Avatar`}
                        className="w-56 h-32 object-cover rounded-lg shadow-md " // Adjusted width here
                      />
                      <div className="flex justify-between px-5 py-3 items-center">
                        <div className="flex items-center">
                          <FiMapPin className="text-blue-400 mr-2" />
                          <p className="font-semibold">{seller.category}</p>
                        </div>
                        <div className="flex items-center">
                          <FiDollarSign className="text-blue-400 mr-2" />
                          <p className="font-semibold">{seller.price}</p>
                        </div>
                      </div>
                      {/* Add icons */}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
};

export default Product;
