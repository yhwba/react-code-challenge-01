import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { IPriceInfoData } from "./Coin";

const List = styled.ul`
   padding-bottom: 10px;
  
`;

interface IHistorical {
   time_open: string;
   time_close: string;
   open: number;
   high: number;
   low: number;
   close: number;
   volume: number;
   market_cap: number;
}

interface PriceProps {
   coinId: string;
   infoData: IPriceInfoData | undefined
}

function Price({ coinId, infoData }: PriceProps) {
   // const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
   //    fetchCoinHistory(coinId), {
   //    refetchInterval: 10000,
   // }
   // );
   return <>

      <List>
         <li>
            percent_change_15m : {infoData?.quotes?.USD.percent_change_15m}
         </li>
         <li>
            percent_change_30m : {infoData?.quotes?.USD.percent_change_30m}
         </li>
         <li>
            percent_change_1h : {infoData?.quotes?.USD.percent_change_1h}
         </li>
         <li>
            percent_change_6h : {infoData?.quotes?.USD.percent_change_6h}
         </li>
         <li>
            percent_change_12h : {infoData?.quotes?.USD.percent_change_12h}
         </li>
         <li>
            percent_change_24h : {infoData?.quotes?.USD.percent_change_24h}
         </li>
         <li>
            percent_change_7d : {infoData?.quotes?.USD.percent_change_7d}
         </li>
         <li>
            percent_change_30d : {infoData?.quotes?.USD.percent_change_30d}
         </li>
         <li>
            percent_change_1y : {infoData?.quotes?.USD.percent_change_1y}
         </li>

      </List>


   </>;
}

export default Price;