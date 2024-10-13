'use client'
import { getUsers } from "./api/route";
import UserTable from "@/app/Components/Dashboard/UserTable/UserTable";
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export default async function page() {
    const users: User[] = await getUsers();
    // console.log(users)
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
                        {
                            users?.map((user, idx) => (
                                <UserTable
                                    idx={idx}
                                    key={idx}
                                    user={user}
                                />
                            ))
                        }


                    </tbody>
                </table>
            </div>
        </section>

    )
}
