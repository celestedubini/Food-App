import './App.css';
import PaginationComponent from './modules/RecipesCard';
import LandingPage from './modules/LandingPage';
import RecipeDetail from './modules/RecipeDetail';
import Nav from './modules/Nav/Nav';
import { Route, Switch } from 'react-router-dom';
import CreateRecipe from './modules/CreateRecipe/CreateRecipe';
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route>
          <Nav path="/" component={Nav} />
          <Route exact path="/home" component={PaginationComponent} />
          <Route path="/home/:id" component={RecipeDetail} />
          <Route path="/recipe" component={CreateRecipe} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
