'use client';
import { FaArrowLeft } from "react-icons/fa";
import { GetUsers } from "./api/route";
import UserTable from "@/app/Components/Dashboard/UserTable/UserTable";
import Link from "next/link";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";

export default function AllUsers() {
    const [isClient, setIsClient] = useState(false);
    const { data: users = [], isLoading, isError, error } = GetUsers();
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }
    // Handle loading state
    if (isLoading) return <Loading />;

    // Handle error state
    if (isError) return (
        <p className="text-center text-red-700">
            Error: {error && (typeof error === "string" ? error : error.message)}
        </p>
    );

    return (
        <section>
            {/* Back Button */}
            <div className="mt-6 inline-block">
                <Link
                    href="/admin-dashboard"
                    className="flex items-center gap-3 rounded-lg bg-white border border-gray-400 text-lg px-4 py-2 text-accent hover:bg-gray-300 hover:border-gray-500 transition duration-200"
                >
                    <FaArrowLeft className="text-accent" />
                    <span>Back to Dashboard</span>
                </Link>
            </div>

            {/* Registered Users Header */}
            <div className="mb-10 mt-4 text-center">
                <h3 className="text-3xl font-bold text-accent">Registered Users</h3>
                <h4 className="text-md text-gray-700 mt-2">
                    List of all registered users on the platform.
                </h4>
            </div>

            {/* Table */}
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
                        {users.map((user, idx) => (
                            <UserTable idx={idx} key={idx} user={user} />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
