'use client'
import { Select, SelectItem } from "@nextui-org/react";

const prices = [
    { key: 'high-to-low', label: "hight-to-low" },
    { key: 'low-to-high', label: "low-to-high" },
];
const brands = [
    { key: 'hp', label: "hp" },
    { key: 'walton', label: "walton" },
    { key: 'lenovo', label: "lenovo" },
    { key: 'asus', label: "asus" },
    { key: 'dell', label: "dell" },
]
const colors = [
    { key: 'black', label: "black" },
    { key: 'white', label: "white" },

]
const ProductFilter = () => {
    return (
        <section className="py-6 px-4 bg-gray-50 rounded-md shadow-md">
            <div className="space-y-6 sm:space-y-0 sm:flex sm:space-x-6 sm:justify-between">
                {/* Sort by Price */}
                <div className="flex flex-col sm:w-1/3">
                    <label className="text-lg font-semibold sm:mr-4">Sort by Price</label>
                    <Select label="Price Sorting" className="max-w-xs mt-2 sm:mt-0">
                        {prices.map((price) => (
                            <SelectItem key={price.key}>{price.label}</SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Sort by Brand */}
                <div className="flex flex-col sm:w-1/3">
                    <label className="text-lg font-semibold sm:mr-4">Sort by Brand</label>
                    <Select label="Select your brand" className="max-w-xs mt-2 sm:mt-0">
                        {brands.map((brand) => (
                            <SelectItem key={brand.key}>{brand.label}</SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Sort by Color */}
                <div className="flex flex-col sm:w-1/3">
                    <label className="text-lg font-semibold sm:mr-4">Sort by Color</label>
                    <Select label="Select your color" className="max-w-xs mt-2 sm:mt-0">
                        {colors.map((color) => (
                            <SelectItem key={color.key}>{color.label}</SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
        </section>


    );
};

export default ProductFilter;