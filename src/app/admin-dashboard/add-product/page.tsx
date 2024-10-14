"use client"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const AddProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState("Select a category");

    const handleSelectionChange = (key: string) => {
        setSelectedCategory(key);
    };
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
            <div className="mb-10 text-center">
                <h3 className="text-2xl font-semibold">Add Product</h3>
                <h4 className="text-lg text-gray-600">Add a New Product in Your store</h4>
            </div>
            {/* form */}
            <div className='bg-white p-5'>
                <form>
                    <div className='grid md:grid-cols-2 gap-5'>
                        <div>
                            <label>Product Name</label>
                            <Input className='h-10' variant='bordered' type="text" label="" placeholder='input product name' />
                        </div>
                        <div className='flex flex-col'>
                            <label>Product Category</label>
                            <Dropdown className='w-full'>
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
                                    onSelectionChange={(keys) => handleSelectionChange(Array.from(keys)[0] as string)}
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
                </form>

            </div>
        </section>
    );
};

export default AddProduct;