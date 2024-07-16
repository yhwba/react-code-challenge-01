import { BrowserRouter, Route, Switch } from "react-router-dom"
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

// const url = "/react-code-challenge-01"
interface IRouterProps {
}

function Router({ }: IRouterProps) {
   return <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
         <Route exact path={`/`}>
            <Coins />
         </Route>
         <Route path={"/:coinId"}>
            <Coin />
         </Route>

      </Switch>
   </BrowserRouter>
}
export default Router;