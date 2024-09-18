import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import axios from "axios";
import { API_URL, CreateArray } from "../../config";
import LoadingPage from "./LoadingPage";

const Dashboard2 = () => {
  const [isLoading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({
    LMDEOLTFTT: {
      OPERATION: "LMD EOLT",
      CURRENTDAYINSPECTEDVEHICLES: "45",
      CURRENTMONTHINSPECTEDVEHICLES: "845",
      CURRENTDAYFTT: "80",
      CURRENTMONTHFTT: "70",
    },
    HDEOLTFTT: {
      OPERATION: "HD EOLT",
      CURRENTDAYINSPECTEDVEHICLES: "15",
      CURRENTMONTHINSPECTEDVEHICLES: "467",
      CURRENTDAYFTT: "70",
      CURRENTMONTHFTT: "50",
    },
    LMDTRUCKCAMFTT: {
      OPERATION: "LMD TRUCK CAM",
      CURRENTDAYINSPECTEDVEHICLES: "44",
      CURRENTMONTHINSPECTEDVEHICLES: "840",
      CURRENTDAYFTT: "80",
      CURRENTMONTHFTT: "70",
    },
    HDTRUCKCAMFTT: {
      OPERATION: "HD TRUCK CAM",
      CURRENTDAYINSPECTEDVEHICLES: "15",
      CURRENTMONTHINSPECTEDVEHICLES: "467",
      CURRENTDAYFTT: "70",
      CURRENTMONTHFTT: "50",
    },
    LMDSHOWERFTT: {
      OPERATION: "LMD SHOWER TEST",
      CURRENTDAYINSPECTEDVEHICLES: "50",
      CURRENTMONTHINSPECTEDVEHICLES: "956",
      CURRENTDAYFTT: "90",
      CURRENTMONTHFTT: "85",
    },
    HDSHOWERFTT: {
      OPERATION: "HD SHOWER TEST",
      CURRENTDAYINSPECTEDVEHICLES: "20",
      CURRENTMONTHINSPECTEDVEHICLES: "460",
      CURRENTDAYFTT: "90",
      CURRENTMONTHFTT: "80",
    },
    EOLTFTTCHART: {
      FTT: [
        {
          TIME_RANGE: "2019",
          LMD: "70",
          HD: "80",
        },
        {
          TIME_RANGE: "2020",
          LMD: "75",
          HD: "85",
        },
        {
          TIME_RANGE: "Jan-21",
          LMD: "75",
          HD: "80",
        },
        {
          TIME_RANGE: "Feb-21",
          LMD: "80",
          HD: "85",
        },
      ],
    },
    TRUCKCAMFTTCHART: {
      FTT: [
        {
          TIME_RANGE: "2019",
          LMD: "70",
          HD: "80",
        },
        {
          TIME_RANGE: "2020",
          LMD: "75",
          HD: "85",
        },
        {
          TIME_RANGE: "Jan-21",
          LMD: "75",
          HD: "80",
        },
        {
          TIME_RANGE: "Feb-21",
          LMD: "80",
          HD: "85",
        },
      ],
    },
    SHOWERTESTFTTCHART: {
      FTT: [
        {
          TIME_RANGE: "2019",
          LMD: "70",
          HD: "80",
        },
        {
          TIME_RANGE: "2020",
          LMD: "75",
          HD: "85",
        },
        {
          TIME_RANGE: "Jan-21",
          LMD: "75",
          HD: "80",
        },
        {
          TIME_RANGE: "Feb-21",
          LMD: "80",
          HD: "85",
        },
      ],
    },
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/dashboard2_data.php`)
      .then(function (response) {
        setPageData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function drawLineLables() {
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

  const getColor = (val, type) => {
    let color = "audits-value big-font red-color";
    if (val >= 95) {
      color = "audits-value big-font green-color";
    } else if (val >= 90) {
      color = "audits-value big-font yellow-color";
    } else {
      color = "audits-value big-font red-color";
    }
    return color;
  };

  const evoltGraphLables = [];
  const evoltGraphHDData = [];
  const evoltGraphLMDData = [];

  if (pageData.EOLTFTTCHART && pageData.EOLTFTTCHART.FTT) {
    const FTTDATA = CreateArray(pageData.EOLTFTTCHART.FTT);

    if (FTTDATA.length > 0) {
      FTTDATA.forEach(function (item, index) {
        evoltGraphLables.push(
          item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
        );
        evoltGraphHDData.push(item.HD);
        evoltGraphLMDData.push(item.LMD);
      });
    }
  }

  const truckGraphLables = [];
  const truckGraphHDData = [];
  const truckGraphLMDData = [];

  if (pageData.TRUCKCAMFTTCHART && pageData.TRUCKCAMFTTCHART.FTT) {
    const TRUCKCAMFTTCHARTData = CreateArray(pageData.TRUCKCAMFTTCHART.FTT);
    if (TRUCKCAMFTTCHARTData.length > 0) {
      TRUCKCAMFTTCHARTData.forEach(function (item, index) {
        truckGraphLables.push(
          item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
        );
        truckGraphHDData.push(item.HD);
        truckGraphLMDData.push(item.LMD);
      });
    }
  }

  const showerGraphLables = [];
  const showerGraphHDData = [];
  const showerGraphLMDData = [];

  if (pageData.SHOWERTESTFTTCHART && pageData.SHOWERTESTFTTCHART.FTT) {
    const SHOWERTESTFTTCHARTDATA = CreateArray(pageData.SHOWERTESTFTTCHART.FTT);
    if (SHOWERTESTFTTCHARTDATA.length > 0) {
      SHOWERTESTFTTCHARTDATA.forEach(function (item, index) {
        showerGraphLables.push(
          item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
        );
        showerGraphHDData.push(item.HD);
        showerGraphLMDData.push(item.LMD);
      });
    }
  }

  return (
    <>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <CRow className="main-dashboard-wrap main-dashboard2-wrap">
          <CCol lg="12" className="text-center main-head">
            <h5>Post Roll Out Quality KPI Dashboard</h5>
          </CCol>
          <CCol lg="12">
            <CRow className="main-row main-row-1">
              <CCol md="12">
                <div className="inner-box inner-box-dash2 pt-0">
                  <CRow className="align-items-center">
                    <CCol md="2"></CCol>
                    <CCol md="6" className={'top-heading-dashboard2'}>
                      <CRow>
                        <CCol md="6" className="ve-1 px-2">
                          {/* <img src="avatars/UD_Truck.jpg" className="image-responsive" /> */}
                          <div className="align-content-center">
                            <h5 className="vehicleTitle">HD</h5>
                          </div>
                        </CCol>
                        <CCol md="6" className="ve-1 ve-2 px-2">
                          {/* <img src="avatars/LMD_Truck.jpg" className="image-responsive" /> */}
                          <div className="align-content-center">
                            <h5 className="vehicleTitle">LMD</h5>
                          </div>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol md="4"></CCol>
                    {/* <CCol md="12"> <hr class="hr-line" /></CCol> */}
                    <CCol lg="2">
                      <h5 className={"img-heading"}>EOLT</h5>
                      <img
                        src="avatars/EOLT1.PNG"
                        className="image-responsive img-brdr"
                      />
                    </CCol>

                    <CCol lg="6" style={{ paddingTop: "5px" }}>

                      <CRow>
                        <CCol xs="6">

                          <CRow className={'mobile-label'}>
                            <CCol xs="12" className="ve-1 px-2">
                                <div className="align-content-center">
                                <h5 className="vehicleTitle">HD</h5>
                              </div>
                            </CCol>
                          </CRow>

                          <div className="row">
                            <div className="col-4 px-2"></div>
                            <div className="col-4 px-2">
                              <div className="label-control big-font">Day</div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="label-control big-font">
                                Month
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-4 px-2">
                              <div className="label-control big-font-two">
                                Tested Vehicle
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="audits-value big-font">
                                {pageData.HDEOLTFTT.CURRENTDAYINSPECTEDVEHICLES}
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="audits-value big-font">
                                {
                                  pageData.HDEOLTFTT
                                    .CURRENTMONTHINSPECTEDVEHICLES
                                }
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4 px-2">
                              <div className="label-control big-font">FTT%</div>
                            </div>
                            <div className="col-4 px-2">
                              <div
                                className={getColor(
                                  pageData.HDEOLTFTT.CURRENTDAYFTT
                                )}
                              >
                                {pageData.HDEOLTFTT.CURRENTDAYFTT}
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div
                                className={getColor(
                                  pageData.HDEOLTFTT.CURRENTMONTHFTT
                                )}
                              >
                                {pageData.HDEOLTFTT.CURRENTMONTHFTT}
                              </div>
                            </div>
                          </div>
                        </CCol>
                        <CCol xs="6">
                          <CRow className={'mobile-label'}>
                            <CCol xs="12" className="ve-1 px-2">
                              <div className="align-content-center">
                                <h5 className="vehicleTitle">LMD</h5>
                              </div>
                            </CCol>
                          </CRow>
                          <div className="row justify-content-center">
                            <div className="col-1 px-2"></div>
                            <div className="col-4 px-2">
                              <div className="label-control big-font">Day</div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="label-control big-font">
                                Month
                              </div>
                            </div>
                          </div>
                          <div
                            className="row justify-content-center"
                            style={{ marginBottom: "3px" }}
                          >
                            <div className="col-1 px-2"></div>
                            <div className="col-4 px-2">
                              <div className="audits-value big-font">
                                {
                                  pageData.LMDEOLTFTT
                                    .CURRENTDAYINSPECTEDVEHICLES
                                }
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="audits-value big-font">
                                {
                                  pageData.LMDEOLTFTT
                                    .CURRENTMONTHINSPECTEDVEHICLES
                                }
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-1 px-2"></div>
                            <div className="col-4 px-2">
                              <div
                                className={getColor(
                                  pageData.LMDEOLTFTT.CURRENTDAYFTT
                                )}
                              >
                                {pageData.LMDEOLTFTT.CURRENTDAYFTT}
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div
                                className={getColor(
                                  pageData.LMDEOLTFTT.CURRENTMONTHFTT
                                )}
                              >
                                {pageData.LMDEOLTFTT.CURRENTMONTHFTT}
                              </div>
                            </div>
                          </div>
                        </CCol>
                      </CRow>
                    </CCol>

                    <CCol lg="4">
                      <CCard className="main-card-6">
                        <CCardBody>
                          <div className="col-md-12 gauge-gaurd-title text-center">
                            <h3>EOLT FTT TREND</h3>
                          </div>
                          <CChartLine
                            datasets={[
                              {
                                label: "HD",
                                borderColor: "#7F8C8D",
                                backgroundColor: "#7F8C8D",
                                data: evoltGraphHDData,
                                type: "bar",
                                fill: false,
                                maxBarThickness: 40,
                              },
                              {
                                label: "LMD",
                                borderColor: "#0d86ff",
                                backgroundColor: "#0d86ff",
                                data: evoltGraphLMDData,
                                fill: false,
                                type: "bar",
                                maxBarThickness: 40,
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
                                    },
                                  },
                                ],
                                xAxes: [
                                  {
                                    ticks: {
                                      fontColor: "#000",
                                    },
                                    offset: true,
                                  },
                                ],
                              },
                              title: {
                                display: true,
                                // text: "EOLT FTT TREND",
                                fontSize: 14,
                                padding: 5,
                                fontColor: "#000",
                              },

                              legend: {
                                position: "bottom",
                                labels: {
                                  // This more specific font property overrides the global property
                                  fontColor: "#000",
                                },
                              },
                              animation: {
                                onProgress: drawLineLables,
                                onComplete: drawLineLables,
                              },
                              hover: { animationDuration: 0 },
                            }}
                            labels={evoltGraphLables}
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
                  <CRow className="align-items-center">
                    <CCol lg="2">
                      <h5 className={"img-heading"}>Truck Cam</h5>
                      <img
                        src="avatars/TruckCam.PNG"
                        className="image-responsive img-brdr"
                      />
                    </CCol>

                    <CCol lg="6">
                      <CRow>
                        <CCol xs="6">
                          <CRow className={'mobile-label'}>
                            <CCol xs="12" className="ve-1 px-2">
                              <div className="align-content-center">
                                <h5 className="vehicleTitle">HD</h5>
                              </div>
                            </CCol>
                          </CRow>
                          <div className="row">
                            <div className="col-4 px-2"></div>
                            <div className="col-4 px-2">
                              <div className="label-control big-font">Day</div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="label-control big-font">
                                Month
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-4 px-2">
                              <div className="label-control big-font-two">
                                Tested Vehicle
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="audits-value big-font">
                                {
                                  pageData.HDTRUCKCAMFTT
                                    .CURRENTDAYINSPECTEDVEHICLES
                                }
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="audits-value big-font">
                                {
                                  pageData.HDTRUCKCAMFTT
                                    .CURRENTMONTHINSPECTEDVEHICLES
                                }
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4 px-2">
                              <div className="label-control big-font">FTT%</div>
                            </div>
                            <div className="col-4 px-2">
                              <div
                                className={getColor(
                                  pageData.HDTRUCKCAMFTT.CURRENTDAYFTT
                                )}
                              >
                                {pageData.HDTRUCKCAMFTT.CURRENTDAYFTT}
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div
                                className={getColor(
                                  pageData.HDTRUCKCAMFTT.CURRENTMONTHFTT
                                )}
                              >
                                {pageData.HDTRUCKCAMFTT.CURRENTMONTHFTT}
                              </div>
                            </div>
                          </div>
                        </CCol>
                        <CCol xs="6">
                          <CRow className={'mobile-label'}>
                            <CCol xs="12" className="ve-1 px-2">
                              <div className="align-content-center">
                                <h5 className="vehicleTitle">LMD</h5>
                              </div>
                            </CCol>
                          </CRow>
                          <div className="row justify-content-center">
                            <div className="col-1 px-2"></div>
                            <div className="col-4 px-2">
                              <div className="label-control big-font">Day</div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="label-control big-font">
                                Month
                              </div>
                            </div>
                          </div>
                          <div
                            className="row justify-content-center"
                            style={{ marginBottom: "3px" }}
                          >
                            <div className="col-1 px-2"></div>
                            <div className="col-4 px-2">
                              <div className="audits-value big-font">
                                {
                                  pageData.LMDTRUCKCAMFTT
                                    .CURRENTDAYINSPECTEDVEHICLES
                                }
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="audits-value big-font">
                                {
                                  pageData.LMDTRUCKCAMFTT
                                    .CURRENTMONTHINSPECTEDVEHICLES
                                }
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-1 px-2"></div>
                            <div className="col-4 px-2">
                              <div
                                className={getColor(
                                  pageData.LMDTRUCKCAMFTT.CURRENTDAYFTT
                                )}
                              >
                                {pageData.LMDTRUCKCAMFTT.CURRENTDAYFTT}
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div
                                className={getColor(
                                  pageData.LMDTRUCKCAMFTT.CURRENTMONTHFTT
                                )}
                              >
                                {pageData.LMDTRUCKCAMFTT.CURRENTMONTHFTT}
                              </div>
                            </div>
                          </div>
                        </CCol>
                      </CRow>
                    </CCol>

                    <CCol lg="4">
                      <CCard className="main-card-6">
                        <CCardBody style={{ padding: 5 }}>
                          <div className="col-md-12 gauge-gaurd-title text-center">
                            <h3>TRUCK CAM FTT TREND</h3>
                          </div>
                          <CChartLine
                            datasets={[
                              {
                                label: "HD",
                                borderColor: "#7F8C8D",
                                backgroundColor: "#7F8C8D",
                                data: truckGraphHDData,

                                fill: false,
                                type: "bar",
                              },
                              {
                                label: "LMD",
                                borderColor: "#0d86ff",
                                backgroundColor: "#0d86ff",
                                data: truckGraphLMDData,
                                fill: false,
                                type: "bar",
                                maxBarThickness: 40,
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
                                    },
                                  },
                                ],
                                xAxes: [
                                  {
                                    ticks: {
                                      fontColor: "#000",
                                    },
                                    offset: true,
                                  },
                                ],
                              },
                              title: {
                                display: true,
                                //text: "TRUCK CAM FTT TREND",
                                fontSize: 14,
                                padding: 5,
                                fontColor: "#000",
                              },
                              legend: {
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
                            labels={truckGraphLables}
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </div>
              </CCol>
            </CRow>

            <CRow className="main-row main-row-3">
              <CCol md="12">
                <div className="inner-box inner-box-dash2">
                  <CRow className="align-items-center">
                    <CCol lg="2">
                      <h5 className={"img-heading"}>Shower Test</h5>
                      <img
                        src="avatars/Shower_Test.jpg"
                        className="image-responsive img-brdr"
                      />
                    </CCol>

                    <CCol lg="6">
                      <CRow>
                        <CCol xs="6">
                          <CRow className={'mobile-label'}>
                            <CCol xs="12" className="ve-1 px-2">
                              <div className="align-content-center">
                                <h5 className="vehicleTitle">HD</h5>
                              </div>
                            </CCol>
                          </CRow>
                          <div className="row">
                            <div className="col-4 px-2"></div>
                            <div className="col-4 px-2">
                              <div className="label-control big-font">Day</div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="label-control big-font">
                                Month
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-4 px-2">
                              <div className="label-control big-font-two">
                                Tested Vehicle
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="audits-value big-font">
                                {
                                  pageData.HDSHOWERFTT
                                    .CURRENTDAYINSPECTEDVEHICLES
                                }
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="audits-value big-font">
                                {
                                  pageData.HDSHOWERFTT
                                    .CURRENTMONTHINSPECTEDVEHICLES
                                }
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4 px-2">
                              <div className="label-control big-font">FTT%</div>
                            </div>
                            <div className="col-4 px-2">
                              <div
                                className={getColor(
                                  pageData.HDSHOWERFTT.CURRENTDAYFTT
                                )}
                              >
                                {pageData.HDSHOWERFTT.CURRENTDAYFTT}
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div
                                className={getColor(
                                  pageData.HDSHOWERFTT.CURRENTMONTHFTT
                                )}
                              >
                                {pageData.HDSHOWERFTT.CURRENTMONTHFTT}
                              </div>
                            </div>
                          </div>
                        </CCol>
                        <CCol xs="6">
                          <CRow className={'mobile-label'}>
                            <CCol xs="12" className="ve-1 px-2">
                              <div className="align-content-center">
                                <h5 className="vehicleTitle">LMD</h5>
                              </div>
                            </CCol>
                          </CRow>
                          <div className="row justify-content-center">
                            <div className="col-1 px-2"></div>
                            <div className="col-4 px-2">
                              <div className="label-control big-font">Day</div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="label-control big-font">
                                Month
                              </div>
                            </div>
                          </div>
                          <div
                            className="row justify-content-center"
                            style={{ marginBottom: "3px" }}
                          >
                            <div className="col-1 px-2"></div>
                            <div className="col-4 px-2">
                              <div className="audits-value big-font">
                                {
                                  pageData.LMDSHOWERFTT
                                    .CURRENTDAYINSPECTEDVEHICLES
                                }
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div className="audits-value big-font">
                                {
                                  pageData.LMDSHOWERFTT
                                    .CURRENTMONTHINSPECTEDVEHICLES
                                }
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-1 px-2"></div>
                            <div className="col-4 px-2">
                              <div
                                className={getColor(
                                  pageData.LMDSHOWERFTT.CURRENTDAYFTT
                                )}
                              >
                                {pageData.LMDSHOWERFTT.CURRENTDAYFTT}
                              </div>
                            </div>
                            <div className="col-4 px-2">
                              <div
                                className={getColor(
                                  pageData.LMDSHOWERFTT.CURRENTMONTHFTT
                                )}
                              >
                                {pageData.LMDSHOWERFTT.CURRENTMONTHFTT}
                              </div>
                            </div>
                          </div>
                        </CCol>
                      </CRow>
                    </CCol>

                    <CCol lg="4">
                      <CCard className="main-card-6">
                        <CCardBody style={{ padding: 5 }}>
                          <div className="col-md-12 gauge-gaurd-title text-center">
                            <h3>SHOWER TEST FTT TREND</h3>
                          </div>
                          <CChartLine
                            datasets={[
                              {
                                label: "HD",
                                borderColor: "#7F8C8D ",
                                backgroundColor: "#7F8C8D ",
                                type: "bar",
                                data: showerGraphHDData,
                                fill: false,
                              },
                              {
                                label: "LMD",
                                borderColor: "#0d86ff",
                                backgroundColor: "#0d86ff",
                                data: showerGraphLMDData,
                                fill: false,
                                type: "bar",
                                maxBarThickness: 40,
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
                            labels={showerGraphLables}
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

export default Dashboard2;
