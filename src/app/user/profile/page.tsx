'use client'
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UpdateProfile from './UpdateProfile';
import AddressBook from './AddressBook';
// import 'react-tabs/style/react-tabs.css';
export const dynamic = 'force-dynamic';
const Page = () => {
    const [tabIndex, setTabIndex] = useState<number>(0);
    return (
        <section className='mt-0'>
            <head>
                <title>Electro-Hub | User Information</title>
            </head>
            <Tabs
                selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}
                className="rounded-lg bg-white dark:bg-darkCard">
                {/* Tab List */}
                <TabList className="flex justify-center gap-8 bg-white dark:bg-darkCard border-b border-gray-300 pb-2 rounded-md">
                    <Tab
                        checked={tabIndex === 0}
                        onClick={() => setTabIndex(0)}
                        className={`px-4 py-2 hover:cursor-pointer  font-medium hover:text-primary focus:outline-none border-b-2 
                        ${tabIndex === 0 ? 'text-primary border-primary' : 'text-accent dark:text-white border-transparent'}`}
                    >
                        Profile
                    </Tab>
                    <Tab
                        checked={tabIndex === 1}
                        onClick={() => setTabIndex(1)}
                        className={`px-4 py-2 font-medium hover:text-primary hover:cursor-pointer focus:outline-none border-b-2 
                            ${tabIndex === 1 ? 'text-primary border-primary' : 'text-accent dark:text-white border-transparent'}`}>
                        Address
                    </Tab>
                </TabList>

                {/* Tab Panels */}
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 dark:bg-darkCard shadow">
                        <UpdateProfile />
                    </div>
                </TabPanel>
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 dark:bg-darkCard rounded-lg shadow">
                        <AddressBook />
                    </div>
                </TabPanel>
            </Tabs>


        </section >
    );
};

export default Page;