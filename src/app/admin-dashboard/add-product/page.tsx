"use client"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Textarea } from '@nextui-org/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useForm, SubmitHandler } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAddProduct } from './api/route';
type Inputs = {
    product_name: string;
    product_price: string;
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
    "smart-phone_model": string;
    "smart-phone_storage": string;
    "smart-phone_ram": string;
    "smart-phone-camera": string;
    "smart-phone_battery": string;
    // "smart-phone_img": string;
    "smart-phone_description": string;

    // -----------
    "smart-watch_model": string;
    "smart-watch_battery": string;
    // "smart-watch_img": string;
    "smart-watch_features": string;
    "smart-watch_description": string;
    // ---------------
    "smart-tv_ram": string;
    "smart-tv_screen": string;
    "smart-tv_resolution": string;
    // "smart-tv_img": string;
    "smart-tv_features": string;
    "smart-tv_description": string;
    "smart-tv_ports": string;
    img: File[];
    posted_date?: string;
    image?: string;
    category: string;
    color: string;
    brand: string;

};

const AddProduct = () => {
    const addProduct = useAddProduct();
    // handle category
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof brandOptions | "Select a category">("Select a category");
    const [selectedColor, setSelectedColor] = useState('Select a color');
    const [selectedBrand, setSelectedBrand] = useState('Select a brand');

    const handleSelectionChange = (key: keyof typeof brandOptions) => {
        setSelectedCategory(key);
        setSelectedBrand("Select a brand");
    };

    const handleColorChange = (key: string) => {
        setSelectedColor(key);
    };

    const brandOptions = {
        laptop: ["Dell", "HP", "Asus", "Lenovo", "walton"],
        monitor: ["Samsung", "LG", "Acer", "Dell", "BenQ"],
        "smart-phone": ["Samsung", "OnePlus", "Xiaomi", "Realme", "Google"],
        "smart-watch": ["Samsung", "Garmin", "Fitbit", "Amazfit"],
        "smart-tv": ["Sony", "LG", "Samsung", "Vizio", "TCL"]
    };

    // react hook form

    const { register,
        handleSubmit,
        reset, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (product: Inputs) => {
        // console.log(product)
        // error handling for drop down menue
        if (selectedCategory == 'Select a category') {
            return toast.error('please input a category')
        }
        // else if (selectedColor === "Select a color") {
        //     return toast.error('please input a color')

        // }
        else if (selectedBrand === "Select a brand") {
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
        product.category = selectedCategory;
        product.brand = selectedBrand;
        product.color = selectedColor;
        product.posted_date = new Date().toLocaleString();
        product.img = img_url;
        // console.log(product);

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
                    className='space-y-3'>
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
                            <Dropdown
                                aria-required
                                className='w-full'>
                                <DropdownTrigger>
                                    <Button variant="bordered">
                                        {selectedCategory}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu

                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    // selectedKeys={selectedKeys}
                                    onSelectionChange={(keys) => {
                                        const key = Array.from(keys)[0] as keyof typeof brandOptions;
                                        if (key) {
                                            handleSelectionChange(key);
                                        }
                                    }}
                                >
                                    <DropdownItem key="laptop">Laptop</DropdownItem>
                                    <DropdownItem
                                        key="monitor">Monitor</DropdownItem>
                                    <DropdownItem key="smart-phone">Smart Phone</DropdownItem>
                                    <DropdownItem key="smart-watch">Smart Watch</DropdownItem>
                                    <DropdownItem key="smart-tv">Smart TV</DropdownItem>
                                    {/* <DropdownItem  key="accessories">Smart TV</DropdownItem> */}
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                    </div>
                    {/* row-2 & dynamic start */}
                    {
                        selectedCategory !== 'Select a category' &&
                        <div className='grid md:grid-cols-2 gap-5'>
                            <div>
                                <label>Product Price<span className='text-red-600 font-bold'>*</span></label>
                                <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter product price'
                                    {...register('product_price')}
                                    required
                                />
                            </div>
                            {/* brand manage */}
                            <div className='flex flex-col'>
                                <label>Select Brand<span className='text-red-600 font-bold'>*</span></label>
                                <Dropdown className='w-full'>
                                    <DropdownTrigger>
                                        <Button variant="bordered">
                                            {selectedBrand}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Single selection example"
                                        variant="flat"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        // selectedKeys={selectedKeys}
                                        onSelectionChange={(keys) => setSelectedBrand(Array.from(keys)[0] as string)}
                                    >
                                        {brandOptions[selectedCategory]?.map((brand) => (
                                            <DropdownItem key={brand}>{brand}</DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>

                        </div>
                    }
                    {/* dynamic row for category */}
                    {/* laptop */}
                    <section>
                        {
                            selectedCategory === 'laptop' && (<div className='space-y-3'>
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
                                        <Dropdown
                                            aria-required
                                            className='w-full'>
                                            <DropdownTrigger>
                                                <Button variant="bordered">
                                                    {selectedColor}
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Single selection example"
                                                variant="flat"
                                                disallowEmptySelection
                                                selectionMode="single" onSelectionChange={(keys) => {
                                                    const key = Array.from(keys)[0] as string;
                                                    if (key) {
                                                        handleColorChange(key);
                                                    }
                                                }}
                                            >
                                                <DropdownItem key="black">Black</DropdownItem>
                                                <DropdownItem
                                                    key="white">White</DropdownItem>
                                                <DropdownItem key="gray">Gray</DropdownItem>
                                                <DropdownItem key="blue">Blue</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
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
                            selectedCategory === 'monitor' && <div className='space-y-3'>
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
                                        <Dropdown
                                            aria-required
                                            className='w-full'>
                                            <DropdownTrigger>
                                                <Button variant="bordered">
                                                    {selectedColor}
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Single selection example"
                                                variant="flat"
                                                disallowEmptySelection
                                                selectionMode="single" onSelectionChange={(keys) => {
                                                    const key = Array.from(keys)[0] as string;
                                                    if (key) {
                                                        handleColorChange(key);
                                                    }
                                                }}
                                            >
                                                <DropdownItem key="black">Black</DropdownItem>
                                                <DropdownItem
                                                    key="white">White</DropdownItem>
                                                <DropdownItem key="gray">Gray</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
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
                            selectedCategory === 'smart-phone' && <div className='space-y-3'>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Model<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter phone model'
                                            {...register('smart-phone_model')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Storage
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter phone Storage'
                                            {...register('smart-phone_storage')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Ram<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter ram storage'
                                            {...register('smart-phone_ram')}
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label>color<span className='text-red-600 font-bold'>*</span></label>
                                        <Dropdown
                                            aria-required
                                            className='w-full'>
                                            <DropdownTrigger>
                                                <Button variant="bordered">
                                                    {selectedColor}
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Single selection example"
                                                variant="flat"
                                                disallowEmptySelection
                                                selectionMode="single" onSelectionChange={(keys) => {
                                                    const key = Array.from(keys)[0] as string;
                                                    if (key) {
                                                        handleColorChange(key);
                                                    }
                                                }}
                                            >
                                                <DropdownItem key="black">Black</DropdownItem>
                                                <DropdownItem
                                                    key="white">White</DropdownItem>
                                                <DropdownItem key="gray">Gray</DropdownItem>
                                                <DropdownItem key="blue">Blue</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className=''>
                                        <label>Camera<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter camera info'
                                            {...register('smart-phone-camera')}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className=''>
                                            <label>Battery<span className='text-red-600 font-bold'>*</span></label>
                                            <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter battery info'
                                                {...register('smart-phone_battery')}
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
                                            {...register('smart-phone_description')}
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
                            selectedCategory === 'smart-watch' && <div className='space-y-3'>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Model<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter watch model'
                                            {...register('smart-watch_model')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Battery
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter phone Storage'
                                            {...register('smart-watch_battery')}
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
                                        <Dropdown
                                            aria-required
                                            className='w-full'>
                                            <DropdownTrigger>
                                                <Button variant="bordered">
                                                    {selectedColor}
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Single selection example"
                                                variant="flat"
                                                disallowEmptySelection
                                                selectionMode="single" onSelectionChange={(keys) => {
                                                    const key = Array.from(keys)[0] as string;
                                                    if (key) {
                                                        handleColorChange(key);
                                                    }
                                                }}
                                            >
                                                <DropdownItem key="black">Black</DropdownItem>
                                                <DropdownItem
                                                    key="white">White</DropdownItem>
                                                <DropdownItem key="gray">Gray</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className=''>
                                        <label>Features<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter Features'
                                            {...register('smart-watch_features')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            placeholder="Enter smart-watch description"
                                            {...register('smart-watch_description')}
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
                            selectedCategory === 'smart-tv' && <div className='space-y-3'>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Screen Size<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen size'
                                            {...register('smart-tv_screen')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Resolution
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen resolution'
                                            {...register('smart-tv_resolution')}
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
                                            {...register('smart-tv_ram')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className=''>
                                        <label>Features<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter Features'
                                            {...register('smart-tv_features')}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className=''>
                                            <label>Ports<span className='text-red-600 font-bold'>*</span></label>
                                            <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter ports info'
                                                {...register('smart-tv_ports')}
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
                                            {...register('smart-tv_description')}
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
                            disabled={selectedCategory === 'Select a category'}
                            className='w-full text-center bg-primary py-2 text-white rounded-md disabled:cursor-not-allowed'>Add Product</button>
                    </div>
                </form>

            </div>
        </section>
    );
};

export default AddProduct;