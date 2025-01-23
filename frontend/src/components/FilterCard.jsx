import { setSearchQuery } from "@/redux/jobSlice";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const filterData = [
  {
    filterType: "Location",
    array: ["Islamabad", "Lahore", "Karachi"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "React Native", "FullStack Developer","Devoops"],
  },
  {
    filterType: "Salary",
    array: ["80,000", "90,000", "110,000" , "120,000" , "130,000" , "140,000" , "150,000" , "200,000"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(()=> {
    dispatch(setSearchQuery(selectedValue))
  },[selectedValue , dispatch])

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="text-xl font-bold">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-4 mt-4"
      >
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-bold text-lg">{data.filterType}</h2>
            <div className="space-y-2 mt-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div className="flex items-center space-x-2" key={itemId}>
                    {/* RadioGroupItem styled with Tailwind */}
                    <RadioGroupItem
                      value={item}
                      className="w-5 h-5 rounded-full border border-gray-400 bg-white focus:bg-black focus:outline-none focus:ring-2 focus:ring-red-600"
                      id={itemId}
                    />
                    <Label
                      htmlFor={itemId}
                      className="text-sm text-gray-700"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
