import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import moment from "moment";
import axios from "axios";
import { API_URL, CreateArray } from "../../../config";
import LoadingPage from "../LoadingPage";

const CTDashboard8 = () => {
  const [isLoading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({
    LINEANDZONEWISETREND: {
      LINEZONETREND: [
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-1",
            SHIFT: "SHIFT A",
            DAY1: "0",
            DAY2: "11",
            DAY3: "0",
            DAY4: "2",
            DAY5: "3",
            DAY6: "5",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-1",
            SHIFT: "SHIFT B",
            DAY1: "0",
            DAY2: "0",
            DAY3: "0",
            DAY4: "0",
            DAY5: "0",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-1",
            SHIFT: "SHIFT C",
            DAY1: "0",
            DAY2: "0",
            DAY3: "0",
            DAY4: "0",
            DAY5: "0",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-2",
            SHIFT: "SHIFT A",
            DAY1: "4",
            DAY2: "4",
            DAY3: "18",
            DAY4: "0",
            DAY5: "1",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-2",
            SHIFT: "SHIFT C",
            DAY1: "53",
            DAY2: "60",
            DAY3: "5",
            DAY4: "21",
            DAY5: "2",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-2",
            SHIFT: "SHIFT B",
            DAY1: "35",
            DAY2: "9",
            DAY3: "13",
            DAY4: "3",
            DAY5: "0",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-3",
            SHIFT: "SHIFT A",
            DAY1: "0",
            DAY2: "2",
            DAY3: "0",
            DAY4: "7",
            DAY5: "6",
            DAY6: "2",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-3",
            SHIFT: "SHIFT B",
            DAY1: "0",
            DAY2: "0",
            DAY3: "0",
            DAY4: "0",
            DAY5: "0",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-3",
            SHIFT: "SHIFT C",
            DAY1: "0",
            DAY2: "0",
            DAY3: "0",
            DAY4: "0",
            DAY5: "0",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-4",
            SHIFT: "SHIFT A",
            DAY1: "1",
            DAY2: "16",
            DAY3: "3",
            DAY4: "9",
            DAY5: "6",
            DAY6: "11",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-4",
            SHIFT: "SHIFT C",
            DAY1: "4",
            DAY2: "5",
            DAY3: "0",
            DAY4: "0",
            DAY5: "1",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-4",
            SHIFT: "SHIFT B",
            DAY1: "10",
            DAY2: "5",
            DAY3: "8",
            DAY4: "4",
            DAY5: "1",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-5",
            SHIFT: "SHIFT A",
            DAY1: "0",
            DAY2: "3",
            DAY3: "0",
            DAY4: "0",
            DAY5: "0",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-5",
            SHIFT: "SHIFT B",
            DAY1: "0",
            DAY2: "0",
            DAY3: "0",
            DAY4: "0",
            DAY5: "0",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-5",
            SHIFT: "SHIFT C",
            DAY1: "0",
            DAY2: "0",
            DAY3: "0",
            DAY4: "0",
            DAY5: "0",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-6",
            SHIFT: "SHIFT A",
            DAY1: "0",
            DAY2: "8",
            DAY3: "0",
            DAY4: "3",
            DAY5: "4",
            DAY6: "3",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-6",
            SHIFT: "SHIFT B",
            DAY1: "0",
            DAY2: "0",
            DAY3: "0",
            DAY4: "0",
            DAY5: "0",
            DAY6: "0",
          },
        },
        {
          SHIFTWISETREND: {
            LINE: "HD",
            LINE_ZONE: "Zone-6",
            SHIFT: "SHIFT C",
            DAY1: "0",
            DAY2: "0",
            DAY3: "0",
            DAY4: "0",
            DAY5: "0",
            DAY6: "0",
          },
        },
      ],
    },
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/dashboard8_CT_data.php`)
      .then(function (response) {
        setPageData(response.data);
        console.log(JSON.stringify(response.data));
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
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
            <h5>Product Audit Demerit - All Zones Performance - HD-CT</h5>
          </CCol>
          <CCol lg="12">
            <CRow className="main-row main-row-2" style={{ marginTop: "14px" }}>
              <CCol md="12">
                <CRow>
                  <CCol lg="12">
                    <CCard className="main-card-6">
                      <CCardBody className={"scroll-table-6"}>
                        <div className="col-md-12 gauge-gaurd-title text-center">
                          <h3 style={{ fontSize: "2.3vh" }}>
                            Weekly Demerit Trend-HD Zone-1
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
                          <h3 style={{ fontSize: "2.3vh" }}>
                            Weekly Demerit Trend-HD Zone-2
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
                          <h3 style={{ fontSize: "2.3vh" }}>
                            Weekly Demerit Trend-HD Zone-3
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

export default CTDashboard8;
