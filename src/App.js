import Landing from './components/Landing/Landing.js'
import Checkout from './components/Checkout/Checkout.js'
import SignIn from './components/SignIn/SignIn.js'
import SignUp from './components/SignUp/SignUp.js'
import Admin from "./components/Admin/Admin.js"
import Dashboard from "./components/Admin/Dashboard.js"
import AddCar from "./components/Admin/AddCar"
import Inventory from "./components/Admin/Inventory"
import SpecificCar from "./components/Admin/SpecificCar"
import Orders from "./components/Admin/Orders"
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
        <Route path="/admin-inventory" component={Inventory} exact />
        <Route path="/admin-specific-car" component={SpecificCar} exact />
        <Route path="/admin-orders" component={Orders} exact />
    </Switch>
  </main>
  );
}

export default App;