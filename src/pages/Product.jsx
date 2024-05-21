import { useState } from "react"; 
import { useGetPostsQuery } from "../redux/api/api";
import { FiMapPin, FiDollarSign } from "react-icons/fi"; 
import Layout from "../layout/Layout";
import { Link } from "react-router-dom"; 

const Product = () => {
  const { isLoading, isSuccess, data } = useGetPostsQuery("");
  const [searchQuery, setSearchQuery] = useState(""); 
  console.log(data)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
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
              <input
                type="text"
                placeholder="college name or city"
                className="bg-gray-800 text-white px-4 lg:py-2 rounded-md mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full grid grid-cols-1 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex flex-wrap justify-center items-center mb-4 w-full">
                  {product.sellers.map((seller, sellerIndex) => (
                    <Link
                      key={`${product.id}-${sellerIndex}`} 
                      to={`/singleproduct/${product._id}/${seller._id}`} 
                      className="mb-2 m-4 gap-10 border-2 border-blue-950 p-2 rounded-lg"
                    >
                      <img
                        src={seller.avatar[0]} 
                        alt={`Seller ${sellerIndex + 1} Avatar`}
                        className="w-56 h-32 object-cover rounded-lg shadow-md" 
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
                    </Link>
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
