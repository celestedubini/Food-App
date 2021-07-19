import './App.css';
import PaginationComponent from './modules/RecipesCard';
import LandingPage from './modules/LandingPage';
import RecipeDetail from './modules/RecipeDetail';
import Nav from './modules/Nav/Nav';
import { Route, Switch } from 'react-router-dom';
import CreateRecipe from './modules/CreateRecipe/CreateRecipe';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route>
          <Nav path="/home" component={Nav} />
          <Route exact path="/home" component={PaginationComponent} />
          <Route path="/home/:id" component={RecipeDetail} />
          <Route path="/recipe" component={CreateRecipe} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
