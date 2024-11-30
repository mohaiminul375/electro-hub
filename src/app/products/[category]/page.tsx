'use client'
import { useParams } from "next/navigation";

type CategoryParams = {
    category: string;
};
const Page = () => {
    const { category } = useParams<CategoryParams>();
    // Define a type-safe mapping for categories
    const categoryMap: Record<string, string> = {
        "smart-phone": "Smart Phone",
        "laptop": "Laptop",
        "smart-watch": "Smart Watch",
        "monitor": 'Monitor',
        'smart-tv':'Smart Tv',
        'accessories':'Accessories'
    };

    // Fallback to category itself if not mapped
    const displayCategory = categoryMap[category] || category;
    return (
        <div>
            <div className="text-center bg-gradient-to-br from-primary to-accent text-white py-8 px-4 rounded-md shadow-md mb-8">
                <h2 className="text-3xl font-bold mb-2">{displayCategory}</h2>
                <p className="text-lg">Explore the best {category} we offer</p>
            </div>
        </div>
    );
};

export default Page;