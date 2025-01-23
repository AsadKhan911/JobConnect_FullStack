import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import Navbar from "../ui/Navbar";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import useGetJobById from "@/customHooks/useGetJobById";

const EditJob = () => {
  const params = useParams();

  // Custom hook to fetch job details
  useGetJobById(params.id);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const { singleJobById } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const jobId = params.id;

      const res = await axios.put(
        `${JOB_API_ENDPOINT}/update/${jobId}`,
        input,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleJobById) {
      setInput({
        title: singleJobById.title || "",
        description: singleJobById.description || "",
        requirements: singleJobById.requirements?.join(", ") || "", // Convert array to comma-separated string
        salary: singleJobById.salary || "",
        location: singleJobById.location || "",
        jobType: singleJobById.jobType || "",
        experience: singleJobById.experience || "",
        position: singleJobById.position || "",
        companyId: singleJobById.company || "",
      });
    }
  }, [singleJobById]);

  if (!singleJobById) {
    return (
      <div>
        <Navbar />
        <div className="max-w-xl mx-auto my-10">
          <h1>Loading Job Data...</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/jobs")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Edit Job</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type="text"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditJob;
