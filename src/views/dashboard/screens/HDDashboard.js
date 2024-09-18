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
import Dashboard5 from "../Dashboard5";
import Dashboard2 from "../Dashboard2";
import Dashboard11 from "../Dashboard11";
import Dashboard4 from "../Dashboard4";
import Dashboard7 from "../Dashboard7";
import FVIDashboard4 from "../FVIDashboard4";
import FVIKPIDashboard from "../FVIKPIDashboard";

import DashboardTable from "../DashboardTable";

const HDDashboard = (props) => {
  const parsed = QueryString.parse(props.location.search);
  const [zone, setZone] = useState(parsed.Zone ? parsed.Zone : "Zone-1");
  const [line, setLine] = useState(parsed.Line ? parsed.Line : "HD");
  const [LoggedStation, setLoggedstn] = useState(parsed.Logged_Station ? parsed.Logged_Station : "HD_FVI");
  const [screen, setScreen] = useState("Dashboard1");
  const [nextTime, setNextTime] = useState(120);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pause, setPause] = useState(true);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

  const dashboardTimer = [
    { screen: "Dashboard1", time: 120 },

    { screen: "Dashboard4", time: 120 },

    { screen: "FVIKPIDashboard", time: 120 },
    { screen: "FVIDashboard4", time: 120 },
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

  const onResume = () => {
    setPause(true);
    setNextTime(15);
  };

  const renderComponent = () => {
    console.log("renderrr", nextTime);

    switch (screen) {
      case "Dashboard1":
        return <Dashboard1 />;
      case "Dashboard7":
        return (
          <Dashboard7 location={{ search: `?Line=${line}&Zone=${zone}` }} />
        );
      case "Dashboard5":
        return <Dashboard5 location={{ search: "?VEHICLETYPE=HD" }} />;


      case "Dashboard11":
        return (
          <Dashboard11 location={{ search: `?Line=${line}&Zone=${zone}` }} />
        );
      case "FVIKPIDashboard":
        return (
          <FVIKPIDashboard location={{ search: `?Line=${line}&Zone=${zone}&Logged_Station=${LoggedStation}` }} />
        );

      case "FVIDashboard4":
        return <FVIDashboard4 location={{ search: `?Line=${line}&Zone=${zone}&Logged_Station=${LoggedStation}` }} />;
      case "Dashboard4":
        return (
          <Dashboard4 location={{ search: `?Line=${line}&Zone=${zone}` }} />
        );
      case "DashboardTable":
        return <DashboardTable />;
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
    <>
      <div className={"page-container"}>
        {renderButton()}
        {renderComponent()}
      </div>
    </>
  );
};

export default HDDashboard;
