import React, { useState } from "react";
import "./LoginScreen.css";
import SignUpScreen from "./SignUpScreen";

function LoginScreen() {
   const [signIn, setSignIn] = useState(false);

   return (
      <div className="loginscreen">
         <div className="loginscreen-bg">
            <img
               className="loginscreen-logo"
               src="https://occ-0-444-448.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABbbXpFsC33lP-nPka2_0H17FDv2sQRtEEn0Ci_VMii8aJWfh2mOu_5JAgT7l22tPLjGqcRweDcAxPQKqodpzkBTzbu_38dxSc-jV.png?r=2d6"
               alt="netflix"
            />
            <button className="sign-btn" onClick={() => setSignIn(true)}>
               Sign in
            </button>
            <div className="loginscreen-overlay"></div>
            <div className="loginscreen-body">
               {signIn ? (
                  <SignUpScreen />
               ) : (
                  <>
                     <h1>Unlimited movies, TV shows and more.</h1>
                     <h2>Watch anywhere, cancel anytime.</h2>
                     <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                     <div className="loginscreen-input">
                        <form>
                           <input type="email" placeholder="Email address" />
                           <button className="input-btn" onClick={() => setSignIn(true)}>
                              Get started
                           </button>
                        </form>
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export default LoginScreen;
