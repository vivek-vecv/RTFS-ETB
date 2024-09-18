import React from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import "./LoadingCss/LoadingPage.css";
function LoadingPage() {
  return (
    <>
      <body>
        <CRow>
          <CCol lg="8" className="loadingBody ">
            <div
              className={"loading "}

              // style={{ marginLeft: "69%", marginTop: "5%" }}
            ></div>
          </CCol>
          <CCol lg="4">
            <div className="loading">
              <div className="loading__square"></div>
              <div className="loading__square"></div>
              <div className="loading__square"></div>
              <div className="loading__square"></div>
              <div className="loading__square"></div>
              <div className="loading__square"></div>
              <div className="loading__square"></div>
            </div>
            <div>
              <p className="paraLoading">
                LOADING.... PLEASE WAIT FOR BUILD PERFECT
              </p>
            </div>
          </CCol>
        </CRow>
      </body>
    </>
  );
}
export default LoadingPage;
