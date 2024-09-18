<?php

require('config.php');



try {
    $headers = array(
        "Content-type: text/xml;charset=\"utf-8\"",
        "Accept: text/xml",
        "Cache-Control: no-cache",
        "Pragma: no-cache",
    );


    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
    curl_setopt($ch, CURLOPT_URL, $ctdashboardTableUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//curl_setopt($ch, CURLOPT_USERPWD, $soapUser.":".$soapPassword); // username and password - declared at the top of the doc
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
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