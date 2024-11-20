import React from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

const ProductTable = ({ product, idx }) => {
    const { product_name,category,brand } = product;
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
                    <FaEye title="view details" className="text-white bg-primary rounded-full text-3xl p-2 " />
                    <FaPencil title="edit-product" className="text-white bg-primary rounded-full text-3xl p-2 " />
                    <FaTrash title="delete user" className="text-white bg-red-700 rounded-full text-3xl p-2 " />
                </button>
            </td>
        </tr>
    );
};

export default ProductTable;