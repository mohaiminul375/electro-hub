'use client'
import { deleteProduct } from '@/app/admin-dashboard/manage-product/api/rote';
import { useDisclosure } from '@nextui-org/react';
import Link from 'next/link';
import { FaEye, FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ProductTable = ({ product, idx }) => {
    const { _id, product_name, category, brand } = product;

    // delete product
    const handleDeleteProduct = async (id: string) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteProduct(id);
                console.log(res)
                if (res.deletedCount == 1) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }

            }
        });
    }


    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-4 py-2">{idx + 1}</td>
            <td className="px-4 py-2">{product_name}</td>
            <td className="px-4 py-2">{category || "not found"}</td>
            <td className="px-4 py-2">
                {brand || "not found"}
            </td>
            <td className="px-4 py-2">

                <button
                    // onClick={() => handleDelete(_id)}
                    className="flex gap-3 ml-2 text-red-600 hover:text-red-900">
                    <Link href={`product-details/${_id}`}>  <FaEye title="view details" className="text-white bg-primary rounded-full text-3xl p-2 " /></Link>
                    <FaTrash
                        onClick={() => handleDeleteProduct(_id)}
                        title="delete user" className="text-white bg-red-700 rounded-full text-3xl p-2 " />
                </button>
            </td>
        </tr>
    );
};

export default ProductTable;