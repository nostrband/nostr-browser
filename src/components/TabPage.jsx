import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Tabs.scss';
import { Relay } from './Relay';

export const TabPage = ({ data, changeMessages, tabsData }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      {data.length > 0 && (
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            {data.length > 0 &&
              data.map((tab, ind) => <Tab key={tab.url + ind}>{tab.url}</Tab>)}
          </TabList>
          {data.length > 0 &&
            data.map((tab, ind) => (
              <TabPanel key={tab.url + ind}>
                <Relay
                  changeMessages={changeMessages}
                  ind={ind}
                  tabsData={tabsData}
                />
              </TabPanel>
            ))}
        </Tabs>
      )}
    </>
  );
};
