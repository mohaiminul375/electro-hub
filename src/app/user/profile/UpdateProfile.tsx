import { Input, Select, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateUserInfo } from './api/route';
import Loading from '@/app/loading';
type Inputs = {
    name?: string | undefined;
    email?: string | undefined;
    phone_number?: string | undefined;
    DOB?: string | undefined;
    gender?: string | undefined;
    user_info?: object;
    uuid: string;
}
interface User {
    role?: string;
    image?: string;
    name?: string | undefined;
    email?: string | null;
    phone_number?: string;
    gender?: string;
    DOB?: string;
    uuid: string;
}
type Gender = {
    key: string,
    label: string,
}
const UpdateProfile = () => {
    const updateInfo = useUpdateUserInfo();
    const { data, status } = useSession();
    const user = data?.user as User;
    const { name, email, phone_number, gender, DOB, uuid } = user || {};
    // react hook form
    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors }
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (user_info: Inputs) => {

        // console.log(user_info)
        user_info.uuid = uuid;
        const res = await updateInfo.mutateAsync(user_info)
        // console.log('response', res)
    }

    // Handle loading state
    // console.log(status);
    // TODO: Loading
    if (status === 'loading') {
        return <Loading></Loading>
    }


    // genders
    const genders: Gender[] = [
        { key: "Male", label: "Male" },
        { key: "Female", label: "Female" },
        { key: "Custom", label: "Custom" },
    ]

    return (
        <section>
            <div className=''>
                <h2 className='text-center text-2xl font-semibold text-primary'>Update Your Profile</h2>
            </div>
            <div className='mt-5 space-y-3'>
                <form onSubmit={handleSubmit(onSubmit)}>                <div className='grid md:grid-cols-2 gap-5'>
                    <div>
                        <label>Your Name<span className='text-red-600 font-bold'>*</span></label>
                        <Input className='h-10'
                            variant='bordered'
                            type="text"
                            label=""
                            defaultValue={name}
                            placeholder='input your name'
                            {...register('name')}
                            required
                        />
                    </div>
                    <div>
                        <label>Your Email<span className='text-red-600 font-bold'>*</span></label>
                        <Input
                            disabled={!!email}
                            className='h-10'
                            variant='bordered'
                            type="email" label=""
                            placeholder='input your email'
                            defaultValue={email || ''}
                            {...register('email')}
                            required
                        />
                    </div>

                </div>
                    <div className='grid md:grid-cols-2 gap-5'>
                        <div>
                            <label>Phone<span className='text-red-600 font-bold'>*</span></label>
                            <Input
                                className="h-10"
                                variant="bordered"
                                type="tel"
                                placeholder=""
                                defaultValue={phone_number}
                                {...register('phone_number', {
                                    required: 'Phone number is required',
                                    validate: (value) =>
                                        value?.length === 11 || 'Phone number must be exactly 11 characters long',
                                })}
                            />
                            {errors.phone_number && (
                                <p className="text-red-600 text-sm mt-1">{errors.phone_number.message}</p>
                            )}
                        </div>
                        <div className=''>
                            <label>Your Gender<span className='text-red-600 font-bold'>*</span></label>
                            <Select
                                defaultSelectedKeys={gender ? [gender] : []}
                                label="Select your Gender"
                                className=""
                                value={gender}
                                {...register('gender')}
                                required
                            >
                                {genders.map((gender) => (
                                    <SelectItem key={gender.key}>
                                        {gender.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                    </div>
                    <div className='grid md:grid-cols-2 gap-5'>
                        <div>
                            <label>Date of Birth<span className='text-red-600 font-bold'>*</span></label>
                            <Input
                                defaultValue={DOB}
                                className='h-10' variant='bordered' type="date" label="" placeholder=''
                                {...register('DOB')}
                                required
                            />
                        </div>
                    </div>

                    <div className='mt-5'>
                        <button className='w-full text-white py-2 rounded-md bg-primary'>Update</button>
                    </div>
                </form>

            </div>

        </section>
    );
};

export default UpdateProfile;