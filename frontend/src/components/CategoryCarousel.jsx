import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";

const category = [
    "AI/ML Engineer",
    "Blockchain Developer",
    "Software Tester",
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Mobile App Developer",
    "UI/UX Designer",
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <Carousel className="w-full max-w-5xl mx-auto my-20">
                <CarouselContent className="flex gap-3 md:gap-4 lg:gap-6">
                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="min-w-[200px] md:min-w-[250px] lg:min-w-[200px]" // Reduced size for lg view
                        >
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="w-full bg-black text-white rounded-full text-center text-sm sm:text-base px-4 py-3"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-between mt-4">
                    <CarouselPrevious className="text-black bg-white p-2 rounded-full shadow-md hover:bg-gray-100" />
                    <CarouselNext className="text-black bg-white p-2 rounded-full shadow-md hover:bg-gray-100" />
                </div>
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
