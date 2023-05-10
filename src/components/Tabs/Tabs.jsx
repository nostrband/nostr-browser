import 'bootstrap-icons/font/bootstrap-icons.css';

import './Tabs.scss';
import React, {useState} from "react";

export const Tabs = ({active, changeActiveTab, closeTab, tabs, openFilterModal}) => {
    const [tabsView, setTabsView] = useState(true);
    const openTab = (event) => changeActiveTab(+event.target.dataset.index);

    const toTableView = () => setTabsView(false);
    const toTabsView = () => setTabsView(true);

    const close = (event, index) => {
        event.stopPropagation();
        closeTab(index);
    };

    const openFilter = (event, index) => {
        event.stopPropagation();
        openFilterModal(index);
    };

    return (
        <>
            {tabs.length > 0 && (
                <div className="tab--mainContainer">
                    <button className="btn btn-primary changeStyle--button">
                        {
                            tabsView ? <i onClick={toTableView} className="bi bi-layout-three-columns"></i> :
                                <i onClick={toTabsView} className="bi bi-layout-wtf"></i>
                        }
                    </button>

                    {
                        tabsView ?
                            <div>
                                <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                                    {tabs.map((item) => (
                                        <li className="nav-item tabRelative" role="presentation"
                                            key={item.url + item.index}>
                                            <button onClick={openTab}
                                                    data-index={item.index}
                                                    className={`nav-link ${item.index === active ? 'active' : ''} tabPil`}
                                                    id="profile-tab" data-bs-toggle="tab"
                                                    data-bs-target="#pills-home"
                                                    type="button" role="tab" aria-controls="pills-home"
                                                    aria-selected="true">
                                            <span className="bi bi-filter filterIcon"
                                                  onClick={(event) => openFilter(event, item.index)}></span>
                                                {item.url} <br/>
                                                {item.filter === null ? null : JSON.stringify(item.filter)}
                                                <span className="closeIcon" aria-hidden="true"
                                                      onClick={(event) => close(event, item.index)}>&times;</span>
                                            </button>

                                        </li>
                                    ))}
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    {tabs.map((item) => (
                                        <div key={item.url + item.index}
                                             className={`tab-pane fade show ${item.index === active ? 'active' : ''}`}
                                             id="home" role="tabpanel"
                                             aria-labelledby="pills-home-tab">
                                            {item.relay}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            :

                            <div>
                                <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
                                    {tabs.map((item) => (
                                        <li className="nav-item tabRelative" role="presentation"
                                            key={item.url + item.index}>
                                            <button onClick={openTab}
                                                    data-index={item.index}
                                                    className={`nav-link ${item.index === active ? 'active' : ''} tabPil`}
                                                    id="profile-tab" data-bs-toggle="tab"
                                                    data-bs-target="#pills-home"
                                                    type="button" role="tab" aria-controls="pills-home"
                                                    aria-selected="true">
                                                <span className="bi bi-filter filterIcon"
                                                      onClick={(event) => openFilter(event, item.index)}></span>
                                                {item.url} <br/>
                                                {item.filter === null ? null : JSON.stringify(item.filter)}
                                                <span className="closeIcon" aria-hidden="true"
                                                      onClick={(event) => close(event, item.index)}>&times;</span>
                                            </button>

                                        </li>
                                    ))}
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    {tabs.map((item) => (
                                        <div key={item.url + item.index}
                                             className={`tab-pane fade show ${item.index === active ? 'active' : ''}`}
                                             id="home" role="tabpanel"
                                             aria-labelledby="pills-home-tab">
                                            {item.relay}
                                        </div>
                                    ))}
                                </div>
                            </div>
                    }

                </div>
            )}
        </>
    );
};
