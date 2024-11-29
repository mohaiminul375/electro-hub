'use client';
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { districts } from './api/districts';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    division: string;
    district: string;
    full_address: string;
};

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
    const filteredDistricts = districts.filter(
        (district) => district.division === selectedDivision
    );

    // react hook form
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        mode: 'onBlur', // Trigger validation on blur
    });

    const onSubmit: SubmitHandler<Inputs> = async (address_info: Inputs) => {
        address_info.division = selectedDivision;
        console.log(address_info);
    };

    return (
        <section>
            <div>
                <h2 className="text-center text-2xl font-semibold text-primary">
                    Update Your Address
                </h2>
            </div>
            <div className="mt-5 space-y-3">
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid md:grid-cols-2 gap-5">
                        {/* Division Selector */}
                        <div>
                            <label>
                                Division
                                <span className="text-red-600 font-bold">*</span>
                            </label>
                            <Select
                                label="Select your Division"
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
                                District
                                <span className="text-red-600 font-bold">*</span>
                            </label>
                            <Select
                                label="Select your District"
                                required
                                disabled={!selectedDivision}
                                {...register('district', { required: 'District is required' })}
                            >
                                {filteredDistricts.map((district) => (
                                    <SelectItem key={district.key} value={district.key}>
                                        {district.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            {errors.district && (
                                <p className="text-red-600 text-sm">{errors.district.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="w-full">
                        <label>
                            Full Address (Upazila, House, Road)
                            <span className="text-red-600 font-bold">*</span>
                        </label>
                        <Textarea
                            placeholder="Enter full address"
                            {...register('full_address', { required: 'Full address is required' })}
                        />
                        {errors.full_address && (
                            <p className="text-red-600 text-sm">{errors.full_address.message}</p>
                        )}
                    </div>
                    <div className="my-10">
                        <button className="w-full text-white py-2 rounded-md bg-primary">Update</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddressBook;
