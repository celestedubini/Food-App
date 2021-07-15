import './App.css';
import RecipesCard from './modules/RecipesCard';
import LandingPage from './modules/LandingPage';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={RecipesCard}/>
    </div>
  );
}

export default App;
