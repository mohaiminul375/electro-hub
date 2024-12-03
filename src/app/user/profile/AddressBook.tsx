'use client';
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { districts } from './api/districts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { updateAddressInfo, useAddressInfo } from './api/route';
import Loading from '@/app/loading';

type Inputs = {
    email: string;
    division: string | [];
    district: string;
    full_address: string;
    uuid: string | undefined;
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

interface Address {
    email?: string | null;
    address?: object;
    division?: string;
    full_address?: string;
    district?: string;
    uuid: string;
}
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
const AddressBook = () => {
    const addressUpdate = useAddressInfo();
    const { data, status } = useSession();
    const [selectedDivision, setSelectedDivision] = useState<string>();
    // React Hook Form
    const address_info = data?.user?.address;
    const uuid = data?.user?.uuid;
    // console.log('email in address')
    // console.log(address_info, 'address info')
    const { division, district, full_address } = address_info as Address || {};
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        mode: 'onBlur', // Trigger validation on blur
    });

    if (status === 'loading') {
        return <Loading></Loading>;
    }

    // Loading state

    // console.log(division, district, full_address)


    const filteredDistricts: District[] = districts.filter(
        (district: District) =>
            district.division === selectedDivision ||
            (!selectedDivision && district.division === division)
    );
    const onSubmit: SubmitHandler<Inputs> = async (address_info: Inputs) => {
        address_info.uuid = uuid;
        address_info.division = selectedDivision || '';
        console.log(address_info,'before server');
        const res = await addressUpdate.mutateAsync(address_info);
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
                                defaultSelectedKeys={division ? [division] : []}

                                // selectedKeys='Dhak??>/'
                                label="Select your Division"
                                onChange={(e) => setSelectedDivision(e.target.value)}
                                // defaultValue="Dhaka"
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
                                // defaultSelectedKeys={district}
                                defaultSelectedKeys={district ? [district] : []}
                                label="Select your District"
                                required
                                isDisabled={!selectedDivision && !division}
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
