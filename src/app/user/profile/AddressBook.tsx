'use client'
import { Input, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react';
import { districts } from './api/districts';

type Divisions = {
    key: string;
    label: string;
};

type District = {
    key: string;
    label: string;
    division: string; // Indicates which division the district belongs to
};

const AddressBook = () => {
    const divisions: Divisions[] = [
        { key: 'Dhaka', label: 'Dhaka' },
        { key: 'Chattogram', label: 'Chattogram' },
        { key: 'Khulna', label: 'Khulna' },
        { key: 'Rajshahi', label: 'Rajshahi' },
        { key: 'Barishal', label: 'Barishal' },
        { key: 'Sylhet', label: 'Sylhet' },
        { key: 'Rangpur', label: 'Rangpur' },
        { key: 'Mymensingh', label: 'Mymensingh' },
    ];

   

    const [selectedDivision, setSelectedDivision] = useState<string>('');
    console.log(selectedDivision);
    const filteredDistricts = districts.filter(
        (district) => district.division === selectedDivision
    );

    return (
        <section>
            <div>
                <h2 className="text-center text-2xl font-semibold text-primary">
                    Update Your Address
                </h2>
            </div>
            <div className="mt-5 space-y-3">
                <form>
                    <div className="grid md:grid-cols-2 gap-5">
                        {/* Division Selector */}
                        <div>
                            <label>
                                Division<span className="text-red-600 font-bold">*</span>
                            </label>
                            <Select
                                label="Select your Division"
                                className=""
                                onChange={(e) => setSelectedDivision(e.target.value)}
                                required
                            >
                                {divisions.map((division) => (
                                    <SelectItem key={division.key} value={division.key}>
                                        {division.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        {/* District Selector */}
                        <div>
                            <label>
                                District<span className="text-red-600 font-bold">*</span>
                            </label>
                            <Select
                                label="Select your District"
                                className=""
                                required
                                disabled={!selectedDivision}
                            >
                                {filteredDistricts.map((district) => (
                                    <SelectItem key={district.key} value={district.key}>
                                        {district.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddressBook;
