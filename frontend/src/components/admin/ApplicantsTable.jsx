import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {

    const statusHandler = async (status , id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, {status}, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const { applicants } = useSelector(store => store.application);
    
    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableCaption>A list of users applied to this job</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.application?.map((item, applicant) => (
                            <TableRow key={applicant._id}>
                                <TableCell className='text-left'>{item?.applicant?.name}</TableCell>
                                <TableCell className='text-left'>{item?.applicant?.email}</TableCell>
                                <TableCell className='text-left'>{item?.applicant?.phone}</TableCell>
                                <TableCell className='text-left'>
                                    {
                                        item?.applicant?.profile?.resume
                                            ? <a className="text-blue-700 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">View</a>
                                            : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell className='text-left'>{item?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {shortListingStatus.map((status, index) => (
                                                <div onClick={() => statusHandler(status, item._id)} key={index} className="flex w-fit items-center my-2 cursor-pointer">
                                                    <span>{status}</span>
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
