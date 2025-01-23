import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate('/browse');
  };

  const {user} = useSelector(store=>store.auth)

  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[])
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex flex-col gap-5 my-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.span 
          className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          Top-Rated Platform for Job Seekers
        </motion.span>
        <motion.h1 
          className="text-5xl font-bold"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          Find, Apply & <br/> Land Your <span className="text-[#6A38C2]">Ideal Career</span>
        </motion.h1>
        <motion.p 
          className="font-bold text-gray-400"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          Empowering careers with endless opportunities—find, apply, and achieve your professional aspirations today!
        </motion.p>

        <motion.div 
          className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <input 
            type="text" 
            placeholder="Search for a job" 
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button className='rounded-r-full' onClick={searchJobHandler}>
            <Search className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
