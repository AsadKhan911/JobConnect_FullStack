import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../ui/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, { withCredentials: true });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)} // Navigate back on click
          className="text-blue-500 font-semibold mb-4 inline-flex items-center"
        >
          &larr; Back
        </button>
        <h1 className="font-bold text-xl my-5">Applicants {applicants?.application?.length}</h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
