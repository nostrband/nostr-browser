import { VscClose } from 'react-icons/vsc';

import './Tabs.scss';

import { Relay } from '../Relay';

export const Tabs = ({
  data,
  setFilter,
  filter,
  changeFilter,
  active,
  changeActiveTab,
  closeTab,
  unsubscribe,
  changeLinkSub,
}) => {
  const openTab = (event) => changeActiveTab(+event.target.dataset.index);

  const close = (event) => {
    event.stopPropagation();
    closeTab(+event.target.dataset.close);
  };

  return (
    <>
      {data.length > 0 && (
        <div className="tab--mainContainer">
          <div className="tab">
            {data.map((item, index) => (
              <button
                className={`tablinks ${index === active ? 'active' : ''}`}
                onClick={openTab}
                data-index={index}
                key={item.url + index}
                title={
                  item.url + ' ' + filter[index] === null
                    ? null
                    : JSON.stringify(filter[index])
                }
              >
                <div className="closeIcon" onClick={close} data-close={index}>
                  <VscClose size={18} />
                </div>
                {item.url} <br />
                {filter[index] === null ? null : JSON.stringify(filter[index])}
              </button>
            ))}
          </div>
          {data.map((item, index) => (
            <div
              className={`tabcontent ${index === active ? 'active' : ''}`}
              key={index}
            >
              <Relay
                url={item.url}
                setFilter={setFilter}
                ind={index}
                changeFilter={changeFilter}
                filter={filter[index]}
                changeActiveTab={changeActiveTab}
                unsubscribe={unsubscribe}
                changeLinkSub={changeLinkSub}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
