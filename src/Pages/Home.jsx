import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import NewsletterBox from '../Components/NewsLetterBox'
import ChatButton from './ChatButton'

const Home = () => {
  
  return (
    <div>
  <Hero/>
  <LatestCollection/>
  <BestSeller/>
  {/* <OurPolicy/> */}
  {/* <NewsletterBox/> */}
  <ChatButton/>
  
    </div>
  )
}

export default Home