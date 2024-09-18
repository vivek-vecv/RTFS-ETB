<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
  
    die();
}
//header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$url = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetDemeritTrend&OutputParameter=OutXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$FVIDashboard1url = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_FVI/Reports/FVIDashboardReport/BLS/BLS_GetDemeritTrend&OutputParameter=OutXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$urltest = 'http://mexq.vecv.net:50011/XMII/Runner?Transaction=Default/Divya/BLS/BLS_GetDemeritTrend&OutputParameter=OutXML&Content-Type=text/xml&j_user=dpmall&j_password=vecv@123&session=false';
$tableDataUrl = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetTableData&OutputParameter=OutXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$dashboard2Url = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetEOLTFTTData&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$dashboard2Urltest = 'http://mexq.vecv.net:50011/XMII/Runner?Transaction=Default/Divya/BLS/BLS_GetEOLTFTTData&OutputParameter=OutputXML&Content-Type=text/xml&j_user=dpmall&j_password=vecv@123&session=false';
//$dashboard3Url = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetZoneDashboardDetails&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123';
//$dashboard4Url = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetHDZoneAlertDetails&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123';
//$dashboard3Url = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetZoneDashboardDetails&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=eicher@123';
//$dashboard4Url = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetHDZoneAlertDetails&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=eicher@123';
$dashboard6Url = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetDailyProductAuditCount&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$dashboard8Url = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetZoneWiseDemerit&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$dashboard9Url = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetSeriesWiseDemeritTrend&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$dashboardTableUrl = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetOverallZoneDemeritPerformance&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$dashboardTableLMDUrl = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetOverallZoneDemeritPerformance_LMD&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$dashboard10Url = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetZoneWiseDemerit_LMD&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
//$supervisorDataUrl = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetSupervisorDetails&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$ctdashboardTableUrl = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetOverallZoneDemeritPerformance_HDCT&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
//$FVIdashboardTableUrl = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_FVI/Reports/FVIDashboardReport/BLS/BLS_GetOverallZoneDemeritPerformance&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$ctdashboardTablelmdUrl = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetOverallZoneDemeritPerformance_LDCT&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$dashboard8CTUrl = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetZoneWiseDemerit_CT_HD&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
$dashboard10CTUrl = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_GetZoneWiseDemerit_CT_LMD&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
//$submitData = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=Default/Draco/SQL_Testing&SUP_NAME="+${empName}+"&SUP_ID="+${empId}+"&SUP_ACTION="+${actionTaken}&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123';
$rolloutData = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/Reports/LineEntryExit/BLS_GetEntryExitCount&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123&session=false';
//$submitSupData = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/QualityManagementSystem_HD/Reports_MIS/Product_Audit_Group/BLS_SUP_ACK&SUP_NAME="+${empName}+"&SUP_ID="+${empId}+"&SUP_ACTION="+${actionTaken}+"&CHASSIS="+${chassis}+"&DEFECT_CODE="+${defectcode}+"&DEFECT_DESC="+${defectdesc}+&OutputParameter=OutputXML&Content-Type=text/xml&j_user=eapiuser&j_password=India@123';
$rolloutVariantData = 'http://mexp.vecv.net:50011/XMII/Runner?Transaction=VEMEX/Reports/LineEntryExit/New/BLS_DisplayCodewiseTable&OutputParameter=OutXML&Content-Type=text/xml&j_user=ETBREPORTS&j_password=india@123&session=false';


//$baseUrl  = 'https://udaanmobility.vecv.net';