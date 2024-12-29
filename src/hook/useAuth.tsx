'use client'
import { useSession } from 'next-auth/react';
import React from 'react';
import { useGetUserInfo } from './api/route';

const useAuth = () => {
    const { data: session } = useSession();
    // get uuid from session
    const uuid = session?.user?.uuid || null;
    // get user info by uuid
    const { data: user, isLoading } = useGetUserInfo(uuid as string);

    // loading
    if (isLoading) {
        return <p>loaiding...</p>;
    }

    // Return the user or null if unauthenticated or user not found
    return user;
};

export default useAuth;