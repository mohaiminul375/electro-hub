'use client';
import { Select, SelectItem } from "@nextui-org/react";

type BrandOptions = {
    laptop: string[];
    monitor: string[];
    "smart-phone": string[];
    "smart-watch": string[];
    "smart-tv": string[];
};

const prices = [
    { key: 'high-to-low', label: "High to Low" },
    { key: 'low-to-high', label: "Low to High" },
];

const colors = [
    { key: 'black', label: "Black" },
    { key: 'white', label: "White" },
];

const brandOptions: BrandOptions = {
    laptop: ["Dell", "HP", "Asus", "Lenovo", "Walton"],
    monitor: ["Samsung", "LG", "Acer", "Dell", "BenQ"],
    "smart-phone": ["Samsung", "OnePlus", "Xiaomi", "Realme", "Google"],
    "smart-watch": ["Samsung", "Garmin", "Fitbit", "Amazfit"],
    "smart-tv": ["Sony", "LG", "Samsung", "Vizio", "TCL"],
};

interface FilterProp {
    setBrand: (value: string) => void;
    setColor: (value: string) => void;
    setPriceSort: (value: string) => void;
    category: unknown;
}

const CategoryFilter = ({ setPriceSort, setBrand, setColor, category  }: FilterProp) => {
    return (
        <section className="py-6 px-4 bg-gray-50 rounded-md shadow-md">
            <div className="space-y-6 sm:space-y-0 sm:flex sm:space-x-6 sm:justify-between">
                {/* Sort by Price */}
                <div className="flex flex-col sm:w-1/3">
                    <label className="text-lg font-semibold sm:mr-4">Sort by Price</label>
                    <Select
                        label="Price Sorting"
                        onChange={(e) => setPriceSort(e.target.value)}
                        className="max-w-xs mt-2 sm:mt-0"
                    >
                        {prices.map((price) => (
                            <SelectItem key={price.key} value={price.key}>
                                {price.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Sort by Brand */}
                <div className="flex flex-col sm:w-1/3">
                    <label className="text-lg font-semibold sm:mr-4">Sort by Brand</label>
                    <Select
                        label="Select your brand"
                        onChange={(e) => setBrand(e.target.value)}
                        className="max-w-xs mt-2 sm:mt-0"
                    >
                        {brandOptions[category]?.map((brand) => (
                            <SelectItem key={brand} value={brand}>
                                {brand}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Sort by Color */}
                <div className="flex flex-col sm:w-1/3">
                    <label className="text-lg font-semibold sm:mr-4">Sort by Color</label>
                    <Select
                        label="Select your color"
                        onChange={(e) => setColor(e.target.value)}
                        className="max-w-xs mt-2 sm:mt-0"
                    >
                        {colors.map((color) => (
                            <SelectItem key={color.key} value={color.key}>
                                {color.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
        </section>
    );
};

export default CategoryFilter;
