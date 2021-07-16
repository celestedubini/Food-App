import './App.css';
import PaginationComponent from './modules/RecipesCard';
import LandingPage from './modules/LandingPage';
import RecipeDetail from './modules/RecipeDetail';
import Nav from './modules/Nav/Nav';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/home" component={Nav}/>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={PaginationComponent}/>
      <Route path="/home/:id" component={RecipeDetail}/>
    </div>
  );
}

export default App;
