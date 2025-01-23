import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useNavigate } from "react-router-dom";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow className='font-bold text-black'>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length <= 0 ? <span>You have not applied to any jobs yet</span> : allAppliedJobs.map((appjob) => (
              <TableRow key={appjob._id} onClick={() => navigate(`/job/description/${appjob?.job?._id}`)}>
                <TableCell>{appjob?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{appjob?.job?.title}</TableCell>
                <TableCell>{appjob?.job?.company?.companyName}</TableCell>
                <TableCell className='text-right'>
                  <Badge className={`${appjob?.status === "rejected" ? 'bg-red-600' : appjob?.status === 'pending' ? 'bg-gray-400' : 'bg-green-600'}`}>
                    {appjob?.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
