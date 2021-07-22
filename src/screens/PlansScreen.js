import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import "./PlansScreen.css";

function PlansScreen() {
   const [products, setProducts] = useState([]);
   const user = useSelector(selectUser);
   const [subscription, setSubscription] = useState(null);

   useEffect(() => {
      db.collection("customers")
         .doc(user.uid)
         .collection("subscriptions")
         .get()
         .then((querySnapshot) => {
            querySnapshot.forEach(async (subscription) => {
               setSubscription({
                  role: subscription.data().role,
                  period_start: subscription.data().current_period_start.seconds,
                  period_end: subscription.data().current_period_end.seconds,
               });
            });
         });
   }, [user.uid]);

   useEffect(() => {
      db.collection("products")
         .where("active", "==", true)
         .get()
         .then(function (querySnapshot) {
            const newProducts = {};
            querySnapshot.forEach(async function (doc) {
               newProducts[doc.id] = doc.data();
               const priceSnap = await doc.ref.collection("prices").get();
               priceSnap.docs.forEach((price) => {
                  newProducts[doc.id].price = {
                     priceID: price.id,
                     priceData: price.data(),
                  };
               });
               setProducts(newProducts);
            });
         });
   }, []);

   const loadCheckout = async (priceID) => {
      const docRef = await db.collection("customers").doc(user.uid).collection("checkout_sessions").add({
         price: priceID,
         success_url: window.location.origin,
         cancel_url: window.location.origin,
      });
      // Wait for the CheckoutSession to get attached by the extension
      docRef.onSnapshot(async (snap) => {
         const { error, sessionId } = snap.data();
         if (error) {
            // Show an error to your customer and
            // inspect your Cloud Function logs in the Firebase console.
            alert(`An error occured: ${error.message}`);
         }
         if (sessionId) {
            // We have a session, let's redirect to Checkout
            // Init Stripe
            const stripe = await loadStripe(
               "pk_test_51J2fcMH6t8PaxgllRMSPjQEJxs6Q4t4s6kQCdwWznQcraIN8CrSy0WM2enD4OWrAVhN52YT2OPBIts7ZxjOdsQ8F00Yvj6VOZS"
            );
            stripe.redirectToCheckout({ sessionId });
         }
      });
   };

   return (
      <div className="plansscreen">
         {subscription && <p>Renewal date: {new Date(subscription?.period_end * 1000).toLocaleDateString()}</p>}
         {Object.entries(products).map(([key, value]) => {
            const isCurrentPackage = value.name?.toLowerCase().includes(subscription?.role);
            return (
               <div className={`${isCurrentPackage && "disabled"} plansscreen-plan`} key={key}>
                  <div className="plansscreen-info">
                     <h4>{value.name}</h4>
                     <h6>{value.description}</h6>
                  </div>
                  <button onClick={() => !isCurrentPackage && loadCheckout(value.price.priceID)}>
                     {isCurrentPackage ? "Current Package" : "Subscribe"}
                  </button>
               </div>
            );
         })}
      </div>
   );
}

export default PlansScreen;
