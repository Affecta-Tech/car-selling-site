import logo from './logo.svg';
import Landing from './components/Landing/Landing.js'
import Checkout from './components/Checkout/Checkout.js'
import PaymentForm from './components/Checkout/PaymentForm.js'
import AddressForm from './components/Checkout/AddressForm.js'
import SignIn from './components/SignIn/SignIn.js'
import SignUp from './components/SignUp/SignUp.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <main>
    <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/checkout" component={Checkout} exact />
        <Route path="/signin" component={SignIn} exact />
        <Route path="/signup" component={SignUp} exact />
        {/* <Route path="/about" component={About} />
        <Route path="/shop" component={Shop} /> */}
    </Switch>
  </main>
  );
}

export default App;
