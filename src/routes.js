import React from "react";

const LMDDashboard = React.lazy(() =>
  import("./views/dashboard/screens/LMDDashboard")
);
const LMDChassisDashboard = React.lazy(() =>
  import("./views/dashboard/screens/LMDChassisDashboard")
);
const HDChassisDashboard = React.lazy(() =>
  import("./views/dashboard/screens/HDChassisDashboard")
);
const TestDashboard = React.lazy(() =>
  import("./views/dashboard/screens/TestDashboard")
);
const HDChassisAlertDashboard = React.lazy(() =>
  import("./views/dashboard/screens/HDChassisAlertDashboard")
);
const HDDashboard = React.lazy(() =>
  import("./views/dashboard/screens/HDDashboard")
);
const ManagementDashboard = React.lazy(() =>
  import("./views/dashboard/screens/ManagementDashboard")
);
const HDCTDashboard = React.lazy(() =>
  import("./views/dashboard/screens/HDCTDashboard")
);
const LMDCTDashboard = React.lazy(() =>
  import("./views/dashboard/screens/LMDCTDashboard")
);
const PaintShopDashboard = React.lazy(() =>
  import("./views/dashboard/screens/PaintShopDashboard")
);
const Dashboard1 = React.lazy(() => import("./views/dashboard/Dashboard1"));
const Dashboard1test = React.lazy(() =>
  import("./views/dashboard/Dashboard1test")
);
const Dashboard2 = React.lazy(() => import("./views/dashboard/Dashboard2"));
const Dashboard2test = React.lazy(() =>
  import("./views/dashboard/Dashboard2test")
);
const Dashboard3 = React.lazy(() => import("./views/dashboard/Dashboard3"));
const Dashboard4 = React.lazy(() => import("./views/dashboard/Dashboard4"));
const DashboardPaintShop4 = React.lazy(() =>
  import("./views/dashboard/DashboardPaintShop4")
);
const Dashboard5 = React.lazy(() => import("./views/dashboard/Dashboard5"));
const Dashboard6 = React.lazy(() => import("./views/dashboard/Dashboard6"));
const Dashboard7 = React.lazy(() => import("./views/dashboard/Dashboard7"));
const Dashboard8 = React.lazy(() => import("./views/dashboard/Dashboard8"));
const Dashboard9 = React.lazy(() => import("./views/dashboard/Dashboard9"));
const Dashboardt = React.lazy(() => import("./views/dashboard/DashboardTable"));
const DashboardTable_LMD = React.lazy(() =>
  import("./views/dashboard/DashboardTable_LMD")
);
const Dashboard10 = React.lazy(() => import("./views/dashboard/Dashboard10"));
const Dashboard11 = React.lazy(() => import("./views/dashboard/Dashboard11"));

const CTDashboard1 = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/CTDashboard1")
);
const CTDashboard2 = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/CTDashboard2")
);
const CTDashboard3 = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/CTDashboard3")
);
const CTDashboard4 = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/CTDashboard4")
);
const CTDashboard5 = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/CTDashboard5")
);
const CTDashboard6 = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/CTDashboard6")
);
const CTDashboard7 = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/CTDashboard7")
);
const CTDashboard8 = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/CTDashboard8")
);
const CTDashboard9 = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/CTDashboard9")
);

const CTDashboardTable_LMD = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/CTDashboardTable_LMD")
);
const CTDashboard10 = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/CTDashboard10")
);
const CTDashboardTable = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/CTDashboardTable")
);
const RolloutDashboard = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/RolloutDashboard")
);
const RolloutTable = React.lazy(() =>
  import("./views/dashboard/cabTrimScreens/RolloutTable")
);
const SummaryReport = React.lazy(() =>
  import("./views/dashboard/SummaryReport")
);
const FVIalert = React.lazy(() => import("./views/dashboard/FVIalert"));
const FVIDashboard1 = React.lazy(() => import("./views/dashboard/FVIDashboard1"));
const FVIDashboard5 = React.lazy(() => import("./views/dashboard/FVIDashboard5"));
const FVIDashboardTable = React.lazy(() => import("./views/dashboard/FVIDashboardTable"));
const FVIDashboard4 = React.lazy(() => import("./views/dashboard/FVIDashboard4"));
const HDFVIStatus = React.lazy(() => import("./views/dashboard/HDFVIStatus"));
const FVIKPIDashboard = React.lazy(() => import("./views/dashboard/FVIKPIDashboard"));
const PROKPIDashboard = React.lazy(() => import("./views/dashboard/PROKPIDashboard"));
const QGKPIDashboard = React.lazy(() => import("./views/dashboard/QGKPIDashboard"));
const QGDashboard4 = React.lazy(() => import("./views/dashboard/QGDashboard4"));
const Dashboard5Tableform = React.lazy(() => import("./views/dashboard/Dashboard5Tableform"));
const PSKPIDashboard = React.lazy(() => import("./views/dashboard/PaintShopKPIDashboard"));
const LMDCTDashboard2 = React.lazy(() => import("./views/dashboard/screens/LMDCTDashboard2"));

