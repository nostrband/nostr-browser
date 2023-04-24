import { VscClose } from 'react-icons/vsc';

import './Tabs.scss';

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

            {data.map((item) => (
                <div className="tab">
                  <p> {item.index}</p>
                  <button
                      className={`tablinks ${item.index === active ? 'active' : ''}`}
                      onClick={openTab}
                      data-index={item.index}
                      key={item.url + item.index}
                      title={
                        item.url + ' ' + filter[item.index] === null
                            ? null
                            : JSON.stringify(filter[item.index])
                      }
                  >
                    <div className="closeIcon" onClick={close} data-close={item.index}>
                      <VscClose size={18}/>
                    </div>
                    {item.url} <br/>
                    {filter[item.index] === null ? null : JSON.stringify(filter[item.index])}
                  </button>
                </div>
            ))}
            {data.map((item) => (<div className={`tabcontent ${item.index === active ? 'active' : ''}`} key={item.index+100}
                >
                  {item.relay}</div>))}</div>
      )}
    </>
  );
};
