import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch()

    const changeHandler = (e) => {
        setSelectedValue(e.target.value);
    };

    const filterData = [
        {
            filterType: "Location",
            array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai", "NCR"]
        },
        {
            filterType: "Industry",
            array: ["Frontend Developer", "Backend Developer", "FullStack", "Data Science"]
        },
        {
            filterType: "Salary",
            array: ["0-40k", "42-1lakh", "1Lakh to 5lakh"]
        }
    ];

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue]);

    return (
        <div className='w-full bg-white rounded-md p-4'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {
                filterData.map((data, index) => (
                    <div key={index} className="my-4">
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `r${index}-${idx}`;
                                return (
                                    <div key={idx} className='flex items-center space-x-2 my-2'>
                                        <input
                                            type="radio"
                                            name={data.filterType} // Ensures only one can be selected per category
                                            value={item} // Sets correct value
                                            checked={selectedValue === item} // Ensures correct selection
                                            onChange={changeHandler}
                                            id={itemId}
                                        />
                                        <label htmlFor={itemId}>{item}</label>
                                    </div>
                                );
                            })
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default FilterCard;
