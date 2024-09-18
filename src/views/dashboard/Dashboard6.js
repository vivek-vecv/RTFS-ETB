import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import moment from "moment";
import axios from "axios";
import { API_URL, CreateArray } from "../../config";
import LoadingPage from "./LoadingPage";

const Dashboard6 = () => {
  const [isLoading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({
    DEMERITCOUNTTABLE: {
      CURRENTDAYCOUNT: {
        DEMERITCOUNT: [
          {
            VIN: "MC2FDLRT0MC490333",
            MODEL: "2090",
            DEMERIT: "137",
            COUNT100: "1",
            COUNT25: "0",
            COUNT5: "7",
            COUNT1: "2",
          },
          {
            VIN: "MC2ERHRC0MC190604",
            MODEL: "Pro 2110",
            DEMERIT: "74",
            COUNT100: "0",
            COUNT25: "0",
            COUNT5: "14",
            COUNT1: "4",
          },
          {
            VIN: "MC2BBMRC0MC070433",
            MODEL: "Pro 6028",
            DEMERIT: "157",
            COUNT100: "1",
            COUNT25: "2",
            COUNT5: "1",
            COUNT1: "2",
          },
          {
            VIN: "MC2CASRC0MB069781",
            MODEL: "Pro3019",
            DEMERIT: "187",
            COUNT100: "1",
            COUNT25: "0",
            COUNT5: "16",
            COUNT1: "7",
          },
          {
            VIN: "MC2EABRC0MC487736",
            MODEL: "Pro 2049",
            DEMERIT: "189",
            COUNT100: "1",
            COUNT25: "0",
            COUNT5: "17",
            COUNT1: "4",
          },
          {
            VIN: "MC2E3GRC0MC487389",
            MODEL: "UD",
            DEMERIT: "39",
            COUNT100: "0",
            COUNT25: "0",
            COUNT5: "6",
            COUNT1: "9",
          },
        ],
      },
      PREVIOUSDAYCOUNT: {
        DEMERITCOUNT: [
          {
            VIN: "MC2E3GRC0MC487390",
            MODEL: "UD",
            DEMERIT: "34",
            COUNT100: "0",
            COUNT25: "0",
            COUNT5: "6",
            COUNT1: "4",
          },
          {
            VIN: "MC2CAJRC0MA068743",
            MODEL: "Pro3019",
            DEMERIT: "333",
            COUNT100: "2",
            COUNT25: "1",
            COUNT5: "20",
            COUNT1: "8",
          },
          {
            INSPECTION_DATE: "03-Apr-2021",
            VIN: "MC2FDLRT0MC490298",
            MODEL: "2090",
            DEMERIT: "395",
            COUNT100: "3",
            COUNT25: "2",
            COUNT5: "9",
            COUNT1: "0",
          },
        ],
      },
    },
    DEMERITDESCRIPTIONTABLE: {
      CURRENTDAYDESCRIPTION: {
        DEMERITDESCRIPTION: [
          {
            VIN: "MC2FDLRT0MC490333",
            DEFECT_DESC: "wooden box mounting bolt hand loose",
            DEMERIT: "100",
          },
          {
            VIN: "MC2BBMRC0MC070433",
            DEFECT_DESC: "RPAS not working",
            DEMERIT: "100",
          },
          {
            VIN: "MC2BBMRC0MC070433",
            DEFECT_DESC: "Auto set slack adjuster lock plate nut hand loose",
            DEMERIT: "25",
          },
          {
            VIN: "MC2BBMRC0MC070433",
            DEFECT_DESC: "ABS not working",
            DEMERIT: "25",
          },
        ],
      },
      PREVIOUSDAYDESCRIPTION: {
        DEMERITDESCRIPTION: [
          {
            VIN: "MC2CAJRC0MA068743",
            DEFECT_DESC: "Urea dozing hose pinch near adblue tank",
            DEMERIT: "25",
          },
          {
            VIN: "MC2CAJRC0MB069618",
            DEFECT_DESC:
              "Continue air leakage from parking air hose inside lid",
            DEMERIT: "100",
          },
          {
            VIN: "MC2CAJRC0MB069618",
            DEFECT_DESC: "Starter relay connection found loose",
            DEMERIT: "100",
          },
          {
            VIN: "MC2CAJRC0MB069618",
            DEFECT_DESC: "TC hose foul with lower shield panel RH",
            DEMERIT: "25",
          },
        ],
      },
    },
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/dashboard6_data.php`)
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

  let currentDemerit = CreateArray(
    pageData.DEMERITCOUNTTABLE.CURRENTDAYCOUNT.DEMERITCOUNT
  );
  let currentDescDemerit = CreateArray(
    pageData.DEMERITDESCRIPTIONTABLE.CURRENTDAYDESCRIPTION.DEMERITDESCRIPTION
  );
  let previousDayDemerit = CreateArray(
    pageData.DEMERITCOUNTTABLE.PREVIOUSDAYCOUNT.DEMERITCOUNT
  );
  let previousDesc = CreateArray(
    pageData.DEMERITDESCRIPTIONTABLE.PREVIOUSDAYDESCRIPTION.DEMERITDESCRIPTION
  );

  return (
    <>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <CRow className="main-dashboard-wrap main-Dashboard3-wrap">
          <CCol lg="12" className="text-center main-head">
            <h5>Product Audit Demerit - Daily Report</h5>
          </CCol>
          <CCol lg="12">
            <CRow className="main-row main-row-2">
              <CCol md="12">
                <div className="inner-box inner-box-dash2">
                  <div className="row">
                    <div className="col-md-12 gauge-gaurd-title1 text-left">
                      <h2>{moment().format("DD/MM/YYYY")}</h2>
                    </div>
                  </div>
                  <CRow>
                    <CCol lg="6">
                      <CCard className="main-card-6">
                        <CCardBody className={"scroll-table-6"}>
                          <table className="table table-hover table-striped table-bordered table-sm blue-table">
                            <thead>
                              <tr>
                                <th scope="col">VIN</th>
                                <th scope="col">Model</th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                  Demerit
                                </th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                  100
                                </th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                  25
                                </th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                  5
                                </th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                  1
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentDemerit.map((item, index) => {
                                return (
                                  <tr key={index.toString()}>
                                    <td>{item.VIN}</td>
                                    <td>{item.MODEL}</td>
                                    <td align="center">{item.DEMERIT}</td>
                                    <td align="center">{item.COUNT100}</td>
                                    <td align="center">{item.COUNT25}</td>
                                    <td align="center">{item.COUNT5}</td>
                                    <td align="center">{item.COUNT1}</td>
                                  </tr>
                                );
                              })}

                              {generateEmptyRows(currentDemerit, 7)}
                            </tbody>
                          </table>
                        </CCardBody>
                      </CCard>
                    </CCol>

                    <CCol lg="6">
                      <CCard className="main-card-6">
                        <CCardBody className={"scroll-table-6"}>
                          <table className="table table-striped table-bordered table-sm blue-table">
                            <thead>
                              <tr>
                                <th scope="col">VIN</th>
                                <th scope="col">Description</th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                  Demerit
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentDescDemerit.map((item, index) => {
                                return (
                                  <tr key={index.toString()}>
                                    <td>{item.VIN}</td>
                                    <td>{item.DEFECT_DESC}</td>
                                    <td align="center">{item.DEMERIT}</td>
                                  </tr>
                                );
                              })}
                              {generateEmptyRows(currentDescDemerit, 3)}
                            </tbody>
                          </table>
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
                  <div className="row">
                    <div className="col-md-12 gauge-gaurd-title1 text-left">
                      <h2>
                        {moment().subtract(1, "day").format("DD/MM/YYYY")}
                      </h2>
                    </div>
                  </div>
                  <CRow>
                    <CCol lg="6">
                      <CCard className="main-card-6">
                        <CCardBody className={"scroll-table-6"}>
                          <table className="table table-hover table-striped table-bordered table-sm blue-table">
                            <thead>
                              <tr>
                                <th scope="col">VIN</th>
                                <th scope="col">Model</th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                  Demerit
                                </th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                  100
                                </th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                  25
                                </th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                  5
                                </th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                  1
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {previousDayDemerit.map((item, index) => {
                                return (
                                  <tr key={index.toString()}>
                                    <td>{item.VIN}</td>
                                    <td>{item.MODEL}</td>
                                    <td align="center">{item.DEMERIT}</td>
                                    <td align="center">{item.COUNT100}</td>
                                    <td align="center">{item.COUNT25}</td>
                                    <td align="center">{item.COUNT5}</td>
                                    <td align="center">{item.COUNT1}</td>
                                  </tr>
                                );
                              })}

                              {generateEmptyRows(previousDayDemerit, 7)}
                            </tbody>
                          </table>
                        </CCardBody>
                      </CCard>
                    </CCol>

                    <CCol lg="6">
                      <CCard className="main-card-6">
                        <CCardBody className={"scroll-table-6"}>
                          <table className="table table-striped table-bordered table-sm blue-table">
                            <thead>
                              <tr>
                                <th scope="col">VIN</th>
                                <th scope="col">Description</th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                  Demerit
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {previousDesc.map((item, index) => {
                                return (
                                  <tr key={index.toString()}>
                                    <td>{item.VIN}</td>
                                    <td>{item.DEFECT_DESC}</td>
                                    <td align="center">{item.DEMERIT}</td>
                                  </tr>
                                );
                              })}
                              {generateEmptyRows(previousDesc, 3)}
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

export default Dashboard6;
