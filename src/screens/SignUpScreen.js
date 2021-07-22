import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignUpScreen.css";

function SignUpScreen() {
   const emailRef = useRef(null);
   const passwordRef = useRef(null);

   const signIn = (e) => {
      e.preventDefault();
      auth
         .signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
         .then((authUser) => {
            console.log(authUser);
         })
         .catch((error) => {
            alert(error.message);
         });
   };

   const register = () => {
      auth
         .createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
         .then((authUser) => {
            console.log(authUser);
         })
         .catch((error) => {
            alert(error.message);
         });
   };

   return (
      <div className="signupscreen">
         <form>
            <h2>Sign In</h2>
            <input type="email" placeholder="Email" ref={emailRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button type="submit" onClick={signIn}>
               Sign In
            </button>

            <h4 className="signup-form">
               <span className="signup-gray">new to netflix?</span>
               <span className="signup-underline" onClick={register}>
                  sign up now
               </span>
            </h4>
         </form>
      </div>
   );
}

export default SignUpScreen;
