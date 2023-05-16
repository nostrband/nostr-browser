import 'bootstrap-icons/font/bootstrap-icons.css';

import './Tabs.scss';
import React, { useState } from 'react';
import { changeRelayName } from '../../utils/helpers';
import {Relay} from "../Relay.jsx";

export const Tabs = ({
  active,
  changeActiveTab,
  closeTab,
  tabs,
  openFilterModal,
  changeLinkSub,
  showProfiles,
  getAuthorsRelayUrl
}) => {
  const [tabsView, setTabsView] = useState(true);

  const openTab = (event) => changeActiveTab(+event.target.dataset.index);

  const close = (event, index) => {
    event.stopPropagation();
    closeTab(index);
  };

  const toggleTableView = () => setTabsView(!tabsView);

  const openFilter = (event, index) => {
    event.stopPropagation();
    openFilterModal(index);
  };

  const getPaddingWidth = () => {
    return (tabs.length - 1) * 10;
  };

  return (
    <>
      {tabs.length > 0 && (
        <div className="tab--mainContainer">
          <button
            className="btn btn-primary changeStyle--button"
            onClick={toggleTableView}
          >
            {tabsView ? (
              <i className="bi bi-layout-three-columns"></i>
            ) : (
              <i className="bi bi-layout-wtf"></i>
            )}
          </button>

          {tabsView ? (
            <div>
              <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                {tabs.map((item) => (
                  <li
                    className="nav-item tabRelative"
                    role="presentation"
                    key={changeRelayName(item.url) + item.index}
                  >
                    <button
                      onClick={openTab}
                      data-index={item.index}
                      className={`nav-link ${
                        item.index === active ? 'active' : ''
                      } tabPil`}
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      <span
                        className="bi bi-filter filterIcon"
                        onClick={(event) => openFilter(event, item.index)}
                      ></span>
                      {changeRelayName(item.url)} <br />
                      {item.filter === null ? null : item.filter}
                      <span
                        className="closeIcon"
                        aria-hidden="true"
                        onClick={(event) => close(event, item.index)}
                      >
                        &times;
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="tab-content" id="pills-tabContent">
                {tabs.map((item) => (
                  <div
                    key={changeRelayName(item.url) + item.index}
                    className={`tab-pane fade show ${
                      item.index === active ? 'active' : ''
                    }`}
                    id="home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <Relay
                        ind={item.index}
                        url={item.url}
                        changeLinkSub={changeLinkSub}
                        filterVal={item.filter}
                        showProfiles={showProfiles}
                        getAuthorsRelayUrl={getAuthorsRelayUrl}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <ul
                className="nav nav-pills nav-justified mb-3 pills-headers d-flex flex-nowrap"
                id="pills-tab"
                role="tablist"
              >
                {tabs.map((item) => (
                  <li
                    className="nav-item tabRelative border border-primary rounded"
                    role="presentation"
                    key={changeRelayName(item.url) + item.index}
                  >
                    <button
                      data-index={item.index}
                      className={`nav-link tabPil`}
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      <span
                        className="bi bi-filter filterIcon"
                        onClick={(event) => openFilter(event, item.index)}
                      ></span>
                      {changeRelayName(item.url)} <br />
                      {item.filter === null ? null : item.filter}
                      <span
                        className="closeIcon"
                        aria-hidden="true"
                        onClick={(event) => close(event, item.index)}
                      >
                        &times;
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div
                className="tab-content d-flex  pills-contents"
                id="pills-tabContent"
              >
                {tabs.map((item) => (
                  <div
                    key={item.url + item.index}
                    className={`tab-pane fade show active`}
                    id="home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    style={{
                      width: `calc((100% - ${getPaddingWidth()}px)/ ${
                        tabs.length
                      })`,
                    }}
                  >
                    <Relay
                        ind={item.index}
                        url={item.url}
                        changeLinkSub={changeLinkSub}
                        filterVal={item.filter}
                        showProfiles={showProfiles}
                        getAuthorsRelayUrl={getAuthorsRelayUrl}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
