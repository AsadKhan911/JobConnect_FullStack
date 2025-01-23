import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Navbar from "./ui/Navbar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobTable from "../components/AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialogue from "./UpdateProfileDialogue";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/customHooks/useGetAppliedJobs";

const isResume = true;

const ViewProfile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="flex items-center gap-4 sm:flex-1">
                        <Avatar className="h-24 w-24">
                            <AvatarImage className="rounded-full h-[110%] w-[100%]" src={user?.profile?.profilePic} />
                        </Avatar>
                        <div>
                            <h1 className="text-left font-medium text-xl">{user?.name}</h1>
                            <p className="text-left">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button
                        className="text-right mt-4 sm:mt-0"
                        onClick={() => setOpen(true)}
                        variant="outline"
                    >
                        <Pen />
                    </Button>
                </div>
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact />
                        <span>{user?.phone}</span>
                    </div>
                </div>
                <div className="my-5">
                    <h1 className="text-left mb-2">Skills</h1>
                    <div className="flex items-center gap-1 flex-wrap">
                        {user?.profile?.skills.length !== 0 ? (
                            user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    {isResume ? (
                        <a
                            className="text-left text-blue-500 w-full hover:underline cursor-pointer"
                            href={user?.profile?.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                           View Resume
                        </a>
                    ) : (
                        <span>NA</span>
                    )}
                </div>
                <UpdateProfileDialogue open={open} setOpen={setOpen} />
            </div>
            <div className="text-left max-w-4xl mx-auto bg-white rounded-2xl mb-10">
                <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                <AppliedJobTable />
            </div>
        </div>
    );
};

export default ViewProfile;
