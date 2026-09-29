// Imports
import React from 'react';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';





// Main Function
const TabsCom = ({tabs}:any) => {
    return (
        <Tabs
            defaultValue={tabs[0]}
        >
            <TabsList>
                {tabs.map((tab:any) => (
                    <TabsTrigger value={tab}>{tab}</TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};





// Export
export default TabsCom;