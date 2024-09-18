<?php

require('config.php');
//$LoggedStation = isset($_GET['Logged_Station'])?$_GET['Logged_Station']:'PRODUCT_AUDIT_GROUP';
$line = isset($_GET['Line'])?$_GET['Line']:'LMD';
$zone = isset($_GET['Zone'])?$_GET['Zone']:'Zone-1';
$mainLine = isset($_GET['mainLine'])?$_GET['mainLine']:'LMD';
$PROkpiurl = "http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetDemeritTrendZoneWise&InLine=$line&mainLine=$mainLine&InZone=$zone&OutputParameter=OutXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false";


try {
    $headers = array(
        "Content-type: text/xml;charset=\"utf-8\"",
        "Accept: text/xml",
        "Cache-Control: no-cache",
        "Pragma: no-cache",
    );


    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
    curl_setopt($ch, CURLOPT_URL, $PROkpiurl);
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