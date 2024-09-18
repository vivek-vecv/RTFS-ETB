import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import { CChartLine, CChartBar } from "@coreui/react-chartjs";
import axios from "axios";
import { API_URL, CreateArray } from "../../config";
import * as QueryString from "query-string";
import LoadingPage from "./LoadingPage";

const Dashboard11 = (props) => {
  console.log("location serach", props.location.search);
  const [isLoading, setLoading] = useState(true);
  const parsed = QueryString.parse(props.location.search);
  const [line, setLine] = useState(parsed.Line ? parsed.Line : "LMD");
  const [zone, setZone] = useState(parsed.Zone ? parsed.Zone : "Zone-1");
  const [pageData, setPageData] = useState({
    DEMERITTRENDGRAPH: {
      DEMERIT: [
        {
          VEHICLETYPE: "HD",
          TIME_RANGE: "May-21",
          DEMERITPERVEHICLE: "36",
        },
        {
          VEHICLETYPE: "HD",
          TIME_RANGE: "07-May-21",
          DEMERITPERVEHICLE: "22",
        },
        {
          VEHICLETYPE: "HD",
          TIME_RANGE: "08-May-21",
          DEMERITPERVEHICLE: "0",
        },
        {
          VEHICLETYPE: "HD",
          TIME_RANGE: "09-May-21",
          DEMERITPERVEHICLE: "0",
        },
        {
          VEHICLETYPE: "HD",
          TIME_RANGE: "10-May-21",
          DEMERITPERVEHICLE: "27",
        },
        {
          VEHICLETYPE: "HD",
          TIME_RANGE: "11-May-21",
          DEMERITPERVEHICLE: "47",
        },
        {
          VEHICLETYPE: "HD",
          TIME_RANGE: "12-May-21",
          DEMERITPERVEHICLE: "0",
        },
      ],
    },
    SHIFTWISEDEMERIT: {
      SHIFTDEMERIT: [
        {
          TIME_RANGE: "07-May-21",
          ASHIFT: "NA",
          BSHIFT: "NA",
          CSHIFT: "NA",
        },
        {
          TIME_RANGE: "08-May-21",
          ASHIFT: "47",
          BSHIFT: "NA",
          CSHIFT: "NA",
        },
        {
          TIME_RANGE: "09-May-21",
          ASHIFT: "NA",
          BSHIFT: "NA",
          CSHIFT: "NA",
        },
        {
          TIME_RANGE: "10-May-21",
          ASHIFT: "NA",
          BSHIFT: "NA",
          CSHIFT: "NA",
        },
        {
          TIME_RANGE: "11-May-21",
          ASHIFT: "NA",
          BSHIFT: "NA",
          CSHIFT: "NA",
        },
        {
          TIME_RANGE: "12-May-21",
          ASHIFT: "NA",
          BSHIFT: "NA",
          CSHIFT: "NA",
        },
      ],
    },
    DEMERITCOUNT: {
      COUNT: [
        {
          TIME_RANGE: "12-May-21",
          HUNDREDDEMERITCOUNT: "0",
          TWENTYFIVEDEMERITCOUNT: "0",
        },
        {
          TIME_RANGE: "WEEK",
          HUNDREDDEMERITCOUNT: "1",
          TWENTYFIVEDEMERITCOUNT: "2",
        },
        {
          TIME_RANGE: "May-21",
          HUNDREDDEMERITCOUNT: "1",
          TWENTYFIVEDEMERITCOUNT: "3",
        },
      ],
    },
    DEFECTDESCRIPTION: {
      DEFECT: {
        SERIES: "Pro3000",
        DEFECT_DESCRIPTION: "baby fuel filter hose mejor pinch",
        DEMERIT: "25",
        FREQ: "1",
      },
    },
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/dashboard11_data.php${props.location.search}`)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setPageData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const Pro2000Data = [];
  const Pro2100Data = [];
  const LMDCowlData = [];

  if (pageData.DEFECTDESCRIPTION && pageData.DEFECTDESCRIPTION.DEFECT) {
    const ProDATA = CreateArray(pageData.DEFECTDESCRIPTION.DEFECT);
    console.log("ProDATA", ProDATA);
    if (ProDATA.length > 0) {
      ProDATA.forEach(function (item, index) {
        if (item.SERIES === "Pro2000") {
          Pro2000Data.push(item);
        } else if (item.SERIES === "Pro2100") {
          Pro2100Data.push(item);
        } else if (item.SERIES === "LMDCowl") {
          LMDCowlData.push(item);
        }
      });
    }
  }
  console.table(Pro2000Data);

  function drawLineLables() {
    //console.log(dashboard3Url);
    //console.log(this);
    // render the value of the chart above the bar
    var ctx = this.chart.ctx;
    //ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    this.data.datasets.forEach(function (dataset, ind) {
      for (var i = 0; i < dataset.data.length; i++) {
        if (
          dataset.hidden === true &&
          dataset._meta[Object.keys(dataset._meta)[0]].hidden !== false
        ) {
          continue;
        }
        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
        if (dataset.data[i] !== null) {
          ctx.fillText(dataset.data[i], model.x - 1, model.y + 10);
        }
      }
    });
  }

  function drawBarLables() {
    //console.log(this);
    // render the value of the chart above the bar
    var ctx = this.chart.ctx;
    //ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
    //ctx.fillStyle = 'white';
    ctx.fillStyle = this.chart.config.options.defaultFontColor;
    ctx.textAlign = "center";

    this.data.datasets.forEach(function (dataset, ind) {
      /*if(ind === 1){
                ctx.fillStyle = 'white';
                ctx.textBaseline = 'top';
            } else {
                ctx.fillStyle = dataset.backgroundColor;
                ctx.textBaseline = 'bottom';
            }*/

      for (var i = 0; i < dataset.data.length; i++) {
        if (
          dataset.hidden === true &&
          dataset._meta[Object.keys(dataset._meta)[0]].hidden !== false
        ) {
          continue;
        }
        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
        if (dataset.data[i] !== null) {
          ctx.fillText(dataset.data[i], model.x - 1, model.y - 5);
        }
      }
    });
  }

  const getColor = (val, type) => {
    let color = "audits-value square-box red-color";
    if (val >= 95) {
      color = "audits-value square-box green-color";
    } else if (val >= 90) {
      color = "audits-value square-box yellow-color";
    } else {
      color = "audits-value square-box red-color";
    }
    return color;
  };

  const lineGraphLables = [];
  const lineGraphHDData = [];

  if (pageData.DEMERITTRENDGRAPH && pageData.DEMERITTRENDGRAPH.DEMERIT) {
    const DEMERITTRENDGRAPHDATA = CreateArray(
      pageData.DEMERITTRENDGRAPH.DEMERIT
    );
    if (DEMERITTRENDGRAPHDATA.length > 0) {
      DEMERITTRENDGRAPHDATA.forEach(function (item, index) {
        lineGraphLables.push(
          item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
        );
        lineGraphHDData.push(item.DEMERITPERVEHICLE);
      });
    }
  }

  const shiftGraphLables = [];
  const shiftAGraphData = [];
  const shiftBGraphData = [];
  const shiftCGraphData = [];

  if (pageData.SHIFTWISEDEMERIT && pageData.SHIFTWISEDEMERIT.SHIFTDEMERIT) {
    const SHIFTDEMERITDATA = CreateArray(
      pageData.SHIFTWISEDEMERIT.SHIFTDEMERIT
    );

    if (SHIFTDEMERITDATA.length > 0) {
      SHIFTDEMERITDATA.forEach(function (item, index) {
        shiftGraphLables.push(
          item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
        );
        shiftAGraphData.push(item.ASHIFT);
        shiftBGraphData.push(item.BSHIFT);
        shiftCGraphData.push(item.CSHIFT);
      });
    }
  }

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
          </tr>
        );
      }
      return elm;
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
            <h5>
              Product Audit Demerit Zone Wise Performance - {zone} - {line}
            </h5>
          </CCol>
          <CCol lg="12">
            <CRow className="main-row main-row-1">
              <CCol md="12">
                <div className="inner-box inner-box-dash2">
                  <CRow>
                    <CCol lg="4">
                      <CCard className="main-card-6">
                        <CCardBody style={{ padding: 5 }}>
                          <div className="col-md-12 gauge-gaurd-title text-center">
                            <h3 style={{ fontSize: "17px" }}>Demerit Trend</h3>
                          </div>
                          <CChartLine
                            datasets={[
                              {
                                label: "HD",
                                borderColor: "#0d86ff",
                                backgroundColor: "#0d86ff",
                                data: lineGraphHDData,
                                fill: false,
                              },
                            ]}
                            options={{
                              defaultFontColor: "#000",
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
                                    },
                                    scaleLabel: {
                                      display: true,
                                      fontColor: "#000",
                                      labelString: "Demerit Per Vehicle",
                                    },
                                  },
                                ],
                                xAxes: [
                                  {
                                    offset: true,
                                    ticks: {
                                      fontColor: "#000",
                                      //suggestedMax: 100
                                    },
                                  },
                                ],
                              },
                              legend: {
                                display: false,
                                color: "#F5B041",
                              },
                              animation: {
                                onProgress: drawBarLables,
                                onComplete: drawBarLables,
                              },
                              hover: { animationDuration: 0 },
                            }}
                            labels={lineGraphLables}
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>

                    <CCol lg="4">
                      <CCard className="main-card-6">
                        <CCardBody style={{ padding: 5 }}>
                          <div className="col-md-12 gauge-gaurd-title text-center">
                            <h3 style={{ fontSize: "17px" }}>
                              Shift Wise Demerit Score
                            </h3>
                          </div>
                          <CChartBar
                            datasets={[
                              {
                                label: "A",
                                borderColor: "  #aed6f1 ",
                                backgroundColor: "  #aed6f1 ",
                                data: shiftAGraphData,
                                stack: "stack 1",
                                maxBarThickness: 40,
                              },
                              {
                                label: "B",
                                borderColor: "#5499C7",
                                backgroundColor: "#5499C7",
                                data: shiftBGraphData,
                                stack: "stack 1",
                                maxBarThickness: 40,
                              },
                              {
                                label: "C",
                                borderColor: "#aab7b8",
                                backgroundColor: "#aab7b8",
                                data: shiftCGraphData,
                                stack: "stack 1",
                                maxBarThickness: 40,
                              },
                            ]}
                            options={{
                              defaultFontColor: "#000",
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
                                    },
                                    scaleLabel: {
                                      display: true,
                                      fontColor: "#000",
                                      labelString: "Demerit",
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
                              title: {
                                display: false,
                                text: "Shift Wise Demerit Score",
                                fontSize: 12,
                                color: "#000",
                                padding: 0,
                                fontWeight: "bold",
                              },
                              legend: {
                                display: true,
                                position: "bottom",
                                labels: {
                                  fontColor: "#000",
                                },
                              },
                              animation: {
                                onProgress: drawLineLables,
                                onComplete: drawLineLables,
                              },
                              hover: { animationDuration: 0 },
                            }}
                            labels={shiftGraphLables}
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>

                    <CCol lg="4">
                      <CCard className="main-card-6">
                        <CCardBody
                          style={{ padding: 5 }}
                          style={{ height: "280px" }}
                        >
                          <div className="col-md-12 gauge-gaurd-title text-center">
                            <h3 style={{ fontSize: "17px" }}>
                              100 & 25 Demerit Count
                            </h3>
                          </div>
                          <CCol lg="12" style={{ marginTop: "20px" }}>
                            <div className="row">
                              {/* <div
                              className="col-3 px-2"
                              style={{ height: "85px" }}
                            >
                              {" "}
                              <div
                                className="label-control square-box"
                                style={{ width: "90px" }}
                              >
                                Demerit
                              </div>
                            </div>*/}
                              <div
                                className="col-3 px-2"
                                //   style={{ marginTop: "20px" }}
                              ></div>
                              <div
                                className="col-3 px-2"
                                //   style={{ marginTop: "20px" }}
                              >
                                <div className="label-control square-box">
                                  Day
                                </div>
                              </div>
                              <div className="col-3 px-2">
                                <div className="label-control square-box">
                                  Week
                                </div>
                              </div>
                              <div className="col-3 px-2">
                                <div className="label-control square-box">
                                  Month
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-3 px-2">
                                <div className="label-control square-box">
                                  100
                                </div>
                              </div>
                              <div className="col-3 px-2">
                                <div className="audits-value square-box bg-gradiant">
                                  {
                                    pageData.DEMERITCOUNT.COUNT[0]
                                      .HUNDREDDEMERITCOUNT
                                  }
                                </div>
                              </div>
                              <div className="col-3 px-2">
                                <div className="audits-value square-box bg-gradiant">
                                  {
                                    pageData.DEMERITCOUNT.COUNT[1]
                                      .HUNDREDDEMERITCOUNT
                                  }
                                </div>
                              </div>
                              <div className="col-3 px-2">
                                <div className="audits-value square-box bg-gradiant">
                                  {
                                    pageData.DEMERITCOUNT.COUNT[2]
                                      .HUNDREDDEMERITCOUNT
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-3 px-2">
                                <div className="label-control square-box">
                                  25
                                </div>
                              </div>
                              <div className="col-3 px-2">
                                <div className="audits-value square-box">
                                  {
                                    pageData.DEMERITCOUNT.COUNT[0]
                                      .TWENTYFIVEDEMERITCOUNT
                                  }
                                </div>
                              </div>
                              <div className="col-3 px-2">
                                <div className="audits-value square-box">
                                  {
                                    pageData.DEMERITCOUNT.COUNT[1]
                                      .TWENTYFIVEDEMERITCOUNT
                                  }
                                </div>
                              </div>
                              <div className="col-3 px-2">
                                <div className="audits-value square-box">
                                  {
                                    pageData.DEMERITCOUNT.COUNT[2]
                                      .TWENTYFIVEDEMERITCOUNT
                                  }
                                </div>
                              </div>
                            </div>
                          </CCol>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </div>
              </CCol>
            </CRow>
            <CRow className="main-row main-row-2">
              <CCol md="12">
                <div className="inner-box inner-box-dash2">
                  <CRow>
                    <CCol lg="4">
                      <CCard className="main-card-6">
                        <CCardBody className={"scroll-table-2"}>
                          <div
                            className="col-md-12 gauge-gaurd-title text-center"
                            style={{ margin: 5 }}
                          >
                            <h3 style={{ fontSize: "17px" }}>
                              {" "}
                              Pro2000 Series (Latest 5)
                            </h3>
                          </div>
                          <table className="table table-hover table-striped table-bordered table-sm blue-table">
                            <thead>
                              <tr>
                                <th scope="col">Defect Description</th>
                                <th scope="col">Demerit</th>
                                <th scope="col">Freq.</th>
                                <th scope="col">Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Pro2000Data.map((item, index) => {
                                return (
                                  <tr key={index.toString()}>
                                    <td>{item.DEFECT_DESCRIPTION}</td>
                                    <td>{item.DEMERIT}</td>
                                    <td>{item.FREQ}</td>
                                    <td>{item.AUDIT_DATE}</td>
                                    <td></td>
                                  </tr>
                                );
                              })}

                              {generateEmptyRows(Pro2000Data)}
                            </tbody>
                          </table>
                        </CCardBody>
                      </CCard>
                    </CCol>

                    <CCol lg="4">
                      <CCard className="main-card-6">
                        <CCardBody className={"scroll-table-2"}>
                          <div
                            className="col-md-12 gauge-gaurd-title text-center"
                            style={{ margin: 5 }}
                          >
                            <h3 style={{ fontSize: "17px" }}>
                              Pro2100 Series (Latest 5)
                            </h3>
                          </div>
                          <table className="table table-striped table-bordered table-sm blue-table">
                            <thead>
                              <tr>
                                <th scope="col">Defect Description</th>
                                <th scope="col">Demerit</th>
                                <th scope="col">Freq.</th>
                                <th scope="col">Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Pro2100Data.map((item, index) => {
                                return (
                                  <tr key={index.toString()}>
                                    <td>{item.DEFECT_DESCRIPTION}</td>
                                    <td>{item.DEMERIT}</td>
                                    <td>{item.FREQ}</td>
                                    <td>{item.AUDIT_DATE}</td>
                                    <td></td>
                                  </tr>
                                );
                              })}
                              {generateEmptyRows(Pro2100Data)}
                            </tbody>
                          </table>
                        </CCardBody>
                      </CCard>
                    </CCol>

                    <CCol lg="4">
                      <CCard className="main-card-6">
                        <CCardBody className={"scroll-table-2"}>
                          <div
                            className="col-md-12 gauge-gaurd-title text-center"
                            style={{ margin: 5 }}
                          >
                            <h3 style={{ fontSize: "17px" }}>
                              LMD Cowl Series (Latest 5)
                            </h3>
                          </div>
                          <table className="table table-striped table-bordered table-sm blue-table">
                            <thead>
                              <tr>
                                <th scope="col">Defect Description</th>
                                <th scope="col">Demerit</th>
                                <th scope="col">Freq.</th>
                                <th scope="col">Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {LMDCowlData.map((item, index) => {
                                return (
                                  <tr key={index.toString()}>
                                    <td>{item.DEFECT_DESCRIPTION}</td>
                                    <td>{item.DEMERIT}</td>
                                    <td>{item.FREQ}</td>
                                    <td>{item.AUDIT_DATE}</td>
                                    <td></td>
                                  </tr>
                                );
                              })}
                              {generateEmptyRows(LMDCowlData)}
                            </tbody>
                          </table>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </div>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default Dashboard11;
