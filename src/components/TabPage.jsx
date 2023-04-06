import { useState } from 'react';
import { Modal } from './Modal';
import GetForm from './Form';

export const TabPage = () => {
  const [tabs, setTabs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const addTab = (data) => {
    setTabs([...tabs, ...data]);
  };

  return (
    <div>
      <button onClick={openModal}> Press me</button>
      {tabs.length > 0 &&
        tabs.map((tab, ind) => {
          return (
            <div key={tab.name + ind}>
              <p>name: {tab.name}</p>
              <p>text: {tab.text}</p>
            </div>
          );
        })}
      <Modal activeModal={isOpen} setActive={closeModal}>
        <GetForm setActive={closeModal} onSubmit={addTab} />
      </Modal>
    </div>
  );
};
