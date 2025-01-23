import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import PropTypes from "prop-types";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/job/description/${job._id}`)}
      className="p-5 rounded-md bg-white border border-gray-100 cursor-pointer transition-transform duration-200 hover:shadow-lg hover:scale-105"
    >
      <div className="mb-4">
        <h1 className="font-medium text-lg sm:text-xl">{job?.company?.companyName}</h1>
        <p className="text-sm sm:text-base text-gray-500">{job?.location}</p>
      </div>

      <div className="mb-4">
        <h1 className="font-bold text-lg sm:text-xl my-2">{job?.title}</h1>
        <p className="text-sm sm:text-base text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold bg-white hover:bg-slate-50">{job?.position} Positions</Badge>
        <Badge className="text-red-600 font-bold bg-white hover:bg-slate-50">{job?.jobType}</Badge>
        <Badge className="text-[#7209b7] font-bold bg-white hover:bg-slate-50">{job?.salary} PKR</Badge>
      </div>
    </div>
  );
};

LatestJobCards.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    jobType: PropTypes.string,
    salary: PropTypes.string,
    company: PropTypes.shape({
      companyName: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default LatestJobCards;
