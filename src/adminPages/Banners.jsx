import React from 'react'
import HeroSlider from '../adminComponents/HeroSlider'
import BannerUpdateSection from '../adminComponents/BannerUpdateSection'
export default function Banners() {
  return (
    <div>
      <section>
        <HeroSlider></HeroSlider>
      </section>
      <section>
        <BannerUpdateSection></BannerUpdateSection>
      </section>
    </div>
  )
}
