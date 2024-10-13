import { deleteUser } from '@/app/admin-dashboard/all-users/api/route';
import React from 'react'
import { FaTrash } from 'react-icons/fa'
interface User {
    _id: string;   // Unique identifier for the user
    name: string;  // Name of the user
    email: string; // Email of the user
    role: string;  // Role of the user
}
interface UserTableProps {
    user: User; // User object that conforms to the User interface
    idx: number; // Index of the user in the list
}
export default function UserTable({ user, idx }: UserTableProps) {
    const { _id, name, email, role } = user;
    // handle delete
    const handleDelete = async (id: string) => {
        console.log('delete id', id);
        const res = await deleteUser(id);
        console.log(res);
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

                <button
                    onClick={() => handleDelete(_id)}
                    className="ml-2 text-red-600 hover:text-red-900">
                    <FaTrash title="delete user" className="text-white bg-red-700 rounded-full text-3xl p-2 " />
                </button>
            </td>
        </tr>
    )
}
