import './App.css';
import PaginationComponent from './modules/RecipesCard';
import LandingPage from './modules/LandingPage';
import RecipeDetail from './modules/RecipeDetail';
import Nav from './modules/Nav/Nav';
import { Route } from 'react-router-dom';
import CreateRecipe from './modules/CreateRecipe/CreateRecipe';

function App() {
  return (
    <div className="App">
      <Nav path="/home" component={Nav}/>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={PaginationComponent}/>
      <Route path="/home/:id" component={RecipeDetail}/>
      <Route path="/recipe" component={CreateRecipe}/>
    </div>
  );
}

export default App;
