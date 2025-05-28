import React, { useEffect, useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CLabel,
  CTextarea,
  CAlert,
} from "@coreui/react";

import Select from "react-select";
import axios from "axios";
import { API_URL } from "../../config";

const Modal = ({
  open,
  setOpen,
  chassis,
  desc,
  defectCode,
  ack,
  stn,
}) => {
  const [supData, setSupData] = useState([]);
  const [empName, setEmpName] = useState("");
  const [alertFail, setAlertFail] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [empId, setEmpId] = useState("");
  const [chassi, setChassi] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [msg, setMsg] = useState("");

  const toggle = () => {
    setOpen(!open);
    setAlertFail(false);
    setAlertSuccess(false);
    setEmpId("");
    setEmpName("");
    setActionTaken("");
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/supervisorData.php`)
      .then((response) => {
        const data = response?.data?.EMPLOYEE || [];
        setSupData(
          data.map((emp) => ({
            label: emp.EMPLOYEE_NAME,
            value: emp.EMPLOYEE_ID,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitForm = () => {
    const payload = {
      supName: empName,
      supID: empId,
      supAction: actionTaken,
      chassis: chassis,
      desc: desc,
      defectCode: defectCode,
    };

    if (empName && actionTaken) {
      axios
        .post(`${API_URL}/submitDataSupervisor.php`, payload)
        .then((response) => {
          console.log("response", response);
          setChassi(chassis);
          setEmpId("");
          setEmpName("");
          setActionTaken("");
          setAlertSuccess(true);
          setAlertFail(false);
          setMsg("Data Submission Successful");
          setOpen(false);
        })
        .catch((e) => {
          setAlertFail(true);
          setAlertSuccess(false);
          setMsg(e.toString());
        });
    } else {
      setAlertFail(true);
      setAlertSuccess(false);
      setMsg("Fields can not be empty");
    }
  };

  return (
    <>
      <CModal show={open} size="lg" onClose={toggle} closeOnBackdrop={false}>
        <CModalHeader
          style={{ fontWeight: "bold", fontFamily: "Helvetica" }}
          align="center"
        >
          Supervisor Acknowledgement Window
        </CModalHeader>
        <CModalBody>
          <CLabel style={{ fontWeight: "bold" }}>Chassis Number</CLabel>
          <input className="form-control" value={chassis} disabled />

          <CLabel style={{ fontWeight: "bold" }}>
            Supervisor Name<span style={{ color: "red" }}>*</span>
          </CLabel>
          <Select
            options={supData}
            value={empName && empId ? { label: empName, value: empId } : null}
            onChange={(selected) => {
              setEmpName(selected.label);
              setEmpId(selected.value);
            }}
            placeholder="Select Supervisor"
            isSearchable
            className="mb-2"
          />

          <CLabel style={{ fontWeight: "bold" }}>
            Employee ID<span style={{ color: "red" }}>*</span>
          </CLabel>
          <input className="form-control" value={empId} disabled />

          <CLabel style={{ fontWeight: "bold" }}>Defect Description</CLabel>
          <input className="form-control" value={desc} disabled />

          <CLabel style={{ fontWeight: "bold" }}>Defect Code</CLabel>
          <input className="form-control" value={defectCode} disabled />

          <CLabel style={{ fontWeight: "bold" }}>
            Action Taken<span style={{ color: "red" }}>*</span>
          </CLabel>
          <CTextarea
            placeholder="Enter Action Taken by Supervisor"
            value={actionTaken}
            onChange={(e) => setActionTaken(e.target.value)}
          />

          <CLabel style={{ fontWeight: "bold" }}>
            Previous Acknowledgement
          </CLabel>
          <CTextarea value={ack} disabled />

          <CAlert
            show={alertSuccess}
            color="success"
            style={{ marginTop: "2rem" }}
          >
            {msg}
          </CAlert>
          <CAlert show={alertFail} color="danger" style={{ marginTop: "2rem" }}>
            {msg}
          </CAlert>
        </CModalBody>
        <CModalFooter>
          <CButton type="submit" color="info" onClick={submitForm}>
            Submit
          </CButton>
          <CButton color="secondary" onClick={toggle}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Modal;
