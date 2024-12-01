'use client'
import Loading from '@/app/loading';
import { GetAdminProducts} from './api/rote';
import ProductTable from '@/app/Components/Dashboard/ProductTable/ProductTable';

const Page = () => {
    // const products = await getAdminProducts();
    const { data: products, isLoading, isError, error } = GetAdminProducts();
    // Handle loading state
    if (isLoading) return <Loading />;
    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;
    // console.log(products)
    return (
        <section className='mt-10'>
            {/* filter and sorting */}
            <div>

            </div>
            {/*Heading  */}
            <div className="mb-5 text-center">
                <h3 className="text-2xl font-semibold">Manage Products</h3>
                <h4 className="text-lg text-gray-600">Manage your Products</h4>
            </div>
            {/* products listing */}
            <div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Brand</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map((product, idx) => (
                                    <ProductTable
                                        idx={idx}
                                        key={idx}
                                        product={product}
                                    />
                                ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Page;