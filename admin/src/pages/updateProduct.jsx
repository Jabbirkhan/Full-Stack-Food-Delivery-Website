import React, { useContext, useEffect, useMemo, useState } from 'react'
import { assets } from "./../assets/assets.js";
import { toast } from 'react-toastify';
import { Context } from '../context/context';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance.js';
import Loader from '../components/loader.jsx';

const UpdateProduct = () => {

  const { allProducts, setAllProducts, navigate, authState } = useContext(Context);
  const products = allProducts || [];
  const { id } = useParams();

  const product = useMemo(() => {
    return products.find((p) => p._id === id);
  }, [id, products]);

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price);
      setSizes(product.sizes);
      setImage(product.image);
    }
  }, [product]);

  const handleSizes = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handlePrices = (value, size) => {

    // Update Half price
    if (size === 'Half') {
      setPrice((prev) => [value, prev[1] || '']);
    }

    if(!size === 'Full'){
      return toast.error("Please select Full size to add its price");
    }

    // Update Full price
    if (size === 'Full') {
      setPrice((prev) => [prev[0] || '', value]);
    }
  };

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', JSON.stringify(price));
      formData.append('sizes', JSON.stringify(sizes));
      image && formData.append("image", image);

      if (authState === 'authenticated') {
        const response = await axiosInstance.patch(`/api/v1/admin/updateproduct/${id}`, formData);
        if (response.data.success) {
          toast.success("Product updated successfully.");
          setAllProducts((prev) =>
            prev.map((p) => p._id === response.data.product._id ? response.data.product : p)
          )

          setTimeout(() => {
            navigate('/products')
          }, 1000);

        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  if (loader) {
    return <Loader />
  }

  return (
    <section className='w-full min-h-screen p-2 pt-6 sm:p-6 lg:p-10'>
      <form onSubmit={onSubmithandler} className='bg-white rounded-md p-4 sm:p-6 shadow-sm'>

        <div className='mb-5'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-medium mb-2'>
            Update Product Details
          </h1>
          <hr className='border border-gray-300' />
        </div>

        {/* Main Layout */}
        <div className='flex flex-col lg:flex-row gap-6'>

          {/* Image Section */}
          <div className='w-full lg:w-1/2'>
            <label htmlFor="image" className='block cursor-pointer'>
              <img
                src={
                  !image
                    ? assets.upload_area
                    : typeof image === 'string'
                      ? image
                      : URL.createObjectURL(image)
                }
                className='w-full h-64 sm:h-80 lg:h-96 object-cover border border-gray-300 rounded-md'
                alt=""
              />

              <input
                type="file"
                id='image'
                onChange={(e) => setImage(e.target.files[0])}
                hidden
              />
            </label>
          </div>

          {/* Right Side Form */}
          <div className='w-full lg:w-1/2 flex flex-col gap-4'>

            {/* Product Name */}
            <div>
              <label htmlFor="name" className='block mb-1 font-medium'>
                Product Name
              </label>

              <input
                type="text"
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Product Name'
                className='w-full border border-gray-300 rounded-md p-2 outline-none'
              />
            </div>

            {/* Product Sizes */}
            <div>
              <h2 className='font-medium mb-2'>
                Select Product Sizes
              </h2>

              <div className='flex flex-wrap gap-2'>
                <button
                  type='button'
                  onClick={() => handleSizes('Half')}
                  className={`px-4 py-2 rounded-md transition-all duration-200 cursor-pointer
              ${!price[0] 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : sizes.includes('Half')
                      ? 'bg-[#b52330] text-white'
                      : 'bg-[#fff0ef] hover:bg-[#b52330] hover:text-white'
                    }`}
                >
                  Half
                </button>

                <button
                  type='button'
                  onClick={() => handleSizes('Full')}
                  disabled={!price[1]}
                  className={`px-4 py-2 rounded-md transition-all duration-200 cursor-pointer
              ${!price[1]
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : sizes.includes('Full')
                      ? 'bg-[#b52330] text-white'
                      : 'bg-[#fff0ef] hover:bg-[#b52330] hover:text-white'
                    }`}
                >
                  Full
                </button>
              </div>
            </div>

            {/* Prices */}
            <div>
              <h2 className='font-medium mb-2'>
                Add Product Prices
              </h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div>
                  <label htmlFor="halfprice" className='block mb-1 font-medium'>
                    Half Size Price
                  </label>

                  <input
                    type="number"
                    onChange={(e) => handlePrices(e.target.value, 'Half')}
                    value={price[0] || ''}
                    id='halfprice'
                    placeholder='Half Price'
                    className='w-full border border-gray-300 rounded-md p-2'
                  />
                </div>

                <div>
                  <label htmlFor="fullprice" className='block mb-1 font-medium'>
                    Full Size Price
                  </label>

                  <input
                    type="number"
                    onChange={(e) => handlePrices(e.target.value, 'Full')}
                    value={price[1] || ''}
                    id='fullprice'
                    placeholder='Full Price'
                    className='w-full border border-gray-300 rounded-md p-2'
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <h2 className='font-medium mb-1'>
                Select Product Category
              </h2>

              <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full p-2 border border-gray-300 rounded-md'>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pureveg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className='my-4'>
          <label htmlFor="description" className='block mb-1 font-medium'>
            Product Description
          </label>

          <textarea
            id='description'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder='Product Description'
            className='w-full border border-gray-300 rounded-md p-2'
            rows={5}
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full sm:w-48 bg-[#ff5722] text-white py-3 rounded-md cursor-pointer hover:bg-[#fd6435] transition-all'
        >
          Update Product
        </button>

      </form>
    </section>
  )
}

export default UpdateProduct
