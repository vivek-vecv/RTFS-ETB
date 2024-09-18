<?php

require('config.php');
$_POST = json_decode(file_get_contents("php://input"),true);
$supName = isset($_POST['supName'])?urlencode($_POST['supName']):'';
$supID = isset($_POST['supID'])?urlencode($_POST['supID']):'';
$supAction = isset($_POST['supAction'])?urlencode($_POST['supAction']):'';
$chassis = isset($_POST['chassis'])?urlencode($_POST['chassis']):'';
$desc = isset($_POST['desc'])?urlencode($_POST['desc']):'';
$defectCode = isset($_POST['defectCode'])?urlencode($_POST['defectCode']):'';

$api = "http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_SUP_ACK&SUP_NAME=$supName&SUP_ID=$supID&SUP_ACTION=$supAction&CHASSIS=$chassis&DEFECT_CODE=$defectCode&DEFECT_DESC=$desc&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false";

try {
    $headers = array(
        "Content-type: text/xml;charset=\"utf-8\"",
        "Accept: text/xml",
        "Cache-Control: no-cache",
        "Pragma: no-cache",
    );


    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
    curl_setopt($ch, CURLOPT_URL, $api);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//curl_setopt($ch, CURLOPT_USERPWD, $soapUser.":".$soapPassword); // username and password - declared at the top of the doc
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    curl_setopt($ch, CURLOPT_POST, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    $err = curl_error($ch);

    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($err) {
        http_response_code(500);
        echo json_encode(['errorMessage'=> "cURL Error #:" . $err]);
    } else if($result) {
        http_response_code($httpcode);
        $xml = simplexml_load_string($result);
        $json = json_encode($xml);
        $arr = json_decode($json, true);
        echo json_encode($arr);
    }

    if(!$result){
        http_response_code(500);
    }
    curl_close($ch);
    exit;
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['errorMessage'=> $e->getMessage()]);
    exit;
}