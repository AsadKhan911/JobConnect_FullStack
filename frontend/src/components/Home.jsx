import HeroSection from "./HeroSection"
import Navbar from "./ui/Navbar"
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from "./LatestJobs"
import Footer from "./Footer"
import useGetAllJobs from "@/customHooks/useGetAllJobs"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Home = () => {
  useGetAllJobs()
  const { user } = useSelector(store=>store.auth)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user?.role === 'recruiter') {
      navigate('/admin/companies')
    }
  })

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/> 
    </div>
  )
}

export default Home
