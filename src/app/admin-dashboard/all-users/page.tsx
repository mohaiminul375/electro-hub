import { FaTrash } from "react-icons/fa";


export default function page() {
    return (
        <section>
            <div className="my-10 text-center">
                <h3 className="text-2xl font-semibold">Registered Users</h3>
                <h4 className="text-lg text-gray-600">List of all registered users on the platform</h4>
            </div>
            {/* table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>


                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-2">2</td>
                            <td className="px-4 py-2">Jane Smith</td>
                            <td className="px-4 py-2">jane.smith@example.com</td>
                            <td className="px-4 py-2">User</td>
                            <td className="px-4 py-2">

                                <button className="ml-2 text-red-600 hover:text-red-900">
                                    <FaTrash title="delete user" className="text-white bg-red-700 rounded-full text-3xl p-2 " />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

    )
}
