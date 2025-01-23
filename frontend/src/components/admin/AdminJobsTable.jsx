import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Edit2, MoreHorizontal, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const { allAdminJobs } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs || []);
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = (allAdminJobs || []).filter(job => {
            if (!searchCompanyByText) return true;
            return job?.company?.companyName.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterJobs(filtered);
    }, [companies, searchCompanyByText, allAdminJobs]);

    if (!allAdminJobs) {
        return <div>Loading...</div>; // Or any other loading state you prefer
    }

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="sm:table-cell">Company Name</TableHead>
                        <TableHead className="sm:table-cell">Role</TableHead>
                        <TableHead className="sm:table-cell">Posted On</TableHead>
                        <TableHead className="sm:table-cell">Type</TableHead>
                        <TableHead className="sm:table-cell text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.map(job => (
                        <TableRow key={job._id}>
                            <TableCell className="text-left">{job?.company?.companyName}</TableCell>
                            <TableCell className="text-left">{job?.title}</TableCell>
                            <TableCell className="text-left">{job.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-left">{job.jobType}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div onClick={() => navigate(`/edit/job/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                            <Edit2 className="w-4" />
                                            <span className="p-4">Edit</span>
                                        </div>
                                        <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                                            <Eye className="w-4" />
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
