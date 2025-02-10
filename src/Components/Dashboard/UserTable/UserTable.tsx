'use client'
import { useUpdateRole } from '@/app/admin-dashboard/all-users/api/route';
import { Select, SelectItem } from '@nextui-org/react';
// import { FaTrash } from 'react-icons/fa'
// import { FaPencil } from 'react-icons/fa6';
import Swal from 'sweetalert2';
// TODO: Solve issue
interface User {
    _id: string;
    uuid: string;
    name: string;
    email: string;
    role: string;
}

interface UserTableProps {
    user: User;
    idx: number;
}

const userRole = [
    { key: 'user', label: 'user' },
    { key: 'admin', label: 'admin' },
]

export default function UserTable({ user, idx }: UserTableProps) {
    const updateRole = useUpdateRole();
    // const deleteUser = useDeleteUser();
    const { _id, name, email, role, uuid } = user;
    // handle delete
    // const handleDelete = async (id: string) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             const res = await deleteUser.mutateAsync(id);
    //             if (res.deletedCount > 0) {
    //                 Swal.fire({
    //                     title: "Deleted!",
    //                     text: "Your file has been deleted.",
    //                     icon: "success"
    //                 });
    //             }

    //         }
    //     });
    // }
    const handleUpdateRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value;
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to change the user's role to ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change Role!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await updateRole.mutateAsync({ _id, newRole })
                if (res.modifiedCount > 0) {
                    Swal.fire({
                        title: "Updated!",
                        text: `User's role has been changed to ${newRole}`,
                        icon: "success"
                    });
                }

            }
        });
    }
    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-4 py-2">{idx + 1}</td>
            <td className="px-2 py-0">{uuid}</td>
            <td className="px-4 py-2"><span>{name}</span><br /><span>{email}</span></td>
            <td className="px-6 py-3 min-w-[200px]"> {/* Increased padding and set minimum width */}
                <Select
                    onChange={handleUpdateRole}
                    defaultSelectedKeys={role ? [role] : []}
                    disabled={email === 'mohaiminul375@gmail.com'}
                    label={role}
                    className="max-w-xs mt-2 w-full">
                    {userRole.map((role) => (
                        <SelectItem key={role.key}>{role.label}</SelectItem>
                    ))}
                </Select>
            </td>
            {/* <td className="px-4 py-2">
                <button>
                    <FaPencil />
                </button>
                <button
                    onClick={() => handleDelete(_id)}
                    className="ml-2 text-red-600 hover:text-red-900">
                    <FaTrash title="delete user" className="text-white bg-red-700 rounded-full text-3xl p-2 " />
                </button>
            </td> */}
            <td className='px-4 py-2'>

            </td>
        </tr >

    )
}
