import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/context'
import axiosInstance from '../utils/axiosInstance.js';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '../components/pagination.jsx';
import Loader from '../components/loader.jsx';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Products = () => {

  const { authState, setAllProducts } = useContext(Context);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const [loader, setLoader] = useState(false);

  const handleDelete = async (productId) => {
    try {
      if (authState !== 'authenticated') {
        return navigate('/login')
      }

      setLoader(true);
      const response = await axiosInstance.delete(`/api/v1/admin/deleteproduct/${productId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        // Optionally, you can refresh the project list or remove the deleted project from the state
        setProducts(prev => prev.filter(product => product._id !== productId));
        setAllProducts(prev => prev.filter(product => product._id !== productId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  const fetchProducts = async (page) => {
    try {
      setLoader(true);
      const response = await axiosInstance.get(`/api/v1/admin/allproducts?page=${page}&limit=10`);
      if (response.data.success) {
        setProducts(response.data.products);
        setTotalProducts(response.data.totalProducts);
        setTotalPages(response.data.totalPages);
        setPage(response.data.currentPage);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  };

  const updateProductAvailability = async (productId, newAvailability) => {
    try {
      setLoader(true);

      const response = await axiosInstance.patch(`/api/v1/admin/update-availability/${productId}`,
        { availability: newAvailability }
      );
      if (response.data.success) {
        fetchProducts(page);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (authState === 'authenticated') {
      fetchProducts(page);
    }
  }, [authState, page]);

  // if (products.length === 0) {
  //   return (
  //     <div className='w-full h-screen flex justify-center items-center bg-[#fff8f7]'>
  //       <div className='flex flex-col'>
  //         <h2 className='mb-5'>No products exist yet</h2>
  //         <Link to='/' className='px-2 py-2 bg-[#b52330] text-white rounded-md hover:bg-[#9a1c26] transition-all duration-200'>Add new product</Link>
  //       </div>
  //     </div>
  //   );
  // }

  if (loader || products.length === 0) {
    return <Loader />
  }

  return (
    <section className='w-full min-h-screen p-2 pt-6 sm:p-10'>
      <div className='bg-white rounded-md p-4'>

        <div className='mb-5'>
          <h1 className='text-4xl font-medium'>Products List</h1>
          <hr className='border border-gray-400' />
          <p className='text-sm my-2'>Total products: {totalProducts}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead className="bg-[#fff8f7]">
              <tr>
                <th className="text-left px-4 py-2">No.</th>
                <th className="text-left px-4 py-2">Thumbnail</th>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="bg-[#fff8f7] rounded-lg">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <img
                      src={!product.image ? product.image.replace("/upload/", "/upload/w_200,h_200,c_fill,q_auto,f_auto/") : product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="flex gap-2 mt-2 py-2">
                    <button onClick={() => { handleDelete(product._id) }} className="text-red-500 hover:underline">Delete</button>
                    <Link to={`/updateproduct/${product._id}`} className="text-yellow-500 hover:underline">Update</Link>
                    <button
                      onClick={() => updateProductAvailability(product._id, !product.available)}
                      className="text-green-500 hover:text-green-600 cursor-pointer"
                      title={product.available ? "Mark Unavailable" : "Mark Available"}
                    >
                      {product.available ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='my-10'>
          <Pagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
          />
        </div>

      </div>
    </section>
  )
}

export default Products
