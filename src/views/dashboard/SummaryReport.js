import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CNavbar,
  CToast,
  CToastHeader,
  CToastBody, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem
} from "@coreui/react";
import axios from "axios";
import { CChartLine, CChart } from "@coreui/react-chartjs";
import moment from "moment";
import { API_URL, CreateArray } from "../../config";
import * as QueryString from "query-string";
import LoadingPage from "./LoadingPage";

const SummaryReport = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [retrieve, setRetrieve] = useState(false);
  const parsed = QueryString.parse(props.location.search);
  const [toast, setToast] = useState(false);
  const [loadingToast, setLoadingToast] = useState(false);
  const [priority, setPriority] = useState("ALL");
  const [FromDate, setFromDate] = useState(moment().startOf('month').format('YYYY-MM-DDT08:00'));
  const [ToDate, setToDate] = useState(
    moment().add(1, 'M').startOf('month').format('YYYY-MM-DDT08:00')
  );

  // const [vehicleType, setVehicleType] = useState(
  //   parsed.VEHICLETYPE ? parsed.VEHICLETYPE : "HD"
  // );
  const [pageData, setPageData] = useState({
    SUMMARYREPORTFINAL: {
      SUMMARYREPORT: {
        HEADWISEDEMERIT: {
          HEADWISE: [
            {
              HEAD: "Part",
              ACTUALLMD: "13",
              ACTUALHD: "14",
              TARGET: "4",
            },
            {
              HEAD: "Process",
              ACTUALLMD: "56",
              ACTUALHD: "94",
              TARGET: "43",
            },
            {
              HEAD: "Design",
              ACTUALLMD: "1",
              ACTUALHD: "1",
              TARGET: "3",
            },
          ],
        },
        TSELFWISEDEMERIT: {
          TSELFWISE: [
            {
              TSELF: "T",
              ACTUALLMD: "12",
              ACTUALHD: "22",
              TARGET: "10",
            },
            {
              TSELF: "S",
              ACTUALLMD: "8",
              ACTUALHD: "7",
              TARGET: "3",
            },
            {
              TSELF: "E",
              ACTUALLMD: "1",
              ACTUALHD: "7",
              TARGET: "2",
            },
            {
              TSELF: "L",
              ACTUALLMD: "0",
              ACTUALHD: "0",
              TARGET: "3",
            },
            {
              TSELF: "F",
              ACTUALLMD: "5",
              ACTUALHD: "5",
              TARGET: "2",
            },
            {
              TSELF: "A",
              ACTUALLMD: "35",
              ACTUALHD: "57",
              TARGET: "20",
            },
            {
              TSELF: "R",
              ACTUALLMD: "10",
              ACTUALHD: "11",
              TARGET: "10",
            },
          ],
        },
        AGGREGATEWISEDEMERIT: {
          AGGREGATEWISE: [
            {
              AGGREGATE: "Chassis",
              ACTUALLMD: "14",
              ACTUALHD: "31",
              TARGET: "20",
            },
            {
              AGGREGATE: "Cabtrim",
              ACTUALLMD: "17",
              ACTUALHD: "26",
              TARGET: "10",
            },
            {
              AGGREGATE: "Cabweld",
              ACTUALLMD: "2",
              ACTUALHD: "5",
              TARGET: "1",
            },
            {
              AGGREGATE: "Paint Shop",
              ACTUALLMD: "4",
              ACTUALHD: "13",
              TARGET: "5",
            },
            {
              AGGREGATE: "Engine",
              ACTUALLMD: "0",
              ACTUALHD: "0",
              TARGET: "2",
            },
            {
              AGGREGATE: "VEPT",
              ACTUALLMD: "---",
              ACTUALHD: "---",
              TARGET: "1",
            },
            {
              AGGREGATE: "Axle",
              ACTUALLMD: "---",
              ACTUALHD: "---",
              TARGET: "1",
            },
            {
              AGGREGATE: "EOLT",
              ACTUALLMD: "---",
              ACTUALHD: "0",
              TARGET: "1",
            },
            {
              AGGREGATE: "Tyre Yard",
              ACTUALLMD: "---",
              ACTUALHD: "1",
              TARGET: "1",
            },
            {
              AGGREGATE: "Chassis Paint",
              ACTUALLMD: "1",
              ACTUALHD: "1",
              TARGET: "1",
            },
          ],
        },
      },
    },
  });

  const params = {
    fromDate: FromDate,
    toDate: ToDate,
  };
  // const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm');
  //const endOfMonth = moment().add(1, 'M').startOf('month').format('YYYY-MM-DD hh:mm');
  document.getElementById("fromDate")

  useEffect(() => {
    if (retrieve) {
      if (FromDate < ToDate) {
        if (priority == "ALL") {
          axios
            .get(`${API_URL}/DemeritSummaryData.php`, { params })
            .then(function (response) {
              if (response && response.data) {
                setPageData(response.data);
                console.log(JSON.stringify(response.data));
                console.log("running again");
                setLoadingToast(false);
                setRetrieve(false);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else if (priority == "PRIORITY") {
          axios
            .get(`${API_URL}/DemeritSummaryDataPriority.php`, { params })
            .then(function (response) {
              if (response && response.data) {
                setPageData(response.data);
                console.log(JSON.stringify(response.data));
                console.log("running again");
                setLoadingToast(false);
                setRetrieve(false);
              }
            })
            .catch(function (error) {
              console.log(error);
            });

        }



      } else {
        setToast(true);
        setRetrieve(false);
      }
    }
  }, [retrieve]);

  // const getColor = (val, target) => {
  //   let targetArray = target.split("/");
  //   const tg = parseInt(targetArray[1]);
  //   let color = "red-color";
  //   color = val > tg ? "red-color" : "green-color";
  //   return color;
  // };

  // const getFontColor = (target, value) => {
  //   if (parseInt(value) > parseInt(target)) {
  //     return "font-red";
  //   } else if (parseInt(value) >= 0) {
  //     return "font-green";
  //   } else {
  //     return "";
  //   }
  // };

  const getFontColor = (value, target) => {
    if (parseInt(value) > parseInt(target)) {
      return "font-red";
    } else {
      return "font-green";
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

          </tr>
        );
      }
      return elm;
    }
  };

  const generateEmptyRowsAggwise = (data) => {
    if (data.length < 10) {
      const elm = [];
      for (let i = 0; i < 10 - data.length; i++) {
        elm.push(
          <tr key={i.toString()}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
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



  const generateEmptyRowsTSELF = (data) => {
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

  let aggregateWiseDem = CreateArray(
    pageData.SUMMARYREPORT?.AGGREGATEWISEDEMERIT?.AGGREGATEWISE
  );

  let headWiseDem = CreateArray(
    pageData.SUMMARYREPORT?.HEADWISEDEMERIT?.HEADWISE
  );

  let tSelfWiseDem = CreateArray(
    pageData.SUMMARYREPORT?.TSELFWISEDEMERIT?.TSELFWISE
  );

  let tSelfSpecificDem = CreateArray(
    pageData.SUMMARYREPORT?.TSELFSPECIFIC_DEMERIT?.TSELFSPECIFIC
  );
  let totalVehicleInspected = CreateArray(pageData.SUMMARYREPORT?.TOTALVEHICLE);

  function dateValues() {
    setRetrieve(true);

    if (FromDate < ToDate) {
      setToast(false);
      setLoadingToast(true);
    }
  }
  let sumAggHD = 0;
  let sumAggLMD = 0;
  let sumTarget = 0;
  let sumPro3000 = 0;
  let sumPro6000 = 0;
  let sumPro8000 = 0;
  let sumPro2100 = 0;
  let sumCowl = 0;
  for (let i = 0; i < aggregateWiseDem.length; i++) {
    if (aggregateWiseDem[i].ACTUALHD != "---") {
      let val = aggregateWiseDem[i].ACTUALHD;

      sumAggHD = sumAggHD + parseInt(val);
    }
    if (aggregateWiseDem[i].ACTUALLMD != "---") {
      let val = aggregateWiseDem[i].ACTUALLMD;

      sumAggLMD = sumAggLMD + parseInt(val);
    }
    if (aggregateWiseDem[i].TARGET != "---") {
      let val = aggregateWiseDem[i].TARGET;

      sumTarget = sumTarget + parseInt(val);
    }

    if (aggregateWiseDem[i].PRO3000 != "---") {
      let val = aggregateWiseDem[i].PRO3000;

      sumPro3000 = sumPro3000 + parseInt(val);
    }
    if (aggregateWiseDem[i].PRO6000 != "---") {
      let val = aggregateWiseDem[i].PRO6000;

      sumPro6000 = sumPro6000 + parseInt(val);
    }
    if (aggregateWiseDem[i].PRO8000 != "---") {
      let val = aggregateWiseDem[i].PRO8000;

      sumPro8000 = sumPro8000 + parseInt(val);
    }
    if (aggregateWiseDem[i].PRO2100 != "---") {
      let val = aggregateWiseDem[i].PRO2100;

      sumPro2100 = sumPro2100 + parseInt(val);
    }
    if (aggregateWiseDem[i].COWL != "---") {
      let val = aggregateWiseDem[i].COWL;

      sumCowl = sumCowl + parseInt(val);
    }
  }
  let sumTSELFSpecificHD = 0;
  let sumTSELFSpecificLMD = 0;

  for (let i = 0; i < tSelfSpecificDem.length; i++) {
    if (tSelfSpecificDem[i].ACTUALHD != "---") {
      let val = tSelfSpecificDem[i].ACTUALHD;

      sumTSELFSpecificHD = sumTSELFSpecificHD + parseInt(val);
    }
    if (tSelfSpecificDem[i].ACTUALLMD != "---") {
      let val = tSelfSpecificDem[i].ACTUALLMD;

      sumTSELFSpecificLMD = sumTSELFSpecificLMD + parseInt(val);
    }
  }

  let sumHeadwiseHD = 0;
  let sumHeadwiseLMD = 0;
  let sumHeadwiseTarget = 0;
  let sumHeadPro3000 = 0;
  let sumHeadPro6000 = 0;
  let sumHeadPro8000 = 0;
  let sumHeadPro2100 = 0;
  let sumHeadCowl = 0;
  for (let i = 0; i < headWiseDem.length; i++) {
    if (headWiseDem[i].ACTUALHD != "---") {
      let val = headWiseDem[i].ACTUALHD;

      sumHeadwiseHD = sumHeadwiseHD + parseInt(val);
    }
    if (headWiseDem[i].ACTUALLMD != "---") {
      let val = headWiseDem[i].ACTUALLMD;

      sumHeadwiseLMD = sumHeadwiseLMD + parseInt(val);
    }
    if (headWiseDem[i].TARGET != "---") {
      let val = headWiseDem[i].TARGET;

      sumHeadwiseTarget = sumHeadwiseTarget + parseInt(val);
    }
    if (headWiseDem[i].PRO3000 != "---") {
      let val = headWiseDem[i].PRO3000;

      sumHeadPro3000 = sumHeadPro3000 + parseInt(val);
    }
    if (headWiseDem[i].PRO6000 != "---") {
      let val = headWiseDem[i].PRO6000;

      sumHeadPro6000 = sumHeadPro6000 + parseInt(val);
    }
    if (headWiseDem[i].PRO8000 != "---") {
      let val = headWiseDem[i].PRO8000;

      sumHeadPro8000 = sumHeadPro8000 + parseInt(val);
    }
    if (headWiseDem[i].PRO2100 != "---") {
      let val = headWiseDem[i].PRO2100;

      sumHeadPro2100 = sumHeadPro2100 + parseInt(val);
    }
    if (headWiseDem[i].COWL != "---") {
      let val = headWiseDem[i].COWL;

      sumHeadCowl = sumHeadCowl + parseInt(val);
    }
  }

  let sumTSELFHD = 0;
  let sumTSELFLMD = 0;
  let sumTSELFTarget = 0;
  for (let i = 0; i < tSelfWiseDem.length; i++) {
    if (tSelfWiseDem[i].ACTUALHD != "---") {
      let val = tSelfWiseDem[i].ACTUALHD;

      sumTSELFHD = sumTSELFHD + parseInt(val);
    }
    if (tSelfWiseDem[i].ACTUALLMD != "---") {
      let val = tSelfWiseDem[i].ACTUALLMD;

      sumTSELFLMD = sumTSELFLMD + parseInt(val);
    }
    if (tSelfWiseDem[i].TARGET != "---") {
      let val = tSelfWiseDem[i].TARGET;

      sumTSELFTarget = sumTSELFTarget + parseInt(val);
    }
  }




  const handleClickPriority = (i) => {
    setPriority(i)

  }

  return (
    <>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <CRow className="main-dashboard-wrap">
          <CCol lg="12" className="text-center main-head">
            <h5>Product Audit Demerit - Head & Aggregate Trend</h5>
          </CCol>

          <CCol
            lg="12"
            className="text-center"
            style={{
              color: "#fff",
              backgroundColor: "grey",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "30px 70px",
                marginLeft: "20%",
              }}
            >
              <label for="From Date" >
                From Date:
                <input
                  style={{
                    margin: "7px",
                    borderRadius: "5px",
                    border: "none",
                    marginTop: "10px",
                  }}

                  type="datetime-local"
                  name="FromDate"
                  value={FromDate}
                  pattern="\d{4}-\d{2}-\d{2}"
                  onChange={(event) => setFromDate(event.target.value)}
                />
              </label>
              <label for="To Date">
                To Date:
                <input
                  type="datetime-local"
                  style={{
                    margin: "7px",
                    borderRadius: "5px",
                    border: "none",
                    marginTop: "10px",
                  }}

                  value={ToDate}
                  name="ToDate"
                  pattern="\d{4}-\d{2}-\d{2}"
                  onChange={(event) => setToDate(event.target.value)}
                />
              </label>
              <CDropdown >
                <CDropdownToggle color="info" style={{ width: "125%" }}>
                  {priority}
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem key={"ALL"} onClick={() => handleClickPriority("ALL")} >ALL Issues</CDropdownItem>
                  <CDropdownItem key={"PRIORITY"} onClick={() => handleClickPriority("PRIORITY")}  >Priority Issues</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <CButton
                color="info"
                style={{ margin: "5px" }}
                onClick={dateValues}
                font-size="smaller"
                font-weight="600"
              //size="sm"
              >
                RETRIEVE
              </CButton>

            </div>
          </CCol>

          <CCol lg="12">
            <div className="inner-box">
              <CRow
                className="main-row main-row-2"
                style={{ paddingLeft: "12px", paddingRight: "12px" }}
              ></CRow>

              <hr className="hr-line" />
              <CRow className="main-row main-row-2">
                <CCol md="12">
                  <CCard className="main-card-6">
                    <CCardBody>
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
                          Total Vehicle Inspected
                        </h2>
                      </div>
                      <table
                        className="table table-hover table-striped table-bordered table-sm blue-table"
                        style={{ fontWeight: 700 }}
                      >
                        <thead>
                          <tr>
                            <th className={"text-center"} scope="col">
                              Total Vehicle - HD
                            </th>
                            <th className={"text-center"} scope="col">
                              Total Vehicle - LMD
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {totalVehicleInspected.map((item, index) => {
                            return (
                              <tr key={index.toString()}>
                                <td
                                  className={`text-center 
                            }`}
                                >
                                  {item.TOTALVEHICLE_HD}
                                </td>

                                <td
                                  className={`text-center 
                            }`}
                                >
                                  {item.TOTALVEHICLE_LMD}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </CCardBody>
                  </CCard>


                  <CCard className="main-card-6">
                    <div align="center">
                      <CToast
                        title="Date Choice Error"
                        autohide={false}
                        show={toast}
                        color="danger"
                      >
                        <CToastHeader close>
                          <strong
                            className="me-auto 
                "
                          >
                            Date Choice Error
                          </strong>
                        </CToastHeader>
                        <CToastBody>
                          Hello, From_Date Can't greater than To_Date.
                        </CToastBody>
                      </CToast>
                      <CToast

                        autohide={false}
                        show={loadingToast}
                        color="secondary"
                      >
                        <CToastHeader close>



                        </CToastHeader>
                        <CToastBody >
                          Please wait Data is loading...
                        </CToastBody>
                      </CToast>
                    </div>
                    <CCardBody>
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
                          Aggregate Wise Demerit
                        </h2>
                      </div>
                      <table
                        className="table table-hover table-striped table-bordered table-sm blue-table"
                        style={{ fontWeight: 700 }}
                      >
                        <thead>
                          <tr >
                            <th className={"text-center"} style={{ verticalAlign: "middle" }} rowSpan={2} scope="col">
                              Aggregate
                            </th>
                            <th className={"text-center"} style={{ verticalAlign: "middle" }} rowSpan={2} scope="col">
                              Target Value
                            </th>
                            <th className={"text-center"} colspan="4" scope="col">
                              HD
                            </th>
                            <th className={"text-center"} style={{ verticalAlign: "middle" }} colSpan={3} scope="col">
                              LMD
                            </th>
                          </tr>
                          <tr>

                            <th className={"text-center"} scope="col">
                              Overall
                            </th>
                            <th className={"text-center"} scope="col">
                              Pro3000
                            </th><th className={"text-center"} scope="col">
                              Pro6000
                            </th><th className={"text-center"} scope="col">
                              Pro8000
                            </th>
                            <th className={"text-center"} scope="col">
                              Overall
                            </th><th className={"text-center"} scope="col">
                              Pro2100
                            </th>
                            <th className={"text-center"} scope="col">
                              COWL
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {aggregateWiseDem.map((item, index) => {
                            return (
                              <tr key={index.toString()}>
                                <td>{item.AGGREGATE}</td>
                                <td className={"text-center"}>{item.TARGET}</td>
                                <td
                                  className={`text-center ${getFontColor(
                                    item.ACTUALHD,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.ACTUALHD}
                                </td>
                                <td
                                  className={`text-center ${getFontColor(
                                    item.ACTUALHD,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.PRO3000}
                                </td>  <td
                                  className={`text-center ${getFontColor(
                                    item.ACTUALHD,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.PRO6000}
                                </td>  <td
                                  className={`text-center ${getFontColor(
                                    item.ACTUALHD,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.PRO8000}
                                </td>
                                <td
                                  className={`text-center ${getFontColor(
                                    item.ACTUALLMD,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.ACTUALLMD}
                                </td><td
                                  className={`text-center ${getFontColor(
                                    item.PRO2100,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.PRO2100}
                                </td><td
                                  className={`text-center ${getFontColor(
                                    item.COWL,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.COWL}
                                </td>
                              </tr>
                            );
                          })}
                          <tr
                            style={{
                              backgroundColor: "#b8cddf",
                              fontWeight: "bold",
                            }}
                          >
                            <td>Total</td>
                            <td className={`text-center }`}>{sumTarget}</td>
                            <td
                              className={`text-center ${getFontColor(
                                sumAggHD,
                                sumTarget
                              )}`}
                            >
                              {sumAggHD}
                            </td>
                            <td
                              className={`text-center ${getFontColor(
                                sumPro3000,
                                sumTarget
                              )}`}
                            >
                              {sumPro3000}
                            </td><td
                              className={`text-center ${getFontColor(
                                sumPro6000,
                                sumTarget
                              )}`}
                            >
                              {sumPro6000}
                            </td><td
                              className={`text-center ${getFontColor(
                                sumPro8000,
                                sumTarget
                              )}`}
                            >
                              {sumPro8000}
                            </td>

                            <td
                              className={`text-center ${getFontColor(
                                sumAggLMD,
                                sumTarget
                              )}`}
                            >
                              {sumAggLMD}
                            </td><td
                              className={`text-center ${getFontColor(
                                sumPro2100,
                                sumTarget
                              )}`}
                            >
                              {sumPro2100}
                            </td><td
                              className={`text-center ${getFontColor(
                                sumCowl,
                                sumTarget
                              )}`}
                            >
                              {sumCowl}
                            </td>
                          </tr>

                          {generateEmptyRowsAggwise(aggregateWiseDem)}
                        </tbody>
                      </table>
                    </CCardBody>
                  </CCard>
                  <CCard className="main-card-6">
                    <CCardBody>
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
                          Head Wise Demerit
                        </h2>
                      </div>
                      <table
                        className="table table-hover table-striped table-bordered table-sm blue-table"
                        style={{ fontWeight: 700 }}
                      >
                        <thead>
                          <tr>
                            <th className={"text-center"} style={{ verticalAlign: "middle" }} rowSpan={2} scope="col">
                              Head
                            </th>
                            <th className={"text-center"} style={{ verticalAlign: "middle" }} rowSpan={2} scope="col">
                              Target Value
                            </th>
                            <th className={"text-center"} colspan="4" scope="col">
                              HD
                            </th>
                            <th className={"text-center"} style={{ verticalAlign: "middle" }} colSpan={3} scope="col">
                              LMD
                            </th>
                          </tr>
                          <tr>
                            <th className={"text-center"} scope="col">
                              Overall
                            </th>
                            <th className={"text-center"} scope="col">
                              Pro3000
                            </th><th className={"text-center"} scope="col">
                              Pro6000
                            </th><th className={"text-center"} scope="col">
                              Pro8000
                            </th>
                            <th className={"text-center"} scope="col">
                              Overall
                            </th><th className={"text-center"} scope="col">
                              Pro2100
                            </th>
                            <th className={"text-center"} scope="col">
                              COWL
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {headWiseDem.map((item, index) => {
                            return (
                              <tr key={index.toString()}>
                                <td>{item.HEAD}</td>
                                <td className={"text-center"}>{item.TARGET}</td>
                                <td
                                  className={`text-center ${getFontColor(
                                    item.ACTUALHD,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.ACTUALHD}
                                </td>
                                <td
                                  className={`text-center ${getFontColor(
                                    item.ACTUALHD,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.PRO3000}
                                </td>  <td
                                  className={`text-center ${getFontColor(
                                    item.ACTUALHD,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.PRO6000}
                                </td>  <td
                                  className={`text-center ${getFontColor(
                                    item.ACTUALHD,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.PRO8000}
                                </td>
                                <td
                                  className={`text-center ${getFontColor(
                                    item.ACTUALLMD,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.ACTUALLMD}
                                </td><td
                                  className={`text-center ${getFontColor(
                                    item.PRO2100,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.PRO2100}
                                </td><td
                                  className={`text-center ${getFontColor(
                                    item.COWL,
                                    item.TARGET
                                  )}`}
                                >
                                  {item.COWL}
                                </td>
                              </tr>
                            );
                          })}
                          <tr
                            style={{
                              backgroundColor: "#b8cddf",
                              fontWeight: "bold",
                            }}
                          >
                            <td>Total</td>
                            <td className={`text-center `}>{sumHeadwiseTarget}</td>
                            <td
                              className={`text-center ${getFontColor(
                                sumHeadwiseHD,
                                sumTarget
                              )}`}
                            >
                              {sumHeadwiseHD}
                            </td><td
                              className={`text-center ${getFontColor(
                                sumHeadPro3000,
                                sumTarget
                              )}`}
                            >
                              {sumHeadPro3000}
                            </td><td
                              className={`text-center ${getFontColor(
                                sumHeadPro6000,
                                sumTarget
                              )}`}
                            >
                              {sumHeadPro6000}
                            </td><td
                              className={`text-center ${getFontColor(
                                sumHeadPro8000,
                                sumTarget
                              )}`}
                            >
                              {sumHeadPro8000}
                            </td>
                            <td
                              className={`text-center ${getFontColor(
                                sumHeadwiseLMD,
                                sumTarget
                              )}`}
                            >
                              {sumHeadwiseLMD}
                            </td><td
                              className={`text-center ${getFontColor(
                                sumHeadPro2100,
                                sumTarget
                              )}`}
                            >
                              {sumHeadPro2100}
                            </td><td
                              className={`text-center ${getFontColor(
                                sumHeadCowl,
                                sumTarget
                              )}`}
                            >
                              {sumHeadCowl}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              {/* <div className="row" style={{ marginTop: 5 }}>
                <div className="col-md-12 gauge-gaurd-title text-center">
                  <h3 style={{ fontSize: "1rem" }}>{fullForm}</h3>
                </div>
              </div> */}
              <CCard className="main-card-6">
                <CCardBody>
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
                      TSELF-AR Specific Demerit
                    </h2>
                  </div>
                  <table
                    className="table table-hover table-striped table-bordered table-sm blue-table"
                    style={{ fontWeight: 700 }}
                  >
                    <thead>
                      <tr>
                        <th className={"text-center"} scope="col">
                          Team
                        </th>

                        <th className={"text-center"} scope="col">
                          Manufacturing Owner
                        </th>
                        <th className={"text-center"} scope="col">
                          Target
                        </th>
                        <th className={"text-center"} scope="col">
                          Actual Value - HD
                        </th>
                        <th className={"text-center"} scope="col">
                          Actual Value - LMD
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tSelfSpecificDem.map((item, index) => {
                        return (
                          <tr key={index.toString()}>
                            <td>{item.TSELF}</td>

                            <td
                              className={`text-center 
                            }`}
                            >
                              {item.TECHOWNER}
                            </td>
                            <td
                              className={`text-center 
                            }`}
                            >
                              {item.TARGET}
                            </td>
                            <td
                              className={`text-center ${getFontColor(
                                item.ACTUALHD,
                                item.TARGET
                              )}`}
                            >
                              {item.ACTUALHD}
                            </td>
                            <td
                              className={`text-center 
                            ${getFontColor(item.ACTUALLMD, item.TARGET)}`}
                            >
                              {item.ACTUALLMD}
                            </td>
                          </tr>
                        );
                      })}
                      <tr
                        style={{
                          backgroundColor: "#b8cddf",
                          fontWeight: "bold",
                        }}
                      >
                        <td>Total</td>
                        <td></td>

                        <td className={`text-center`}>{sumHeadwiseTarget}</td>
                        <td
                          className={`text-center ${getFontColor(
                            sumTSELFSpecificHD,
                            50
                          )}`}
                        >
                          {sumTSELFSpecificHD}
                        </td>
                        <td
                          className={`text-center ${getFontColor(
                            sumTSELFSpecificLMD,
                            50
                          )}`}
                        >
                          {sumTSELFSpecificLMD}
                        </td>
                      </tr>

                      {generateEmptyRowsTSELF(tSelfSpecificDem)}
                    </tbody>
                  </table>
                </CCardBody>
              </CCard>
            </div>
          </CCol>

          <CCol lg="12">
            <div className="inner-box" style={{ height: "100%" }}>
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
                    TSELF-AR Wise Demerit
                  </h2>
                </div>
              </div>

              <table
                className="table table-hover table-striped table-bordered table-sm blue-table"
                style={{ fontWeight: 700 }}
              >
                <thead>
                  <tr>
                    <th className={"text-center"} scope="col">
                      TSELF-AR
                    </th>
                    <th className={"text-center"} scope="col">
                      Target Value
                    </th>
                    <th className={"text-center"} scope="col">
                      Actual Value - HD
                    </th>
                    <th className={"text-center"} scope="col">
                      Actual Value -LMD
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tSelfWiseDem.map((item, index) => {
                    return (
                      <tr key={index.toString()}>
                        <td className={"text-center"}>{item.TSELF}</td>
                        <td className={"text-center"}>{item.TARGET}</td>
                        <td
                          className={`text-center ${getFontColor(
                            item.ACTUALHD,
                            item.TARGET
                          )}`}
                        >
                          {item.ACTUALHD}
                        </td>
                        <td
                          className={`text-center ${getFontColor(
                            item.ACTUALLMD,
                            item.TARGET
                          )}`}
                        >
                          {item.ACTUALLMD}
                        </td>
                      </tr>
                    );
                  })}
                  <tr
                    style={{
                      backgroundColor: "#b8cddf",
                      fontWeight: "bold",
                    }}
                  >
                    <td className={`text-center`}>Total</td>
                    <td className={`text-center }`}>{sumTSELFTarget}</td>
                    <td
                      className={`text-center ${getFontColor(
                        sumTSELFHD,
                        sumTSELFTarget
                      )}`}
                    >
                      {sumTSELFHD}
                    </td>
                    <td
                      className={`text-center ${getFontColor(
                        sumTSELFLMD,
                        sumTSELFTarget
                      )}`}
                    >
                      {sumTSELFLMD}
                    </td>
                  </tr>

                  {generateEmptyRowsTSELF(tSelfWiseDem)}
                </tbody>
              </table>
            </div>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default SummaryReport;
