// src/HDChassisDashboard.js
import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";
import {
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import * as QueryString from "query-string";

import PROKPIDashboard from "../PROKPIDashboard";
import Dashboard5 from "../Dashboard5";
import Dashboard2 from "../Dashboard2";
import Dashboard11 from "../Dashboard11";
import Dashboard4 from "../Dashboard4";
import Dashboard7 from "../Dashboard7";
import FVIDashboard4 from "../FVIDashboard4";
import FVIKPIDashboard from "../FVIKPIDashboard";
import QGDashboard4 from "../QGDashboard4";
import QGKPIDashboard from "../QGKPIDashboard";
import DeploymentScreen from "../deploymentScreen";

const HDChassisDashboard = (props) => {
  const parsed = QueryString.parse(props.location.search);
  const [zone, setZone] = useState(parsed.Zone || "Zone-1");
  const [line, setLine] = useState(parsed.Line || "HD");
  const [mainline, setMainLine] = useState(parsed.mainLine || "HD");
  const [LoggedStation, setLoggedstn] = useState(parsed.Logged_Station || "HD_FVI");
  const [screen, setScreen] = useState("PROKPIDashboard");
  const timeGap = 120;
  const [nextTime, setNextTime] = useState(timeGap);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pause, setPause] = useState(true);

  // for QG dashboards
  const lgSTN = "HD_QG";
  // determine production line
  let proLine = (parsed.Line === "LD-CT" || parsed.Line === "LMD") ? "LMD" : "HD";

  const dashboardTimer = [
    { screen: "PROKPIDashboard",   time: timeGap },
    { screen: "Dashboard4",         time: timeGap },
    { screen: "FVIKPIDashboard",    time: timeGap },
    { screen: "FVIDashboard4",      time: timeGap },
    { screen: "QGKPIDashboard",     time: timeGap },
    { screen: "QGDashboard4",       time: timeGap },
    { screen: "DeploymentScreen",   time: timeGap },
  ];

  useEffect(() => {
    let timer;
    if (pause) {
      timer = setTimeout(() => {
        const nextIndex = (currentIndex + 1) % dashboardTimer.length;
        const nextData  = dashboardTimer[nextIndex];
        setScreen(nextData.screen);
        setCurrentIndex(nextIndex);
        setNextTime(nextData.time);
      }, nextTime * 1000);
    }
    return () => clearTimeout(timer);
  }, [currentIndex, pause, nextTime]);

  const onPause  = () => { setPause(false); setNextTime(100000); };
  const onResume = () => { setPause(true);  setNextTime(timeGap);  };

  const onNext = () => {
    const nextIndex = (currentIndex + 1) % dashboardTimer.length;
    setCurrentIndex(nextIndex);
    setScreen(dashboardTimer[nextIndex].screen);
  };
  const onPrev = () => {
    const prevIndex =
      currentIndex === 0
        ? dashboardTimer.length - 1
        : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setScreen(dashboardTimer[prevIndex].screen);
  };

  const renderComponent = () => {
    const commonProps = { location: { search: `?Line=${line}&Zone=${zone}&mainLine=${mainline}` } };
    switch (screen) {
      case "PROKPIDashboard":
        return <PROKPIDashboard {...commonProps} />;
      case "Dashboard4":
        return <Dashboard4 location={{ search: `?Line=${line}&Zone=${zone}` }} />;
      case "Dashboard5":
        return <Dashboard5 location={{ search: "?VEHICLETYPE=HD" }} />;
      case "Dashboard7":
        return <Dashboard7 location={{ search: `?Line=${line}&Zone=${zone}` }} />;
      case "Dashboard11":
        return <Dashboard11 location={{ search: `?Line=${line}&Zone=${zone}` }} />;
      case "FVIKPIDashboard":
        return (
          <FVIKPIDashboard
            location={{
              search: `?Line=${line}&Zone=${zone}&Logged_Station=${LoggedStation}&mainLine=${mainline}`,
            }}
          />
        );
      case "FVIDashboard4":
        return (
          <FVIDashboard4
            location={{ search: `?Line=${line}&Zone=${zone}&Logged_Station=${LoggedStation}` }}
          />
        );
      case "QGKPIDashboard":
        return (
          <QGKPIDashboard
            location={{
              search: `?Line=${line}&Zone=${zone}&Logged_Station=${lgSTN}&mainLine=${mainline}`,
            }}
          />
        );
      case "QGDashboard4":
        return (
          <QGDashboard4
            location={{ search: `?Line=${line}&Zone=${zone}&Logged_Station=${lgSTN}` }}
          />
        );
      case "DeploymentScreen":
        return <DeploymentScreen />;
      default:
        return null;
    }
  };

  const renderControls = () => (
    <div className="play-pause-btn">
      <CButton onClick={onPrev}  shape="rounded-3" color="info" size="sm">
        <FaAngleDoubleLeft />
      </CButton>
      {pause ? (
        <CButton onClick={onPause} shape="rounded-3" color="info" size="sm">
          <FaPause />
        </CButton>
      ) : (
        <CButton onClick={onResume} shape="rounded-3" color="info" size="sm">
          <FaPlay />
        </CButton>
      )}
      <CButton onClick={onNext}  shape="rounded-3" color="info" size="sm">
        <FaAngleDoubleRight />
      </CButton>
    </div>
  );

  return (
    <div className="page-container" style={{ height: '100vh', width: '100vw' }}>
      {renderControls()}
      <div style={{ flex: 1, position: 'relative' }}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default HDChassisDashboard;
