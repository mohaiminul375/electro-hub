'use client';
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { districts } from './api/districts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { updateAddressInfo } from './api/route';

type Inputs = {
    email: string;
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
    division: string;
};

// interface Address {
//   email?: string | null;
//   address?: object;
//   division?: string;
//   full_address?: string;
//   district?: string;
// }

const AddressBook = () => {
    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        mode: 'onBlur', // Trigger validation on blur
    });

    // Division options
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

    const filteredDistricts: District[] = districts.filter(
        (district: District) => district.division === selectedDivision
    );





    const { data, status } = useSession();

    // Loading state
    const address_info = data?.user?.address;
    const email = data?.user?.email;
    console.log(email, 'email in address')
    const { division, district, full_address } = address_info || {};
    // On form submission
    if (status === 'loading') {
        return <p>Loading.......</p>;
    }
    const onSubmit: SubmitHandler<Inputs> = async (address_info: Inputs) => {
        address_info.email = email || '';
        address_info.division = selectedDivision;
        console.log(address_info);
        const res = await updateAddressInfo(address_info);
        console.log('address res', res);
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
                                value={division}
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
                                value={district}
                                label="Select your District"
                                required
                                isDisabled={!selectedDivision}
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
                            defaultValue={full_address}
                            placeholder="Enter full address"
                            {...register('full_address', { required: 'Full address is required' })}
                        />
                        {errors.full_address && (
                            <p className="text-red-600 text-sm">{errors.full_address.message}</p>
                        )}
                    </div>
                    <div className="my-10">
                        <button type="submit" className="w-full text-white py-2 rounded-md bg-primary">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddressBook;
