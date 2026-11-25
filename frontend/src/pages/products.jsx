import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Context } from '../context/context.jsx'
import Pagination from "./../components/pagination";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance.js';
import Loader from '../components/loader.jsx';

const Products = () => {

  const { currency, authState } = useContext(Context);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState([]);

  // const categories = useMemo(() => {
  //   return [...new Set(allProducts.map((item) => item.category))]
  // }, [allProducts]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setPage(1);
  }

  const resetCategory = () => {
    setSelectedCategory('');
    setPage(1);
  }

  // const filteredProducts = useMemo(() => {
  //   const filtered = selectedCategory ? allProducts.filter((item) => item.category === selectedCategory) : products;
  //   return filtered;
  // }, [products, selectedCategory, allProducts]);

  const [loader, setLoader] = useState(false);

  const fetchProducts = async (page) => {
    try {

      setLoader(true);

      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', 8);

      if (selectedCategory) {
        params.append('category', selectedCategory);
      }

      const response = await axiosInstance.get(`/api/v1/user/allproducts?${params.toString()}`);
      if (response.data.success) {
        setProducts(response.data.products);
        setCategories(response.data.categories);
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

  useEffect(() => {
    if (authState === 'authenticated') {
      fetchProducts(page);
    }
  }, [authState, page, selectedCategory]);

  if (loader || products.length === 0) {
    return <Loader />
  }

  return (
    <section aria-label='all-products' className='mx-[5%] py-10'>
      <h1 className='text-2xl font-bold'>All <span className='text-[#b52330]'>Products</span></h1>
      <p className='text-sm my-2 mb-5'>Choose products from {totalProducts}</p>
      {/* Products categories */}
      <div className='flex flex-wrap gap-2 py-3'>
        <button onClick={() => resetCategory()} className={`px-4 py-2 rounded-md shadow-lg ${selectedCategory === '' ? 'bg-[#b52330] text-white' : 'bg-white'} hover:bg-[#b52330] hover:text-white transition-all duration-200 cursor-pointer`}>
            All
        </button>
        {categories.map((category, index) => (
          <button key={index} onClick={() => handleCategoryClick(category)} className={`px-4 py-2 rounded-md shadow-lg ${selectedCategory === category ? 'bg-[#b52330] text-white' : 'bg-white'} hover:bg-[#b52330] hover:text-white transition-all duration-200 cursor-pointer`}>{category}</button>
        ))}
      </div>

      {/* All Products */}
      <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4'>
        {products.filter((product) => product.available === true).map((item, index) => (
          <Link to={`/detail/${item._id}`} key={index} className='bg-white rounded-md p-3 shadow-lg'>
            <img src={item.image} className='rounded-md object-cover w-full' alt={item.name + 'image'} />
            <h2 className='text-xl font-semibold'>{item.name}</h2>
            <p className='text-gray-500 line-clamp-1 mb-2'>{item.description}</p>
            <div className='flex justify-between items-center'>
              <h3 className='text-xl font-medium text-[#b52330]'>{currency}{item.price[0]}:00</h3>
              {/* {item.price.map((p, i) => (
                <h3 key={i} className='text-xl font-medium text-[#b52330]'>
                  {currency}{p}
                </h3>
              ))} */}
              <button className='flex justify-center items-center w-8 h-8 pb-1 shrink-0 rounded-full bg-[#b52330] text-white text-xl leading-none cursor-pointer'>
                +
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className='mt-5'>
        <Pagination
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        />
      </div>


    </section>
  )
}

export default Products
