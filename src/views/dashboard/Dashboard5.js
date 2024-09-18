import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import axios from "axios";
import { CChartLine, CChart } from "@coreui/react-chartjs";
import moment from "moment";
import { API_URL, CreateArray } from "../../config";
import * as QueryString from "query-string";
import LoadingPage from "./LoadingPage";

const Dashboard5 = (props) => {
  const [isLoading, setLoading] = useState(true);
  const parsed = QueryString.parse(props.location.search);
  const [vehicleType, setVehicleType] = useState(
    parsed.VEHICLETYPE ? parsed.VEHICLETYPE : "HD"
  );
  const [pageData, setPageData] = useState({
    HEADDEMERITTABLE: {
      HEADDEMERIT: [
        {
          HEAD: "PART",
          HEAD_DEMERIT_TARGET: "3",
          HEAD_PREVIOUS_MONTH: "49",
          HEAD_CURRENTMONTH: "47",
          HEAD_WEEK: "46",
        },
        {
          HEAD: "PROCESS",
          HEAD_DEMERIT_TARGET: "14",
          HEAD_PREVIOUS_MONTH: "89",
          HEAD_CURRENTMONTH: "99",
          HEAD_WEEK: "84",
        },
        {
          HEAD: "DESIGN",
          HEAD_DEMERIT_TARGET: "3",
          HEAD_PREVIOUS_MONTH: "8",
          HEAD_CURRENTMONTH: "10",
          HEAD_WEEK: "8",
        },
      ],
    },
    AGGREGATEDEMERITTABLE: {
      AGGREGATEDEMERIT: [
        {
          AGGREGATE: "CHASSIS",
          AGGREGATE_DEMERIT_TARGET: "57",
          AGGREGATE_PREVIOUS_MONTH: "48",
          AGGREGATE_CURRENTMONTH: "64",
          AGGREGATE_WEEK: "54",
        },
        {
          AGGREGATE: "CABTRIM",
          AGGREGATE_DEMERIT_TARGET: "37",
          AGGREGATE_PREVIOUS_MONTH: "23",
          AGGREGATE_CURRENTMONTH: "18",
          AGGREGATE_WEEK: "22",
        },
        {
          AGGREGATE: "CABWELD",
          AGGREGATE_DEMERIT_TARGET: "7",
          AGGREGATE_PREVIOUS_MONTH: "5",
          AGGREGATE_CURRENTMONTH: "5",
          AGGREGATE_WEEK: "5",
        },
        {
          AGGREGATE: "PAINT SHOP",
          AGGREGATE_DEMERIT_TARGET: "9",
          AGGREGATE_PREVIOUS_MONTH: "10",
          AGGREGATE_CURRENTMONTH: "7",
          AGGREGATE_WEEK: "8",
        },
        {
          AGGREGATE: "ENGINE",
          AGGREGATE_DEMERIT_TARGET: "4",
          AGGREGATE_PREVIOUS_MONTH: "3",
          AGGREGATE_CURRENTMONTH: "2",
          AGGREGATE_WEEK: "2",
        },
        {
          AGGREGATE: "VEPT",
          AGGREGATE_DEMERIT_TARGET: "1",
          AGGREGATE_PREVIOUS_MONTH: "0",
          AGGREGATE_CURRENTMONTH: "0",
          AGGREGATE_WEEK: "0",
        },
        {
          AGGREGATE: "AXLE",
          AGGREGATE_DEMERIT_TARGET: "1",
          AGGREGATE_PREVIOUS_MONTH: "0",
          AGGREGATE_CURRENTMONTH: "0",
          AGGREGATE_WEEK: "0",
        },
        {
          AGGREGATE: "EOLT",
          AGGREGATE_DEMERIT_TARGET: "5",
          AGGREGATE_PREVIOUS_MONTH: "3",
          AGGREGATE_CURRENTMONTH: "0",
          AGGREGATE_WEEK: "0",
        },
        {
          AGGREGATE: "TYRE YARD",
          AGGREGATE_DEMERIT_TARGET: "1",
          AGGREGATE_PREVIOUS_MONTH: "0",
          AGGREGATE_CURRENTMONTH: "0",
          AGGREGATE_WEEK: "0",
        },
        {
          AGGREGATE: "CHASSIS PAINT",
          AGGREGATE_DEMERIT_TARGET: "1",
          AGGREGATE_PREVIOUS_MONTH: "0",
          AGGREGATE_CURRENTMONTH: "0",
          AGGREGATE_WEEK: "0",
        },
      ],
    },
    TSELFARDEMERITTABLE: {
      TSELFDEMERIT: [
        {
          TSELF: "T-5",
          TSELF_PREVIOUS_MONTH: "35",
          TSELF_CURRENTMONTH: "62",
          TSELF_WEEK: "45",
        },
        {
          TSELF: "S-5",
          TSELF_PREVIOUS_MONTH: "8",
          TSELF_CURRENTMONTH: "7",
          TSELF_WEEK: "6",
        },
        {
          TSELF: "E-5",
          TSELF_PREVIOUS_MONTH: "10",
          TSELF_CURRENTMONTH: "4",
          TSELF_WEEK: "4",
        },
        {
          TSELF: "L-5",
          TSELF_PREVIOUS_MONTH: "8",
          TSELF_CURRENTMONTH: "9",
          TSELF_WEEK: "7",
        },
        {
          TSELF: "F-5",
          TSELF_PREVIOUS_MONTH: "22",
          TSELF_CURRENTMONTH: "21",
          TSELF_WEEK: "15",
        },
        {
          TSELF: "A-5",
          TSELF_PREVIOUS_MONTH: "43",
          TSELF_CURRENTMONTH: "44",
          TSELF_WEEK: "40",
        },
        {
          TSELF: "R-5",
          TSELF_PREVIOUS_MONTH: "21",
          TSELF_CURRENTMONTH: "18",
          TSELF_WEEK: "15",
        },
      ],
    },
    MARQUEEDETAILS: {
      MARQUEE: [
        {
          ATTRIBUTE: "Head",
          VALUE: "Process",
        },
        {
          ATTRIBUTE: "Operations",
          VALUE: "Leakages",
        },
        {
          ATTRIBUTE: "Aggregate",
          VALUE: "Chassis",
        },
      ],
    },
    ABBREVIATIONFULLFORM: {
      ABBREVIATION: [
        {
          OPERATION: "T",
          FULL_FORM: "Torque",
        },
        {
          OPERATION: "S",
          FULL_FORM: "Setting",
        },
        {
          OPERATION: "E",
          FULL_FORM: "Electricals",
        },
        {
          OPERATION: "L",
          FULL_FORM: "Leakages",
        },
        {
          OPERATION: "F",
          FULL_FORM: "Functional",
        },
        {
          OPERATION: "A",
          FULL_FORM: "Aesthetics",
        },
        {
          OPERATION: "R",
          FULL_FORM: "Routings",
        },
      ],
    },
  });

  function drawLineLables() {
    //  console.log(this);
    // render the value of the chart above the bar
    var ctx = this.chart.ctx;
    //ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
    //ctx.fillStyle = 'green';
    ctx.textAlign = "center";

    this.data.datasets.forEach(function (dataset, ind) {
      if (ind === 1) {
        ctx.fillStyle = "white";
        ctx.textBaseline = "top";
      } else {
        ctx.fillStyle = dataset.backgroundColor;
        ctx.textBaseline = "bottom";
      }

      for (var i = 0; i < dataset.data.length; i++) {
        if (
          dataset.hidden === true &&
          dataset._meta[Object.keys(dataset._meta)[0]].hidden !== false
        ) {
          continue;
        }
        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
        if (dataset.data[i] !== null) {
          ctx.fillText(
            dataset.data[i],
            model.x - 1,
            ind === 1 ? model.y + 5 : model.y - 5
          );
        }
      }
    });
  }
  const prvmonth = moment().subtract(1, "month").format("MMM - YYYY");
  const currmonth = moment().format("MMM - YYYY");
  const daybeforeyesterday = moment().subtract(2, "day").format("DD-MMM-YY");
  const previousday = moment().subtract(1, "day").format("DD-MMM-YY");
  const today = moment().format("DD-MMM-YY");

  const Weekly = "Week";
  const truckGraphLables = [
    prvmonth,
    currmonth,
    Weekly,
    daybeforeyesterday,
    previousday,
    today,
  ];
  const DemeritHeadData = [];
  const DemeritTargetData = [];
  const DemeritpreviousmnthData = [];
  const DemeritcurrentmnthData = [];
  const DemeritHeadWeekData = [];
  const DemeritdaybeforeyesterdayData = [];
  const DemeritpreviosdayData = [];
  const DemeritcurrentdayData = [];

  if (pageData.HEADDEMERITTABLE && pageData.HEADDEMERITTABLE.HEADDEMERIT) {
    const HeadDemeritData = CreateArray(pageData.HEADDEMERITTABLE.HEADDEMERIT);
    if (HeadDemeritData.length > 0) {
      HeadDemeritData.forEach(function (item, index) {
        // truckGraphLables.push(
        //   item.HEAD_CURRENTMONTH == "CURRENTDATE" ? "TODAY" : item.HEAD_CURRENTMONTH
        // );
        DemeritHeadData.push(item.HEADDEMERIT);
        DemeritTargetData.push(item.HEAD_DEMERIT_TARGET);
        DemeritpreviousmnthData.push(item.HEAD_PREVIOUS_MONTH);
        DemeritcurrentmnthData.push(item.HEAD_CURRENTMONTH);
        DemeritHeadWeekData.push(item.HEAD_WEEK);
        DemeritdaybeforeyesterdayData.push(item.HEAD_DAY_BEFORE_YESTERDAY);
        DemeritcurrentdayData.push(item.HEAD_CURRENT_DAY);
        DemeritpreviosdayData.push(item.HEAD_PREVIOUS_DAY);

        // console.warn(prvmonth);
        // console.warn(currmonth);
        // console.warn(fy);
      });
    }
  }

  const partDemeritData = [
    DemeritpreviousmnthData[0],
    DemeritcurrentmnthData[0],
    DemeritHeadWeekData[0],
    DemeritdaybeforeyesterdayData[0],
    DemeritpreviosdayData[0],
    DemeritcurrentdayData[0],
  ];
  const processDemeritData = [
    DemeritpreviousmnthData[1],
    DemeritcurrentmnthData[1],
    DemeritHeadWeekData[1],
    DemeritdaybeforeyesterdayData[1],
    DemeritpreviosdayData[1],
    DemeritcurrentdayData[1],
  ];
  const designDemeritData = [
    DemeritpreviousmnthData[2],
    DemeritcurrentmnthData[2],
    DemeritHeadWeekData[2],
    DemeritdaybeforeyesterdayData[2],
    DemeritpreviosdayData[2],
    DemeritcurrentdayData[2],
  ];

  let marqueeText = "";
  if (pageData.MARQUEEDETAILS && pageData.MARQUEEDETAILS.MARQUEE) {
    const MARQUEEData = CreateArray(pageData.MARQUEEDETAILS.MARQUEE);
    if (MARQUEEData.length > 0) {
      MARQUEEData.forEach(function (item, index) {
        if (index === pageData.MARQUEEDETAILS.MARQUEE.length - 1) {
          marqueeText += `${item.ATTRIBUTE} - ${item.VALUE}`;
        } else {
          marqueeText += `${item.ATTRIBUTE} - ${item.VALUE} || `;
        }
      });
    }
  }

  let fullForm = "";
  if (
    pageData.ABBREVIATIONFULLFORM &&
    pageData.ABBREVIATIONFULLFORM.ABBREVIATION
  ) {
    const ABBREVIATIONData = CreateArray(
      pageData.ABBREVIATIONFULLFORM.ABBREVIATION
    );

    if (ABBREVIATIONData.length > 0) {
      ABBREVIATIONData.forEach(function (item, index) {
        if (index === pageData.ABBREVIATIONFULLFORM.ABBREVIATION.length - 1) {
          fullForm += `${item.OPERATION} - ${item.FULL_FORM}`;
        } else {
          fullForm += `${item.OPERATION} - ${item.FULL_FORM} || `;
        }
      });
    }
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/dashboard5_data.php${props.location.search}`)
      .then(function (response) {
        if (response && response.data) {
          setPageData(response.data);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getColor = (val, target) => {
    let targetArray = target.split("/");
    const tg = parseInt(targetArray[1]);
    let color = "red-color";
    color = val > tg ? "red-color" : "green-color";
    return color;
  };

  const getFontColor = (target, value) => {
    if (parseInt(value) > parseInt(target)) {
      return "font-red";
    } else if (parseInt(value) >= 0) {
      return "font-green";
    } else {
      return "";
    }
  };

  const generateEmptyRows = (data) => {
    if (data.length < 6) {
      const elm = [];
      for (let i = 0; i < 6 - data.length; i++) {
        elm.push(
          <tr key={i.toString()}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        );
      }
      return elm;
    }
  };

  let aggregateDem = CreateArray(
    pageData.AGGREGATEDEMERITTABLE.AGGREGATEDEMERIT
  );

  let tSelfDem = CreateArray(pageData.TSELFARDEMERITTABLE.TSELFDEMERIT);

  return (
    <>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <CRow className="main-dashboard-wrap">
          <CCol lg="12" className="text-center main-head">
            <h5>
              Product Audit Demerit - Head & Aggregate Trend - {vehicleType}
            </h5>
          </CCol>

          <CCol
            lg="12"
            className="text-center"
            style={{
              color: "#fff",
              backgroundColor: "red",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            <marquee>{marqueeText}</marquee>
          </CCol>

          <CCol lg="8">
            <div className="inner-box">
              <CRow
                className="main-row main-row-2"
                style={{ paddingLeft: "12px", paddingRight: "12px" }}
              >
                <CCol lg="4" style={{ margin: 0, padding: 3 }}>
                  <CCard
                    className="main-card-6"
                    style={{
                      marginTop: "5px",
                    }}
                  >
                    <CCardBody>
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3>DEMERIT TREND-PART</h3>
                      </div>
                      <CChart
                        datasets={[
                          {
                            label: "PART",
                            borderColor: "#000080 ",
                            backgroundColor: "#000080 ",
                            type: "bar",
                            data: partDemeritData,
                            fill: true,
                            maxBarThickness: 20,
                          },
                        ]}
                        options={{
                          tooltips: {
                            enabled: true,
                          },
                          scales: {
                            yAxes: [
                              {
                                ticks: {
                                  suggestedMin: 8,
                                  maxTicksLimit: 6,
                                  fontColor: "#000",
                                  //suggestedMax: 100
                                  beginAtZero: true,
                                },
                              },
                            ],
                            xAxes: [
                              {
                                offset: true,
                                ticks: {
                                  fontColor: "#000",
                                },
                              },
                            ],
                          },
                          animation: {
                            onProgress: drawLineLables,
                            onComplete: drawLineLables,
                          },
                          legend: {
                            position: "bottom",
                            labels: {
                              fontColor: "#000",
                            },
                            display: false,
                          },
                          hover: { animationDuration: 0 },
                          title: {
                            display: true,
                            // text: "SHOWER TEST FTT TREND",
                            fontSize: 14,
                            padding: 5,
                            fontColor: "#000",
                          },
                        }}
                        labels={truckGraphLables}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>

                <CCol lg="4" style={{ margin: 0, padding: 3 }}>
                  <CCard className="main-card-6" style={{ marginTop: "5px" }}>
                    <CCardBody>
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3>DEMERIT TREND-PROCESS</h3>
                      </div>
                      <CChartLine
                        datasets={[
                          {
                            label: "PROCESS",
                            borderColor: "#7F8C8D ",
                            backgroundColor: "#5DADE2  ",
                            type: "bar",
                            data: processDemeritData,
                            fill: false,
                            maxBarThickness: 20,
                          },
                        ]}
                        options={{
                          tooltips: {
                            enabled: true,
                          },
                          scales: {
                            yAxes: [
                              {
                                ticks: {
                                  suggestedMin: 10,
                                  maxTicksLimit: 8,

                                  fontColor: "#000",
                                  //suggestedMax: 100
                                  beginAtZero: true,
                                },
                              },
                            ],
                            xAxes: [
                              {
                                offset: true,
                                ticks: {
                                  fontColor: "#000",
                                },
                              },
                            ],
                          },
                          animation: {
                            onProgress: drawLineLables,
                            onComplete: drawLineLables,
                          },
                          legend: {
                            position: "bottom",
                            labels: {
                              fontColor: "#000",
                            },
                            display: false,
                          },
                          hover: { animationDuration: 0 },
                          title: {
                            display: true,
                            // text: "SHOWER TEST FTT TREND",
                            fontSize: 14,
                            padding: 5,
                            fontColor: "#000",
                          },
                        }}
                        labels={truckGraphLables}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol lg="4" style={{ margin: 0, padding: 3 }}>
                  {" "}
                  <CCard className="main-card-6" style={{ marginTop: "5px" }}>
                    <CCardBody>
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3>DEMERIT TREND-DESIGN</h3>
                      </div>
                      <CChartLine
                        datasets={[
                          {
                            label: "DESIGN",
                            borderColor: "#7F8C8D ",
                            backgroundColor: "#7F8C8D ",
                            type: "bar",
                            data: designDemeritData,
                            fill: false,
                            maxBarThickness: 20,
                          },
                        ]}
                        options={{
                          tooltips: {
                            enabled: true,
                          },
                          scales: {
                            yAxes: [
                              {
                                ticks: {
                                  suggestedMin: 10,
                                  maxTicksLimit: 6,
                                  fontColor: "#000",
                                  beginAtZero: true,
                                  //suggestedMax: 100
                                },
                              },
                            ],
                            xAxes: [
                              {
                                offset: true,
                                ticks: {
                                  fontColor: "#000",
                                },
                              },
                            ],
                          },
                          animation: {
                            onProgress: drawLineLables,
                            onComplete: drawLineLables,
                          },
                          legend: {
                            position: "bottom",
                            labels: {
                              fontColor: "#000",
                            },
                            display: false,
                          },
                          hover: { animationDuration: 0 },
                          title: {
                            display: true,
                            // text: "SHOWER TEST FTT TREND",
                            fontSize: 14,
                            padding: 5,
                            fontColor: "#000",
                          },
                        }}
                        labels={truckGraphLables}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>

              <hr className="hr-line" />
              <CRow className="main-row main-row-2">
                <CCol md="12">
                  <CCard className="main-card-6">
                    <CCardBody>
                      <table
                        className="table table-hover table-striped table-bordered table-sm blue-table"
                        style={{ fontWeight: 700 }}
                      >
                        <thead>
                          <tr>
                            <th className={"text-center"} scope="col">
                              Aggregate
                            </th>
                            <th className={"text-center"} scope="col">
                              Target
                            </th>
                            <th className={"text-center"} scope="col">
                              {moment()
                                .subtract(1, "month")
                                .format("MMM - YYYY")}
                            </th>
                            <th className={"text-center"} scope="col">
                              {moment().format("MMM - YYYY")}
                            </th>
                            <th className={"text-center"} scope="col">
                              Rolling Week
                            </th>
                            <th className={"text-center"} scope="col">
                              {moment().subtract(1, "day").format("DD-MMM-YY")}
                            </th>
                            <th className={"text-center"} scope="col">
                              {moment().format("DD-MMM-YY")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {aggregateDem.map((item, index) => {
                            return (
                              <tr key={index.toString()}>
                                <td>{item.AGGREGATE}</td>
                                <td className={"text-center"}>
                                  {item.AGGREGATE_DEMERIT_TARGET}
                                </td>
                                <td
                                  className={`text-center ${getFontColor(
                                    item.AGGREGATE_DEMERIT_TARGET,
                                    item.AGGREGATE_PREVIOUS_MONTH
                                  )}`}
                                >
                                  {item.AGGREGATE_PREVIOUS_MONTH}
                                </td>
                                <td
                                  className={`text-center ${getFontColor(
                                    item.AGGREGATE_DEMERIT_TARGET,
                                    item.AGGREGATE_CURRENTMONTH
                                  )}`}
                                >
                                  {item.AGGREGATE_CURRENTMONTH}
                                </td>
                                <td
                                  className={`text-center ${getFontColor(
                                    item.AGGREGATE_DEMERIT_TARGET,
                                    item.AGGREGATE_WEEK
                                  )}`}
                                >
                                  {item.AGGREGATE_WEEK}
                                </td>
                                <td
                                  className={`text-center ${getFontColor(
                                    item.AGGREGATE_DEMERIT_TARGET,
                                    item.AGGREGATE_PREVIOUSDAY
                                  )}`}
                                >
                                  {item.AGGREGATE_PREVIOUSDAY}
                                </td>
                                <td
                                  className={`text-center ${getFontColor(
                                    item.AGGREGATE_DEMERIT_TARGET,
                                    item.AGGREGATE_CURRENTDAY
                                  )}`}
                                >
                                  {item.AGGREGATE_CURRENTDAY}
                                </td>
                              </tr>
                            );
                          })}

                          {generateEmptyRows(aggregateDem)}
                        </tbody>
                      </table>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <div className="row" style={{ marginTop: 5 }}>
                <div className="col-md-12 gauge-gaurd-title text-center">
                  <h3 style={{ fontSize: "1rem" }}>{fullForm}</h3>
                </div>
              </div>
            </div>
          </CCol>

          <CCol lg="4">
            <div className="inner-box" style={{ height: "92vh" }}>
              <div className="row" style={{ marginTop: 5 }}>
                <div
                  className="col-md-12 gauge-gaurd-title1 text-center"
                  style={{ marginTop: "10px" }}
                >
                  <h2
                    style={{
                      backgroundColor: "#d0e1fd",
                      color: "#000000",
                      padding: "5px",
                    }}
                  >
                    Demerit-Operations
                  </h2>
                </div>
              </div>

              <hr className="hr-line" />
              <div className="row">
                <div className="col-3">
                  <div
                    className="label-control big-font"
                    style={{ backgroundColor: "#d0e1fd", width: "95px" }}
                  >
                    TSELF-AR
                  </div>
                </div>
                <div className="col-3">
                  <div
                    className="label-control big-font"
                    style={{ backgroundColor: "#d0e1fd", width: "90px" }}
                  >
                    {moment().subtract(1, "month").format("MMM-YY")}
                  </div>
                </div>
                <div className="col-3">
                  <div
                    className="label-control big-font"
                    style={{ backgroundColor: "#d0e1fd", width: "90px" }}
                  >
                    {moment().format("MMM-YY")}
                  </div>
                </div>
                <div className="col-3">
                  <div
                    className="label-control big-font"
                    style={{ backgroundColor: "#d0e1fd" }}
                  >
                    Week
                  </div>
                </div>
              </div>

              {tSelfDem.map((item, index) => {
                return (
                  <div
                    key={index.toString()}
                    className="row"
                    style={{ marginTop: 15 }}
                  >
                    <div className="col-3">
                      <div
                        className="label-control big-font"
                        style={{
                          backgroundColor: "#3b7ed2",
                          color: "#ffffff",
                          borderRadius: "50%",
                          marginTop: "10px",
                        }}
                      >
                        {item.TSELF}
                      </div>
                    </div>
                    <div className="col-3" style={{ marginTop: "10px" }}>
                      <div
                        className={`audits-value big-font ${getColor(
                          item.TSELF_PREVIOUS_MONTH,
                          item.TSELF
                        )}`}
                      >
                        {item.TSELF_PREVIOUS_MONTH}
                      </div>
                    </div>
                    <div className="col-3" style={{ marginTop: "10px" }}>
                      <div
                        className={`audits-value big-font ${getColor(
                          item.TSELF_CURRENTMONTH,
                          item.TSELF
                        )}`}
                      >
                        {item.TSELF_CURRENTMONTH}
                      </div>
                    </div>
                    <div className="col-3" style={{ marginTop: "10px" }}>
                      <div
                        className={`audits-value big-font ${getColor(
                          item.TSELF_WEEK,
                          item.TSELF
                        )}`}
                      >
                        {item.TSELF_WEEK}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default Dashboard5;
