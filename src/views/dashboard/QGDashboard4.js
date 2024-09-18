import React, { useEffect, useState } from "react";
import {
    CCard,
    CCol,
    CRow,
    CCardBody,
    CCardHeader,
    CDataTable,
    CButton,
    CCollapse,
} from "@coreui/react";

import { CChartLine } from "@coreui/react-chartjs";
import axios from "axios";
import { API_URL, CreateArray } from "../../config";
import * as QueryString from "query-string";
import LoadingPage from "./LoadingPage";
import Modal from "./Modal";

const QGDashboard4 = (props) => {
    const [isLoading, setLoading] = useState(true);

    const parsed = QueryString.parse(props.location.search);
    const [Logged_Station, setLogged_Station] = useState(parsed.Logged_Station ? parsed.Logged_Station : "HD_QG");
    const [line, setLine] = useState(parsed.Line ? parsed.Line : "HD");
    const [zone, setZone] = useState(parsed.Zone ? parsed.Zone : "Zone-1");
    const [chassi, setChassi] = useState("");
    const [stn, setStn] = useState("HD_QG2")
    const [cmnt, setComment] = useState("");
    const [demerit, setDemerit] = useState("");
    const [desc, setDesc] = useState("");
    const [defectCode, setDefectCode] = useState("");
    const [open, setOpen] = useState(false);

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
                    ISSUE_DATE: "05-05-2021",
                    ACKNOWLEDGED_BY: "",
                    ACKNOWLEDGMENT_DATE: "",
                },
                {
                    LOGGED_STATION: "LMD EOLT-1",
                    CHASSIS_NUMBER: "MC2FFERT0MC490316",
                    DEFECT_DESC: "Parking brake effectiveness",
                    DEMERIT: "100",
                    ISSUE_DATE: "05-05-2021",
                    ACKNOWLEDGED_BY: "",
                    ACKNOWLEDGMENT_DATE: "",
                },
                {
                    LOGGED_STATION: "LMD TRUCK CAM",
                    CHASSIS_NUMBER: "MC2F9HRC0MC190662",
                    DEFECT_DESC: "Out of square not ok",
                    DEMERIT: "25",
                    ISSUE_DATE: "05-05-2021",
                    ACKNOWLEDGED_BY: "",
                    ACKNOWLEDGMENT_DATE: "",
                },
                {
                    LOGGED_STATION: "HD EOLT",
                    CHASSIS_NUMBER: "MC2K8ERC0MC070662",
                    DEFECT_DESC: "GSL Setting",
                    DEMERIT: "25",
                    ISSUE_DATE: "05-05-2021",
                    ACKNOWLEDGED_BY: "",
                    ACKNOWLEDGMENT_DATE: "",
                },
                {
                    LOGGED_STATION: [],
                    CHASSIS_NUMBER: "MC2CASRF0MC070647",
                    DEFECT_DESC: "Front Brake Effectiveness",
                    DEMERIT: "25",
                    ISSUE_DATE: "05-05-2021",
                    ACKNOWLEDGED_BY: "",
                    ACKNOWLEDGMENT_DATE: "",
                },
            ],
        },
    });

    useEffect(() => {
        axios
            .get(`${API_URL}/QGDashboard4.php${props.location.search}`)
            .then(function (response) {
                setPageData(response.data);

                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (!open) {
            axios
                .get(`${API_URL}/QGDashboard4.php${props.location.search}`)
                .then(function (response) {
                    setPageData(response.data);
                    setLoading(false);



                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [open]);

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
                        <td></td>
                        <td></td>
                        <td></td>

                    </tr>
                );
            }
            return elm;
        }
    };

    const getGateNo = (zoneNew) => {
        let gate = "1";

        if (line == "LMD" && zone == "Zone-6") {
            gate = "5";
        } else {
            if (zoneNew == "Zone-1") {
                gate = "1"
            } else if (zoneNew == "Zone-2") {
                gate = "2"
            } else if (zoneNew == "Zone-3") {
                gate = "3"
            } else if (zoneNew == "Zone-4") {
                gate = "4"
            } else if (zoneNew == "Zone-5") {
                gate = "5"
            } else if (zoneNew == "Zone-6") {
                gate = "6"
            }

        }


        return gate;
    };

    const getCardClass = (demerit, supname) => {
        let cls = "bg-c-blue";

        if (supname != "---") {
            cls = "bg-c-green";
        } else if (demerit == 25) {

            cls = "bg-c-orange";

        } else if (demerit == 5) {
            cls = "bg-c-blue";
        } else if (demerit == 100) {
            cls = "bg-c-red";
        }
        return cls;
    };
    const getLineName = (line) => {
        let lineName = "LMD";

        if (line == "LMD") {
            lineName = "LMD-CH";


        } else if (line == "HD") {
            lineName = "HD-CH"
        } else {
            lineName = line;
        }
        return lineName;
    };
    const getColumnName = (name) => {
        let lineName = "Chassis Number";

        if (name == "LD-CT" || name == "HD-CT") {
            lineName = "Serial Number";


        }
        return lineName;

    };



    let alertData = CreateArray(pageData.ALERTDEFECTDETAILS.ALERT);
    let tblData = CreateArray(pageData.TABLEDEFECTDETAILS.TABLEDATA);
    let count = pageData.COUNT;



    const setModalData = (item) => {
        setChassi(item.CHASSIS_NUMBER);
        setDefectCode(item.DEFECT_CODE);
        setDesc(item.DEFECT_DESCRIPTION);
        setOpen(true);
        setComment(item.SUP_COMMENT);
        setStn(item.SOURCE_STATION);

    };

    return (
        <>
            {isLoading ? (
                <div>
                    <LoadingPage />
                </div>
            ) : (
                <CRow className="main-dashboard-wrap main-dashboard4-wrap">
                    <CCol lg="12" className="main-head">
                        <h5>
                            QUALITY GATE - {getGateNo(zone)}
                        </h5>
                        <h5>Demerit Alert & Feedback</h5>
                        <h5 style={{ marginRight: "10%" }}>
                            {getLineName(line)} - {zone}
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
                        <marquee style={{ fontSize: "30px" }}>Last 24 Hrs:<span style={{ color: "transparent" }}>sp</span> 100 Demerit - <span >{count.COUNTDATA.COUNT100}</span ><span style={{ color: "transparent" }}>spc</span>25 Demerit - <span >{count.COUNTDATA.COUNT25}</span></marquee>
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
                                                    className={`col-md-4 col-xl-3 ${index === 0 ? "blink_me" : ""
                                                        }`}
                                                >
                                                    <div
                                                        className={`card order-card ${getCardClass(
                                                            item.DEMERIT, item.SUP_NAME
                                                        )}`}
                                                        style={{
                                                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                                                            transition: "0.3s",
                                                            borderRadius: 10,
                                                        }}
                                                    >
                                                        <div
                                                            className="card-block"
                                                            style={{ height: "240px" }}
                                                        >
                                                            <p
                                                                className="m-b-0"
                                                                style={{
                                                                    fontSize: "15px",
                                                                    fontWeight: "bold",
                                                                    //  textShadow: "2px 2px #000000",
                                                                }}
                                                            >
                                                                {item.SOURCE_STATION}
                                                                <span style={{ marginLeft: "30%" }}>
                                                                    {item.SHIFT}
                                                                </span>
                                                                <span className="f-right">
                                                                    {item.AUDIT_DATE}
                                                                </span>
                                                            </p>

                                                            <h2
                                                                className="text-center"
                                                                style={{ fontSize: "40px", fontWeight: "bold" }}
                                                            >
                                                                <i className="fa fa-refresh f-left"></i>
                                                                <span>{item.DEMERIT}</span>{" "}
                                                                <p style={{ display: "none" }}>
                                                                    {item.DEFECT_CODE}
                                                                </p>
                                                            </h2>
                                                            <p
                                                                className="m-b-0 desc-two"
                                                                style={{ fontSize: "20px", fontWeight: "bold" }}
                                                            >
                                                                {item.DEFECT_DESCRIPTION}
                                                            </p>
                                                            <p
                                                                className="m-b-0"
                                                                style={{
                                                                    fontSize: "14px",
                                                                    fontWeight: "bold",
                                                                    //   textShadow: "2px 2px #000000",
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
                            ack={cmnt}
                            stn={stn}


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
                                                                <th scope="col">{getColumnName(line)}</th>
                                                                <th scope="col">Model</th>
                                                                <th scope="col">Defect Description</th>
                                                                <th scope="col">Head</th>
                                                                <th scope="col">Category</th>
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
                                                                        <td>{item.HEAD}</td>
                                                                        <td>{item.CATEGORY}</td>
                                                                        <td style={{ textAlign: "center" }}>{item.DEMERIT}</td>
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

export default QGDashboard4;
