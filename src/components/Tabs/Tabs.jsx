import './Tabs.scss';

import { Relay } from '../Relay';

export const Tabs = ({
  data,
  setFilter,
  filter,
  changeFilter,
  active,
  changeActiveTab,
}) => {
  const openTab = (event) => changeActiveTab(+event.target.dataset.index);

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
                {item.url}{' '}<br />
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
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
