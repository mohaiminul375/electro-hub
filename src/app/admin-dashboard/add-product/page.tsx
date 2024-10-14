"use client"
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Textarea } from '@nextui-org/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const AddProduct = () => {
    // handle category
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof brandOptions | "Select a category">("Select a category");

    const handleSelectionChange = (key: keyof typeof brandOptions) => {
        setSelectedCategory(key);
        setSelectedBrand("select a Brand")
    };
    // handle color
    const [selectedColor, setSelectedColor] = useState('Select a color');

    const handleColorChange = (key: string) => {
        setSelectedColor(key);
    };



    // handle dynamic form
    // brand management
    const [selectedBrand, setSelectedBrand] = useState('select a Brand')
    const brandOptions = {
        laptop: ["Dell", "HP", "Asus", "Lenovo", "walton"],
        monitor: ["Samsung", "LG", "Acer", "Dell", "BenQ"],
        "smart-phone": ["Samsung", "OnePlus", "Xiaomi", "realme", "Google"],
        "smart-watch": ["Samsung", "Garmin", "Fitbit", "Amazfit"],
        "smart-tv": ["Sony", "LG", "Samsung", "Vizio", "TCL"]
    };


    // react hook form














    return (
        <section>
            <div className="mt-3 inline-block">
                <Link
                    href='/admin-dashboard'
                    className="flex items-center gap-2 rounded-lg bg-white border text-xl p-2">
                    <FaArrowLeft />
                    Back to Dashboard
                </Link>
            </div>
            <div className="mb-5 text-center">
                <h3 className="text-2xl font-semibold">Add Product</h3>
                <h4 className="text-lg text-gray-600">Add a New Product in Your store</h4>
            </div>
            {/* form */}
            <div className='bg-white p-8 rounded-md shadow-2xl'>
                <form className='space-y-3'>
                    {/* row-1 */}
                    <div className='grid md:grid-cols-2 gap-5'>
                        <div>
                            <label>Product Name<span className='text-red-600 font-bold'>*</span></label>
                            <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter product name' required />
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
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter processor configuration' />
                                    </div>
                                    <div>
                                        <label>RAM<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter ram storage'
                                            required
                                        />
                                    </div>
                                </div>
                                {/* row-2 laptop */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Storage<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter storage' />
                                    </div>
                                    <div>
                                        <label>Display<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter display info'
                                            required
                                        />
                                    </div>
                                </div>
                                {/* row-3 laptop */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Battery<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter battery info' />
                                    </div>
                                    <div className=''>
                                        <label>Ports<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter port availability' />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>image<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="file" label="" placeholder='Enter battery info' />
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
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen size' />
                                    </div>
                                    <div className=''>
                                        <label>Screen Resolution
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen resolution' />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Ports<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter ports info' />
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
                                        <Input className='h-10' variant='bordered' type="file" label="" placeholder='Enter battery info' />
                                    </div>

                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            placeholder="Enter laptop description"
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
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter phone model' />
                                    </div>
                                    <div className=''>
                                        <label>Storage
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter phone Storage' />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Ram<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter ram storage' />
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
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter camera info' />
                                    </div>
                                    <div>
                                        <div className=''>
                                            <label>Battery<span className='text-red-600 font-bold'>*</span></label>
                                            <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter battery info' />
                                        </div>
                                    </div>

                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>image<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="file" label="" placeholder='Enter battery info' />
                                    </div>

                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            placeholder="Enter laptop description"
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
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter watch model' />
                                    </div>
                                    <div className=''>
                                        <label>Battery
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter phone Storage' />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>image<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="file" label="" placeholder='Enter battery info' />
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
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter Features' />
                                    </div>
                                    <div>

                                        <div className=''>
                                            <label>Battery<span className='text-red-600 font-bold'>*</span></label>
                                            <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter battery info' />
                                        </div>
                                    </div>

                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            placeholder="Enter laptop description"
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
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen size' />
                                    </div>
                                    <div className=''>
                                        <label>Resolution
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen resolution' />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>image<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="file" label="" placeholder='Enter battery info' />
                                    </div>
                                    <div className=''>
                                        <label>Ram<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter ram srorage' />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className=''>
                                        <label>Features<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter Features' />
                                    </div>
                                    <div>
                                        <div className=''>
                                            <label>Ports<span className='text-red-600 font-bold'>*</span></label>
                                            <Input className='h-10' variant='bordered' type="text" label="" placeholder='Enter ports info' />
                                        </div>
                                    </div>

                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            placeholder="Enter laptop description"
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