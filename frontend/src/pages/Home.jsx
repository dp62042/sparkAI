import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

import React from 'react'

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <main className="flex-grow overflow-y-auto">
        <Hero />
      </main>
      <div className="sticky bottom-0 z-10">
        <Footer />
      </div>
    </div>
  )
}

export default Home
