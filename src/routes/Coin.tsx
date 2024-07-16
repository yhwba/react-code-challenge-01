import {
   Switch,
   Route,
   useLocation,
   useParams,
   useRouteMatch,
} from "react-router-dom";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
   padding: 0 2px;
   max-width: 480px;
   margin: 0 auto;
`;

const Header = styled.div` 
   height:10vh;
   margin: 20px 0;
   display: flex;
   justify-content: center;
   align-items: center;
   
   `;
const BackBtn = styled.div`
   i {
      font-size: 22px;
   }
`;

const Title = styled.h1`
   color:${prop => prop.theme.accentColor};
   font-size: 40px;
   flex-grow: 1;
   text-align: center;
`;

const Loader = styled.div`
   text-align: center;
   display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid white;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardBgColor};
  border: 1px solid white;
  border-radius: 10px;
  color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
      display: block;
      padding: 7px 0px;

  }
`;

interface RouteParams {
   coinId: string
}

interface RouteState {
   name: string
}

interface IInfoData {
   id: string;
   name: string;
   symbol: string;
   rank: number;
   is_new: boolean;
   is_active: boolean;
   type: string;
   logo: string;
   description: string;
   message: string;
   open_source: boolean;
   started_at: string;
   development_status: string;
   hardware_wallet: boolean;
   proof_type: string;
   org_structure: string;
   hash_algorithm: string;
   first_data_at: string;
   last_data_at: string;

}

export interface IPriceInfoData {
   id: string;
   name: string;
   symbol: string;
   rank: number;
   total_supply: number;
   max_supply: number;
   beta_value: number;
   first_data_at: string;
   last_updated: string;
   quotes: {
      USD: {
         price: number,
         volume_24h: number,
         volume_24h_change_24h: number,
         market_cap: number,
         market_cap_change_24h: number,
         percent_change_15m: number,
         percent_change_30m: number,
         percent_change_1h: number,
         percent_change_6h: number,
         percent_change_12h: number,
         percent_change_24h: number,
         percent_change_7d: number,
         percent_change_30d: number,
         percent_change_1y: number,
         ath_price: number,
         ath_date: string
         percent_from_price_ath: number,
      }
   }
}
interface ICoinProps {
}



function Coin({ }: ICoinProps) {
   const { coinId } = useParams<RouteParams>();
   const { state } = useLocation<RouteState>()
   const priceMatch = useRouteMatch("/:coinId/price");
   const chartMatch = useRouteMatch("/:coinId/chart");
   const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
      ["info", coinId],
      () => fetchCoinInfo(coinId)
   );
   const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceInfoData>(
      ["tickers", coinId],
      () => fetchCoinTickers(coinId), {
      // refetchInterval: 5000
   }
   );
   const loading = infoLoading || tickersLoading;


   return (
      <Container>
         <Helmet>
            <title>
               {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
            </title>
         </Helmet>
         <Header>
            <BackBtn>
               <Link to={`/`}><i className="xi-arrow-left" /></Link>
            </BackBtn>
            <Title>
               {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
            </Title>
         </Header>
         {loading ? (
            <Loader>Loading...</Loader>
         ) : (
            <>
               <Overview>
                  <OverviewItem>
                     <span>Rank:</span>
                     <span>{infoData?.rank}</span>
                  </OverviewItem>
                  <OverviewItem>
                     <span>Symbol:</span>
                     <span>${infoData?.symbol}</span>
                  </OverviewItem>
                  <OverviewItem>
                     <span>Price:</span>
                     <span>{tickersData?.quotes?.USD.price.toFixed(3)}</span>
                  </OverviewItem>
               </Overview>
               <Description>{infoData?.description}</Description>
               <Overview>
                  <OverviewItem>
                     <span>Total Suply:</span>
                     <span>{tickersData?.total_supply}</span>
                  </OverviewItem>
                  <OverviewItem>
                     <span>Max Supply:</span>
                     <span>{tickersData?.max_supply}</span>
                  </OverviewItem>
               </Overview>
               <Tabs>
                  <Tab isActive={chartMatch !== null}>
                     <Link to={`/${coinId}/chart`}>Chart</Link>
                  </Tab>
                  <Tab isActive={priceMatch !== null}>
                     <Link to={`/${coinId}/price`}>Price</Link>
                  </Tab>
               </Tabs>
               <Switch>
                  <Route path={`/:coinId/price`}>
                     <Price coinId={coinId} infoData={tickersData} />
                  </Route>
                  <Route path={`/:coinId/chart`} >
                     <Chart coinId={coinId} />
                  </Route>
               </Switch>
            </>
         )}
      </Container>
   )
}
export default Coin;