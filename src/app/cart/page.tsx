import React from 'react';

const Page = () => {
    return (
        <section className='grid grid-cols-12 gap-4 h-12'>
            <div className='col-span-8 border-8 border-gray-950'>
                First Column
            </div>
            <div className='col-span-4 border-8 border-red-700'>
                Second Column
            </div>
        </section>
    );
};

export default Page;