const EMTAKPIDashboard = React.lazy(() => import("./views/dashboard/EMTAKPIDashboard"));
const EMTADashboard4 = React.lazy(() => import("./views/dashboard/EMTADashboard4"));
const CabweldDashboard4 = React.lazy(() => import("./views/dashboard/CabweldDashboard4"));
const CabweldKPIDashboard = React.lazy(() => import("./views/dashboard/CabweldKPIDashboard"));
const CabweldDashboard = React.lazy(() => import("./views/dashboard/screens/CabweldDashboard"));
const EngineDashboard = React.lazy(() => import("./views/dashboard/screens/EngineDashboard"));
const ExportKPIDashboard = React.lazy(() => import("./views/dashboard/ExportKPIDashboard"));
const ExportDashboard4 = React.lazy(() => import("./views/dashboard/ExportDashboard4"));
const ExportDashboard = React.lazy(() => import("./views/dashboard/screens/ExportDashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/LMDDashboard", name: "LMD Dashboard", component: LMDDashboard },
  {
    path: "/LMDChassisDashboard",
    name: "LMD Chassis Dashboard",
    component: LMDChassisDashboard,
  },
  {
    path: "/HDChassisDashboard",
    name: "HD Chassis Dashboard",
    component: HDChassisDashboard,
  },
  {
    path: "/HDChassisAlertDashboard",
    name: "HD Chassis Alert Dashboard",
    component: HDChassisAlertDashboard,
  },
  { path: "/HDDashboard", name: "HD Dashboard", component: HDDashboard },
  { path: "/TestDashboard", name: "Test Dashboard", component: TestDashboard },
  {
    path: "/ManagementDashboard",
    name: "HD Dashboard",
    component: ManagementDashboard,
  },
  { path: "/HDCTDashboard", name: "HD CT Dashboard", component: HDCTDashboard },
  {
    path: "/LMDCTDashboard",
    name: "LMD CT Dashboard",
    component: LMDCTDashboard,
  },
  {
    path: "/LMDCTDashboard",
    name: "LMD CT Dashboard",
    component: LMDCTDashboard,
  },
  {
    path: "/PaintShopDashboard",
    name: "PaintShop Dashboard",
    component: PaintShopDashboard,
  },
  { path: "/dashboard1", name: "Dashboard 1", component: Dashboard1 },
  {
    path: "/dashboard1test",
    name: "Dashboard 1 test",
    component: Dashboard1test,
  },
  { path: "/dashboard2", name: "Dashboard 2", component: Dashboard2 },
  {
    path: "/dashboard2test",
    name: "Dashboard 2 test",
    component: Dashboard2test,
  },
  { path: "/dashboard3", name: "Dashboard 3", component: Dashboard3 },

  { path: "/dashboard4", name: "Dashboard 4", component: Dashboard4 },
  {
    path: "/dashboardPaintShop4",
    name: "Dashboard PaintShop 4",
    component: DashboardPaintShop4,
  },
  { path: "/dashboard5", name: "Dashboard 5", component: Dashboard5 },
  { path: "/dashboard6", name: "Dashboard 6", component: Dashboard6 },
  { path: "/dashboard7", name: "Dashboard 7", component: Dashboard7 },
  { path: "/dashboard8", name: "Dashboard 8", component: Dashboard8 },
  { path: "/dashboard9", name: "Dashboard 9", component: Dashboard9 },
  { path: "/dashboardTable", name: "Dashboard Table", component: Dashboardt },
  {
    path: "/dashboardTable_LMD",
    name: "Dashboard Table LMD",
    component: DashboardTable_LMD,
  },
  { path: "/dashboard10", name: "Dashboard 10", component: Dashboard10 },
  { path: "/ctd1", name: "CTDashboard 1", component: CTDashboard1 },
  { path: "/ctd2", name: "CTDashboard 2", component: CTDashboard2 },
  { path: "/ctd3", name: "CTDashboard 3", component: CTDashboard3 },
  { path: "/ctd4", name: "CTDashboard 4", component: CTDashboard4 },
  { path: "/ctd5", name: "CTDashboard 5", component: CTDashboard5 },
  { path: "/ctd6", name: "CTDashboard 6", component: CTDashboard6 },
  { path: "/ctd7", name: "CTDashboard 7", component: CTDashboard7 },
  { path: "/ctd8", name: "CTDashboard 8", component: CTDashboard8 },
  { path: "/ctd9", name: "CTDashboard 9", component: CTDashboard9 },
  { path: "/ctd10", name: "CTDashboard 10", component: CTDashboard10 },
  { path: "/rollout", name: "Rollout Dashboard", component: RolloutDashboard },
  {
    path: "/rolloutTable",
    name: "Rollout Dashboard Table",
    component: RolloutTable,
  },
  {
    path: "/ctd_lmd",
    name: "CTDashboard Table LMD",
    component: CTDashboardTable_LMD,
  },
  {
    path: "/ctd_table",
    name: "CTDashboard Table ",
    component: CTDashboardTable,
  },
  { path: "/dashboard11", name: "Dashboard 11", component: Dashboard11 },
  { path: "/summaryReport", name: "Summary Report", component: SummaryReport },
  { path: "/FVIalert", name: "Fvi Alert", component: FVIalert },
  { path: "/FVIDashboard1", name: "FVI Dashboard1", component: FVIDashboard1 },
  { path: "/FVIDashboard5", name: "FVI Dashboard5", component: FVIDashboard5 },
  { path: "/FVIDashboardTable", name: "FVIDashboardTable", component: FVIDashboardTable },
  { path: "/FVIDashboard4", name: "FVIDashboard4", component: FVIDashboard4 },
  { path: "/HDFVIStatus", name: "FVIDashboard4", component: HDFVIStatus },
  { path: "/FVIKPIDashboard", name: "FVIKPIDashboard", component: FVIKPIDashboard },
  { path: "/PROKPIDashboard", name: "PROKPIDashboard", component: PROKPIDashboard },
  { path: "/QGKPIDashboard", name: "QGKPIDashboard", component: QGKPIDashboard },
  { path: "/QGDashboard4", name: "QGDashboard4", component: QGDashboard4 },
  { path: "/Dashboard5Table", name: "QGDashboard4", component: Dashboard5Tableform },
  { path: "/PSKPIDashboard", name: "PSKPID", component: PSKPIDashboard },
  { path: "/LMDCTDashboard2", name: "LMDCT2", component: LMDCTDashboard2 },

  { path: "/EMTAKPIDashboard", name: "EMTAKPIDashboard", component: EMTAKPIDashboard },
  { path: "/EMTADashboard4", name: "EMTADashboard4", component: EMTADashboard4 },
  { path: "/CabweldKPIDashboard", name: "CabweldKPIDashboard", component: CabweldKPIDashboard },
  { path: "/CabweldDashboard4", name: "CabweldDashboard4", component: CabweldDashboard4 },
  { path: "/EngineDashboard", name: "EngineDashboard", component: EngineDashboard },
  { path: "/CabweldDashboard", name: "CabweldDashboard", component: CabweldDashboard },
  { path: "/ExportKPIDashboard", name: "ExportKPIDashboard", component: ExportKPIDashboard },
  { path: "/ExportDashboard4", name: "ExportDashboard4", component: ExportDashboard4 },
  { path: "/ExportDashboard", name: "ExportDashboard", component: ExportDashboard },
];

export default routes;
