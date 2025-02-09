'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { FaSearch } from 'react-icons/fa';

const NavSearch = () => {
    const searchParams = useSearchParams();
    const searchName = searchParams.get('search') || '';
    const [search, setSearch] = useState(searchName);
    const router = useRouter();

    // Handle search submission
    const handleProductSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const enteredName = (e.currentTarget.search_string as HTMLInputElement).value.trim();

        if (enteredName) {
            router.push(`/all-products?search=${encodeURIComponent(enteredName)}`, { scroll: false });
        } else {
            // If empty, clear search params
            router.push('/all-products', { scroll: false });
        }
    };

    return (
        <div className="flex items-center justify-center h-10">
            <form
                onSubmit={handleProductSearch}
                className="flex items-center bg-white text-gray-400 rounded-lg overflow-hidden shadow-md min-w-80 md:ml-6 lg:w-[500px] h-10"
            >
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    name="search_string"
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-3 text-base bg-white text-gray-700 focus:outline-none focus:ring focus:ring-[#72BF44] w-full"
                />
                <button
                    type="submit"
                    className="px-4 py-5 bg-primary text-white hover:bg-hoverPrimary duration-700 focus:outline-none focus:ring focus:ring-[#72BF44] flex items-center justify-center"
                >
                    <FaSearch />
                </button>
            </form>
        </div>
    );
};

const PageWithNavSearch = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <NavSearch />
    </Suspense>
);

export default PageWithNavSearch;
