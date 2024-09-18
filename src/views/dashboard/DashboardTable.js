import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import moment from "moment";
import axios from "axios";
import { API_URL, CreateArray } from "../../config";
import LoadingPage from "./LoadingPage";

const Dashboard7 = () => {
  const [isLoading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({
    ZONEWISEDEMERITTREND: {
      ZONEWISETREND: [
        {
          ZONE: "Zone-1",
          PREVIOUSTOPREVIOUSMONTH: "85",
          PREVIOUSMONTH: "53",
          CURRENTMONTH: "40",
          ROLLING_WEEK: "45",
          PREVIOUSDAY: "43",
          CURRENTDAY: "41",
        },
        {
          ZONE: "Zone-2",
          PREVIOUSTOPREVIOUSMONTH: "85",
          PREVIOUSMONTH: "53",
          CURRENTMONTH: "41",
          ROLLING_WEEK: "46",
          PREVIOUSDAY: "47",
          CURRENTDAY: "46",
        },
        {
          ZONE: "Zone-3",
          PREVIOUSTOPREVIOUSMONTH: "83",
          PREVIOUSMONTH: "75",
          CURRENTMONTH: "67",
          ROLLING_WEEK: "70",
          PREVIOUSDAY: "57",
          CURRENTDAY: "60",
        },
        {
          ZONE: "Zone-4",
          PREVIOUSTOPREVIOUSMONTH: "84",
          PREVIOUSMONTH: "80",
          CURRENTMONTH: "72",
          ROLLING_WEEK: "67",
          PREVIOUSDAY: "76",
          CURRENTDAY: "70",
        },
        {
          ZONE: "Zone-5",
          PREVIOUSTOPREVIOUSMONTH: "87",
          PREVIOUSMONTH: "67",
          CURRENTMONTH: "50",
          ROLLING_WEEK: "54",
          PREVIOUSDAY: "44",
          CURRENTDAY: "49",
        },
        {
          ZONE: "Zone-6",
          PREVIOUSTOPREVIOUSMONTH: "70",
          PREVIOUSMONTH: "65",
          CURRENTMONTH: "60",
          ROLLING_WEEK: "48",
          PREVIOUSDAY: "40",
          CURRENTDAY: "42",
        },
      ],
    },
    CRITICALDEMERITCOUNT: {
      DEMERITCOUNT: [
        {
          ZONE: "Zone-1",
          DAY1: { HUNDREDDEMERIT: "0", TWENTYFIVEDEMERIT: "0" },
          DAY2: { HUNDREDDEMERIT: "0", TWENTYFIVEDEMERIT: "1" },
          DAY3: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "1" },
          DAY4: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "0" },
          DAY5: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "1" },
          DAY6: { HUNDREDDEMERIT: "0", TWENTYFIVEDEMERIT: "0" },
        },
        {
          ZONE: "Zone-2",
          DAY1: { HUNDREDDEMERIT: "0", TWENTYFIVEDEMERIT: "0" },
          DAY2: { HUNDREDDEMERIT: "0", TWENTYFIVEDEMERIT: "1" },
          DAY3: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "2" },
          DAY4: { HUNDREDDEMERIT: "2", TWENTYFIVEDEMERIT: "3" },
          DAY5: { HUNDREDDEMERIT: "2", TWENTYFIVEDEMERIT: "1" },
          DAY6: { HUNDREDDEMERIT: "0", TWENTYFIVEDEMERIT: "1" },
        },
        {
          ZONE: "Zone-3",
          DAY1: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "0" },
          DAY2: { HUNDREDDEMERIT: "3", TWENTYFIVEDEMERIT: "2" },
          DAY3: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "2" },
          DAY4: { HUNDREDDEMERIT: "3", TWENTYFIVEDEMERIT: "1" },
          DAY5: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "1" },
          DAY6: { HUNDREDDEMERIT: "2", TWENTYFIVEDEMERIT: "3" },
        },
        {
          ZONE: "Zone-4",
          DAY1: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "2" },
          DAY2: { HUNDREDDEMERIT: "2", TWENTYFIVEDEMERIT: "3" },
          DAY3: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "1" },
          DAY4: { HUNDREDDEMERIT: "2", TWENTYFIVEDEMERIT: "0" },
          DAY5: { HUNDREDDEMERIT: "3", TWENTYFIVEDEMERIT: "1" },
          DAY6: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "2" },
        },
        {
          ZONE: "Zone-5",
          DAY1: { HUNDREDDEMERIT: "0", TWENTYFIVEDEMERIT: "2" },
          DAY2: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "1" },
          DAY3: { HUNDREDDEMERIT: "2", TWENTYFIVEDEMERIT: "0" },
          DAY4: { HUNDREDDEMERIT: "0", TWENTYFIVEDEMERIT: "1" },
          DAY5: { HUNDREDDEMERIT: "3", TWENTYFIVEDEMERIT: "1" },
          DAY6: { HUNDREDDEMERIT: "3", TWENTYFIVEDEMERIT: "2" },
        },
        {
          ZONE: "Zone-6",
          DAY1: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "0" },
          DAY2: { HUNDREDDEMERIT: "2", TWENTYFIVEDEMERIT: "1" },
          DAY3: { HUNDREDDEMERIT: "0", TWENTYFIVEDEMERIT: "0" },
          DAY4: { HUNDREDDEMERIT: "1", TWENTYFIVEDEMERIT: "1" },
          DAY5: { HUNDREDDEMERIT: "2", TWENTYFIVEDEMERIT: "1" },
          DAY6: { HUNDREDDEMERIT: "3", TWENTYFIVEDEMERIT: "1" },
        },
      ],
    },
    LINEANDZONEWISETREND: {
      LINEZONETREND: [
        {
          SHIFTWISETREND: [
            {
              LINE: "FP",
              LINE_ZONE: "Zone-1",
              SHIFT: "A",
              DAY1: "25",
              DAY2: "28",
              DAY3: "32",
              DAY4: "36",
              DAY5: "27",
              DAY6: "32",
            },
            {
              LINE: "FP",
              LINE_ZONE: "Zone-1",
              SHIFT: "B",
              DAY1: "23",
              DAY2: "28",
              DAY3: "25",
              DAY4: "31",
              DAY5: "29",
              DAY6: "25",
            },
            {
              LINE: "FP",
              LINE_ZONE: "Zone-1",
              SHIFT: "C",
              DAY1: "30",
              DAY2: "27",
              DAY3: "24",
              DAY4: "31",
              DAY5: "23",
              DAY6: "33",
            },
          ],
        },
        {
          SHIFTWISETREND: [
            {
              LINE: "FP",
              LINE_ZONE: "Zone-2",
              SHIFT: "A",
              DAY1: "30",
              DAY2: "24",
              DAY3: "26",
              DAY4: "33",
              DAY5: "28",
              DAY6: "31",
            },
            {
              LINE: "FP",
              LINE_ZONE: "Zone-2",
              SHIFT: "B",
              DAY1: "38",
              DAY2: "24",
              DAY3: "40",
              DAY4: "36",
              DAY5: "25",
              DAY6: "28",
            },
            {
              LINE: "FP",
              LINE_ZONE: "Zone-2",
              SHIFT: "C",
              DAY1: "30",
              DAY2: "22",
              DAY3: "27",
              DAY4: "34",
              DAY5: "28",
              DAY6: "32",
            },
          ],
        },
        {
          SHIFTWISETREND: [
            {
              LINE: "HD1",
              LINE_ZONE: "Zone-3",
              SHIFT: "A",
              DAY1: "56",
              DAY2: "67",
              DAY3: "65",
              DAY4: "60",
              DAY5: "76",
              DAY6: "61",
            },
            {
              LINE: "HD1",
              LINE_ZONE: "Zone-3",
              SHIFT: "B",
              DAY1: "64",
              DAY2: "70",
              DAY3: "75",
              DAY4: "69",
              DAY5: "75",
              DAY6: "72",
            },
            {
              LINE: "HD1",
              LINE_ZONE: "Zone-3",
              SHIFT: "C",
              DAY1: "60",
              DAY2: "66",
              DAY3: "73",
              DAY4: "71",
              DAY5: "78",
              DAY6: "65",
            },
          ],
        },
        {
          SHIFTWISETREND: [
            {
              LINE: "HD1",
              LINE_ZONE: "Zone-4",
              SHIFT: "A",
              DAY1: "73",
              DAY2: "61",
              DAY3: "72",
              DAY4: "75",
              DAY5: "66",
              DAY6: "59",
            },
            {
              LINE: "HD1",
              LINE_ZONE: "Zone-4",
              SHIFT: "B",
              DAY1: "67",
              DAY2: "71",
              DAY3: "63",
              DAY4: "77",
              DAY5: "79",
              DAY6: "73",
            },
            {
              LINE: "HD1",
              LINE_ZONE: "Zone-4",
              SHIFT: "C",
              DAY1: "73",
              DAY2: "70",
              DAY3: "73",
              DAY4: "65",
              DAY5: "67",
              DAY6: "75",
            },
          ],
        },
        {
          SHIFTWISETREND: [
            {
              LINE: "HD2",
              LINE_ZONE: "Zone-5",
              SHIFT: "A",
              DAY1: "71",
              DAY2: "70",
              DAY3: "67",
              DAY4: "79",
              DAY5: "75",
              DAY6: "73",
            },
            {
              LINE: "HD2",
              LINE_ZONE: "Zone-5",
              SHIFT: "B",
              DAY1: "76",
              DAY2: "75",
              DAY3: "73",
              DAY4: "80",
              DAY5: "74",
              DAY6: "73",
            },
            {
              LINE: [],
              LINE_ZONE: "HD2",
              SHIFT: "C",
              DAY1: "77",
              DAY2: "70",
              DAY3: "74",
              DAY4: "76",
              DAY5: "79",
              DAY6: "73",
            },
          ],
        },
        {
          SHIFTWISETREND: [
            {
              LINE: "HD2",
              LINE_ZONE: "Zone-6",
              SHIFT: "A",
              DAY1: "77",
              DAY2: "70",
              DAY3: "73",
              DAY4: "76",
              DAY5: "69",
              DAY6: "73",
            },
            {
              LINE: "HD2",
              LINE_ZONE: "Zone-6",
              SHIFT: "B",
              DAY1: "71",
              DAY2: "67",
              DAY3: "70",
              DAY4: "68",
              DAY5: "63",
              DAY6: "60",
            },
            {
              LINE: "HD2",
              LINE_ZONE: "Zone-6",
              SHIFT: "C",
              DAY1: "55",
              DAY2: "57",
              DAY3: "51",
              DAY4: "63",
              DAY5: "65",
              DAY6: "60",
            },
          ],
        },
      ],
    },
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/dashboard_Table.php`)
      .then(function (response) {
        setPageData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }, []);

  const generateEmptyRows = (data, colspan) => {
    if (data.length < 6) {
      const elm = [];
      const tds = () => {
        const elmTD = [];
        for (let i = 0; i < colspan; i++) {
          elmTD.push(<td key={i.toString()}></td>);
        }
        return elmTD;
      };
      for (let i = 0; i < 6 - data.length; i++) {
        elm.push(<tr key={i.toString()}>{tds()}</tr>);
      }
      return elm;
    }
  };

  let ZONEWISETRENDDemerit = CreateArray(
    pageData.ZONEWISEDEMERITTREND.ZONEWISETREND
  );
  let CRITICALDEMERITCOUNTDemerit = CreateArray(
    pageData.CRITICALDEMERITCOUNT.DEMERITCOUNT
  );
  // let SHIFTWISETRENDDemeritZone1 = CreateArray(
  //   pageData.LINEANDZONEWISETREND.LINEZONETREND[0].SHIFTWISETREND
  // );
  // let SHIFTWISETRENDDemeritZone2 = CreateArray(
  //   pageData.LINEANDZONEWISETREND.LINEZONETREND[1].SHIFTWISETREND
  // );
  // let SHIFTWISETRENDDemeritZone3 = CreateArray(
  //   pageData.LINEANDZONEWISETREND.LINEZONETREND[2].SHIFTWISETREND
  // );
  // let SHIFTWISETRENDDemeritZone4 = CreateArray(
  //   pageData.LINEANDZONEWISETREND.LINEZONETREND[3].SHIFTWISETREND
  // );
  // let SHIFTWISETRENDDemeritZone5 = CreateArray(
  //   pageData.LINEANDZONEWISETREND.LINEZONETREND[4].SHIFTWISETREND
  // );
  // let SHIFTWISETRENDDemeritZone6 = CreateArray(
  //   pageData.LINEANDZONEWISETREND.LINEZONETREND[5].SHIFTWISETREND
  // );

  const getFontColor = (value) => {
    if (parseInt(value) > parseInt(5)) {
      return "font-red";
    } else {
      return "font-green";
    }
  };
  const getFontColorFor2ndTable = (value) => {
    if (parseInt(value) > parseInt(0)) {
      return "font-red";
    } else {
      return "font-green";
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <CRow className="main-dashboard-wrap main-Dashboard3-wrap">
          <CCol lg="12" className="text-center main-head">
            <h5>Product Audit Demerit - All Zones Performance Summary - HD</h5>
          </CCol>
          <CCol lg="12">
            <CRow className="main-row main-row-2" style={{ marginTop: "8px" }}>
              <CCol md="12">
                {/* <div className="inner-box inner-box-dash2">
                <div className="row">
                  <div className="col-md-12 gauge-gaurd-title1 text-left">
                    <h2>{moment().format("DD/MM/YYYY")}</h2>
                  </div>
                </div> */}
                <CRow>
                  <CCol lg="12" align="center">
                    <CCard className="main-card-6">
                      <CCardBody className={"scroll-table-6"}>
                        <div className="col-md-12 gauge-gaurd-title text-center">
                          <h3 style={{ fontSize: "3vh" }}>
                            Zone Wise Demerit Trend
                          </h3>
                        </div>
                        <table className="table table-hover table-striped table-bordered table-sm blue-table">
                          <thead style={{ textAlign: "center" }}>
                            <tr>
                              <th scope="col" style={{fontSize:"2.2vh"}}>ZONE</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>
                                {moment()
                                  .subtract(2, "month")
                                  .format("MMM - YY")}
                              </th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>
                                {moment()
                                  .subtract(1, "month")
                                  .format("MMM - YY")}
                              </th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>{moment().format("MMM - YY")}</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>Rolling Week</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>
                                {moment()
                                  .subtract(1, "day")
                                  .format("DD-MMM-YYYY")}
                              </th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>
                                {moment().format("DD-MMM-YYYY")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {ZONEWISETRENDDemerit.map((item, index) => {
                              return (
                                <tr
                                  key={index.toString()}
                                  align="center"
                                  style={{ fontWeight: "bold" }}
                                >
                                  <td>{item.ZONE}</td>
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.PREVIOUSTOPREVIOUSMONTH
                                    )}`}
                                  >
                                    {item.PREVIOUSTOPREVIOUSMONTH}
                                  </td>
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.PREVIOUSMONTH
                                    )}`}
                                  >
                                    {item.PREVIOUSMONTH}
                                  </td>
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.CURRENTMONTH
                                    )}`}
                                  >
                                    {item.CURRENTMONTH}
                                  </td>
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.ROLLING_WEEK
                                    )}`}
                                  >
                                    {item.ROLLING_WEEK}
                                  </td>
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.PREVIOUSDAY
                                    )}`}
                                  >
                                    {item.PREVIOUSDAY}
                                  </td>
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.CURRENTDAY
                                    )}`}
                                  >
                                    {item.CURRENTDAY}
                                  </td>
                                </tr>
                              );
                            })}

                            {generateEmptyRows(
                              pageData.ZONEWISEDEMERITTREND.ZONEWISETREND,
                              7
                            )}
                          </tbody>
                        </table>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow className="main-row main-row-2" style={{ marginTop: "20px" }}>
              <CCol md="12">
                <CRow>
                  <CCol lg="12">
                    <CCard className="main-card-6">
                      <CCardBody className={"scroll-table-6"}>
                        <div className="col-md-12 gauge-gaurd-title text-center">
                          <h3 style={{ fontSize: "3vh" }}>
                            100 & 25 Demerit Count
                          </h3>
                        </div>
                        <table className="table table-striped table-bordered table-sm blue-table">
                          <thead style={{ textAlign: "center"}}>
                            <tr>
                              <th scope="col" style={{fontSize:"2.2vh"}}>ZONE</th>
                              <th scope="col" colspan="2" style={{fontSize:"2.2vh"}}>
                                {moment()
                                  .subtract(5, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col" colspan="2" style={{fontSize:"2.2vh"}}>
                                {moment()
                                  .subtract(4, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col" colspan="2" style={{fontSize:"2.2vh"}}>
                                {moment()
                                  .subtract(3, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col" colspan="2" style={{fontSize:"2.2vh"}}>
                                {moment()
                                  .subtract(2, "day")
                                  .format("DD-MMM-YY")}
                              </th>

                              <th scope="col" colspan="2" style={{fontSize:"2.2vh"}}>
                                {moment()
                                  .subtract(1, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col" colspan="2" style={{fontSize:"2.2vh"}}>
                                {moment().format("DD-MMM-YY")}
                              </th>
                            </tr>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>100</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>25</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>100</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>25</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>100</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>25</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>100</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>25</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>100</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>25</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>100</th>
                              <th scope="col" style={{fontSize:"2.2vh"}}>25</th>
                            </tr>
                          </thead>
                          <tbody>
                            {CRITICALDEMERITCOUNTDemerit.map((item, index) => {
                              return (
                                <tr
                                  key={index.toString()}
                                  align="center"
                                  style={{ fontWeight: "bold" }}
                                >
                                  <td>{item.ZONE}</td>
                                  <td
                                    className={`text-center ${getFontColorFor2ndTable(
                                      item.DAY1.HUNDREDDEMERIT
                                    )}`}
                                  >
                                    {item.DAY1.HUNDREDDEMERIT}
                                  </td>
                                  <td
                                    className={`text-center ${getFontColorFor2ndTable(
                                      item.DAY1.TWENTYFIVEDEMERIT
                                    )}`}
                                  >
                                    {item.DAY1.TWENTYFIVEDEMERIT}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColorFor2ndTable(
                                      item.DAY2.HUNDREDDEMERIT
                                    )}`}
                                  >
                                    {item.DAY2.HUNDREDDEMERIT}
                                  </td>
                                  <td
                                    className={`text-center ${getFontColorFor2ndTable(
                                      item.DAY2.TWENTYFIVEDEMERIT
                                    )}`}
                                  >
                                    {item.DAY2.TWENTYFIVEDEMERIT}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColorFor2ndTable(
                                      item.DAY3.HUNDREDDEMERIT
                                    )}`}
                                  >
                                    {item.DAY3.HUNDREDDEMERIT}
                                  </td>
                                  <td
                                    className={`text-center ${getFontColorFor2ndTable(
                                      item.DAY3.TWENTYFIVEDEMERIT
                                    )}`}
                                  >
                                    {item.DAY3.TWENTYFIVEDEMERIT}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColorFor2ndTable(
                                      item.DAY4.HUNDREDDEMERIT
                                    )}`}
                                  >
                                    {item.DAY4.HUNDREDDEMERIT}
                                  </td>
                                  <td
                                    className={`text-center ${getFontColorFor2ndTable(
                                      item.DAY4.TWENTYFIVEDEMERIT
                                    )}`}
                                  >
                                    {item.DAY4.TWENTYFIVEDEMERIT}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColorFor2ndTable(
                                      item.DAY5.HUNDREDDEMERIT
                                    )}`}
                                  >
                                    {item.DAY5.HUNDREDDEMERIT}
                                  </td>
                                  <td
                                    className={`text-center ${getFontColorFor2ndTable(
                                      item.DAY5.TWENTYFIVEDEMERIT
                                    )}`}
                                  >
                                    {item.DAY5.TWENTYFIVEDEMERIT}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColorFor2ndTable(
                                      item.DAY6.HUNDREDDEMERIT
                                    )}`}
                                  >
                                    {item.DAY6.HUNDREDDEMERIT}
                                  </td>
                                  <td
                                    className={`text-center ${getFontColorFor2ndTable(
                                      item.DAY6.TWENTYFIVEDEMERIT
                                    )}`}
                                  >
                                    {item.DAY6.TWENTYFIVEDEMERIT}
                                  </td>
                                </tr>
                              );
                            })}
                            {/* {generateEmptyRows(SHIFTWISETRENDDemeritZone5, 7)} */}
                          </tbody>
                        </table>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>

            {/* 
          <CRow className="main-row main-row-2" style={{ marginTop: "8px" }}>
            <CCol md="12">
              
              <CRow>
                <CCol lg="6">
                  <CCard className="main-card-6">
                    <CCardBody className={"scroll-table-6"}>
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3>FP Zone-1</h3>
                      </div>
                      <table className="table table-hover table-striped table-bordered table-sm blue-table">
                        <thead>
                          <tr>
                            <th scope="col">Shift</th>
                            <th scope="col">{moment().format("DD-MMM-YY")}</th>
                            <th scope="col">
                              {moment().subtract(1, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(2, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(3, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(4, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {" "}
                              {moment().subtract(5, "day").format("DD-MMM-YY")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {SHIFTWISETRENDDemeritZone1.map((item, index) => {
                            return (
                              <tr key={index.toString()} align="center">
                                <td style={{ fontWeight: "bold" }}>
                                  {item.SHIFT}
                                </td>
                                <td>{item.DAY1}</td>
                                <td>{item.DAY2}</td>
                                <td>{item.DAY3}</td>
                                <td>{item.DAY4}</td>
                                <td>{item.DAY5}</td>
                                <td>{item.DAY6}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </CCardBody>
                  </CCard>
                </CCol>

                <CCol lg="6">
                  <CCard className="main-card-6">
                    <CCardBody className={"scroll-table-6"}>
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3>FP Zone-2</h3>
                      </div>
                      <table className="table table-striped table-bordered table-sm blue-table">
                        <thead>
                          <tr>
                            <th scope="col">Shift</th>
                            <th scope="col">{moment().format("DD-MMM-YY")}</th>
                            <th scope="col">
                              {moment().subtract(1, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(2, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(3, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(4, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {" "}
                              {moment().subtract(5, "day").format("DD-MMM-YY")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {SHIFTWISETRENDDemeritZone2.map((item, index) => {
                            return (
                              <tr key={index.toString()} align="center">
                                <td style={{ fontWeight: "bold" }}>
                                  {item.SHIFT}
                                </td>
                                <td>{item.DAY1}</td>
                                <td>{item.DAY2}</td>
                                <td>{item.DAY3}</td>
                                <td>{item.DAY4}</td>
                                <td>{item.DAY5}</td>
                                <td>{item.DAY6}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCol>
          </CRow>

          <CRow className="main-row main-row-2" style={{ marginTop: "8px" }}>
            <CCol md="12">
             
              <CRow>
                <CCol lg="6">
                  <CCard className="main-card-6">
                    <CCardBody className={"scroll-table-6"}>
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3>Zone -3 HD</h3>
                      </div>
                      <table className="table table-hover table-striped table-bordered table-sm blue-table">
                        <thead>
                          <tr>
                            <th scope="col">Shift</th>
                            <th scope="col">{moment().format("DD-MMM-YY")}</th>
                            <th scope="col">
                              {moment().subtract(1, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(2, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(3, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(4, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {" "}
                              {moment().subtract(5, "day").format("DD-MMM-YY")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {SHIFTWISETRENDDemeritZone3.map((item, index) => {
                            return (
                              <tr key={index.toString()} align="center">
                                <td style={{ fontWeight: "bold" }}>
                                  {item.SHIFT}
                                </td>
                                <td>{item.DAY1}</td>
                                <td>{item.DAY2}</td>
                                <td>{item.DAY3}</td>
                                <td>{item.DAY4}</td>
                                <td>{item.DAY5}</td>
                                <td>{item.DAY6}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </CCardBody>
                  </CCard>
                </CCol>

                <CCol lg="6">
                  <CCard className="main-card-6">
                    <CCardBody className={"scroll-table-6"}>
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3>Zone-4 HD</h3>
                      </div>
                      <table className="table table-striped table-bordered table-sm blue-table">
                        <thead>
                          <tr>
                            <th scope="col">Shift</th>
                            <th scope="col">{moment().format("DD-MMM-YY")}</th>
                            <th scope="col">
                              {moment().subtract(1, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(2, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(3, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(4, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {" "}
                              {moment().subtract(5, "day").format("DD-MMM-YY")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {SHIFTWISETRENDDemeritZone4.map((item, index) => {
                            return (
                              <tr key={index.toString()} align="center">
                                <td style={{ fontWeight: "bold" }}>
                                  {item.SHIFT}
                                </td>
                                <td>{item.DAY1}</td>
                                <td>{item.DAY2}</td>
                                <td>{item.DAY3}</td>
                                <td>{item.DAY4}</td>
                                <td>{item.DAY5}</td>
                                <td>{item.DAY6}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow className="main-row main-row-2" style={{ marginTop: "8px" }}>
            <CCol md="12">
            
              <CRow>
                <CCol lg="6">
                  <CCard className="main-card-6">
                    <CCardBody className={"scroll-table-6"}>
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3>Zone -5 HD</h3>
                      </div>
                      <table className="table table-hover table-striped table-bordered table-sm blue-table">
                        <thead>
                          <tr>
                            <th scope="col">Shift</th>
                            <th scope="col">{moment().format("DD-MMM-YY")}</th>
                            <th scope="col">
                              {moment().subtract(1, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(2, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(3, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(4, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {" "}
                              {moment().subtract(5, "day").format("DD-MMM-YY")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {SHIFTWISETRENDDemeritZone5.map((item, index) => {
                            return (
                              <tr key={index.toString()} align="center">
                                <td style={{ fontWeight: "bold" }}>
                                  {item.SHIFT}
                                </td>
                                <td>{item.DAY1}</td>
                                <td>{item.DAY2}</td>
                                <td>{item.DAY3}</td>
                                <td>{item.DAY4}</td>
                                <td>{item.DAY5}</td>
                                <td>{item.DAY6}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </CCardBody>
                  </CCard>
                </CCol>

                <CCol lg="6">
                  <CCard className="main-card-6">
                    <CCardBody className={"scroll-table-6"}>
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3>Zone-6 HD</h3>
                      </div>
                      <table className="table table-striped table-bordered table-sm blue-table">
                        <thead>
                          <tr>
                            <th scope="col">Shift</th>
                            <th scope="col">{moment().format("DD-MMM-YY")}</th>
                            <th scope="col">
                              {moment().subtract(1, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(2, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(3, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {moment().subtract(4, "day").format("DD-MMM-YY")}
                            </th>
                            <th scope="col">
                              {" "}
                              {moment().subtract(5, "day").format("DD-MMM-YY")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {SHIFTWISETRENDDemeritZone6.map((item, index) => {
                            return (
                              <tr key={index.toString()} align="center">
                                <td style={{ fontWeight: "bold" }}>
                                  {item.SHIFT}
                                </td>
                                <td>{item.DAY1}</td>
                                <td>{item.DAY2}</td>
                                <td>{item.DAY3}</td>
                                <td>{item.DAY4}</td>
                                <td>{item.DAY5}</td>
                                <td>{item.DAY6}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCol>
          </CRow> */}
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default Dashboard7;
