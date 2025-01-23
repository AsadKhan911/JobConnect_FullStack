import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job)
  return (
    <div className="max-w-7xl mx-auto my-20">
      <motion.h1 className="text-4xl font-bold"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }} // Triggers animation when in view
        viewport={{ once: true }} // Ensures the animation runs only once
        transition={{ duration: 0.3 }}>
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {
          allJobs.length <= 0 ? <span>No jobs available! </span> : allJobs.slice(0, 6).map((job) => ( //we will use _id as index now
            <LatestJobCards key={job._id} job={job} />
          ))
        }
      </motion.div>
    </div>
  );
};

export default LatestJobs;
