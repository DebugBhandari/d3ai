import "../Styles/Orders.css";
import useZuStore from "../zuStore";

function Orders() {
    const activeUser = useZuStore(state => state.activeUser);
  return (
    <div className="orders">
        <h3>Hi, {activeUser.fullname}. Here are your orders.</h3>
      {activeUser.email && activeUser.stripeCustomerId!="Non Stripe User"?<div className="orders_info">
        <h3>Disease Prediction ML Model</h3>
        <p>Quantity: 1</p>
        <p>Price: 10€</p>
        <h4>Payment Status: Paid</h4>
        
        </div>:<h3>No Orders Found</h3>}
    </div>
  )
}

export default Orders
