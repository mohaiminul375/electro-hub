import { useSession } from 'next-auth/react';
import React from 'react';
import { useGetUserInfo } from './api/route';

const useAuth = () => {
    const session = useSession();

    const uuid = session?.data?.user?.uuid;
    const { data: user, isLoading } = useGetUserInfo(uuid)
    if (isLoading) {
        return <p>Loaidng,</p>
    }
    return user;

};

export default useAuth;