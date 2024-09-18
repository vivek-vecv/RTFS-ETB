import React, { useEffect, useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CInput,
  CLabel,
  CTextarea,
  CAlert,
} from "@coreui/react";

import Autocomplete from "react-autocomplete";
import axios from "axios";
import { API_URL } from "../../config";
import FVIDashboard4 from "./FVIDashboard4";

const Modal = ({
  open,
  setOpen,
  chassis,
  desc,
  defectCode,
  ack,
  stn,
  stnChng,


  ...props
}) => {


  const [supData, setSupData] = useState([]);

  const [empName, setEmpName] = useState("");
  const [alertFail, setAlertFail] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [empId, setEmpId] = useState("");
  const [chassi, setChassi] = useState("");
  const [actionTaken, setActionTaken] = useState(null);
  const [msg, setMsg] = useState("");
  const params = {
    Logged_Station: stn,

  };

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
      .then(function (response) {
        let data = response?.data?.EMPLOYEE;
        setSupData(function (subData) {
          for (let i = 0; i < data.length; i++) {
            supData.push({
              name: data[i].EMPLOYEE_NAME,
              id: data[i].EMPLOYEE_ID,
            });
          }


          return supData;

        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);







  function handleNameChange(val) {
    if (val) {
      for (let i = 0; i < supData.length; i++) {
        if (supData[i].name === val) {
          setEmpId(supData[i].id);
          break;
        }
      }
    } else {
      console.log("else case");
      setEmpName("");
      setEmpId("");
    }
  }

  function submitForm() {
    var payload = {
      supName: empName,
      supID: empId,
      supAction: actionTaken,
      chassis: chassis,
      desc: desc,
      defectCode: defectCode,
    };

    if (empName !== "" && actionTaken !== null && actionTaken !== "") {
      axios
        .post(`${API_URL}/submitDataSupervisor.php`, payload)
        .then(function (response) {
          console.log("response", response);
          setChassi(chassis);
          setEmpId("");
          setEmpName("");
          setActionTaken("");
          setAlertSuccess(true);
          setAlertFail(false);

          setMsg("Data Submission Successful");


          setOpen(!open);
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
      //setOpen(!open);
    }
  }

  return (
    <>
      <CModal show={open} size="lg" onclose={toggle} closeOnBackdrop={false}>
        <CModalHeader
          style={{
            fontWeight: "bold",
            fontFamily: "Helvetica",
          }}
          align="center"
        >
          Supervisor Acknowledgement Window
        </CModalHeader>
        <CModalBody>
          <CLabel style={{ fontWeight: "bold" }}>Chassis Number</CLabel>
          <input className="form-control" value={chassis} />
          <CLabel style={{ fontWeight: "bold" }}>
            Supervisor Name<span style={{ color: "red" }}>*</span>
          </CLabel>
          <Autocomplete
            getItemValue={(item) => item.name}
            items={supData}
            renderItem={(item, isHighlighted) => (
              <div
                style={{ background: isHighlighted ? "lightgray" : "white" }}
              >
                {item.name}
              </div>
            )}
            value={empName}
            onChange={(e) => {
              setEmpName(e.target.value);
              handleNameChange(e.target.value);
            }}
            shouldItemRender={(item, value) =>
              item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            onSelect={(val) => {
              setEmpName(val);
              handleNameChange(val);
            }}
            renderInput={function (props) {
              return <input className="form-control" {...props} />;
            }}
            wrapperStyle={{ display: "block" }}
          />
          <CLabel style={{ fontWeight: "bold" }}>
            Employee ID<span style={{ color: "red" }}>*</span>
          </CLabel>
          <input className="form-control" value={empId} disabled={true} />
          <CLabel style={{ fontWeight: "bold" }}>Defect Description</CLabel>
          <input className="form-control" value={desc} />
          <CLabel style={{ fontWeight: "bold" }}>Defect Code</CLabel>
          <input className="form-control" value={defectCode} />
          <CLabel style={{ fontWeight: "bold" }}>
            Action Taken<span style={{ color: "red" }}>*</span>
          </CLabel>
          <CTextarea
            type="text-area"
            name="nf-email"
            placeholder="Enter Action Taken by Supervisor"
            value={actionTaken}
            onChange={(e) => setActionTaken(e.target.value)}
          />
          <CLabel style={{ fontWeight: "bold" }}>
            Previous Acknowledgement<span style={{ color: "red" }}></span>
          </CLabel>
          <CTextarea
            type="text-area"
            name="nf-email"

            value={ack}
            disabled={true}
          />

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
