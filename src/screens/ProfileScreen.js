import React from "react";
import "./ProfileScreen.css";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import PlansScreen from "./PlansScreen";

function ProfileScreen() {
   const user = useSelector(selectUser);
   const history = useHistory();

   const signOut = () => {
      auth.signOut();
      history.push("/");
   };

   return (
      <div className="profilescreen">
         <Nav />
         <div className="profilescreen-body">
            <h1>Edit profile</h1>
            <div className="profilescreen-info">
               <img
                  src="https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
                  alt="avatar"
               />
               <div className="profilescreen-details">
                  <h2>{user.email}</h2>
                  <div className="profilescreen-plans">
                     <h3>Plans</h3>
                     <PlansScreen />
                     <button onClick={() => signOut()} className="profilescreen-btn">
                        Sign Out
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProfileScreen;
