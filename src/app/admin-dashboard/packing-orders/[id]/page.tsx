'use client'
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import Image from "next/image";
import { useState } from "react";
import { useOrdersDetails } from "../../pending-orders/api/route";
import Swal from "sweetalert2";
import { usePackedOrder } from "../api/route";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { AdminCancellation } from "@/components/Shared/adminCancellation";
interface OrderData {
    orderPackedAt: string;
    note?: string;
}
interface CancelData {
    orderCanceledAt: string;
    cancelReason: string;
    canceledBy: string;
}
const Page = () => {
    const router = useRouter()
    const session = useSession();
    const packedOrder = usePackedOrder();
    const [note, setNote] = useState<string>("");
    const { id } = useParams();
    const { data: order, isLoading, isError, error } = useOrdersDetails(id as string);
    const adminCancellation = AdminCancellation();
    const admin_email = session?.data?.user?.email;
    if (isLoading) return <Loading />;
    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;

    const handlePacked = async (order_id: string) => {
        const newData: OrderData = {
            orderPackedAt: new Date().toLocaleString(),
        }
        if (note) {
            newData.note = note;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Packed it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await packedOrder.mutateAsync({ order_id, newData })
            }
        });
    };

    const handleCancel = (order_id: string) => {
        if (!note) {
            return toast.error('note is missing')
        }
        const newData: CancelData = {
            orderCanceledAt: new Date().toLocaleString(),
            cancelReason: note,
            canceledBy: admin_email as string,
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = await adminCancellation.mutateAsync({ order_id, newData })
                if (data.modifiedCount === 1) {
                    router.push('/admin-dashboard/pending-orders')
                }
            }
        });
    };

    return (
        <section className="flex flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Order Details</h2>
                <div className="mb-4">
                    <h3 className="font-semibold text-gray-600">Customer Information</h3>
                    <p className="text-gray-500">Name: {order?.customer_name}</p>
                    <p className="text-gray-500">Email: {order?.customer_email}</p>
                    <p className="text-gray-500">Phone: {order?.customer_Phone}</p>
                    <p className="text-gray-500">Address: {order?.address.full_address}, {order?.address?.district}, {order?.address.division}</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold text-gray-600">Order Information</h3>
                    <p className="text-gray-500">Order ID: {order?.order_id}</p>
                    <p className="text-gray-500">Transaction ID: {order?.transaction_id}</p>
                    <p className="text-gray-500">Total Price: {order?.total_price} BDT</p>
                    <p className="text-gray-500">Payment Method: {order?.payment_method}</p>
                    <p className="text-gray-500">Order Status: {order?.order_status}</p>
                    <p className="text-gray-500">Order Created At: {order?.orderCreatedAt
                        ? new Date(order.orderCreatedAt).toLocaleDateString()
                        : "Error"}</p>
                    <p className="text-gray-500">Order Approved At: {order?.orderApproveAt}</p>
                    {
                        order?.note && <p className="text-primary mt-4">Note: {order.note}</p>
                    }
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold text-gray-600">Products</h3>
                    {order?.products?.map((product, index) => (
                        <div key={index} className="flex items-center gap-4 py-2 border-b border-gray-200">
                            <Image src={product.img} alt={product.product_name} className=" rounded-md"
                                height={100}
                                width={100}
                            />
                            <div>
                                <p className="text-gray-600 font-semibold">{product.product_name}</p>
                                <p className="text-gray-500">Brand: {product.brand}</p>
                                <p className="text-gray-500">Color: {product.color}</p>
                                <p className="text-gray-500">Quantity: {product.quantity}</p>
                                <p className="text-gray-500">Price: {product.price} BDT</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                    <button
                        onClick={() => handlePacked(order?.order_id as string)}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition">
                        Packed
                    </button>
                    <button
                        onClick={() => handleCancel(order?.order_id as string)}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition">
                        Cancel
                    </button>
                </div>
                <div className="mt-4">
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Add a note (optional)"
                        className="w-full border border-gray-300 rounded-md p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                </div>
            </div>
        </section >
    );
};

export default Page;