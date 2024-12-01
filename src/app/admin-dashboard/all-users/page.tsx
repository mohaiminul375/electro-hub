'use client'
import { FaArrowLeft } from "react-icons/fa";
import { GetUsers } from "./api/route";
import UserTable from "@/app/Components/Dashboard/UserTable/UserTable";
import Link from "next/link";
import Loading from "@/app/loading";

export default async function page() {
    // const users: User[] = await getUsers();
    const { data: users=[], isLoading, isError, error } = GetUsers();
    // Handle loading state
    if (isLoading) return <Loading />;
    // Handle error state
    if (isError) return <p className="text-center text-red-700">Error: {error && (typeof error === "string" ? error : error.message)}</p>;
    // console.log(users)
    return (
        <section>
            <div className="mt-3 inline-block">
                <Link
                    href='/admin-dashboard'
                    className="flex items-center gap-2 rounded-lg bg-white border text-xl p-2">
                    <FaArrowLeft />
                    Back to Dashboard
                </Link>
            </div>
            <div className="mb-10 text-center">
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
