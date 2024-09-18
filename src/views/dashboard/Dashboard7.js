import React, { useEffect, useState } from "react";
import {
  CCard,
  CCol,
  CRow,
  CCardBody,
  CCardHeader,
  CDataTable,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import axios from "axios";
import { API_URL } from "../../config";
import * as QueryString from "query-string";
import LoadingPage from "./LoadingPage";
import Modal from "./Modal";

const Dashboard7 = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [chassi, setChassi] = useState("");
  const [desc, setDesc] = useState("");
  const [defectCode, setDefectCode] = useState("");
  const parsed = QueryString.parse(props.location.search);
  const [line, setLine] = useState(parsed.Line ? parsed.Line : "LMD");
  const [zone, setZone] = useState(parsed.Zone ? parsed.Zone : "Zone-1");

  console.log(parsed);
  const [pageData, setPageData] = useState({
    ALERTDEFECTDETAILS: {
      ALERT: [
        {
          CHASSIS_NUMBER: "MC2BBMRC0MC070433",
          MODEL: "Pro 6028",
          AUDIT_DATE: "23-03-2021",
          DEMERIT: "25",
          DEFECT_DESC: "ABS not working",
        },
        {
          CHASSIS_NUMBER: "MC2CASRF0MB069696",
          MODEL: "Pro 3019",
          AUDIT_DATE: "06-03-2021",
          DEMERIT: "100",
          DEFECT_DESC:
            "Dat coolant return hose clamp out of neck on engine top side",
        },
      ],
    },
    TABLEDEFECTDETAILS: {
      TABLEDATA: [
        {
          LOGGED_STATION: "PRODUCT AUDIT GROUP",
          CHASSIS_NUMBER: "MC2CASRC0MB069781",
          DEFECT_DESC: "Rh vent glass unable to lock",
          DEMERIT: "100",
          ISSUE_DATE: "11-05-2021",
        },
        {
          LOGGED_STATION: "LMD EOLT-1",
          CHASSIS_NUMBER: "MC2FFERT0MC490316",
          DEFECT_DESC: "Parking brake effectiveness",
          DEMERIT: "100",
          ISSUE_DATE: "11-05-2021",
        },
        {
          LOGGED_STATION: "LMD TRUCK CAM",
          CHASSIS_NUMBER: "MC2F9HRC0MC190662",
          DEFECT_DESC: "Out of square not ok",
          DEMERIT: "25",
          ISSUE_DATE: "11-05-2021",
        },
        {
          LOGGED_STATION: "HD EOLT",
          CHASSIS_NUMBER: "MC2K8ERC0MC070662",
          DEFECT_DESC: "GSL Setting",
          DEMERIT: "25",
          ISSUE_DATE: "11-05-2021",
        },
        {
          LOGGED_STATION: [],
          CHASSIS_NUMBER: "MC2CASRF0MC070647",
          DEFECT_DESC: "Front Brake Effectiveness",
          DEMERIT: "25",
          ISSUE_DATE: "11-05-2021",
        },
      ],
    },
  });

  useEffect(() => {
    if (!open) {
      axios
        .get(`${API_URL}/dashboard7_data.php${props.location.search}`)
        .then(function (response) {
          //console.log(JSON.stringify(response.data))
          setPageData(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [open]);

  useEffect(() => {
    axios
      .get(`${API_URL}/dashboard7_data.php${props.location.search}`)
      .then(function (response) {
        //console.log(JSON.stringify(response.data))
        setPageData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
            <td></td>
            <td></td>
            <td></td>
          </tr>
        );
      }
      return elm;
    }
  };

  const getCardClass = (demerit) => {
    let cls = "bg-c-blue";
    if (demerit == 25 || demerit == 5) {
      cls = "bg-c-blue";
    } else {
      cls = "bg-c-gray";
    }
    return cls;
  };
  let alertData = pageData.ALERTDEFECTDETAILS.ALERT;
  alertData = Array.isArray(alertData)
    ? alertData
    : alertData
    ? [alertData]
    : [];

  let tblData = pageData.TABLEDEFECTDETAILS.TABLEDATA;
  tblData = Array.isArray(tblData) ? tblData : tblData ? [tblData] : [];

  const setModalData = (item) => {
    setChassi(item.CHASSIS_NUMBER);
    setDefectCode(item.DEFECT_CODE);
    setDesc(item.DEFECT_DESCRIPTION);
    setOpen(true);
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <CRow className="main-dashboard-wrap main-dashboard4-wrap">
          <CCol lg="12" className="text-center main-head">
            <h5>
              Post Rollout Demerit Alert & Feedback - {zone} - {line}
            </h5>
          </CCol>
          <CCol lg="12">
            <CRow className="main-row main-row-1">
              <CCol md="12">
                <div className="inner-box inner-box-dash2">
                  <CRow>
                    {alertData.map((item, index) => {
                      return (
                        <div
                          onClick={() => {
                            setModalData(item);
                          }}
                          key={index.toString()}
                          className={`col-md-4 col-xl-3 ${
                            index === 0 ? "blink_me" : ""
                          }`}
                        >
                          <div
                            className={`card order-card ${getCardClass(
                              item.DEMERIT
                            )}`}
                            style={{
                              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                              transition: "0.3s",
                              borderRadius: 10,
                            }}
                          >
                            <div className="card-block">
                              <p
                                className="m-b-0"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  textShadow: "2px 2px #000000",
                                }}
                              >
                                {item.SOURCE_STATION}
                                <span className="f-right">
                                  {item.AUDIT_DATE}
                                </span>
                              </p>

                              <h2
                                className="text-center"
                                style={{ fontSize: "30px" }}
                              >
                                <i className="fa fa-refresh f-left"></i>
                                <span>{item.DEMERIT}</span>
                              </h2>
                              <p
                                className="m-b-0 desc-two"
                                style={{ fontSize: "20px" }}
                              >
                                {item.DEFECT_DESCRIPTION}
                              </p>
                              <p
                                className="m-b-0"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  textShadow: "2px 2px #000000",
                                }}
                              >
                                {item.CHASSIS_NUMBER}
                                <span className="f-right">{item.MODEL}</span>
                              </p>
                              {/*<p className="m-b-0" style={{ fontSize: "14px" }}>
                              <span className="f-right">
                                Audit Date: {item.AUDIT_DATE}
                              </span>
                            </p>*/}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CRow>
                </div>
              </CCol>
            </CRow>
            <Modal
              open={open}
              setOpen={setOpen}
              chassis={chassi}
              desc={desc}
              defectCode={defectCode}
            />

            <CRow className="main-row main-row-2">
              <CCol md="12">
                <div className="inner-box inner-box-dash2">
                  <CRow className="align-items-center">
                    <CCol lg="12">
                      <CCard className="main-card-6">
                        <CCardBody className={"scroll-table"}>
                          <table className="table table-hover table-striped table-bordered table-sm blue-table2">
                            <thead>
                              <tr>
                                <th scope="col">Logged Station</th>
                                <th scope="col">Chassis Number</th>
                                <th scope="col">Model</th>
                                <th scope="col">Defect Description</th>
                                <th scope="col">Demerit</th>
                                <th scope="col">Issue Date</th>
                                <th scope="col">Ack By</th>
                                <th scope="col">Ack Date</th>
                              </tr>
                            </thead>
                            <tbody
                              style={{
                                fontWeight: "normal",
                              }}
                            >
                              {tblData.map((item, index) => {
                                return (
                                  <tr key={index.toString()}>
                                    <td>{item.LOGGED_STATION}</td>
                                    <td>{item.CHASSIS_NUMBER}</td>
                                    <td>{item.MODEL}</td>
                                    <td>{item.DEFECT_DESCRIPTION}</td>
                                    <td>{item.DEMERIT}</td>
                                    <td>{item.ISSUE_DATE}</td>
                                    <td>{item.SUP_NAME}</td>
                                    <td>{item.ACK_DATE}</td>
                                  </tr>
                                );
                              })}

                              {generateEmptyRows(tblData)}
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

export default Dashboard7;
