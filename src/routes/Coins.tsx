
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
   padding: 0 2px;
   max-width: 480px;
   margin: 0 auto;
`;

const Header = styled.div` 
   height:10vh;
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
      display: block;
      transition: color 0.2s ease-in;
   }
   &:hover{
       a{
         color:${prop => prop.theme.accentColor}
       }
   }
`;

const coins = [{
   id: "btc-bitcoin",
   name: "Bitcoin",
   symbol: "BTC",
   rank: 1,
   is_new: false,
   is_active: true,
   type: "coin",
},
{
   id: "eth-ethereum",
   name: "Ethereum",
   symbol: "ETH",
   rank: 2,
   is_new: false,
   is_active: true,
   type: "coin",
},
{
   id: "hex-hex",
   name: "HEX",
   symbol: "HEX",
   rank: 3,
   is_new: false,
   is_active: true,
   type: "token",
},]


function Coins() {
   return <Container>
      <Header>
         <Title>Coins</Title>
      </Header>
      <CoinList>
         {coins.map(coin => <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
         </Coin>)}
      </CoinList>
   </Container>

}

export default Coins;