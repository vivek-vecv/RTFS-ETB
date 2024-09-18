import React, { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import axios from "axios";
import * as QueryString from "query-string";
import { API_URL, CreateArray } from "../../config";
import LoadingPage from "./LoadingPage";

const CabweldKPIDashboard = (props) => {
    const parsed = QueryString.parse(props.location.search);
    //const [Logged_Station, setLogged_Station] = useState(parsed.Logged_Station ? parsed.Logged_Station : "PRODUCT_AUDIT_GROUP");
    const [line, setLine] = useState(parsed.Line ? parsed.Line : "LMD");
    const [zone, setZone] = useState(parsed.Zone ? parsed.Zone : "Zone-1");
    // const [mainline, setMainLine] = useState(parsed.mainLine ? parsed.mainLine : "LMD");
    const [auditData, setAuditData] = useState([

    ]);
    const HDLine = "HD"
    const LMDLine = "LMD"
    const [isLoading, setLoading] = useState(true);
    const [gaugeData, setGuage] = useState([]);
    const [demeritsHD, setDemeritsHD] = useState({ data: [], labels: [] });
    const [demeritsLMD, setDemeritsLMD] = useState({ data: [], labels: [] });
    const [demeritsHDPS, setDemeritsHDPS] = useState({ data: [], labels: [] });
    const [demeritsLMDPS, setDemeritsLMDPS] = useState({ data: [], labels: [] });
    const [FTTableData, setFTTableData] = useState([
        {
            VEHICLETYPE: "HD",
            CURRENTDAYFTT100: "0",
            CURRENTMONTHFTT100: "0",
            CURRENTDAYFTT25: "0",
            CURRENTMONTHFTT25: "0",
        },
        {
            VEHICLETYPE: "LMD",
            CURRENTDAYFTT100: "0",
            CURRENTMONTHFTT100: "0",
            CURRENTDAYFTT25: "0",
            CURRENTMONTHFTT25: "0",
        },
        {
            VEHICLETYPE: "UD",
            CURRENTDAYFTT100: "0",
            CURRENTMONTHFTT100: "0",
            CURRENTDAYFTT25: "0",
            CURRENTMONTHFTT25: "0",
        },
    ]);

    useEffect(() => {
        axios
            .get(`${API_URL}/CabweldKPIDashboard.php${props.location.search}`)
            .then(function (response) {
                if (response && response.data) {


                    const labelsHD = [];
                    const labelsZone = [];
                    const HDData = [];
                    const LMDData = [];
                    const HDPSData = [];
                    const LMDPSData = [];

                    // const demeritsData = CreateArray(
                    //     response.data.LMDHDUDDEMERITTREND.DEMERIT
                    // );

                    // if (demeritsData.length > 0) {
                    //     demeritsData.forEach(function (item, index) {
                    //         labelsHD.push(
                    //             item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
                    //         );
                    //         HDData.push(item.HD);

                    //     });
                    // }

                    const demeritsZoneWise = CreateArray(
                        response.data.ZONEWISETRENDDAILY.DEMERIT
                    );
                    if (demeritsZoneWise.length > 0) {
                        demeritsZoneWise.forEach(function (item, index) {
                            labelsZone.push(
                                item.TIME_RANGE == "CURRENTDATE" ? "TODAY" : item.TIME_RANGE
                            );
                            HDData.push(item.HD);
                            LMDData.push(item.LMD);
                            HDPSData.push(item.PSHD);
                            LMDPSData.push(item.PSLMD);
                        });
                    }
                    setAuditData(response.data.VEHICLESAUDITED.COUNT);
                    setGuage(response.data.GAUGEDEMERITTREND.DEMERIT);

                    setDemeritsHD({ data: HDData, labels: labelsZone });
                    setDemeritsLMD({ data: LMDData, labels: labelsZone });
                    setDemeritsHDPS({ data: HDPSData, labels: labelsZone });
                    setDemeritsLMDPS({ data: LMDPSData, labels: labelsZone });

                    setFTTableData(response.data.FTTDATA.FTTTABLE);
                    setLoading(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        // axios
        //     .get(`${API_URL}/PSKPIDashboardData.php${props.location.search}`)
        //     .then(function (response) {
        //         if (response && response.data) {

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

    const HDFTTData = FTTableData.find((item) => item.VEHICLETYPE === "HD");
    const LMDFTTData = FTTableData.find((item) => item.VEHICLETYPE === "LMD");
    const HDPSFTTData = FTTableData.find((item) => item.VEHICLETYPE === "HDPS");
    const LMDPSFTTData = FTTableData.find((item) => item.VEHICLETYPE === "LMDPS");
    const getColor = (val, type) => {
        let color = "red-color";
        if (type === "HD") {
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
                    <CCol lg="12" className="main-head">
                        <h5>PRODUCT AUDIT</h5>
                        <h5> Demerit Dashboard </h5>
                        <h5 style={{ marginRight: "10%" }}>
                            Cabweld
                        </h5>
                    </CCol>

                    <CCol lg="3">
                        <div className="inner-box">
                            <div className="row">
                                <div className="col-12 align-content-center">
                                    <h5 className="vehicleTitle">HD</h5>
                                </div>
                            </div>

                            <div className="row align-items-center">
                                <div className="col-5 image-box">
                                    <img
                                        src={getVehicleimage(HDLine)}
                                        className="image-responsive"
                                    />
                                </div>
                                <div className="col-7">
                                    <CRow className="inner-wrap-box">
                                        <div className="col-md-12 text-center top-audit-title">
                                            Vehicles Inspected
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-control mid-font">Today</div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="audits-value mid-font">
                                                {auditData[1].HD}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-control mid-font">Month</div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="audits-value mid-font">
                                                {auditData[0].HD}
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
                                                                parseInt(gauge.HD) > 200
                                                                    ? 200
                                                                    : parseInt(gauge.HD)
                                                            }
                                                            currentValueText={gauge.HD}
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
                                    <h3>Demerit Trend - HD</h3>
                                </div>
                                {/* <div className="col-md-12 vehicle-trend-title text-center"><h3>Demerit per Vehicle Trend</h3></div> */}
                                <div className="col-12">
                                    <CCard className="main-card-12">
                                        <CCardBody>
                                            <CChartLine
                                                datasets={[
                                                    {
                                                        label: `Cabweld Demerits`,
                                                        borderColor: "#0d86ff",
                                                        data: demeritsHD.data,
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
                                                labels={demeritsHD.labels}
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
                                    <div className="label-control mid-font">Today</div>
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
                                            "HD"
                                        )}`}
                                    >
                                        {HDFTTData.CURRENTDAYFTT100}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            HDFTTData.CURRENTMONTHFTT100,
                                            "HD"
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
                                            "HD"
                                        )}`}
                                    >
                                        {HDFTTData.CURRENTDAYFTT25}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            HDFTTData.CURRENTMONTHFTT25,
                                            "HD"
                                        )}`}
                                    >
                                        {HDFTTData.CURRENTMONTHFTT25}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CCol>



                    <CCol lg="3">
                        <div className="inner-box">
                            <div className="row">
                                <div className="col-12 align-content-center">
                                    <h5 className="vehicleTitle">Demerit Cabweld - HD</h5>
                                </div>
                            </div>
                            {/* New code */}
                            <div className="row ">

                                <div className="col-12">
                                    <div className="col-md-12 text-center top-audit-title">
                                        Vehicles Inspected
                                    </div>
                                    <CRow lg="12" className="inner-wrap-box">

                                        <CCol lg="6">
                                            <div className="col-md-12">
                                                <div className="label-control mid-font">Today</div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="audits-value mid-font">
                                                    {auditData[1].HD}
                                                </div>
                                            </div>
                                        </CCol>

                                        <CCol lg="6">

                                            <div className="col-md-12">
                                                <div className="label-control mid-font">Month</div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="audits-value mid-font">
                                                    {auditData[0].HD}
                                                </div>
                                            </div>
                                        </CCol>

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
                                                                parseInt(gauge.PSHD) > 200
                                                                    ? 200
                                                                    : parseInt(gauge.PSHD)
                                                            }
                                                            currentValueText={gauge.PSHD}
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
                                    <h3>Demerit Trend - Cabweld - HD</h3>
                                </div>
                                {/* <div className="col-md-12 vehicle-trend-title text-center"><h3>Demerit per Vehicle Trend</h3></div> */}
                                <div className="col-12">
                                    <CCard className="main-card-12">
                                        <CCardBody>
                                            <CChartLine
                                                datasets={[
                                                    {
                                                        label: "Cabweld Demerits",
                                                        borderColor: "#0d86ff",
                                                        data: demeritsHDPS.data,
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
                                                    tooltips: {
                                                        enabled: true,
                                                    },
                                                    animation: {
                                                        onProgress: drawLineLables,
                                                        onComplete: drawLineLables,
                                                    },
                                                    hover: { animationDuration: 0 },
                                                }}
                                                labels={demeritsLMD.labels}
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
                                    <div className="label-control mid-font">Today</div>
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
                                            HDPSFTTData.CURRENTDAYFTT100,
                                            "LMD"
                                        )}`}
                                    >
                                        {HDPSFTTData.CURRENTDAYFTT100}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            HDPSFTTData.CURRENTMONTHFTT100,
                                            "LMD"
                                        )}`}
                                    >
                                        {HDPSFTTData.CURRENTMONTHFTT100}
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
                                            HDPSFTTData.CURRENTDAYFTT25
                                        )}`}
                                    >
                                        {HDPSFTTData.CURRENTDAYFTT25}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            HDPSFTTData.CURRENTMONTHFTT25
                                        )}`}
                                    >
                                        {HDPSFTTData.CURRENTMONTHFTT25}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CCol>



                    <CCol lg="3">
                        <div className="inner-box">
                            <div className="row">
                                <div className="col-12 align-content-center">
                                    <h5 className="vehicleTitle">{LMDLine}</h5>
                                </div>
                            </div>

                            <div className="row align-items-center">
                                <div className="col-5 image-box">
                                    <img
                                        src={getVehicleimage(LMDLine)}
                                        className="image-responsive"
                                    />
                                </div>
                                <div className="col-7">
                                    <CRow className="inner-wrap-box">
                                        <div className="col-md-12 text-center top-audit-title">
                                            Vehicles Inspected
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-control mid-font">Today</div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="audits-value mid-font">
                                                {auditData[1].LMD}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-control mid-font">Month</div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="audits-value mid-font">
                                                {auditData[0].LMD}
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
                                                                parseInt(gauge.LMD) > 200
                                                                    ? 200
                                                                    : parseInt(gauge.LMD)
                                                            }
                                                            currentValueText={gauge.LMD}
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
                                    <h3>Demerit Trend - LMD</h3>
                                </div>
                                {/* <div className="col-md-12 vehicle-trend-title text-center"><h3>Demerit per Vehicle Trend</h3></div> */}
                                <div className="col-12">
                                    <CCard className="main-card-12">
                                        <CCardBody>
                                            <CChartLine
                                                datasets={[
                                                    {
                                                        label: "LMD Demerits",
                                                        borderColor: "#0d86ff",
                                                        data: demeritsLMD.data,
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
                                                labels={demeritsHD.labels}
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
                                    <div className="label-control mid-font">Today</div>
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
                                            "LMD"
                                        )}`}
                                    >
                                        {LMDFTTData.CURRENTDAYFTT100}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            LMDFTTData.CURRENTMONTHFTT100,
                                            "LMD"
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
                                            LMDFTTData.CURRENTDAYFTT25,
                                            "LMD"
                                        )}`}
                                    >
                                        {LMDFTTData.CURRENTDAYFTT25}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            LMDFTTData.CURRENTMONTHFTT25,
                                            "LMD"
                                        )}`}
                                    >
                                        {LMDFTTData.CURRENTMONTHFTT25}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CCol>






                    <CCol lg="3">
                        <div className="inner-box">
                            <div className="row">
                                <div className="col-12 align-content-center">
                                    <h5 className="vehicleTitle">Demerit Cabweld - LMD</h5>
                                </div>
                            </div>

                            {/* New code */}
                            <div className="row align-items-center">

                                <div className="col-12">
                                    <div className="col-md-12 text-center top-audit-title">
                                        Vehicles Inspected
                                    </div>
                                    <CRow lg="12" className="inner-wrap-box">

                                        <CCol lg="6">
                                            <div className="col-md-12">
                                                <div className="label-control mid-font">Today</div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="audits-value mid-font">
                                                    {auditData[1].LMD}
                                                </div>
                                            </div>
                                        </CCol>

                                        <CCol lg="6">

                                            <div className="col-md-12">
                                                <div className="label-control mid-font">Month</div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="audits-value mid-font">
                                                    {auditData[0].LMD}
                                                </div>
                                            </div>
                                        </CCol>

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
                                                                parseInt(gauge.PSLMD) > 200
                                                                    ? 200
                                                                    : parseInt(gauge.PSLMD)
                                                            }
                                                            currentValueText={gauge.PSLMD}
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
                                    <h3>Demerit Trend - Cabweld - LMD</h3>
                                </div>
                                {/* <div className="col-md-12 vehicle-trend-title text-center"><h3>Demerit per Vehicle Trend</h3></div> */}
                                <div className="col-12">
                                    <CCard className="main-card-12">
                                        <CCardBody>
                                            <CChartLine
                                                datasets={[
                                                    {
                                                        label: "Cabweld Demerits",
                                                        borderColor: "#0d86ff",
                                                        data: demeritsLMDPS.data,
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
                                                labels={demeritsLMD.labels}
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
                                    <div className="label-control mid-font">Today</div>
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
                                            LMDPSFTTData.CURRENTDAYFTT100,
                                            //console.warn(UDFTTData.CURRENTDAYFTT100),
                                            "LMDPS"
                                        )}`}
                                    >
                                        {LMDPSFTTData.CURRENTDAYFTT100}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            LMDPSFTTData.CURRENTMONTHFTT100,
                                            "LMDPS"
                                        )}`}
                                    >
                                        {LMDPSFTTData.CURRENTMONTHFTT100}
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
                                            LMDPSFTTData.CURRENTDAYFTT25,
                                            "LMDPS"
                                        )}`}
                                    >
                                        {LMDPSFTTData.CURRENTDAYFTT25}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div
                                        className={`audits-value mid-font ${getColor(
                                            LMDPSFTTData.CURRENTMONTHFTT25,
                                            "LMDPS"
                                        )}`}
                                    >
                                        {LMDPSFTTData.CURRENTMONTHFTT25}
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

export default CabweldKPIDashboard;
