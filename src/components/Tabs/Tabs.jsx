import { useState } from 'react';

import './Tabs.scss';
import { Relay } from '../Relay';

export const Tabs = ({ data }) => {
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
                {item.url}
              </button>
            ))}
          </div>
          {data.map((_item, index) => (
            <div
              className={`tabcontent ${index === active ? 'active' : ''}`}
              key={index}
            >
              <Relay />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
