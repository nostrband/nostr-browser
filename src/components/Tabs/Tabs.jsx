import { VscClose } from 'react-icons/vsc';

import './Tabs.scss';

export const Tabs = ({ filter, active, changeActiveTab, closeTab, tabs }) => {
  const openTab = (event) => changeActiveTab(+event.target.dataset.index);

  const close = (event) => {
    event.stopPropagation();
    closeTab(+event.target.dataset.close);
  };

  return (
    <>
      {tabs.length > 0 && (
        <div className="tab--mainContainer">
          <div className="tab">
            {tabs.map((item) => (
              <button
                className={`tablinks ${item.index === active ? 'active' : ''}`}
                onClick={openTab}
                data-index={item.index}
                title={
                  item.url +
                  ' ' +
                  (item.filter === null ? null : JSON.stringify(item.filter))
                }
                key={item.url + item.index}
              >
                <div
                  className="closeIcon"
                  onClick={close}
                  data-close={item.index}
                >
                  <VscClose size={18} />
                </div>
                {item.url} <br />
                {filter[item.index] === null ? null : filter[item.index]}
              </button>
            ))}
          </div>
          {tabs.map((item) => (
            <div
              className={`tabcontent ${item.index === active ? 'active' : ''}`}
              key={item.index}
            >
              {item.relay}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
