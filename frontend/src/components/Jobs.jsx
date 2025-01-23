import Navbar from "./ui/Navbar";
import Job from './Job';
import FilteCard from './FilterCard';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.salary.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [searchQuery, allJobs]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilteCard />
          </div>
          {
            filterJobs.length <= 0 ? <span>Job not found</span> : (
              <div className="flex-1 pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
                  {
                    filterJobs.map((job) => (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }} // Triggers animation when in view
                        viewport={{ once: true }} // Ensures the animation runs only once
                        transition={{ duration: 0.3 }}
                      >
                        <Job job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Jobs;
