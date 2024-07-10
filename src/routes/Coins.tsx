
import styled from "styled-components";

const Container = styled.div``;

const Header = styled.div``;

const CoinList = styled.ul``;
const Coin = styled.li``;


const Title = styled.h1`
   color:${prop => prop.theme.accentColor};
`;
function Coins() {
   return <Container>
      <Header>
         <Title>Coins</Title>
      </Header>
      <CoinList>
         <Coin></Coin>
      </CoinList>
   </Container>

}

export default Coins;