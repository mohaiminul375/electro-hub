'use client'
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UpdateProfile from './UpdateProfile';
import AddressBook from './AddressBook';
// import 'react-tabs/style/react-tabs.css';
const page = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    // const [selected, setSelectedTab] = useState(0);
    return (
        <section className='mt-20'>
            <h2>Welocome to</h2>
            <Tabs className="rounded-lg bg-white">
                {/* Tab List */}
                <TabList className="flex justify-center gap-8 bg-white border-b border-gray-300 pb-2">
                    <Tab
                        checked={selectedTab === 0}
                        onClick={() => setSelectedTab(0)}
                        className={`px-4 py-2 hover:cursor-pointer  font-medium hover:text-primary focus:outline-none border-b-2 
  ${selectedTab === 0 ? 'text-primary border-primary' : 'text-accent border-transparent'}`}
                    >
                        Profile
                    </Tab>
                    <Tab
                        checked={selectedTab === 1}
                        onClick={() => setSelectedTab(1)}
                        className={`px-4 py-2 font-medium hover:text-primary hover:cursor-pointer focus:outline-none border-b-2 
                            ${selectedTab === 1 ? 'text-primary border-primary' : 'text-accent border-transparent'}`}>
                        Address
                    </Tab>
                </TabList>

                {/* Tab Panels */}
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 shadow">
                        <UpdateProfile />
                    </div>
                </TabPanel>
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <AddressBook />
                    </div>
                </TabPanel>
            </Tabs>


        </section >
    );
};

export default page;