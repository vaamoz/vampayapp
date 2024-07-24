"use client";
import PayInBar from "@/components/chart/barChart/myBar";
import MyDoughnut from "@/components/chart/doughnoughtChart/myDoughnout";
import CollapsibleTable from "@/components/table/expandableTable";
import {
  agentStrip,
  merchantStrip,
  payinTransaction,
  payoutTransaction,
} from "@/constants/homePage";
import ChartContainer from "@/containers/Chart/chartContainer";
import MyChart from "@/containers/Chart/MyPieChart";
import StripContainer from "@/containers/strip/stripContainer";
import TransactionCardContainer from "@/containers/transactionCard/transactionCardContainer";
import Settlements from "./admin_role/page";

const Home = () => {
  const handleActionClick = (action: any, row: any) => {
    console.log(`${action} clicked for`, row);
    // Add your action handling logic here
  };

  const actions = ["Edit", "Delete"];

  return (
    <main className="p-2 flex flex-col gap-6 ">
      <StripContainer {...merchantStrip} />
      <StripContainer {...agentStrip} />
      <TransactionCardContainer {...payinTransaction} />
      <TransactionCardContainer {...payoutTransaction} />
      <ChartContainer />
      <ChartContainer />
      {/* <Settlements /> */}
    </main>
  );
};

export default Home;
