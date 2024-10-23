import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Greeting: React.FC = () => {
  const { userData } = useContext(AuthContext);
  return (
    <h4 className="w-[189px] h-[29px] font-semibold text-xl text-[#03CF79]">
      {userData && <span>Hello {userData.user.lastname}</span>}
    </h4>
  );
};

export default Greeting;
