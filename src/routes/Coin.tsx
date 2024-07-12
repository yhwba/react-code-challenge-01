import { useEffect, useState } from "react";
import { Switch, Route, useLocation, useParams } from "react-router";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
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

const Title = styled.h1`
   color:${prop => prop.theme.accentColor};
   font-size: 40px;
`;

const Loader = styled.div`
   text-align: center;
   display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

interface IPriceInfoData {
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



function Coin() {
   const { coinId } = useParams<RouteParams>();
   const [loading, setLoading] = useState<boolean>(true)
   const [info, setInfo] = useState<IInfoData>()
   const [priceInfo, setPriceInfo] = useState<IPriceInfoData>()
   const { state } = useLocation<RouteState>()

   useEffect(() => {
      (async () => {
         const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
         const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
         setInfo(infoData)
         setPriceInfo(priceData)
         setLoading(false)
      })();
   }, [coinId])

   return (
      <Container>
         <Header>
            <Title>
               {state?.name ? state.name : loading ? "Loading..." : info?.name}
            </Title>
         </Header>
         {loading ? (
            <Loader>Loading...</Loader>
         ) : (
            <>
               <Overview>
                  <OverviewItem>
                     <span>Rank:</span>
                     <span>{info?.rank}</span>
                  </OverviewItem>
                  <OverviewItem>
                     <span>Symbol:</span>
                     <span>${info?.symbol}</span>
                  </OverviewItem>
                  <OverviewItem>
                     <span>Open Source:</span>
                     <span>{info?.open_source ? "Yes" : "No"}</span>
                  </OverviewItem>
               </Overview>
               <Description>{info?.description}</Description>
               <Overview>
                  <OverviewItem>
                     <span>Total Suply:</span>
                     <span>{priceInfo?.total_supply}</span>
                  </OverviewItem>
                  <OverviewItem>
                     <span>Max Supply:</span>
                     <span>{priceInfo?.max_supply}</span>
                  </OverviewItem>
               </Overview>
               <Switch>
                  <Route path={`/${coinId}/price`}>
                     <Price />
                  </Route>
                  <Route path={`/${coinId}/chart`}>
                     <Chart />
                  </Route>
               </Switch>
            </>
         )}
         <h1>Coin : {coinId}</h1>
      </Container>
   )
}
export default Coin;