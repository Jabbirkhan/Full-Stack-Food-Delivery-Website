import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../context/context';

const ExploreProducts = () => {

    const { currency, products } = useContext(Context);

    return (
        <section aria-label='Top-products'>
            <h1 className='text-2xl font-bold my-10 text-left'>Explore <span className='text-[#b52330]'>Products</span></h1>

            <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 mb-20'>
                {products.filter((product) => product.available === true).slice(0, 8).map((item, index) => (
                    <Link to={`/detail/${item._id}`} key={index} className='bg-white rounded-md p-3 shadow-lg'>
                        <img src={item.image} className='rounded-md object-cover w-full' alt={item.name + 'image'} />
                        <h2 className='text-xl font-semibold'>{item.name}</h2>
                        <p className='text-gray-500 line-clamp-1 mb-2'>{item.description}</p>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-xl font-medium text-[#b52330]'>{currency}{item.price[0]}:00</h3>
                            <button className='flex justify-center items-center w-8 h-8 pb-1 shrink-0 rounded-full bg-[#b52330] text-white text-xl leading-none cursor-pointer'>
                                +
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default ExploreProducts
