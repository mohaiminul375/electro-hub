'use client'
import { useParams } from "next/navigation";
import { useGetProductDetails } from "../../product-details/api/route";
import Loading from "@/app/loading";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useUpdateProduct } from "./api/route";
import { useEffect, useState } from "react";
export const dynamic = 'force-dynamic';
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
    update_info: object;

}
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
]
const brandOptions: BrandOptions = {
    laptop: ["Dell", "HP", "Asus", "Lenovo", "Walton", "not specified"],
    monitor: ["Samsung", "LG", "Acer", "Dell", "BenQ"],
    smart_phone: ["Samsung", "OnePlus", "Xiaomi", "Realme", "Google", "not specified"],
    smart_watch: ["Samsung", "Garmin", "Fitbit", "Amazfit", "not specified"],
    smart_tv: ["Sony", "LG", "Samsung", "Vizio", "TCL", "not specified"],
};
const Page = () => {
    const { id } = useParams();
    const { data: details, isLoading, isError, error } = useGetProductDetails(id);
    const update_product = useUpdateProduct(id);
    const { register,
        handleSubmit,
        // reset, 
        // formState: { errors }
    } = useForm<Inputs>();
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    // Handle loading state
    if (isLoading) return <Loading />;
    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;
    const {
        // _id,
        product_name,
        product_price,
        laptop_processor,
        laptop_ram,
        laptop_storage,
        laptop_display,
        laptop_ports,
        laptop_battery,
        laptop_description,
        // laptop_img,
        // -------------
        monitor_screen,
        monitor_resolution,
        monitor_ports,
        monitor_description,
        // ----------
        smart_phone_model,
        smart_phone_storage,
        smart_phone_ram,
        smart_phone_camera,
        smart_phone_battery,
        // "smart-phone_img": string;
        smart_phone_description,
        // -----------
        smart_watch_model,
        smart_watch_battery,
        // "smart-watch_img": string;
        smart_watch_features,
        smart_watch_description,
        // ---------------
        smart_tv_ram,
        smart_tv_screen,
        smart_tv_resolution,
        // "smart-tv_img": string;
        smart_tv_features,
        smart_tv_description,
        smart_tv_ports,
        img,
        // posted_date,
        // image,
        category,
        color,
        brand,

    } = details;
    const onSubmit: SubmitHandler<Inputs> = async (update_info: Inputs) => {
        const isExistedImage = update_info.img;
        if (!isExistedImage) {
            const image = { image: update_info.img[0] }
            // generate img
            const { data: res } = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API}`, image, {
                headers: { "content-type": "multipart/form-data" },
            });
            // get url form image bb
            const img_url = res.data.display_url;
            if (!img_url) {
                return toast.error('error form image server please try again or contact developer')
            }
            console.log(img_url);
            update_info.img = img_url
        }
        update_info.img = img;
        update_info.product_price = parseFloat(update_info.product_price as string);
        console.log(update_info);
        const res = await update_product.mutateAsync(update_info);
        console.log(res);


    }
    console.log(category, color)
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
                    <h3 className="text-3xl font-bold text-accent">Update Product</h3>
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
                            <Input
                                defaultValue={product_name}
                                className='h-10' variant='bordered' type="text" label="" placeholder='Enter product name' required
                                {...register('product_name')}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label>Product Category<span className='text-red-600 font-bold'>*</span></label>
                            <Select
                                defaultSelectedKeys={category ? [category] : []}
                                isRequired
                                // onChange={(e) => setCategory(e.target.value)}
                                {...register('category')}
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
                                <Input
                                    defaultValue={product_price}
                                    className='h-10' variant='bordered' type="number" label="" placeholder='Enter product price'
                                    {...register('product_price')}
                                    required
                                />
                            </div>
                            {/* brand manage */}
                            <div className='flex flex-col'>
                                <label>Select Brand<span className='text-red-600 font-bold'>*</span></label>
                                <Select
                                    defaultSelectedKeys={brand ? [brand] : []}
                                    {...register('brand')}
                                    isRequired
                                    // onChange={(e) => setBrand(e.target.value)}
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
                                        <Input
                                            defaultValue={laptop_processor}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter processor configuration'
                                            {...register('laptop_processor')}
                                        />
                                    </div>
                                    <div>
                                        <label>RAM<span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={laptop_ram}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter ram storage'
                                            {...register('laptop_ram')}
                                            required
                                        />
                                    </div>
                                </div>
                                {/* row-2 laptop */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Storage<span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={laptop_storage}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter 
                                    storage'
                                            {...register('laptop_storage')}
                                            required />
                                    </div>
                                    <div>
                                        <label>Display<span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={laptop_display}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter display info'
                                            {...register('laptop_display')}

                                            required
                                        />
                                    </div>
                                </div>
                                {/* row-3 laptop */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Battery<span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={laptop_battery}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter battery info'
                                            {...register('laptop_battery')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Ports<span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={laptop_ports}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter port availability'
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

                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label>color<span className='text-red-600 font-bold'>*</span></label>
                                        <Select
                                            {...register('color')}
                                            defaultSelectedKeys={color ? [color] : []}
                                            isRequired
                                            // onChange={(e) => setColor(e.target.value)}
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
                                            defaultValue={laptop_description}
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
                                        <Input
                                            defaultValue={monitor_screen}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen size'
                                            {...register('monitor_screen')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Screen Resolution
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={monitor_resolution}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen resolution'
                                            {...register('monitor_resolution')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Ports<span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={monitor_ports}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter ports info'
                                            {...register('monitor_ports')}
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label>color<span className='text-red-600 font-bold'>*</span></label>
                                        <Select
                                            defaultSelectedKeys={color ? [color] : []}
                                            isRequired
                                            {...register('color')}
                                            // onChange={(e) => setColor(e.target.value)}
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

                                        />
                                    </div>

                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            defaultValue={monitor_description}
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
                                        <Input
                                            defaultValue={smart_phone_model}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter phone model'
                                            {...register('smart_phone_model')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Storage
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={smart_phone_storage}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter phone Storage'
                                            {...register('smart_phone_storage')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>Ram<span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={smart_phone_ram}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter ram storage'
                                            {...register('smart_phone_ram')}
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label>color<span className='text-red-600 font-bold'>*</span></label>
                                        <Select
                                            {...register('color')}
                                            defaultSelectedKeys={color ? [color] : []}
                                            isRequired
                                            // onChange={(e) => setColor(e.target.value)}
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
                                        <Input
                                            defaultValue={smart_phone_camera}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter camera info'
                                            {...register('smart_phone_camera')}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className=''>
                                            <label>Battery<span className='text-red-600 font-bold'>*</span></label>
                                            <Input
                                                defaultValue={smart_phone_battery}
                                                className='h-10' variant='bordered' type="text" label="" placeholder='Enter battery info'
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

                                        />
                                    </div>

                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            defaultValue={smart_phone_description}
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
                                        <Input
                                            defaultValue={smart_watch_model}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter watch model'
                                            {...register('smart_watch_model')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Battery
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={smart_watch_battery}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter phone Storage'
                                            {...register('smart_watch_battery')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>image<span className='text-red-600 font-bold'>*</span></label>
                                        <Input

                                            className='h-10' variant='bordered' type="file" label="" placeholder='Enter battery info'
                                            {...register('img')}

                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label>color<span className='text-red-600 font-bold'>*</span></label>
                                        <Select
                                            {...register('color')}
                                            defaultSelectedKeys={color ? [color] : []}
                                            isRequired
                                            // onChange={(e) => setColor(e.target.value)}
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
                                        <Input
                                            defaultValue={smart_watch_features}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter Features'
                                            {...register('smart_watch_features')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            defaultValue={smart_watch_description}
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
                                        <Input
                                            defaultValue={smart_tv_screen}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen size'
                                            {...register('smart_tv_screen')}
                                            required
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Resolution
                                            <span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={smart_tv_resolution}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter screen resolution'
                                            {...register('smart_tv_resolution')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <label>image<span className='text-red-600 font-bold'>*</span></label>
                                        <Input className='h-10' variant='bordered' type="file" label="" placeholder='Enter battery info'
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Ram<span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={smart_tv_ram}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter ram storage'
                                            {...register('smart_tv_ram')}
                                        />
                                    </div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div className=''>
                                        <label>Features<span className='text-red-600 font-bold'>*</span></label>
                                        <Input
                                            defaultValue={smart_tv_features}
                                            className='h-10' variant='bordered' type="text" label="" placeholder='Enter Features'
                                            {...register('smart_tv_features')}
                                        />
                                    </div>
                                    <div>
                                        <div className=''>
                                            <label>Ports<span className='text-red-600 font-bold'>*</span></label>
                                            <Input
                                                defaultValue={smart_tv_ports}
                                                className='h-10' variant='bordered' type="text" label="" placeholder='Enter ports info'
                                                {...register('smart_tv_ports')}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className='w-full'>
                                    <div>
                                        <label>Description<span className='text-red-600 font-bold'>*</span></label>
                                        <Textarea
                                            defaultValue={smart_tv_description}
                                            placeholder="Enter smart-tv description"
                                            {...register('smart_tv_description')}
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
                            className='w-full text-center bg-primary py-2 text-white rounded-md disabled:cursor-not-allowed'>Update Product</button>
                    </div>
                </form >

            </div >
        </section >
    );
};

export default Page;
// For SSR/SSG: Ensure no SSR-related issues during build
