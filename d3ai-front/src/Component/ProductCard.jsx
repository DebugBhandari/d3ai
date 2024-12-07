import "../Styles/ProductCard.css";
import Button from '@mui/material/Button';
import cardImage from "../assets/mlmedicine.webp";
import { baseUrl } from '../config/constants';
import useZuStore from "../zuStore";


function ProductCard() {

    const activeUser = useZuStore(state => state.activeUser);

    const handlePrebook = () => {
        if(activeUser.email && activeUser.stripeCustomerId=="Non Stripe User")window.location.href = baseUrl + "/prebook";
        else if(activeUser.email && activeUser.stripeCustomerId!="Non Stripe User")alert("You have already prebooked the product");
        else alert("Please login to prebook the product");
    }
  return (
    <div className="productCard">
       
        <div className="productCard_info">
        <h2 style={{marginBottom: "20px", color:"#1976d2"}}>Disease Prediction ML Model</h2>
            <img src={cardImage} alt="ML Medicine" className="cardImage"/>
           
            <p>Grab your hands on our industry defining, 90% accurate disease predicting ML model. This model is specifically designed keeping
                medical professionals in mind. It can predict diseases like cancer, diabetes, heart diseases etc. with 90% accuracy.
             
            </p>
            <h3 style={{marginBottom: "20px", marginTop:"10px"}}>Prebooking Price: 10€</h3>
            <Button variant="contained" color="primary" sx={{marginBottom:"20px"}} onClick={handlePrebook} disabled={activeUser.email && activeUser.stripeCustomerId!="Non Stripe User"}>Prebook Now</Button>
        </div>
      
    </div>
  )
}

export default ProductCard
