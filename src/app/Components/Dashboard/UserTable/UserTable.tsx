import React from 'react'
import { FaTrash } from 'react-icons/fa'

export default function UserTable() {
    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-4 py-2">1</td>
            <td className="px-4 py-2">John Doe</td>
            <td className="px-4 py-2">john.doe@example.com</td>
            <td className="px-4 py-2">Admin</td>
            <td className="px-4 py-2">
                
                <button className="ml-2 text-red-600 hover:text-red-900">
                <FaTrash title="delete user" className="text-white bg-red-700 rounded-full text-3xl p-2 " />
                </button>
            </td>
        </tr>
    )
}
