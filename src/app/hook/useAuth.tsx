import { useSession } from 'next-auth/react';
import React from 'react';
import { useGetUserInfo } from './api/route';

const useAuth = () => {
    const { data: session, status: sessionStatus } = useSession();

    // Always define the UUID, even if session isn't ready
    const uuid = session?.user?.uuid || null;

    // Always call the user fetching hook, but control its behavior with the `enabled` option
    const { data: user, isLoading } = useGetUserInfo(uuid, {
        enabled: !!uuid,
    });

    // Handle loading states
    if (sessionStatus === 'loading' || isLoading) {
        return null;
    }

    // Return the user or null if unauthenticated or user not found
    return user || null;
};

export default useAuth;