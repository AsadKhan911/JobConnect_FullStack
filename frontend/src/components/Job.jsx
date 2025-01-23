import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Job = ({ job }) => {
    const daysAgo = (mongoTime) => {
        const createdAt = new Date(mongoTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 overflow-hidden">
            {/* Job Header */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {
                    job?.createdAt ? daysAgo(job?.createdAt) <= 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`
                        : "Date not specified"
                    }
                </p>

                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-2 my-2 ">
                <div className="p-6" size="icon">
                    <Avatar>
                        <AvatarImage className="w-[80px] h-[80px]" src={job?.company?.logo || "/default-avatar.png"} alt="Company Logo" />
                    </Avatar>
                </div>
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.companyName || "Unknown Company"}</h1>
                    <p className="text-sm text-gray-500">{job?.location || "Location not specified"}</p>
                </div>
            </div>

            {/* Job Title & Description */}
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>

            {/* Job Details */}
            <div className="flex items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold bg-white hover:bg-slate-50">
                    {job?.position} {job?.position === 1 ? "Position" : "Positions"}
                </Badge>

                <Badge className="text-red-600 font-bold bg-white hover:bg-slate-50">
                    {job?.jobType || "Part Time"}
                </Badge>

                <Badge className="text-[#7209b7] font-bold bg-white hover:bg-slate-50">
                    {job?.salary ? `${job?.salary} PKR` : "Salary not specified"}
                </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-4">
                <Link to={`/job/description/${job?._id}`}>
                    <Button className="bg-white text-black hover:bg-slate-50" variant="outline">
                        Details
                    </Button>
                </Link>
            </div>
        </div>
    );
};

Job.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        position: PropTypes.number.isRequired,
        jobType: PropTypes.string,
        salary: PropTypes.string,
        company: PropTypes.shape({
            companyName: PropTypes.string.isRequired,
            logo: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

Job.defaultProps = {
    job: {
        jobType: "Part Time",
        salary: null,
    },
};

export default Job;
