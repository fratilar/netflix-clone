import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../styles/Nav.css";

function Nav() {
   const [show, setShow] = useState(false);
   const history = useHistory();

   const hideNavbar = () => {
      if (window.scrollY > 100) {
         setShow(true);
      } else {
         setShow(false);
      }
   };

   useEffect(() => {
      window.addEventListener("scroll", hideNavbar);
      return () => window.removeEventListener("scroll", hideNavbar);
   }, []);

   return (
      <div className={`nav ${show && "nav_black"}`}>
         <div className="nav_contents">
            <img
               onClick={() => history.push("/")}
               className="nav_logo"
               src="https://occ-0-444-448.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABbbXpFsC33lP-nPka2_0H17FDv2sQRtEEn0Ci_VMii8aJWfh2mOu_5JAgT7l22tPLjGqcRweDcAxPQKqodpzkBTzbu_38dxSc-jV.png?r=2d6"
               alt="netflix logo"
            />
            <img
               onClick={() => history.push("/profile")}
               className="nav_avatar"
               src="https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
               alt="avatar"
            />
         </div>
      </div>
   );
}

export default Nav;
