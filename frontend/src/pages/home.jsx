import React from 'react'
import ExploreProducts from '../components/exploreProducts'
import Hero from '../components/hero'

const Home = () => {
  return (
    <main aria-label='main-body' className='mx-[2%] sm:mx-[5%]' >
      <Hero />
      <ExploreProducts />
    </main>
  )
}

export default Home
