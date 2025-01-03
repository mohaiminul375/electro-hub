'use client'
import AllOrders from '@/components/MyOrders/AllOrders';
import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const OrderTabs = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <section className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-6">Manage Orders</h2>
            <Tabs
                selectedIndex={tabIndex}
                onSelect={(index) => setTabIndex(index)}
                className="rounded-lg bg-white"
            >
                {/* Tab List */}
                <TabList className="flex justify-center gap-6 bg-white border-b border-gray-300 pb-2 rounded-md">
                    <Tab
                        className={`px-4 py-2 font-medium hover:text-primary hover:cursor-pointer focus:outline-none border-b-2 
                        ${tabIndex === 0 ? 'text-primary border-primary' : 'text-accent border-transparent'}`}
                        onClick={() => setTabIndex(0)}
                    >
                        All Orders
                    </Tab>
                    <Tab
                        className={`px-4 py-2 font-medium hover:text-primary hover:cursor-pointer focus:outline-none border-b-2 
                        ${tabIndex === 1 ? 'text-primary border-primary' : 'text-accent border-transparent'}`}
                        onClick={() => setTabIndex(1)}
                    >
                        To Ship
                    </Tab>
                    <Tab
                        className={`px-4 py-2 font-medium hover:text-primary hover:cursor-pointer focus:outline-none border-b-2 
                        ${tabIndex === 2 ? 'text-primary border-primary' : 'text-accent border-transparent'}`}
                        onClick={() => setTabIndex(2)}
                    >
                        To Receive
                    </Tab>
                    <Tab
                        className={`px-4 py-2 font-medium hover:text-primary hover:cursor-pointer focus:outline-none border-b-2 
                        ${tabIndex === 3 ? 'text-primary border-primary' : 'text-accent border-transparent'}`}
                        onClick={() => setTabIndex(3)}
                    >
                        Delivered
                    </Tab>
                    <Tab
                        className={`px-4 py-2 font-medium hover:text-primary hover:cursor-pointer focus:outline-none border-b-2 
                        ${tabIndex === 4 ? 'text-primary border-primary' : 'text-accent border-transparent'}`}
                        onClick={() => setTabIndex(4)}
                    >
                        Canceled
                    </Tab>
                </TabList>

                {/* Tab Panels */}
                <TabPanel className="mt-6">
                    <AllOrders />
                </TabPanel>
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">To Ship</h3>
                        <p>Display orders that need to be shipped here...</p>
                    </div>
                </TabPanel>
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">To Receive</h3>
                        <p>Display orders to be received here...</p>
                    </div>
                </TabPanel>
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Delivered</h3>
                        <p>Display delivered orders here...</p>
                    </div>
                </TabPanel>
                <TabPanel className="mt-6">
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Canceled</h3>
                        <p>Display canceled orders here...</p>
                    </div>
                </TabPanel>
            </Tabs>
        </section>
    );
};

export default OrderTabs;
