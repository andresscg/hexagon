import React,{useEffect} from "react"
import Hero from "../components/Hero"
import Categories from "../components/Categories"
import AboutSection from "../components/AboutSection"

const Home = () => {
  useEffect(() => {
    window.scroll(0,0)
  },[])
  return (
    <div>
      <Hero />
      <Categories />
      <AboutSection />
    </div>
  )
}

export default Home
