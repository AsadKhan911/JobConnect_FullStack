import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filteredCompanies, setFilteredCompanies] = useState(companies);
    const navigate = useNavigate()

    useEffect(() => {
        const filtered = companies.filter(company => {
            if (!searchCompanyByText) return true;
            return company.companyName.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilteredCompanies(filtered);
    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full table-auto">
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden sm:table-cell">Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                        <TableHead className="hidden sm:table-cell">Website</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCompanies.map(company => (
                        <TableRow key={company.id}>
                            <TableCell className="hidden sm:table-cell">
                                <Avatar>
                                    <AvatarImage className="w-[40px] h-[40px]" src={company.logo || "default-logo.png"} />
                                </Avatar>
                            </TableCell>
                            <TableCell className="text-left">{company.companyName}</TableCell>
                            <TableCell className="hidden sm:table-cell text-left">{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="hidden sm:table-cell text-left cursor-pointer">
                                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    {company.website}
                                </a>
                            </TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover className="w-32">
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                            <Edit2 className="w-4" />
                                            <span className="p-4">Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Mobile Layout */}
            <div className="block sm:hidden mt-6">
                {filteredCompanies.map(company => (
                    <div key={company.id} className="mb-6 p-4 border border-gray-200 rounded-md">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage className="w-[40px] h-[40px]" src={company.logo || "default-logo.png"} />
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-semibold">{company.companyName}</span>
                                <span className="text-sm text-gray-500">{company.createdAt.split("T")[0]}</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                {company.website}
                            </a>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <Popover className="w-32">
                                <PopoverTrigger>
                                    <MoreHorizontal className="cursor-pointer" />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                        <Edit2 className="w-4" />
                                        <span className="p-4">Edit</span>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompaniesTable;
