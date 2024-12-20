"use client"
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useForm, SubmitHandler } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAddProduct } from './api/route';
type Inputs = {
    product_name: string;
    product_price: number | string;
    laptop_processor: string;
    laptop_ram: string;
    laptop_storage: string;
    laptop_display: string;
    laptop_ports: string;
    laptop_battery: string;
    laptop_description: string;
    laptop_img: string;
    // -------------
    monitor_screen: string;
    monitor_resolution: string;
    monitor_ports: string;
    monitor_description: string;
    // ----------
    smart_phone_model: string;
    smart_phone_storage: string;
    smart_phone_ram: string;
    smart_phone_camera: string;
    smart_phone_battery: string;
    // "smart-phone_img": string;
    smart_phone_description: string;

    // -----------
    smart_watch_model: string;
    smart_watch_battery: string;
    // "smart-watch_img": string;
    smart_watch_features: string;
    smart_watch_description: string;
    // ---------------
    smart_tv_ram: string;
    smart_tv_screen: string;
    smart_tv_resolution: string;
    // "smart-tv_img": string;
    smart_tv_features: string;
    smart_tv_description: string;
    smart_tv_ports: string;
    img: File[];
    posted_date?: string;
    image?: string;
    category: string;
    color: string;
    brand: string;

};
type BrandOptions = {
    laptop: string[];
    monitor: string[];
    smart_phone: string[];
    smart_watch: string[];
    smart_tv: string[];
};
const categories = [
    { key: 'laptop', label: 'Laptop' },
    { key: 'monitor', label: 'Monitor' },
    { key: 'smart_phone', label: 'Smart-Phone' },
    { key: 'smart_watch', label: 'Smart_Watch' },
    { key: 'smart_tv', label: 'Smart_TV' },
    // { key: 'Smart-Phone', label: 'Smart-Phone' },
]
const brandOptions: BrandOptions = {
    laptop: ["Dell", "HP", "Asus", "Lenovo", "Walton", "not specified"],
    monitor: ["Samsung", "LG", "Acer", "Dell", "BenQ"],
    smart_phone: ["Samsung", "OnePlus", "Xiaomi", "Realme", "Google", "not specified"],
    smart_watch: ["Samsung", "Garmin", "Fitbit", "Amazfit", "not specified"],
    smart_tv: ["Sony", "LG", "Samsung", "Vizio", "TCL", "not specified"],
};
const AddProduct = () => {
    const addProduct = useAddProduct();
    // handle category
    const [category, setCategory] = useState("");
    const [color, setColor] = useState('Select a color');
    const [brand, setBrand] = useState('');


    // react hook form
    const { register,
        handleSubmit,
        reset,
        //  formState: { errors } 
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (product: Inputs) => {
        // console.log(product)
        // error handling for drop down menue
        if (!category) {
            return toast.error('please input a category')
        }
        // else if (selectedColor === "Select a color") {
        //     return toast.error('please input a color')

        // }
        else if (brand === "Select a brand") {
            return toast.error('please select a brand')
        }
        //    get img
        const img = { image: product.img[0] }
        console.log(product)
        console.log(img)

        // check img
        if (!product.img || product.img.length === 0) {
            return toast.error('No image found please try again');
        }

        // generate img
        const { data: res } = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API}`, img, {
            headers: { "content-type": "multipart/form-data" },
        });
        // get url form image bb
        const img_url = res.data.display_url;
        if (!img_url) {
            return toast.error('error form image server please try again or contact developer')
        }
        console.log(img_url);
        product.product_price = parseFloat(product.product_price as string)
        product.category = category;
        product.brand = brand;
        product.color = color;
        product.posted_date = new Date().toLocaleString();
        product.img = img_url;
        console.log(product);

        try {
            const response = await addProduct.mutateAsync(product);
            console.log('Added:', response);
            if (response.insertedId) {
                reset();
                toast.success('Product added successfully');
            } else {
                toast.error('Operation failed. Try later.');
            }
        } catch (error) {
            throw error
            toast.error('An error occurred while adding the product');
        }
    };


    return (
        <section>
            <div className="mt-6">
                {/* Back Button */}
                <div className="inline-block">
                    <Link
                        href="/admin-dashboard"
                        className="flex items-center gap-3 rounded-lg bg-gray-100 border border-gray-300 text-lg px-4 py-2 text-accent hover:bg-gray-200 hover:border-gray-400 transition duration-200"
                    >
                        <FaArrowLeft className="text-accent" />
                        <span>Back to Dashboard</span>
                    </Link>
                </div>

                {/* Add Product Header */}
                <div className="mb-8 mt-4 text-center">
                    <h3 className="text-3xl font-bold text-accent">Add Product</h3>
                    <h4 className="text-md text-accent mt-2">Easily add a new product to your store.</h4>
                </div>
            </div>

            {/* form */}
            <div className='bg-white p-8 rounded-md shadow-2xl'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-6'>
                    {/* row-1 */}
                    <div className='grid md:grid-cols-2 gap-5'>
                        <div>
                            <label>Product Name<span className='text-red-600 font-bold'>*</span></label>
                            <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter product name' required
                                {...register('product_name')}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label>Product Category<span className='text-red-600 font-bold'>*</span></label>
                            <Select
                                isRequired
                                onChange={(e) => setCategory(e.target.value)}
                                // {...register()}
                                label="Select a category" className="w-full h-10 mt-0">
                                {categories.map((category) => (
                                    <SelectItem key={category.key}>{category.label}</SelectItem>
                                ))}
                            </Select>
                        </div>

                    </div>
                    {/* row-2 & dynamic start */}
                    {
                        category &&
                        <div className='grid md:grid-cols-2 gap-5'>
                            <div>
                                <label>Product Price<span className='text-red-600 font-bold'>*</span></label>
                                <Input className='h-10' variant='bordered' type="number" label="" placeholder='Enter product price'
                                    {...register('product_price')}
                                    required
                                />
                            </div>
                            {/* brand manage */}
                            <div className='flex flex-col'>
                                <label>Select Brand<span className='text-red-600 font-bold'>*</span></label>
                                <Select
                                    isRequired
                                    onChange={(e) => setBrand(e.target.value)}
                                    label="Select a Brand" className="w-full mt-2 sm:mt-0">
                                    {brandOptions[category as keyof BrandOptions]?.map((brand) => (
                                        <SelectItem key={brand} value={brand}>
                                            {brand}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                        </div>
                    }
                    {/* dynamic row for category */}
                    {/* laptop */}
                    <section>
                        {
                            category === 'laptop' && (<div className='space-y-3'>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Processor<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter processor configuration'
                                            {...register('laptop_processor')}
                                        />
                                    </div>
                                    <div>
                                        <label>RAM<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter ram storage'
                                            {...register('laptop_ram')}
                                            required
                                        />
                                    </div>
                                </div>
                                {/* row-2 laptop */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Storage<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter 
                                        storage'
                                            {...register('laptop_storage')}
                                            required />
                                    </div>
                                    <div>
                                        <label>Display<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter display info'
                                            {...register('laptop_display')}

                                            required
                                        />
                                    </div>
                                </div>
                                {/* row-3 laptop */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Battery<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter battery info'
                                            {...register('laptop_battery')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Ports<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter port availability'
                                            {...register('laptop_ports')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>image<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="file" label="" placeholder='Enter battery info'
                                            {...register('img')}
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label>color<span className='text-red-600 font-bold'>*</span></label>
                                        <Select
                                            isRequired
                                            onChange={(e) => setColor(e.target.value)}
                                            label="Select a color" className="w-full mt-2 sm:mt-0">
                                            <SelectItem key='Black' value='Black' >
                                                Black
                                            </SelectItem>
                                            <SelectItem key='White' value='White' >
                                                White
                                            </SelectItem>
                                            <SelectItem key='Gray' value='Gray' >
                                                Gray
                                            </SelectItem>
                                            <SelectItem key='Blue' value='Blue' >
                                                Blue
                                            </SelectItem>

                                        </Select>
                                    </div>

                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            placeholder="Enter laptop description"
                                            {...register('laptop_description')}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            )
                        }
                    </section>
                    {/* Enter field for monitor monitor */}
                    <section>
                        {
                            category === 'monitor' && <div className='space-y-3'>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Screen Size<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen size'
                                            {...register('monitor_screen')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Screen Resolution
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen resolution'
                                            {...register('monitor_resolution')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Ports<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter ports info'
                                            {...register('monitor_ports')}
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label>color<span className='text-red-600 font-bold'>*</span></label>
                                        <Select
                                            isRequired
                                            onChange={(e) => setColor(e.target.value)}
                                            label="Select a color" className="w-full mt-2 sm:mt-0">
                                            <SelectItem key='Black' value='Black' >
                                                Black
                                            </SelectItem>
                                            <SelectItem key='White' value='White' >
                                                White
                                            </SelectItem>
                                            <SelectItem key='Gray' value='Gray' >
                                                Gray
                                            </SelectItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>image<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="file" label="" placeholder=''
                                            {...register('img')}
                                            required
                                        />
                                    </div>

                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            placeholder="Enter laptop description"
                                            {...register('monitor_description')}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </section>
                    {/* Enter field for smart phone */}
                    <section>
                        {
                            category === 'smart_phone' && <div className='space-y-3'>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Model<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter phone model'
                                            {...register('smart_phone_model')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Storage
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter phone Storage'
                                            {...register('smart_phone_storage')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Ram<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter ram storage'
                                            {...register('smart_phone_ram')}
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label>color<span className='text-red-600 font-bold'>*</span></label>
                                        <Select
                                            isRequired
                                            onChange={(e) => setColor(e.target.value)}
                                            label="Select a color" className="w-full mt-2 sm:mt-0">
                                            <SelectItem key='Black' value='Black' >
                                                Black
                                            </SelectItem>
                                            <SelectItem key='White' value='White' >
                                                White
                                            </SelectItem>
                                            <SelectItem key='Gray' value='Gray' >
                                                Gray
                                            </SelectItem>
                                            <SelectItem key='Blue' value='Blue' >
                                                Blue
                                            </SelectItem>

                                        </Select>
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className=''>
                                        <label>Camera<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter camera info'
                                            {...register('smart_phone_camera')}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className=''>
                                            <label>Battery<span className='text-red-600 font-bold'>*</span></label>
                                            <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter battery info'
                                                {...register('smart_phone_battery')}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>image<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="file" label="" placeholder='Enter battery info'
                                            {...register('img')}
                                            required
                                        />
                                    </div>

                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            placeholder="Enter smart-phone description"
                                            {...register('smart_phone_description')}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </section>
                    {/* Enter field for smart Watch */}
                    <section>
                        {
                            category === 'smart_watch' && <div className='space-y-3'>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Model<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter watch model'
                                            {...register('smart_watch_model')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Battery
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter phone Storage'
                                            {...register('smart_watch_battery')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>image<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="file" label="" placeholder='Enter battery info'
                                            {...register('img')}
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label>color<span className='text-red-600 font-bold'>*</span></label>
                                        <Select
                                            isRequired
                                            onChange={(e) => setColor(e.target.value)}
                                            label="Select a color" className="w-full mt-2 sm:mt-0">
                                            <SelectItem key='Black' value='Black' >
                                                Black
                                            </SelectItem>
                                            <SelectItem key='White' value='White' >
                                                White
                                            </SelectItem>
                                            <SelectItem key='Gray' value='Gray' >
                                                Gray
                                            </SelectItem>
                                            <SelectItem key='Blue' value='Blue' >
                                                Blue
                                            </SelectItem>

                                        </Select>
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className=''>
                                        <label>Features<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter Features'
                                            {...register('smart_watch_features')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            placeholder="Enter smart-watch description"
                                            {...register('smart_watch_description')}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </section>
                    {/* Enter field for smart Tv */}
                    <section>
                        {
                            category === 'smart_tv' && <div className='space-y-3'>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Screen Size<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen size'
                                            {...register('smart_tv_screen')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Resolution
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen resolution'
                                            {...register('smart_tv_resolution')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>image<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="file" label="" placeholder='Enter battery info'
                                            {...register('img')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Ram<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter ram storage'
                                            {...register('smart_tv_ram')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className=''>
                                        <label>Features<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter Features'
                                            {...register('smart_tv_features')}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className=''>
                                            <label>Ports<span className='text-red-600 font-bold'>*</span></label>
                                            <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter ports info'
                                                {...register('smart_tv_ports')}
                                                required
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            placeholder="Enter smart-tv description"
                                            {...register('smart_tv_description')}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </section>
                    <div
                        className='mt-5'>
                        <button
                            disabled={!category}
                            className='w-full text-center bg-primary py-2 text-white rounded-md disabled:cursor-not-allowed'>Add Product</button>
                    </div>
                </form >

            </div >
        </section >
    );
};

export default AddProduct;
