import { memo } from "react";
import TopNav from "../ui/Topnav";
import bgimage from '../assets/background.jpeg'

const FullScreenLayout = ({ children, bgColor }) => {

  return (
    <div className={`w-full h-full flex flex-col`} style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <div>
            <TopNav />
        </div>
        <div className="overflow-y-auto overflow-x-hidden" style={{height : 'calc(100dvh - 75px)'}}>
          {children}
        </div>
    </div>
  );
};

export default memo(FullScreenLayout);