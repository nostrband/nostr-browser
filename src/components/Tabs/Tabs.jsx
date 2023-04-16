import { useState } from 'react';

import './Tabs.scss';
import { Relay } from '../Relay';

export const Tabs = ({ data, setFilter, filter, changeFilter }) => {
  const [active, setActive] = useState(0);

  const openTab = (event) => setActive(+event.target.dataset.index);

  return (
    <>
      {data.length > 0 && (
        <div>
          <div className="tab">
            {data.map((item, index) => (
              <button
                className={`tablinks ${index === active ? 'active' : ''}`}
                onClick={openTab}
                data-index={index}
                key={item.url + index}
              >
                {item.url}{' '}
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
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
