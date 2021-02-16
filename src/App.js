import Landing from './components/Landing/Landing.js'
import Checkout from './components/Checkout/Checkout.js'
import SignIn from './components/SignIn/SignIn.js'
import SignUp from './components/SignUp/SignUp.js'
import Admin from "./components/Admin/Admin.js"
import Dashboard from "./components/Admin/Dashboard.js"
import AddCar from "./components/Admin/AddCar"
import { Route, Switch } from 'react-router-dom';
function App() {
  return (
    <main>
    <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/checkout" component={Checkout} exact />
        <Route path="/signin" component={SignIn} exact />
        <Route path="/signup" component={SignUp} exact />
        <Route path="/admin-portal" component={Admin} exact />
        <Route path="/admin-dash" component={Dashboard} exact />
        <Route path="/admin-add" component={AddCar} exact />
    </Switch>
  </main>
  );
}

export default App;
