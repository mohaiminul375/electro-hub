'use client'
import { useGetProducts } from "@/app/all-products/api/route";
import Loading from "@/app/loading";
import { Select, SelectItem } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const prices = [
    { key: '', label: "Default" },
    { key: 'high-to-low', label: "Price hight to low" },
    { key: 'low-to-high', label: "Price low to high" },
];
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
]
const colors = [
    { key: '', label: "Default" },
    { key: 'black', label: "Black" },
    { key: 'white', label: "White" },
    { key: 'gray', label: "Gray" },
    { key: 'blue', label: "Blue" },

]
const ProductFilter = () => {
    const [brand, setBrand] = useState('')
    const [color, setColor] = useState('')
    const [price, setPrice] = useState('')
    const queryClient = useQueryClient()
    console.log(brand, color, price)
    useGetProducts({ brand, color, price })
    // console.log(res, 'from filter')
    // console.log(data)
    // if (isLoading) return <Loading />;
    if (brand || color || price) {
        console.log('reface trigger')
        // refetch()
        queryClient.invalidateQueries({ queryKey: ['all-products'] })

    }

    // useEffect(() => {
    //     refetch();
    // }, [brand, color, price, refetch]);
    // filter
    return (
        <section className="py-6 px-4 bg-gray-50 rounded-md shadow-md">
            <div className="space-y-6 sm:space-y-0 sm:flex sm:space-x-6 sm:justify-between">
                {/* Sort by Price */}
                <div className="flex flex-col sm:w-1/3">
                    <label className="text-lg font-semibold sm:mr-4">Sort by Price</label>
                    <Select
                        onChange={(e) => setPrice(e.target.value)}
                        label="Price Sorting" className="max-w-xs mt-2 sm:mt-0">
                        {prices.map((price) => (
                            <SelectItem key={price.key}>{price.label}</SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Sort by Brand */}
                <div className="flex flex-col sm:w-1/3">
                    <label className="text-lg font-semibold sm:mr-4">Sort by Brand</label>
                    <Select
                        onChange={(e) => setBrand(e.target.value)}
                        label="Select your brand" className="max-w-xs mt-2 sm:mt-0">
                        {brands.map((brand) => (
                            <SelectItem key={brand.key}>{brand.label}</SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Sort by Color */}
                <div className="flex flex-col sm:w-1/3">
                    <label
                        className="text-lg font-semibold sm:mr-4">Sort by Color</label>
                    <Select
                        onChange={(e) => setColor(e.target.value)}
                        label="Select your color" className="max-w-xs mt-2 sm:mt-0">
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