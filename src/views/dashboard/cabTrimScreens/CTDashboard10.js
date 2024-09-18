import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import moment from "moment";
import axios from "axios";
import { API_URL, CreateArray } from "../../../config";
import LoadingPage from "../LoadingPage";

const CTDashboard10 = () => {
  const [isLoading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({
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
      .get(`${API_URL}/dashboard10_CT_data.php`)
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

  let SHIFTWISETRENDDemeritZone1 = CreateArray(
    pageData.LINEANDZONEWISETREND.LINEZONETREND[0].SHIFTWISETREND
  );
  let SHIFTWISETRENDDemeritZone2 = CreateArray(
    pageData.LINEANDZONEWISETREND.LINEZONETREND[1].SHIFTWISETREND
  );
  let SHIFTWISETRENDDemeritZone3 = CreateArray(
    pageData.LINEANDZONEWISETREND.LINEZONETREND[2].SHIFTWISETREND
  );

  const getFontColor = (value) => {
    if (parseInt(value) > parseInt(5)) {
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
            <h5>Product Audit Demerit - All Zones Performance - LD-CT</h5>
          </CCol>
          <CCol lg="12">
            <CRow className="main-row main-row-2" style={{ marginTop: "14px" }}>
              <CCol md="12">
                <CRow>
                  <CCol lg="12">
                    <CCard className="main-card-6">
                      <CCardBody className={"scroll-table-6"}>
                        <div className="col-md-12 gauge-gaurd-title text-center">
                          <h3 style={{ fontSize: "2.5vh" }}>
                            Weekly Demerit Trend-LMD Zone-1
                          </h3>
                        </div>
                        <table className="table table-hover table-striped table-bordered table-sm blue-table">
                          <thead style={{ textAlign: "center" }}>
                            <tr>
                              <th scope="col">Shift</th>
                              <th scope="col">
                                {moment()
                                  .subtract(5, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment()
                                  .subtract(4, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment()
                                  .subtract(3, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment()
                                  .subtract(2, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment()
                                  .subtract(1, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment().format("DD-MMM-YY")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {SHIFTWISETRENDDemeritZone1.map((item, index) => {
                              return (
                                <tr
                                  key={index.toString()}
                                  align="center"
                                  style={{ fontWeight: "bold" }}
                                >
                                  <td>{item.SHIFT}</td>
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY1
                                    )}`}
                                  >
                                    {item.DAY1}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY2
                                    )}`}
                                  >
                                    {item.DAY2}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY3
                                    )}`}
                                  >
                                    {item.DAY3}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY4
                                    )}`}
                                  >
                                    {item.DAY4}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY5
                                    )}`}
                                  >
                                    {item.DAY5}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY6
                                    )}`}
                                  >
                                    {item.DAY6}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </CCardBody>
                    </CCard>
                  </CCol>

                  <CCol lg="12">
                    <CCard
                      className="main-card-6"
                      style={{ marginTop: "14px" }}
                    >
                      <CCardBody className={"scroll-table-6"}>
                        <div className="col-md-12 gauge-gaurd-title text-center">
                          <h3 style={{ fontSize: "2.5vh" }}>
                            Weekly Demerit Trend-LMD Zone-2
                          </h3>
                        </div>
                        <table className="table table-striped table-bordered table-sm blue-table">
                          <thead style={{ textAlign: "center" }}>
                            <tr>
                              <th scope="col">Shift</th>
                              <th scope="col">
                                {moment()
                                  .subtract(5, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment()
                                  .subtract(4, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment()
                                  .subtract(3, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment()
                                  .subtract(2, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment()
                                  .subtract(1, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment().format("DD-MMM-YY")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {SHIFTWISETRENDDemeritZone2.map((item, index) => {
                              return (
                                <tr
                                  key={index.toString()}
                                  align="center"
                                  style={{ fontWeight: "bold" }}
                                >
                                  <td>{item.SHIFT}</td>
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY1
                                    )}`}
                                  >
                                    {item.DAY1}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY2
                                    )}`}
                                  >
                                    {item.DAY2}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY3
                                    )}`}
                                  >
                                    {item.DAY3}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY4
                                    )}`}
                                  >
                                    {item.DAY4}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY5
                                    )}`}
                                  >
                                    {item.DAY5}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY6
                                    )}`}
                                  >
                                    {item.DAY6}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </CCardBody>
                    </CCard>
                  </CCol>
                  <CCol lg="12">
                    <CCard
                      className="main-card-6"
                      style={{ marginTop: "14px" }}
                    >
                      <CCardBody className={"scroll-table-6"}>
                        <div className="col-md-12 gauge-gaurd-title text-center">
                          <h3 style={{ fontSize: "2.5vh" }}>
                            Weekly Demerit Trend-LMD Zone-3
                          </h3>
                        </div>
                        <table className="table table-striped table-bordered table-sm blue-table">
                          <thead style={{ textAlign: "center" }}>
                            <tr>
                              <th scope="col">Shift</th>
                              <th scope="col">
                                {moment()
                                  .subtract(5, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment()
                                  .subtract(4, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment()
                                  .subtract(3, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment()
                                  .subtract(2, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment()
                                  .subtract(1, "day")
                                  .format("DD-MMM-YY")}
                              </th>
                              <th scope="col">
                                {moment().format("DD-MMM-YY")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {SHIFTWISETRENDDemeritZone3.map((item, index) => {
                              return (
                                <tr
                                  key={index.toString()}
                                  align="center"
                                  style={{ fontWeight: "bold" }}
                                >
                                  <td>{item.SHIFT}</td>
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY1
                                    )}`}
                                  >
                                    {item.DAY1}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY2
                                    )}`}
                                  >
                                    {item.DAY2}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY3
                                    )}`}
                                  >
                                    {item.DAY3}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY4
                                    )}`}
                                  >
                                    {item.DAY4}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY5
                                    )}`}
                                  >
                                    {item.DAY5}
                                  </td>{" "}
                                  <td
                                    className={`text-center ${getFontColor(
                                      item.DAY6
                                    )}`}
                                  >
                                    {item.DAY6}
                                  </td>
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
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default CTDashboard10;
