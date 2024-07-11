import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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

interface RouteParams {
   coinId: string
}

interface RouteState {
   name: string
}

interface InfoType {
   name: string
}

interface PriceInfoType {
   name: string
}



function Coin() {
   const { coinId } = useParams<RouteParams>();
   const [loading, setLoading] = useState<boolean>(true)
   const [info, setInfo] = useState<boolean>(true)
   const [price, setPrice] = useState<boolean>(true)
   const { state } = useLocation<RouteState>()

   useEffect(() => {
      (async () => {
         const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
         const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
         setInfo(infoData)
         setPrice(priceData)
         setLoading(false)
      })();
   }, [])

   return (
      <Container>
         <Header>
            <Title>{state?.name || "Loading.."}</Title>
         </Header>
         {loading ? <Loader>Loading...</Loader> : null}
         <h1>Coin : {coinId}</h1>
      </Container>
   )
}
export default Coin;