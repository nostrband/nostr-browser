import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export const TabPage = ({ data }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      {data.length > 0 && (
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            {data.length > 0 &&
              data.map((tab, ind) => (
                <Tab key={tab.name + ind}>{tab.name}</Tab>
              ))}
          </TabList>
          {data.length > 0 &&
            data.map((tab, ind) => (
              <TabPanel key={tab.name + ind}>{tab.text}</TabPanel>
            ))}
        </Tabs>
      )}
    </>
  );
};
