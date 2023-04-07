import { useState } from 'react';
import { Modal } from './Modal';
import GetForm from './Form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export const TabPage = () => {
  const [tabs, setTabs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const addTab = (data) => {
    setTabs([...tabs, data]);
  };

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={openModal} style={{ marginBottom: 20 }}>
        {' '}
        Press me
      </button>
      {tabs.length > 0 && (
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            {tabs.length > 0 &&
              tabs.map((tab, ind) => (
                <Tab key={tab.name + ind}>{tab.name}</Tab>
              ))}
          </TabList>
          {tabs.length > 0 &&
            tabs.map((tab, ind) => (
              <TabPanel key={tab.name + ind}>{tab.text}</TabPanel>
            ))}
        </Tabs>
      )}
      <Modal activeModal={isOpen} setActive={closeModal}>
        <GetForm setActive={closeModal} onSubmit={addTab} />
      </Modal>
    </div>
  );
};
