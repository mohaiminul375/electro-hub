'use client'
import { useDeleteUser } from '@/app/admin-dashboard/all-users/api/route';
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6';
import Swal from 'sweetalert2';
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}
interface UserTableProps {
    user: User;
    idx: number;
}

export default function UserTable({ user, idx }: UserTableProps) {
    const deleteUser = useDeleteUser();
    const { _id, name, email, role } = user;
    // handle delete
    const handleDelete = async (id: string) => {
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
                const res = await deleteUser.mutateAsync(id);
                if (res.deletedCount > 0) {
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
            <td className="px-4 py-2">{name}</td>
            <td className="px-4 py-2">{email}</td>
            <td className="px-4 py-2">
                {role}
            </td>
            <td className="px-4 py-2">
                <button>
                    <FaPencil />
                </button>
                <button
                    onClick={() => handleDelete(_id)}
                    className="ml-2 text-red-600 hover:text-red-900">
                    <FaTrash title="delete user" className="text-white bg-red-700 rounded-full text-3xl p-2 " />
                </button>
            </td>
        </tr>
    )
}
