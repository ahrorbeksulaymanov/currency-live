import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import MainPage from "./components/main-pade";
import ChartValyuta from './components/chart'
import MoreInfoComp from "./components/second-page";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="content-wrapper container">
        <div className="my-3 content">
          <Switch>
            <Route path="/more-valyuta">
              <MoreInfoComp />
            </Route>
            <Route exact path="/">
              <MainPage />
              <ChartValyuta />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
