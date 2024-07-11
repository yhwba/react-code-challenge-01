
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
const CoinList = styled.ul``;

const Coin = styled.li`
   background-color: white;
   color: ${prop => prop.theme.bgColor};
   margin-bottom: 10px;
   padding: 20px;
   border-radius:15px ;
   a {
      display: flex;
      align-items: center;
      padding: 20px;
      transition: color 0.2s ease-in;
   }
   &:hover{
       a{
         color:${prop => prop.theme.accentColor}
       }
   }
`;

const Loader = styled.div`
   text-align: center;
   display: block;
`;


const Image = styled.img`
   height: 25px;
   width: 25px;
   margin-right: 10px;
   `;




interface CoinInterface {
   id: string,
   name: string,
   symbol: string,
   rank: number,
   is_new: boolean,
   is_active: boolean,
   type: string
}


function Coins() {
   const [coins, setCoins] = useState<CoinInterface[]>([])
   const [loading, setLoading] = useState<boolean>(true)


   useEffect(() => {
      (async () => {
         const response = await fetch("https://api.coinpaprika.com/v1/coins")
         const json = await response.json();
         setCoins(json.slice(0, 99))
         setLoading(false)
      })();
   }, [])

   return <Container>

      <Header>
         <Title>Coins</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : <CoinList>
         {coins.map(coin => <Coin key={coin.id}>
            <Link to={{
               pathname: `/${coin.id}`,
               state: {
                  name: coin.name,
               }
            }}>
               <Image
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
               {coin.name} &rarr;
            </Link>
         </Coin>)}
      </CoinList>}
   </Container>

}

export default Coins;