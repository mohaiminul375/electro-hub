'use client'
import Loading from '@/app/loading';
import { GetAdminProducts } from './api/rote';
import ProductTable from '@/components/Dashboard/ProductTable/ProductTable';
import Link from 'next/link';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { Pagination, Select, SelectItem } from '@nextui-org/react';
export const dynamic = 'force-dynamic';
const brands = [
    { key: '', label: "Default" },
    { key: 'Dell', label: "Dell" },
    { key: 'HP', label: "HP" },
    { key: 'Asus', label: "Asus" },
    { key: 'Lenovo', label: "Lenovo" },
    { key: 'Walton', label: "Walton" },
    { key: 'Samsung', label: "Samsung" },
    { key: 'LG', label: "LG" },
    { key: 'Acer', label: "Acer" },
    { key: 'OnePlus', label: "OnePlus" },
    { key: 'Xiaomi', label: "Xiaomi" },
    { key: 'Realme', label: "Realme" },
    { key: 'Google', label: "Google" },
    { key: 'Garmin', label: "Garmin" },
    { key: 'Fitbit', label: "Fitbit" },
    { key: 'Amazfit', label: "Amazfit" },
    { key: 'Sony', label: "Sony" },
    { key: 'Vizio', label: "Vizio" },
    { key: 'TCL', label: "TCL" },
];
const categories = [
    { key: '', label: "Default" },
    { key: 'laptop', label: "Laptop" },
    { key: 'smart_phone', label: "Smart-Phone" },
    { key: 'monitor', label: "Monitor" },
    { key: 'smart_watch', label: "Smart-Watch" },
    { key: 'smart_tv', label: "Smart-tv" },
    { key: 'accessories', label: "Accessories" },

]
const statuses = [
    { key: '', label: "Default" },
    { key: 'in_stock', label: "In Stock" },
    { key: 'out_of_stock', label: "Out Of stock" },
]
const ManageProduct = () => {
    const [category, setCategory] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const { data: products = [], isLoading, isError, error } = GetAdminProducts({ category, brand, status, name });

    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;
    const itemsPerPage = 15;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Get products for the current page
    const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    // Handle search by name
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const enteredName = (e.currentTarget.product_name as HTMLInputElement).value;
        setName(enteredName)
    }
    return (
        <section className=''>
            {/*Heading  */}
            <div className="mt-2">
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

                {/* Manage Product Header */}
                <div className="mb-8 mt-2 text-center">
                    <h3 className="text-3xl font-bold text-accent dark:text-white">Manage Products</h3>
                    <h4 className="text-md text-gray-700 dark:text-white mt-2">Easily manage, edit, delete your products.</h4>
                </div>
            </div>
            {/* Filtering and sorting */}
            <div className="px-4">
                {/* Search */}
                <div className="flex items-center justify-center h-10 mb-5">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="flex items-center bg-white text-gray-400 rounded-lg overflow-hidden shadow-md w-full sm:w-[500px]">
                        <input
                            name="product_name"
                            type="text"
                            placeholder="Search by product name"
                            className="px-4 py-3 text-base bg-white text-gray-700 focus:outline-none focus:ring focus:ring-[#72BF44] w-full"
                        />
                        <button className="px-4 py-5 bg-primary text-white hover:bg-hoverPrimary duration-700 focus:outline-none focus:ring focus:ring-[#72BF44] flex items-center justify-center">
                            <FaSearch />
                        </button>
                    </form>
                </div>

                {/* Filters Section */}
                <section className="py-6 px-4 bg-gray-50 dark:bg-darkCard rounded-md shadow-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Sort by Category */}
                        <div className="flex flex-col">
                            <label className="text-medium font-semibold">Sort by Category</label>
                            <Select onChange={(e) => setCategory(e.target.value)} label="Select a category" className="w-full mt-2">
                                {categories.map((category) => (
                                    <SelectItem key={category.key}>{category.label}</SelectItem>
                                ))}
                            </Select>
                        </div>

                        {/* Sort by Brand */}
                        <div className="flex flex-col">
                            <label className="text-medium font-semibold">Sort by Brand</label>
                            <Select onChange={(e) => setBrand(e.target.value)} label="Select your brand" className="w-full mt-2">
                                {brands.map((brand) => (
                                    <SelectItem key={brand.key}>{brand.label}</SelectItem>
                                ))}
                            </Select>
                        </div>

                        {/* Sort by Status */}
                        <div className="flex flex-col">
                            <label className="text-medium font-semibold">Sort by Status</label>
                            <Select onChange={(e) => setStatus(e.target.value)} label="Select a status" className="w-full mt-2">
                                {statuses.map((status) => (
                                    <SelectItem key={status.key}>{status.label}</SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                </section>
            </div>

            {/* products listing */}
            <div>
                <div className='my-5'>
                    <h2 className='text-xl font-bold'>Total Products: <span className='text-primary'>{products?.length}</span></h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Brand</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                paginatedProducts?.map((product, idx) => (
                                    <ProductTable
                                        idx={(page - 1) * itemsPerPage + idx + 1}
                                        key={idx}
                                        product={product}
                                    />
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                <div>
                    {isLoading ? (
                        <Loading />
                    ) : products?.length === 0 && (
                        <p className="text-red-700 text-center font-bold text-2xl mt-10">
                            Products Not Found
                        </p>
                    )}
                </div>
            </div>
            {/* Pagination */}
            <div className="mt-10 flex justify-center gap-5">
                <Pagination
                    loop
                    showControls
                    color="success"
                    initialPage={1}
                    total={totalPages}
                    page={page}
                    onChange={(newPage) => setPage(newPage)}
                />
            </div>
        </section>
    );
};

export default ManageProduct;

