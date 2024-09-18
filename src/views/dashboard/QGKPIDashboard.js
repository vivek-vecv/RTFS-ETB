import React, { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import axios from "axios";
import * as QueryString from "query-string";
import { API_URL, CreateArray } from "../../config";
import LoadingPage from "./LoadingPage";

const QGKPIDashboard = (props) => {
    const parsed = QueryString.parse(props.location.search);
    const [Logged_Station, setLogged_Station] = useState(parsed.Logged_Station ? parsed.Logged_Station : "HD_QG");
    const [line, setLine] = useState(parsed.Line ? parsed.Line : "HD");
    const [zone, setZone] = useState(parsed.Zone ? parsed.Zone : "Zone-2");
    const [mainline, setMainLine] = useState(parsed.mainLine ? parsed.mainLine : "HD");
    let nullValue = 0;

    nullValue = nullValue.toString();
    const [auditData, setAuditData] = useState([

    ]);
    const [isLoading, setLoading] = useState(true);
    const [gaugeData, setGuage] = useState([]);
    const [demeritsOverAll, setDemeritsOverAll] = useState({ data: [], labels: [] });
    const [demeritsZoneProcess, setDemeritsZoneProcess] = useState({ data: [], labels: [] });

    const [demeritsZone, setDemeritsZone] = useState({ data: [], labels: [] });
    const [FTTableData, setFTTableData] = useState([
        {
            VEHICLETYPE: "OVERALL",
            CURRENTDAYFTT100: "0",
            CURRENTMONTHFTT100: "0",
            CURRENTDAYFTT25: "0",
            CURRENTMONTHFTT25: "0",
        },
        {
            VEHICLETYPE: "ZONE",
            CURRENTDAYFTT100: "0",
            CURRENTMONTHFTT100: "0",
            CURRENTDAYFTT25: "0",
            CURRENTMONTHFTT25: "0",
        },
        {
            VEHICLETYPE: "PROCESS",
            CURRENTDAYFTT100: "0",
            CURRENTMONTHFTT100: "0",
            CURRENTDAYFTT25: "0",
            CURRENTMONTHFTT25: "0",
        },
    ]);

    useEffect(() => {
        axios
            .get(`${API_URL}/QGKPIDashboard.php${props.location.search}`)
            .then(function (response) {
                if (response && response.data) {



                    const labels = [];

                    const OverAllData = [];
                    const ZoneData = [];
                    const ZoneProcessData = [];



                    const demeritsData = CreateArray(
                        response.data.QGDEMERITTREND.DEMERIT
                    );
                    setFTTableData(response.data.FTTDATA.FTTTABLE);

                    if (demeritsData.length > 0) {
                        demeritsData.forEach(function (item, index) {
                            labels.push(
                                item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
                            );
                            OverAllData.push(item.OVERALL);
                            ZoneData.push(item.ZONE);
                            ZoneProcessData.push(item.PROCESS);


                        });
                    }



                    setAuditData(response.data.VEHICLESAUDITED.COUNT);
                    setGuage(response.data.GAUGEDEMERITTREND.DEMERIT);

                    setDemeritsOverAll({ data: OverAllData, labels: labels });
                    setDemeritsZone({ data: ZoneData, labels: labels });
                    setDemeritsZoneProcess({ data: ZoneProcessData, labels: labels });





                    setLoading(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        // axios
        //     .get(`${API_URL}/QGKPIDashboard_table.php${props.location.search}`)
        //     .then(function (response) {
        //         if (response && response.data) {
        //             setFTTableData(response.data.FTTDATA.FTTTABLE);
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }, []);

    function drawLineLables() {
        // render the value of the chart above the bar
        var ctx = this.chart.ctx;
        //ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
        ctx.fillStyle = this.chart.config.options.defaultFontColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        this.data.datasets.forEach(function (dataset) {
            //ctx.fillStyle = dataset.borderColor;
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


    const getVehicleimage = (line) => {
        let img = "LMD";

        if (line == "LMD" || line == "LD-CT") {
            img = "avatars/LMD_Truck.jpg";


        } else if (line == "HD" || line == "HD-CT") {
            img = "avatars/HD_Truck.jpg";
        }
        return img;
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





    const HDFTTData = FTTableData.find((item) => item.VEHICLETYPE === "OVERALL");
    const LMDFTTData = FTTableData.find((item) => item.VEHICLETYPE === "ZONE");
    const UDFTTData = FTTableData.find((item) => item.VEHICLETYPE === "PROCESS");
    const getColor = (val, type) => {
        let color = "red-color";
        if (type === "OVERALL") {
            color = val == "100" ? "green-color" : "red-color";
        } else {
            color = val == "100" ? "green-color" : "red-color";
        }
        return color;
    };
    return (
        <>
            {isLoading ? (
                <div>
                    <LoadingPage />
                </div>
            ) : (
                <CRow className="main-dashboard-wrap">
                    <CCol lg="12" className="text-center main-head">
                        <h5>QUALITY GATE - {getGateNo(zone)}</h5>
                        <h5> Demerit Dashboard </h5>
                        <h5 style={{ marginRight: "10%" }}>{getLineName(line)} {zone} </h5>


                    </CCol>

                    <CCol lg="4">
                        <div className="inner-box">
                            <div className="row">
                                <div className="col-12 align-content-center">
                                    <h5 className="vehicleTitle">{mainline}</h5>
                                </div>
                            </div>

                            <div className="row align-items-center">
                                <div className="col-5 image-box">
                                    <img
                                        src={getVehicleimage(line)}
                                        className="image-responsive"
                                    />
                                </div>
                                <div className="col-7">
                                    <CRow className="inner-wrap-box">
                                        <div className="col-md-12 text-center top-audit-title">
                                            Number of Vehicles Inspected
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-control mid-font">Last 24 Hrs</div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="audits-value mid-font">
                                                {auditData[1].OVERALL}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-control mid-font">Month</div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="audits-value mid-font">
                                                {auditData[0].OVERALL}
                                            </div>
                                        </div>
                                    </CRow>
                                </div>
                            </div>
                            <hr className="hr-line" />
                            <div className="row">
                                <div className="col-md-12 gauge-gaurd-title text-center">
                                    <h3>Demerit Per Vehicle</h3>
                                </div>
                                {gaugeData.map((gauge, index) => {
                                    return (
                                        <div key={index.toString()} className="col-6">
                                            <CCard className="main-card-6">
                                                <CCardBody>
                                                    <div className="mb-2">
                                                        <span className="blue-badge calendar">
                                                            {gauge.TIME_RANGE == "CURRENTDATE"
                                                                ? "Today"
                                                                : gauge.TIME_RANGE}
                                                        </span>
                                                    </div>
                                                    <div className="text-center">
                                                        <ReactSpeedometer
                                                            textColor={"black"}
                                                            needleHeightRatio={0.6}
                                                            labelFontSize={"10px"}
                                                            valueTextFontSize={"20px"}
                                                            value={
                                                                parseInt(gauge.OVERALL) > 200
                                                                    ? 200
                                                                    : parseInt(gauge.OVERALL)
                                                            }
                                                            currentValueText={gauge.OVERALL}
                                                            customSegmentStops={[0, 20, 50, 100, 200]}
                                                            segmentColors={[
                                                                "#6ad72d",
                                                                "#aee228",
                                                                "gold",
                                                                "#ff471a",
                                                            ]}
                                                            ringWidth={15}
                                                            minValue={0}
                                                            maxValue={200}
                                                            width={140}
                                                            height={100}
                                                        />
                                                    </div>
                                                </CCardBody>
                                            </CCard>
                                        </div>
                                    );
                                })}
                            </div>
                            <hr className="hr-line" />
                            <div className="row">
                                <div className="col-md-12 gauge-gaurd-title  text-center">
                                    <h3>Demerit Trend - {mainline}</h3>
                                </div>
                                {/* <div className="col-md-12 vehicle-trend-title text-center"><h3>Demerit per Vehicle Trend</h3></div> */}
                                <div className="col-12">
                                    <CCard className="main-card-12">
                                        <CCardBody>
                                            <CChartLine
                                                datasets={[
                                                    {
                                                        label: `${mainline} Demerits`,
                                                        borderColor: "#0d86ff",
                                                        data: demeritsOverAll.data,
                                                        fill: false,
                                                    },
                                                ]}
                                                options={{
                                                    defaultFontColor: "#000",
                                                    title: {
                                                        display: true,
                                                        text: "",
                                                        fontSize: 12,
                                                        padding: 5,
                                                        fontColor: "#000",
                                                    },
                                                    legend: {
                                                        display: false,
                                                        position: "bottom",
                                                    },
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
                                                                },
                                                            },
                                                        ],
                                                    },
                                                    animation: {
                                                        onProgress: drawLineLables,
                                                        onComplete: drawLineLables,
                                                    },
                                                    hover: { animationDuration: 0 },
                                                }}
                                                labels={demeritsOverAll.labels}
                                            />
                                        </CCardBody>
                                    </CCard>
                                </div>
                            </div>
                            <hr className="hr-line" />
                            <div className="row">
                                <div className="col-4">
                                    <div className="label-control mid-font">% of Veh.</div>
                                </div>
                                <div className="col-4">
                                    <div className="label-control mid-font">Last 24 Hrs</div>
                                </div>
                                <div className="col-4">
                                    <div className="label-control mid-font">Month</div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <div className="label-control mid-font">FTT100</div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            HDFTTData.CURRENTDAYFTT100,
                                            "OVERALL"
                                        )}`}
                                    >
                                        {HDFTTData.CURRENTDAYFTT100}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            HDFTTData.CURRENTMONTHFTT100,
                                            "OVERALL"
                                        )}`}
                                    >
                                        {HDFTTData.CURRENTMONTHFTT100}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <div className="label-control mid-font">FTT25</div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            HDFTTData.CURRENTDAYFTT25,
                                            "OVERALL"
                                        )}`}
                                    >
                                        {HDFTTData.CURRENTDAYFTT25}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            HDFTTData.CURRENTMONTHFTT25,
                                            "OVERALL"
                                        )}`}
                                    >
                                        {HDFTTData.CURRENTMONTHFTT25}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CCol>

                    <CCol lg="4">
                        <div className="inner-box">
                            <div className="row">
                                <div className="col-12 align-content-center">
                                    <h5 className="vehicleTitle">Demerit Overall </h5>
                                </div>
                            </div>
                            {/* New code */}
                            <div className="row ">
                                <div className="col-3 image-box ml-3 " style={{ padding: "1%" }} >
                                    {/* <img
                                        src="avatars/LMD_Truck.jpg"
                                        className="image-responsive"
                                    /> */}
                                    <div className="image-responsive text-center mt-2  " style={{ paddingTop: "15%", paddingBottom: "15%" }} ><h3 >{zone}</h3></div>

                                </div>
                                <div className="col-7 ml-5">
                                    <CRow className="inner-wrap-box">
                                        <div className="col-md-12 text-center top-audit-title">
                                            Number of Vehicle Inspected
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-control mid-font">Last 24 Hrs</div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="audits-value mid-font">
                                                {auditData[1].ZONE}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-control mid-font">Month</div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="audits-value mid-font">
                                                {auditData[0].ZONE}
                                            </div>
                                        </div>
                                    </CRow>
                                </div>
                            </div>
                            {/* New code ends */}
                            <hr className="hr-line" />
                            <div className="row">
                                <div className="col-md-12 gauge-gaurd-title text-center text-center">
                                    <h3>Demerit Per Vehicle</h3>
                                </div>
                                {gaugeData.map((gauge, index) => {
                                    return (
                                        <div key={index.toString()} className="col-6">
                                            <CCard className="main-card-6">
                                                <CCardBody>
                                                    <div className="mb-2">
                                                        <span className="blue-badge calendar">
                                                            {gauge.TIME_RANGE == "CURRENTDATE"
                                                                ? "Today"
                                                                : gauge.TIME_RANGE}
                                                        </span>
                                                    </div>
                                                    <div className="text-center">
                                                        <ReactSpeedometer
                                                            textColor={"black"}
                                                            needleHeightRatio={0.6}
                                                            labelFontSize={"10px"}
                                                            valueTextFontSize={"20px"}
                                                            value={
                                                                parseInt(gauge.ZONE) > 200
                                                                    ? 200
                                                                    : parseInt(gauge.ZONE)
                                                            }
                                                            currentValueText={gauge.ZONE}
                                                            customSegmentStops={[0, 20, 50, 100, 200]}
                                                            segmentColors={[
                                                                "#6ad72d",
                                                                "#aee228",
                                                                "gold",
                                                                "#ff471a",
                                                            ]}
                                                            ringWidth={15}
                                                            minValue={0}
                                                            maxValue={200}
                                                            width={140}
                                                            height={100}
                                                        />
                                                    </div>
                                                </CCardBody>
                                            </CCard>
                                        </div>
                                    );
                                })}
                            </div>
                            <hr className="hr-line" />
                            <div className="row">
                                <div className="col-md-12 gauge-gaurd-title text-center">
                                    <h3>Demerit Trend - {zone}</h3>
                                </div>
                                {/* <div className="col-md-12 vehicle-trend-title text-center"><h3>Demerit per Vehicle Trend</h3></div> */}
                                <div className="col-12">
                                    <CCard className="main-card-12">
                                        <CCardBody>
                                            <CChartLine
                                                datasets={[
                                                    {
                                                        label: `${line} Demerits`,
                                                        borderColor: "#0d86ff",
                                                        data: demeritsZone.data,
                                                        fill: false,
                                                    },
                                                ]}
                                                options={{
                                                    defaultFontColor: "#000",
                                                    title: {
                                                        display: true,
                                                        text: "",
                                                        fontSize: 12,
                                                        padding: 5,
                                                        fontColor: "#000",
                                                    },
                                                    legend: {
                                                        display: false,
                                                        position: "bottom",
                                                    },
                                                    scales: {
                                                        yAxes: [
                                                            {
                                                                ticks: {
                                                                    suggestedMin: 0,
                                                                    maxTicksLimit: 7,
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
                                                                },
                                                            },
                                                        ],
                                                    },
                                                    tooltips: {
                                                        enabled: true,
                                                    },
                                                    animation: {
                                                        onProgress: drawLineLables,
                                                        onComplete: drawLineLables,
                                                    },
                                                    hover: { animationDuration: 0 },
                                                }}
                                                labels={demeritsZone.labels}
                                            />
                                        </CCardBody>
                                    </CCard>
                                </div>
                            </div>
                            <hr className="hr-line" />
                            <div className="row">
                                <div className="col-4">
                                    <div className="label-control mid-font">% of Veh.</div>
                                </div>
                                <div className="col-4">
                                    <div className="label-control mid-font">Last 24 Hrs</div>
                                </div>
                                <div className="col-4">
                                    <div className="label-control mid-font">Month</div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <div className="label-control mid-font">FTT100</div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            LMDFTTData.CURRENTDAYFTT100,
                                            "ZONE"
                                        )}`}
                                    >
                                        {LMDFTTData.CURRENTDAYFTT100}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            LMDFTTData.CURRENTMONTHFTT100,
                                            "ZONE"
                                        )}`}
                                    >
                                        {LMDFTTData.CURRENTMONTHFTT100}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <div className="label-control mid-font">FTT25</div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            LMDFTTData.CURRENTDAYFTT25
                                        )}`}
                                    >
                                        {LMDFTTData.CURRENTDAYFTT25}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            LMDFTTData.CURRENTMONTHFTT25
                                        )}`}
                                    >
                                        {LMDFTTData.CURRENTMONTHFTT25}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CCol>

                    <CCol lg="4">
                        <div className="inner-box">
                            <div className="row">
                                <div className="col-12 align-content-center">
                                    <h5 className="vehicleTitle">Demerit - Process</h5>
                                </div>
                            </div>

                            {/* New code */}
                            <div className="row align-items-center">
                                <div className="col-3 image-box ml-3 " style={{ padding: "1%" }} >
                                    {/* <img
                                        src="avatars/LMD_Truck.jpg"
                                        className="image-responsive"
                                    /> */}
                                    <div className="image-responsive text-center mt-2  " style={{ paddingTop: "15%", paddingBottom: "15%" }} ><h3 >{zone}</h3></div>

                                </div>
                                <div className="col-7 ml-5">
                                    <CRow className="inner-wrap-box">
                                        <div className="col-md-12 text-center top-audit-title">
                                            Number of Vehicle Inspected
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-control mid-font">Last 24 Hrs</div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="audits-value mid-font">
                                                {auditData[1].ZONEPROCESS ? auditData[1].ZONEPROCESS : 0}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-control mid-font">Month</div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="audits-value mid-font">
                                                {auditData[0].ZONEPROCESS ? auditData[0].ZONEPROCESS : 0}
                                            </div>
                                        </div>
                                    </CRow>
                                </div>
                            </div>
                            {/* New code ends */}
                            <hr className="hr-line" />
                            <div className="row">
                                <div className="col-md-12 gauge-gaurd-title text-center">
                                    <h3>Demerit Per Vehicle</h3>
                                </div>
                                {gaugeData.map((gauge, index) => {
                                    return (
                                        <div key={index.toString()} className="col-6">
                                            <CCard className="main-card-6">
                                                <CCardBody>
                                                    <div className="mb-2">
                                                        <span className="blue-badge calendar">
                                                            {gauge.TIME_RANGE == "CURRENTDATE"
                                                                ? "Today"
                                                                : gauge.TIME_RANGE}
                                                        </span>
                                                    </div>
                                                    <div className="text-center">
                                                        <ReactSpeedometer
                                                            textColor={"black"}
                                                            paddingVertical={0}
                                                            needleHeightRatio={0.6}
                                                            labelFontSize={"10px"}
                                                            valueTextFontSize={"20px"}
                                                            value={
                                                                parseInt(gauge.ZONEPROCESS) > 200
                                                                    ? 200
                                                                    : parseInt(gauge.ZONEPROCESS)
                                                            }
                                                            currentValueText={gauge.ZONEPROCESS}
                                                            customSegmentStops={[0, 20, 50, 100, 200]}
                                                            segmentColors={[
                                                                "#6ad72d",
                                                                "#aee228",
                                                                "gold",
                                                                "#ff471a",
                                                            ]}
                                                            ringWidth={15}
                                                            minValue={0}
                                                            maxValue={200}
                                                            width={140}
                                                            height={100}
                                                        />
                                                    </div>
                                                </CCardBody>
                                            </CCard>
                                        </div>
                                    );
                                })}
                            </div>
                            <hr className="hr-line" />
                            <div className="row">
                                <div className="col-md-12 gauge-gaurd-title text-center">
                                    <h3>Demerit Trend - Process - {zone}</h3>
                                </div>
                                {/* <div className="col-md-12 vehicle-trend-title text-center"><h3>Demerit per Vehicle Trend</h3></div> */}
                                <div className="col-12">
                                    <CCard className="main-card-12">
                                        <CCardBody>
                                            <CChartLine
                                                datasets={[
                                                    {
                                                        label: `${line} Demerits`,
                                                        borderColor: "#0d86ff",
                                                        data: demeritsZoneProcess.data,
                                                        fill: false,
                                                    },
                                                ]}
                                                options={{
                                                    defaultFontColor: "#000",
                                                    title: {
                                                        display: true,
                                                        text: "",
                                                        fontSize: 12,
                                                        padding: 5,
                                                        fontColor: "#000",
                                                    },
                                                    legend: {
                                                        display: false,
                                                        position: "bottom",
                                                    },

                                                    tooltips: {
                                                        enabled: true,
                                                    },
                                                    scales: {
                                                        yAxes: [
                                                            {
                                                                ticks: {
                                                                    suggestedMin: 0,
                                                                    maxTicksLimit: 7,
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
                                                                },
                                                            },
                                                        ],
                                                    },
                                                    animation: {
                                                        onProgress: drawLineLables,
                                                        onComplete: drawLineLables,
                                                    },
                                                    hover: { animationDuration: 0 },
                                                }}
                                                labels={demeritsZoneProcess.labels}
                                            />
                                        </CCardBody>
                                    </CCard>
                                </div>
                            </div>
                            <hr className="hr-line" />
                            <div className="row">
                                <div className="col-4">
                                    {" "}
                                    <div className="label-control mid-font">% of Veh.</div>
                                </div>
                                <div className="col-4">
                                    <div className="label-control mid-font">Last 24 Hrs</div>
                                </div>
                                <div className="col-4">
                                    <div className="label-control mid-font">Month</div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <div className="label-control mid-font">FTT100</div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            UDFTTData.CURRENTDAYFTT100,
                                            //console.warn(UDFTTData.CURRENTDAYFTT100),
                                            "PROCESS"
                                        )}`}
                                    >
                                        {UDFTTData.CURRENTDAYFTT100}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            UDFTTData.CURRENTMONTHFTT100,
                                            "PROCESS"
                                        )}`}
                                    >
                                        {UDFTTData.CURRENTMONTHFTT100}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <div className="label-control mid-font">FTT25</div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            UDFTTData.CURRENTDAYFTT25,
                                            "PROCESS"
                                        )}`}
                                    >
                                        {UDFTTData.CURRENTDAYFTT25}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            UDFTTData.CURRENTMONTHFTT25,
                                            "PROCESS"
                                        )}`}
                                    >
                                        {UDFTTData.CURRENTMONTHFTT25}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CCol>
                </CRow>
            )}
        </>
    );
};

export default QGKPIDashboard;
