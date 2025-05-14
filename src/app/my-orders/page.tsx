'use client'
import AllOrders from '@/components/MyOrders/AllOrders';
import DeliveredUser from '@/components/MyOrders/DeliveredUser';
import ToReceived from '@/components/MyOrders/ToReceived';
import ToShip from '@/components/MyOrders/ToShip';
import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const OrderTabs = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <section className="mt-20 px-4 sm:px-8">
            <h2 className="text-2xl font-bold text-center mb-6">Manage Orders</h2>
            <Tabs
                selectedIndex={tabIndex}
                onSelect={(index) => setTabIndex(index)}
                className="rounded-lg bg-white dark:bg-darkCard"
            >
                {/* Tab List */}
                <TabList className="flex flex-wrap justify-center gap-4 sm:gap-6 bg-white dark:bg-darkCard border-b border-gray-300 pb-2 rounded-md">
                    <Tab
                        className={`px-4 py-2 font-medium text-sm sm:text-base hover:text-primary hover:cursor-pointer focus:outline-none border-b-2 
                        ${tabIndex === 0 ? 'text-primary border-primary' : 'text-accent dark:text-white border-transparent'}`}
                        onClick={() => setTabIndex(0)}
                    >
                        All Orders
                    </Tab>
                    <Tab
                        className={`px-4 py-2 font-medium text-sm sm:text-base hover:text-primary hover:cursor-pointer focus:outline-none border-b-2 
                        ${tabIndex === 1 ? 'text-primary border-primary' : 'text-accent dark:text-white border-transparent'}`}
                        onClick={() => setTabIndex(1)}
                    >
                        To Ship
                    </Tab>
                    <Tab
                        className={`px-4 py-2 font-medium text-sm sm:text-base hover:text-primary hover:cursor-pointer focus:outline-none border-b-2 
                        ${tabIndex === 2 ? 'text-primary border-primary' : 'text-accent dark:text-white border-transparent'}`}
                        onClick={() => setTabIndex(2)}
                    >
                        To Receive
                    </Tab>
                    <Tab
                        className={`px-4 py-2 font-medium text-sm sm:text-base hover:text-primary hover:cursor-pointer focus:outline-none border-b-2 
                        ${tabIndex === 3 ? 'text-primary border-primary' : 'text-accent dark:text-white border-transparent'}`}
                        onClick={() => setTabIndex(3)}
                    >
                        Delivered
                    </Tab>
                    <Tab
                        className={`px-4 py-2 font-medium text-sm sm:text-base hover:text-primary hover:cursor-pointer focus:outline-none border-b-2 
                        ${tabIndex === 4 ? 'text-primary border-primary' : 'text-accent dark:text-white border-transparent'}`}
                        onClick={() => setTabIndex(4)}
                    >
                        Canceled
                    </Tab>
                </TabList>

                {/* Tab Panels */}
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 dark:bg-darkCard rounded-lg shadow">
                        <AllOrders />
                    </div>
                </TabPanel>
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 dark:bg-darkCard rounded-lg shadow">
                        <ToShip />
                    </div>
                </TabPanel>
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 dark:bg-darkCard rounded-lg shadow">
                        <ToReceived />
                    </div>
                </TabPanel>
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 dark:bg-darkCard rounded-lg shadow">
                        <DeliveredUser />
                    </div>
                </TabPanel>
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 dark:bg-darkCard rounded-lg shadow">
                        Developer working on this page..
                    </div>
                </TabPanel>
            </Tabs>
        </section>
    );
};

export default OrderTabs;
