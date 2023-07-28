import StripeCheckout from "react-stripe-checkout";
import { useHandleTokenMutation } from "../store";

function Payments() {
  const [handleToken, handleTokenResults] = useHandleTokenMutation();

  const tokenHandler = (token) => {
    handleToken(token);
  };

  return (
    <div>
      <StripeCheckout
        name="Emaily"
        description="10€ for 10 credits"
        amount={1000}
        currency="EUR"
        token={(token) => tokenHandler(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn"> Add Credits</button>
      </StripeCheckout>
    </div>
  );
}

export default Payments;
