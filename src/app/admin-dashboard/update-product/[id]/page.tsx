'use client'

import { useParams } from "next/navigation";

const Page = () => {
    const { id } = useParams()
    return (
        <section>
            {id}
        </section>
    );
};

export default Page;