import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import moment from "moment";
import axios from "axios";
import { API_URL, CreateArray } from "../../../config";
import LoadingPage from "../LoadingPage";

const RolloutDashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({
    Rowset: {
      Row: [
        {
          OPERATION: "EN_PRB_00",
          A: "32",
          B: "0",
          C: "0",
          TOTAL: "32",
          MTD: "384",
          YTD: "15959",
        },
        {
          OPERATION: "AGV2 ROLLED-OUT",
          A: "22",
          B: "0",
          C: "0",
          TOTAL: "22",
          MTD: "384",
          YTD: "15461",
        },
        {
          OPERATION: "TESTBED",
          A: "36",
          B: "0",
          C: "0",
          TOTAL: "36",
          MTD: "372",
          YTD: "16893",
        },
        {
          OPERATION: "TOTAL COUPLED",
          A: "38",
          B: "0",
          C: "0",
          TOTAL: "38",
          MTD: "438",
          YTD: "7836",
        },
        {
          OPERATION: "COUPLED (Ex83/Ex94)",
          A: "29",
          B: "0",
          C: "0",
          TOTAL: "29",
          MTD: "340",
          YTD: "4678",
        },
        {
          OPERATION: "COUPLED(E474/E366)",
          A: "0",
          B: "0",
          C: "0",
          TOTAL: "0",
          MTD: "0",
          YTD: "0",
        },
        {
          OPERATION: "COUPLED(MDE)",
          A: "9",
          B: "0",
          C: "0",
          TOTAL: "9",
          MTD: "98",
          YTD: "3158",
        },
        {
          OPERATION: "TOTAL PERIPHERALS",
          A: "21",
          B: "0",
          C: "0",
          TOTAL: "21",
          MTD: "318",
          YTD: "17714",
        },
        {
          OPERATION: "PERIPHERAL (Ex83/Ex94)",
          A: "21",
          B: "0",
          C: "0",
          TOTAL: "21",
          MTD: "318",
          YTD: "13367",
        },
        {
          OPERATION: "PERIPHERAL(E474/E366)",
          A: "0",
          B: "0",
          C: "0",
          TOTAL: "0",
          MTD: "0",
          YTD: "4347",
        },
      ],
    },
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/rollout_data.php`)
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
                    <CCol lg="" className="p-1">
                      <CCard className="main-card-50">
                        <CCardBody className={"container"}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className={`card order-card                
                            `}
                              style={{
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                                transition: "0.3s",
                                borderRadius: 10,
                              }}
                            >
                              <div
                                className="card-block"
                                style={{
                                  height: "100px",
                                  backgroundColor: "#82E0AA",
                                  borderRadius: 10,
                                }}
                              >
                                <p
                                  className="text-center"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "black",
                                  }}
                                >
                                  {pageData.Rowset.Row[0].OPERATION}
                                </p>

                                <h2
                                  className="text-center"
                                  style={{ fontSize: "30px" }}
                                >
                                  25
                                </h2>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        SHIFT
                                      </th>
                                    </tr>
                                    <tr align="center">
                                      <th scope="col">A</th>
                                      <th scope="col">B</th>
                                      <th scope="col">C</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[0].A}</td>
                                      <td>{pageData.Rowset.Row[0].B}</td>
                                      <td>{pageData.Rowset.Row[0].C}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">TOTAL</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[0].TOTAL}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        MTD
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[0].MTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">YTD</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[0].YTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol lg="" className="p-1">
                      <CCard className="main-card-50">
                        <CCardBody>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className={`card order-card                
                            `}
                              style={{
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                                transition: "0.3s",
                                borderRadius: 10,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div
                                  className="card-block"
                                  style={{
                                    height: "100px",
                                    backgroundColor: "#82E0AA",
                                    borderRadius: 10,
                                  }}
                                >
                                  <p
                                    className="text-center"
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      color: "black",

                                      wordWrap: "break-word",
                                    }}
                                  >
                                    {pageData.Rowset.Row[1].OPERATION}
                                  </p>

                                  <h2
                                    className="text-center"
                                    style={{
                                      fontSize: "30px",
                                      marginTop: 0,
                                    }}
                                  >
                                    25
                                  </h2>
                                </div>
                                <div>
                                  <table className="table table-striped table-bordered table-sm blue-table">
                                    <thead>
                                      <tr align="center">
                                        <th scope="col" colspan="3">
                                          SHIFT
                                        </th>
                                      </tr>
                                      <tr align="center">
                                        <th scope="col">A</th>
                                        <th scope="col">B</th>
                                        <th scope="col">C</th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      style={{
                                        fontWeight: "normal",
                                        textAlign: "center",
                                      }}
                                    >
                                      <tr
                                        //key={index.toString()}
                                        style={{
                                          fontFamily: "Montserrat",
                                        }}
                                      >
                                        <td>{pageData.Rowset.Row[1].A}</td>
                                        <td>{pageData.Rowset.Row[1].B}</td>
                                        <td>{pageData.Rowset.Row[1].C}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div>
                                  <table className="table table-striped table-bordered table-sm blue-table">
                                    <thead>
                                      <tr align="center">
                                        <th scope="col">TOTAL</th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      style={{
                                        fontWeight: "normal",
                                        textAlign: "center",
                                      }}
                                    >
                                      <tr
                                        //key={index.toString()}
                                        style={{
                                          fontFamily: "Montserrat",
                                        }}
                                      >
                                        <td>{pageData.Rowset.Row[1].TOTAL}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div>
                                  <table className="table table-striped table-bordered table-sm blue-table">
                                    <thead>
                                      <tr align="center">
                                        <th scope="col" colspan="3">
                                          MTD
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      style={{
                                        fontWeight: "normal",
                                        textAlign: "center",
                                      }}
                                    >
                                      <tr
                                        //key={index.toString()}
                                        style={{
                                          fontFamily: "Montserrat",
                                        }}
                                      >
                                        <td>{pageData.Rowset.Row[1].MTD}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div>
                                  <table className="table table-striped table-bordered table-sm blue-table">
                                    <thead>
                                      <tr align="center">
                                        <th scope="col">YTD</th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      style={{
                                        fontWeight: "normal",
                                        textAlign: "center",
                                      }}
                                    >
                                      <tr
                                        //key={index.toString()}
                                        style={{
                                          fontFamily: "Montserrat",
                                        }}
                                      >
                                        <td>{pageData.Rowset.Row[1].YTD}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol lg="" className="p-1">
                      <CCard className="main-card-50">
                        <CCardBody>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className={`card order-card                
                            `}
                              style={{
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                                transition: "0.3s",
                                borderRadius: 10,
                              }}
                            >
                              <div
                                className="card-block"
                                style={{
                                  height: "100px",
                                  backgroundColor: "#82E0AA",
                                  borderRadius: 10,
                                }}
                              >
                                <p
                                  className="text-center"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "black",
                                  }}
                                >
                                  {pageData.Rowset.Row[2].OPERATION}
                                </p>

                                <h2
                                  className="text-center"
                                  style={{ fontSize: "30px" }}
                                >
                                  100
                                </h2>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        SHIFT
                                      </th>
                                    </tr>
                                    <tr align="center">
                                      <th scope="col">A</th>
                                      <th scope="col">B</th>
                                      <th scope="col">C</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[2].A}</td>
                                      <td>{pageData.Rowset.Row[2].B}</td>
                                      <td>{pageData.Rowset.Row[2].C}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">TOTAL</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[2].TOTAL}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        MTD
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[2].MTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">YTD</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[2].YTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol lg="" className="p-1">
                      <CCard className="main-card-50">
                        <CCardBody className={"container"}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className={`card order-card                
                            `}
                              style={{
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                                transition: "0.3s",
                                borderRadius: 10,
                              }}
                            >
                              <div
                                className="card-block"
                                style={{
                                  height: "100px",
                                  backgroundColor: "#82E0AA",
                                  borderRadius: 10,
                                }}
                              >
                                <p
                                  className="text-center"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "black",
                                    marginBottom: 0,
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {pageData.Rowset.Row[4].OPERATION}
                                </p>

                                <h2
                                  className="text-center"
                                  style={{ fontSize: "30px" }}
                                >
                                  25
                                </h2>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        SHIFT
                                      </th>
                                    </tr>
                                    <tr align="center">
                                      <th scope="col">A</th>
                                      <th scope="col">B</th>
                                      <th scope="col">C</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[4].A}</td>
                                      <td>{pageData.Rowset.Row[4].B}</td>
                                      <td>{pageData.Rowset.Row[4].C}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">TOTAL</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[4].TOTAL}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        MTD
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[4].MTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">YTD</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[4].YTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol lg="" className="p-1">
                      <CCard className="main-card-50">
                        <CCardBody>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className={`card order-card                
                            `}
                              style={{
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                                transition: "0.3s",
                                borderRadius: 10,
                              }}
                            >
                              <div
                                className="card-block"
                                style={{
                                  height: "100px",
                                  backgroundColor: "#82E0AA",
                                  borderRadius: 10,
                                }}
                              >
                                <p
                                  className="text-center"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "black",
                                    marginBottom: 0,
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {pageData.Rowset.Row[5].OPERATION}
                                </p>
                                <h2
                                  className="text-center"
                                  style={{ fontSize: "30px" }}
                                >
                                  25
                                </h2>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        SHIFT
                                      </th>
                                    </tr>
                                    <tr align="center">
                                      <th scope="col">A</th>
                                      <th scope="col">B</th>
                                      <th scope="col">C</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[5].A}</td>
                                      <td>{pageData.Rowset.Row[5].B}</td>
                                      <td>{pageData.Rowset.Row[5].C}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">TOTAL</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[5].TOTAL}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        MTD
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[5].MTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">YTD</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[5].YTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol lg="" className="p-1">
                      <CCard className="main-card-50">
                        <CCardBody>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className={`card order-card                
                            `}
                              style={{
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                                transition: "0.3s",
                                borderRadius: 10,
                              }}
                            >
                              <div
                                className="card-block"
                                style={{
                                  height: "100px",
                                  backgroundColor: "#82E0AA",
                                  borderRadius: 10,
                                }}
                              >
                                <p
                                  className="text-center"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "black",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {pageData.Rowset.Row[6].OPERATION}
                                </p>

                                <h2
                                  className="text-center"
                                  style={{ fontSize: "30px" }}
                                >
                                  25
                                </h2>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        SHIFT
                                      </th>
                                    </tr>
                                    <tr align="center">
                                      <th scope="col">A</th>
                                      <th scope="col">B</th>
                                      <th scope="col">C</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[6].A}</td>
                                      <td>{pageData.Rowset.Row[6].B}</td>
                                      <td>{pageData.Rowset.Row[6].C}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">TOTAL</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[6].TOTAL}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        MTD
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[6].MTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">YTD</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[6].YTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol lg="" className="p-1">
                      <CCard className="main-card-50">
                        <CCardBody>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className={`card order-card                
                            `}
                              style={{
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                                transition: "0.3s",
                                borderRadius: 10,
                              }}
                            >
                              <div
                                className="card-block"
                                style={{
                                  height: "100px",
                                  backgroundColor: "#82E0AA",
                                  borderRadius: 10,
                                }}
                              >
                                <p
                                  className="text-center"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "black",
                                    marginBottom: 0,
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {pageData.Rowset.Row[7].OPERATION}
                                </p>

                                <h2
                                  className="text-center"
                                  style={{ fontSize: "30px" }}
                                >
                                  25
                                </h2>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        SHIFT
                                      </th>
                                    </tr>
                                    <tr align="center">
                                      <th scope="col">A</th>
                                      <th scope="col">B</th>
                                      <th scope="col">C</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[7].A}</td>
                                      <td>{pageData.Rowset.Row[7].B}</td>
                                      <td>{pageData.Rowset.Row[7].C}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">TOTAL</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[7].TOTAL}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        MTD
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[7].MTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">YTD</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[7].YTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol lg="" className="p-1">
                      <CCard className="main-card-50">
                        <CCardBody>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className={`card order-card                
                            `}
                              style={{
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                                transition: "0.3s",
                                borderRadius: 10,
                              }}
                            >
                              <div
                                className="card-block"
                                style={{
                                  height: "100px",
                                  backgroundColor: "#82E0AA",
                                  borderRadius: 10,
                                }}
                              >
                                <p
                                  className="text-center"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "black",
                                    marginBottom: 0,
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {pageData.Rowset.Row[8].OPERATION}
                                </p>

                                <h2
                                  className="text-center"
                                  style={{ fontSize: "30px" }}
                                >
                                  25
                                </h2>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        SHIFT
                                      </th>
                                    </tr>
                                    <tr align="center">
                                      <th scope="col">A</th>
                                      <th scope="col">B</th>
                                      <th scope="col">C</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[8].A}</td>
                                      <td>{pageData.Rowset.Row[8].B}</td>
                                      <td>{pageData.Rowset.Row[8].C}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">TOTAL</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[8].TOTAL}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        MTD
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[8].MTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">YTD</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[8].YTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol lg="" className="p-1">
                      <CCard className="main-card-50">
                        <CCardBody>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className={`card order-card                
                            `}
                              style={{
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                                transition: "0.3s",
                                borderRadius: 10,
                              }}
                            >
                              <div
                                className="card-block"
                                style={{
                                  height: "100px",
                                  backgroundColor: "#82E0AA",
                                  borderRadius: 10,
                                }}
                              >
                                <p
                                  className="text-center"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "black",
                                    wordWrap: "break-word",
                                    marginBottom: 0,
                                  }}
                                >
                                  {pageData.Rowset.Row[9].OPERATION}
                                </p>

                                <h2
                                  className="text-center"
                                  style={{ fontSize: "30px" }}
                                >
                                  25
                                </h2>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        SHIFT
                                      </th>
                                    </tr>
                                    <tr align="center">
                                      <th scope="col">A</th>
                                      <th scope="col">B</th>
                                      <th scope="col">C</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[9].A}</td>
                                      <td>{pageData.Rowset.Row[9].B}</td>
                                      <td>{pageData.Rowset.Row[9].C}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">TOTAL</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[9].TOTAL}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col" colspan="3">
                                        MTD
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[9].MTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <table className="table table-striped table-bordered table-sm blue-table">
                                  <thead>
                                    <tr align="center">
                                      <th scope="col">YTD</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{
                                      fontWeight: "normal",
                                      textAlign: "center",
                                    }}
                                  >
                                    <tr
                                      //key={index.toString()}
                                      style={{
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      <td>{pageData.Rowset.Row[9].YTD}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
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

export default RolloutDashboard;
