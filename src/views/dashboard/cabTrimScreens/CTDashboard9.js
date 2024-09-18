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
import { API_URL, CreateArray } from "../../../config";
import * as QueryString from "query-string";
import LoadingPage from "../LoadingPage";

const CTDashboard9 = () => {
  const [isLoading, setLoading] = useState(true);
  const [MODELWISETRENDdataPRO3000, setDemeritsPRO3000] = useState({
    data: [],
    labels: [],
  });
  const [MODELWISETRENDdataPRO6000_8000, setDemeritsPRO6000_8000] = useState({
    data: [],
    labels: [],
  });
  const [MODELWISETRENDdataPRO2000, setDemeritsPRO2000] = useState({
    data: [],
    labels: [],
  });
  const [MODELWISETRENDdataPRO2100, setDemeritsPRO2100] = useState({
    data: [],
    labels: [],
  });
  const [MODELWISETRENDdataLMDCOWL, setDemeritsLMDCOWL] = useState({
    data: [],
    labels: [],
  });
  const [MODELWISETRENDdataUD, setDemeritsUD] = useState({
    data: [],
    labels: [],
  });
  const [pageData, setPageData] = useState({
    MODELWISETRENDPRO3000: {
      DEMERITTREND: [
        { TIME_RANGE: "28-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "27-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "26-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "Mar-21", DEMERIT: "20" },
        { TIME_RANGE: "Feb-21", DEMERIT: "20" },
      ],
    },
    MODELWISETRENDPRO6000_8000: {
      DEMERITTREND: [
        { TIME_RANGE: "28-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "27-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "26-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "Mar-21", DEMERIT: "20" },
        { TIME_RANGE: "Feb-21", DEMERIT: "20" },
      ],
    },
    MODELWISETRENDPRO2000: {
      DEMERITTREND: [
        { TIME_RANGE: "28-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "27-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "26-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "Mar-21", DEMERIT: "20" },
        { TIME_RANGE: "Feb-21", DEMERIT: "20" },
      ],
    },
    MODELWISETRENDPRO2100: {
      DEMERITTREND: [
        { TIME_RANGE: "28-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "27-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "26-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "Mar-21", DEMERIT: "20" },
        { TIME_RANGE: "Feb-21", DEMERIT: "20" },
      ],
    },
    MODELWISETRENDLMDCOWL: {
      DEMERITTREND: [
        { TIME_RANGE: "28-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "27-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "26-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "Mar-21", DEMERIT: "20" },
        { TIME_RANGE: "Feb-21", DEMERIT: "20" },
      ],
    },
    MODELWISETRENDUD: {
      DEMERITTREND: [
        { TIME_RANGE: "28-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "27-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "26-Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "Apr-21", DEMERIT: "20" },
        { TIME_RANGE: "Mar-21", DEMERIT: "20" },
        { TIME_RANGE: "Feb-21", DEMERIT: "20" },
      ],
    },
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/dashboard9_data.php`)
      .then(function (response) {
        if (response && response.data) {
          console.log(JSON.stringify(response.data));
          const labels = [];
          const MODELWISETRENDdataPRO3000d = [];
          const MODELWISETRENDdataPRO6000_8000d = [];
          const MODELWISETRENDdataPRO2000d = [];
          const MODELWISETRENDdataPRO2100d = [];
          const MODELWISETRENDdataLMDCOWLd = [];
          const MODELWISETRENDdataUDd = [];

          const demeritsDataPRO3000 = CreateArray(
            response.data.MODELWISETRENDPRO3000.DEMERITTREND
          );
          const demeritsDataPRO6000_8000 = CreateArray(
            response.data.MODELWISETRENDPRO6000_8000.DEMERITTREND
          );
          const demeritsDataPRO2000 = CreateArray(
            response.data.MODELWISETRENDPRO2000.DEMERITTREND
          );
          const demeritsDataPRO2100 = CreateArray(
            response.data.MODELWISETRENDPRO2100.DEMERITTREND
          );

          const demeritsDataLMDCOWL = CreateArray(
            response.data.MODELWISETRENDLMDCOWL.DEMERITTREND
          );
          const demeritsDataUD = CreateArray(
            response.data.MODELWISETRENDUD.DEMERITTREND
          );
          if (demeritsDataPRO3000.length > 0) {
            demeritsDataPRO3000.forEach(function (item, index) {
              labels.push(
                item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
              );
              MODELWISETRENDdataPRO3000d.push(item.DEMERIT);
            });
          }
          console.log(MODELWISETRENDdataPRO3000);
          if (demeritsDataPRO6000_8000.length > 0) {
            demeritsDataPRO6000_8000.forEach(function (item, index) {
              // labels.push(
              //   item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
              // );
              MODELWISETRENDdataPRO6000_8000d.push(item.DEMERIT);
            });
          }
          console.log(MODELWISETRENDdataPRO6000_8000);
          if (demeritsDataPRO2000.length > 0) {
            demeritsDataPRO2000.forEach(function (item, index) {
              // labels.push(
              //   item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
              // );
              MODELWISETRENDdataPRO2000d.push(item.DEMERIT);
            });
          }
          console.log(MODELWISETRENDdataPRO2000);
          if (demeritsDataPRO2100.length > 0) {
            demeritsDataPRO2100.forEach(function (item, index) {
              // labels.push(
              //   item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
              // );
              MODELWISETRENDdataPRO2100d.push(item.DEMERIT);
            });
          }
          console.log(MODELWISETRENDdataPRO2100);
          if (demeritsDataLMDCOWL.length > 0) {
            demeritsDataLMDCOWL.forEach(function (item, index) {
              // labels.push(
              //   item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
              // );
              MODELWISETRENDdataLMDCOWLd.push(item.DEMERIT);
            });
          }
          console.log(MODELWISETRENDdataLMDCOWL);
          if (demeritsDataUD.length > 0) {
            demeritsDataUD.forEach(function (item, index) {
              // labels.push(
              //   item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
              // );
              MODELWISETRENDdataUDd.push(item.DEMERIT);
            });
          }
          console.log(MODELWISETRENDdataUD);

          setDemeritsPRO3000({
            data: MODELWISETRENDdataPRO3000d,
            labels: labels,
          });
          setDemeritsPRO6000_8000({
            data: MODELWISETRENDdataPRO6000_8000d,
            labels: labels,
          });
          setDemeritsPRO2000({
            data: MODELWISETRENDdataPRO2000d,
            labels: labels,
          });
          setDemeritsPRO2100({
            data: MODELWISETRENDdataPRO2100d,
            labels: labels,
          });
          setDemeritsLMDCOWL({
            data: MODELWISETRENDdataLMDCOWLd,
            labels: labels,
          });
          setDemeritsUD({ data: MODELWISETRENDdataUDd, labels: labels });

          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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

  return (
    <>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <CRow className="main-dashboard-wrap main-Dashboard3-wrap">
          <CCol lg="12" className="text-center main-head">
            <h5>Product Audit - Model Wise Demerit Trend CAB TRIM</h5>
          </CCol>
          <CCol lg="12">
            <CRow className="main-row main-row-1">
              <CCol md="12">
                <div className="inner-box inner-box-dash2">
                  <CRow>
                    <CCol lg="4">
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3 style={{ fontSize: "17px" }}>Pro3000</h3>
                      </div>
                      <CCard className="main-card-6">
                        <CCardBody style={{ padding: 5 }}>
                          <CChartLine
                            datasets={[
                              {
                                label: "Pro3000",
                                borderColor: "#0d86ff",
                                backgroundColor: "#0d86ff",
                                data: MODELWISETRENDdataPRO3000.data,

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
                                      maxTicksLimit: 10,
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
                            labels={MODELWISETRENDdataPRO3000.labels}
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>

                    <CCol lg="4">
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3 style={{ fontSize: "17px" }}>Pro6000/Pro8000</h3>
                      </div>
                      <CCard className="main-card-6">
                        <CCardBody style={{ padding: 5 }}>
                          <CChartLine
                            datasets={[
                              {
                                label: "Pro6000/Pro8000",
                                borderColor: "#0d86ff",
                                backgroundColor: "#0d86ff",
                                data: MODELWISETRENDdataPRO6000_8000.data,
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
                            labels={MODELWISETRENDdataPRO6000_8000.labels}
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol lg="4">
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3 style={{ fontSize: "17px" }}>Pro2000</h3>
                      </div>
                      <CCard className="main-card-6">
                        <CCardBody style={{ padding: 5 }}>
                          <CChartLine
                            datasets={[
                              {
                                label: "Pro2000",
                                borderColor: "#0d86ff",
                                backgroundColor: "#0d86ff",
                                data: MODELWISETRENDdataPRO2000.data,
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
                            labels={MODELWISETRENDdataPRO2000.labels}
                          />
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
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3 style={{ fontSize: "17px" }}>Pro2100</h3>
                      </div>
                      <CCard className="main-card-6">
                        <CCardBody style={{ padding: 5 }}>
                          <CChartLine
                            datasets={[
                              {
                                label: "Pro2100",
                                borderColor: "#0d86ff",
                                backgroundColor: "#0d86ff",
                                data: MODELWISETRENDdataPRO2100.data,
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
                            labels={MODELWISETRENDdataPRO2100.labels}
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>

                    <CCol lg="4">
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3 style={{ fontSize: "17px" }}>LMD COWL</h3>
                      </div>
                      <CCard className="main-card-6">
                        <CCardBody style={{ padding: 5 }}>
                          <CChartLine
                            datasets={[
                              {
                                label: "LMD COWL",
                                borderColor: "#0d86ff",
                                backgroundColor: "#0d86ff",
                                data: MODELWISETRENDdataLMDCOWL.data,
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
                            labels={MODELWISETRENDdataLMDCOWL.labels}
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>

                    <CCol lg="4">
                      <div className="col-md-12 gauge-gaurd-title text-center">
                        <h3 style={{ fontSize: "17px" }}>UD</h3>
                      </div>
                      <CCard className="main-card-6">
                        <CCardBody style={{ padding: 5 }}>
                          <CChartLine
                            datasets={[
                              {
                                label: "UD",
                                borderColor: "#0d86ff",
                                backgroundColor: "#0d86ff",
                                data: MODELWISETRENDdataUD.data,
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
                            labels={MODELWISETRENDdataUD.labels}
                          />
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

export default CTDashboard9;
