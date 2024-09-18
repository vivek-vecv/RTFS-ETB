import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import axios from "axios";
import { API_URL, CreateArray } from "../../../config";
import LoadingPage from "../LoadingPage";

const RolloutTable = () => {
  const [isLoading, setLoading] = useState(true);
  const [variant, setVariant] = useState("");

  const [varData, setVarData] = useState([]);

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
  let count = 1;

  useEffect(() => {
    axios
      .get(`${API_URL}/rollout_data.php`)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setPageData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        //console.log(error);
      });

    axios
      .get(`${API_URL}/rolloutVariant.php`)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        let data = response?.data?.Rowset?.Row;
        setVarData(function (subData) {
          for (let i = 0; i < data.length; i++) {
            varData.push({
              Variant: data[i].VARIANT,
            });
          }
          return varData;
        });

        setVariant(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }, []);
  //console.log(pageData?.Rowset?.Row);
  let rolloutData = CreateArray(variant?.Rowset?.Row);
  console.table(rolloutData);

  const vari = [];
  varData.forEach(function (item, index) {
    vari.push(item.Variant);
  });
  const uni = Array.from(new Set(vari));
  console.table(uni);
  const variantRowspan = [];

  // const generateEmptyRows = (data) => {
  //   const elm = [];
  //   let count = 1;

  //   const elmTD = [];
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].VARIANT === vari[i + 1]) {
  //       count++;
  //     }
  //      if (data[i].VARIANT !== vari[i + 1]) {
  //     elmTD.push(
  //       <tr key={i.toString()}>
  //         <td>{data[i].VARIANT}</td>
  //         <td>{data[i].MATRIAL}</td>
  //         <td>{data[i].DAY}</td>
  //         <td>{data[i].MTD}</td>
  //         <td>{data[i].MTD_VARIANTWISE}</td>
  //       </tr>
  //     );
  //     //  }
  //     count = 1;
  //   }

  //   return elmTD;
  // };
  // // for (let i = 0; i < data.length; i++) {
  // //   elm.push(<tr key={i.toString()}>{tds()}</tr>);
  // // }
  // // return elm;

  const getbgColor = (value) => {
    if (
      value.toString() == "TOTAL PERIPHERAL" ||
      value.toString() == "TOTAL COUPLED" ||
      value.toString() == "TOTAL"
    ) {
      return "#b8cddf";
    }
  };
  const getFontBold = (value) => {
    if (
      value.toString() == "TOTAL PERIPHERAL" ||
      value.toString() == "TOTAL COUPLED" ||
      value.toString() == "TOTAL"
    ) {
      return "bold";
    }
  };
  // const variantData = CreateArray(variant?.Rowset?.Row);
  // console.log(variantData);

  // function getRowspan(item){
  //   for (let index = 0; index < variantData.length; index++) {
  //     varData.push({
  //       variant: variantData.VARIANT[index]
  //     });

  //   }

  // }
  // const variant=[];
  // const variantsFrequency={}
  // for (let index = 0; index < .length; index++) {
  //   const element = array[index];

  // }

  return (
    <>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <CRow className=" main-dashboard-wrap main-Dashboard3-wrap">
          <CCol lg="12" className="text-center main-head">
            <h5>ENGINE ROLLOUT REPORT</h5>
          </CCol>
          <CCol lg="12" style={{ marginTop: "10px" }}>
            <CRow className="main-row main-row-2">
              <CCol md="12">
                <div className="inner-box inner-box-dash2">
                  <CRow>
                    <CCol lg="12">
                      <CCard className="main-card-6">
                        <CCardBody className={"scroll-table-6"}>
                          <table
                            className="table table-hover table-striped table-bordered table-sm blue-table"
                            style={{ overflowBlock: "scroll" }}
                          >
                            <thead>
                              <tr align="center">
                                <th
                                  scope="col"
                                  style={{
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                  }}
                                >
                                  STATION
                                </th>
                                <th scope="col">A</th>
                                <th scope="col">B</th>
                                <th scope="col">C</th>

                                <th
                                  scope="col"
                                  rowSpan="2"
                                  style={{
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                  }}
                                >
                                  TOTAL
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                  }}
                                >
                                  MTD
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                  }}
                                >
                                  YTD
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {pageData?.Rowset?.Row.map((item, index) => {
                                return (
                                  <tr key={index.toString()}>
                                    <td
                                      style={{
                                        width: "27%",
                                        backgroundColor: `${getbgColor(
                                          item.OPERATION
                                        )}`,
                                        fontWeight: `${getFontBold(
                                          item.OPERATION
                                        )}`,
                                      }}
                                    >
                                      {item.OPERATION}
                                    </td>
                                    <td
                                      align="center"
                                      style={{
                                        backgroundColor: `${getbgColor(
                                          item.OPERATION
                                        )}`,
                                        fontWeight: `${getFontBold(
                                          item.OPERATION
                                        )}`,
                                      }}
                                    >
                                      {item.A}
                                    </td>
                                    <td
                                      align="center"
                                      style={{
                                        backgroundColor: `${getbgColor(
                                          item.OPERATION
                                        )}`,
                                        fontWeight: `${getFontBold(
                                          item.OPERATION
                                        )}`,
                                      }}
                                    >
                                      {item.B}
                                    </td>
                                    <td
                                      align="center"
                                      style={{
                                        backgroundColor: `${getbgColor(
                                          item.OPERATION
                                        )}`,
                                        fontWeight: `${getFontBold(
                                          item.OPERATION
                                        )}`,
                                      }}
                                    >
                                      {item.C}
                                    </td>
                                    <td
                                      align="center"
                                      style={{
                                        backgroundColor: `${getbgColor(
                                          item.OPERATION
                                        )}`,
                                        fontWeight: `${getFontBold(
                                          item.OPERATION
                                        )}`,
                                      }}
                                    >
                                      {item.TOTAL}
                                    </td>
                                    <td
                                      align="center"
                                      style={{
                                        backgroundColor: `${getbgColor(
                                          item.OPERATION
                                        )}`,
                                        fontWeight: `${getFontBold(
                                          item.OPERATION
                                        )}`,
                                      }}
                                    >
                                      {item.MTD}
                                    </td>
                                    <td
                                      align="center"
                                      style={{
                                        backgroundColor: `${getbgColor(
                                          item.OPERATION
                                        )}`,
                                        fontWeight: `${getFontBold(
                                          item.OPERATION
                                        )}`,
                                      }}
                                    >
                                      {item.YTD}
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
                  <CRow>
                    <CCol lg="12">
                      <CCard className="  main-card-6">
                        <div
                          className="text-center main-head"
                          style={{ margin: "15px" }}
                        >
                          <h3> VARIANT WISE DETAILS</h3>
                        </div>
                        <CCardBody className={"scroll-table-6"}>
                          <table
                            className="table table-hover table-striped table-bordered table-sm blue-table"
                            style={{ overflowBlock: "scroll" }}
                          >
                            <thead>
                              <tr align="center">
                                <th
                                  scope="col"
                                  style={{
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                  }}
                                >
                                  VARIANT
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                  }}
                                >
                                  Engine Code
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                  }}
                                >
                                  DAY
                                </th>

                                <th
                                  scope="col"
                                  style={{
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                  }}
                                >
                                  MTD
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                  }}
                                >
                                  MTD variant Wise
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* {variant?.Rowset?.Row.map((item, index) => {
                                return (
                                  <tr key={index.toString()}>
                                    <td
                                      align="center"
                                      style={{
                                        width: "40%",
                                        //  backgroundColor: `${getbgColor(
                                        //     item.VARIANT
                                        //   )}`,
                                        //   fontWeight: `${getFontBold(
                                        //     item.VARIANT
                                        //   )}`,
                                      }}
                                    >
                                      {item.VARIANT}
                                    </td>

                                    <td
                                      align="center"
                                      style={{
                                        backgroundColor: `${getbgColor(
                                          item.VARIANT
                                        )}`,
                                        fontWeight: `${getFontBold(
                                          item.VARIANT
                                        )}`,
                                      }}
                                    >
                                      {item.MATRIAL}
                                    </td>
                                    <td
                                      align="center"
                                      style={{
                                        backgroundColor: `${getbgColor(
                                          item.VARIANT
                                        )}`,
                                        fontWeight: `${getFontBold(
                                          item.VARIANT
                                        )}`,
                                      }}
                                    >
                                      {item.DAY}
                                    </td>
                                    <td
                                      align="center"
                                      style={{
                                        backgroundColor: `${getbgColor(
                                          item.VARIANT
                                        )}`,
                                        fontWeight: `${getFontBold(
                                          item.VARIANT
                                        )}`,
                                      }}
                                    >
                                      {item.MTD}
                                    </td>
                                    <td
                                      align="center"
                                      style={{
                                        backgroundColor: `${getbgColor(
                                          item.VARIANT
                                        )}`,
                                        fontWeight: `${getFontBold(
                                          item.VARIANT
                                        )}`,
                                      }}
                                    >
                                      {item.MTD_VARIANTWISE}
                                    </td>
                                  </tr>
                                );
                              })}
                               */}
                              {/* {generateEmptyRows(rolloutData)} */}
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

export default RolloutTable;
