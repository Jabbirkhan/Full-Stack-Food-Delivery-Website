import React, { useContext, useState } from 'react'
import { assets } from "./../assets/assets.js";
import { toast } from 'react-toastify';
import { Context } from '../context/context';
import axiosInstance from '../utils/axiosInstance.js';
import Loader from '../components/loader.jsx';

const AddProduct = () => {

  const { authState, setProducts, products } = useContext(Context);

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('Food provides essential nutrients for overall health and well-being');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [loader, setLoader] = useState(false);

  const handleSizes = (size) => {

    // Prevent selecting Full before Half
    if (size === "Full" && !sizes.includes("Half")) {
      return toast.error("Please select Half size first");
    }

    if (sizes.includes(size)) {
      const updatedSizes = sizes.filter((s) => s !== size); // Remove the unselected size from the sizes array

      // Remove related price when size unselects
      if (size === "Half") {
        setPrice(['', '']);
      }

      // If Full size is unselected, also unselect Half size and clear its price
      if (size === "Full") {
        setPrice([price[0] || '', '']);
      }

      setSizes(updatedSizes); // Here we update the sizes state with the new array that has the unselected size removed

    } else {
      setSizes([...sizes, size]); // Add the newly selected size to the sizes array
    }
  };

  const handlePrices = (value, size) => {

    // Half price
    if (size === "Half" && sizes[0] === "Half") {
      setPrice([value, price[1] || ""]);
    }

    // Full price
    if (size === "Full" && sizes[1] === "Full") {
      setPrice([price[0] || "", value]);
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
        const response = await axiosInstance.post(`/api/v1/admin/addproduct`, formData);
        if (response.data.success) {
          toast.success("Product added successfully.");
          setProducts((prev) => [...prev, response.data.product]);
          setImage(null);
          setName('');
          setDescription('');
          setCategory('');
          setPrice([]);
          setSizes([]);
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
      <form
        onSubmit={onSubmithandler}
        className='bg-white rounded-md p-4 sm:p-6 shadow-sm'
      >
        <div className='mb-5'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-medium mb-2'>
            Product Details
          </h1>
          <hr className='border border-gray-300' />
        </div>

        {/* Main Layout */}
        <div className='flex flex-col md:flex-row gap-6'>

          {/* Image Section */}
          <div className='w-full lg:w-1/2'>
            <label htmlFor="image" className='block cursor-pointer'>
              <img
                src={!image ? assets.upload_area : typeof image === 'string' ? image : URL.createObjectURL(image)}
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

          {/* Form Inputs */}
          <div className='w-full lg:w-1/2 flex flex-col gap-4'>

            {/* Product Name */}
            <div>
              <label htmlFor="name" className='block mb-1 font-medium'>
                Product Name
              </label>
              <input
                type="text"
                id='name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='Product Name'
                className='w-full border border-gray-300 rounded-md p-2 outline-none'
              />
            </div>

            {/* Sizes */}
            <div>
              <h2 className='font-medium mb-2'>Select Product Sizes</h2>

              <div className='flex flex-wrap gap-2'>
                <button
                  type='button'
                  onClick={() => handleSizes('Half')}
                  className={`px-4 py-2 rounded-md transition-all duration-200 cursor-pointer
              ${sizes.includes('Half')
                      ? 'bg-[#b52330] text-white'
                      : 'bg-[#fff0ef] hover:bg-[#b52330] hover:text-white'
                    }`}
                >
                  Half
                </button>

                <button
                  type='button'
                  onClick={() => handleSizes('Full')}
                  disabled={!sizes.includes('Half')}
                  className={`px-4 py-2 rounded-md transition-all duration-200 cursor-pointer
                  ${
                    !sizes.includes('Half')
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : sizes.includes('Full')
                      ? 'bg-[#b52330] text-white cursor-pointer'
                      : 'bg-[#fff0ef] hover:bg-[#b52330] hover:text-white cursor-pointer'
                  }`}
                >
                  Full
                </button>
              </div>
            </div>

            {/* Prices */}
            <div>
              <h2 className='font-medium mb-2'>Add Product Prices</h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div>
                  <label htmlFor="halfprice" className='block mb-1 font-medium'>
                    Half Size Price
                  </label>

                  <input
                    type="number"
                    onChange={(e) => handlePrices(e.target.value, 'Half')}
                    value={price[0] || ''}
                    disabled={sizes[0] !== 'Half'}
                    id='halfprice'
                    placeholder='Half Price'
                    className='w-full border border-gray-300 rounded-md p-2 disabled:bg-gray-100 disabled:cursor-not-allowed'
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
                    disabled={sizes[1] !== 'Full'}
                    id='fullprice'
                    placeholder='Full Price'
                    className='w-full border border-gray-300 rounded-md p-2 disabled:bg-gray-100 disabled:cursor-not-allowed'
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <h2 className='font-medium mb-1'>Select Product Category</h2>

              <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full p-2 border border-gray-300 rounded-md'>
                <option value="" disabled>
                  Select Category
                </option>
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

        {/* Button */}
        <button
          type='submit'
          className='w-full sm:w-40 bg-[#ff5722] text-white py-3 rounded-md cursor-pointer hover:bg-[#fd6435] transition-all'
        >
          Add Product
        </button>
      </form>
    </section>
  )
}

export default AddProduct
