import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";
import {
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaPlay,
  FaPause,
} from "react-icons/fa";

import * as QueryString from "query-string";
import Dashboard1 from "../Dashboard1";
import Dashboard2 from "../Dashboard2";
import Dashboard11 from "../Dashboard11";
import Dashboard4 from "../Dashboard4";
import Dashboard5 from "../Dashboard5";
import Dashboard6 from "../Dashboard6";
import Dashboard7 from "../Dashboard7";
import Dashboard10 from "../Dashboard10";
import Dashboard9 from "../Dashboard9";
import DashboardTable_LMD from "../DashboardTable_LMD";

const LMDDashboard = (props) => {
  const parsed = QueryString.parse(props.location.search);
  const [zone, setZone] = useState(parsed.Zone ? parsed.Zone : "Zone-1");
  const [line, setLine] = useState(parsed.Line ? parsed.Line : "LMD");
  const [screen, setScreen] = useState("Dashboard1");
  const [nextTime, setNextTime] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pause, setPause] = useState(true);

  const dashboardTimer = [
    { screen: "Dashboard1", time: 20 },
    { screen: "Dashboard2", time: 20 },
    { screen: "Dashboard5", time: 30 },
    { screen: "Dashboard6", time: 30 },
    { screen: "Dashboard9", time: 20 },
    { screen: "DashboardTable_LMD", time: 20 },
    { screen: "Dashboard10", time: 20 },
    { screen: "Dashboard11", time: 20 },
    { screen: "Dashboard4", time: 60 },
    { screen: "Dashboard7", time: 60 },
  ];

  let timeOut;

  useEffect(() => {
    if (pause === false) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      const nextIndex =
        currentIndex + 1 === dashboardTimer.length ? 0 : currentIndex + 1;
      const nextData = dashboardTimer[nextIndex];
      setScreen(nextData.screen);
      setCurrentIndex(nextIndex);
      setNextTime(nextData.time);
    }, nextTime * 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [currentIndex, pause]);

  const onPause = () => {
    setPause(false);
    setNextTime(100000);
  };

  const onResume = () => {
    setPause(true);
    setNextTime(20);
  };

  const onNext = () => {
    if (currentIndex !== dashboardTimer.length - 1) {
      const nextscr = dashboardTimer[currentIndex + 1];
      setScreen(nextscr.screen);
      const nextScrIndex =
        currentIndex + 1 === dashboardTimer.length ? 0 : currentIndex + 1;
      setCurrentIndex(nextScrIndex);
    }
  };

  const onPrev = () => {
    if (currentIndex !== 0) {
      const prevscr = dashboardTimer[currentIndex - 1];
      setScreen(prevscr.screen);
      const prevScrIndex =
        currentIndex - 1 === dashboardTimer.length ? 0 : currentIndex - 1;
      setCurrentIndex(prevScrIndex);
    }
  };

  const renderComponent = () => {
    console.log("renderrr", nextTime);
    switch (screen) {
      case "Dashboard1":
        return <Dashboard1 />;
      case "Dashboard2":
        return <Dashboard2 />;
      case "Dashboard11":
        return (
          <Dashboard11 location={{ search: `?Line=${line}&Zone=${zone}` }} />
        );
      case "Dashboard4":
        return (
          <Dashboard4 location={{ search: `?Line=${line}&Zone=${zone}` }} />
        );
      case "Dashboard5":
        return <Dashboard5 location={{ search: "?VEHICLETYPE=LMD" }} />;
      case "Dashboard6":
        return <Dashboard6 />;
      case "Dashboard9":
        return <Dashboard9 />;
      case "Dashboard7":
        return (
          <Dashboard7 location={{ search: `?Line=${line}&Zone=${zone}` }} />
        );
      case "Dashboard10":
        return <Dashboard10 />;
      case "DashboardTable_LMD":
        return <DashboardTable_LMD />;
      default:
        return null;
    }
  };

  const renderButton = () => {
    if (pause) {
      return (
        <>
          <div className={"play-pause-btn"}>
            <CButton onClick={onPrev} shape="rounded-3" color="info" size="sm">
              <FaAngleDoubleLeft />
            </CButton>
            <CButton onClick={onPause} shape="rounded-3" color="info" size="sm">
              <FaPause />
            </CButton>
            <CButton onClick={onNext} shape="rounded-3" color="info" size="sm">
              <FaAngleDoubleRight />
            </CButton>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={"play-pause-btn"}>
            <CButton onClick={onPrev} shape="rounded-3" color="info" size="sm">
              <FaAngleDoubleLeft />
            </CButton>
            <CButton
              onClick={onResume}
              shape="rounded-3"
              color="info"
              size="sm"
            >
              <FaPlay />
            </CButton>
            <CButton onClick={onNext} shape="rounded-3" color="info" size="sm">
              <FaAngleDoubleRight />
            </CButton>
          </div>
        </>
      );
    }
  };

  return (
    <div className={"page-container"}>
      {renderButton()}
      {renderComponent()}
    </div>
  );
};

export default LMDDashboard;
