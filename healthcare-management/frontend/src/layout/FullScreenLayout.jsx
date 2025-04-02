import { memo } from "react";
import bgimage from '../assets/background.jpeg'

const FullScreenLayout = ({ children, bgColor }) => {

  return (
    <div className={`w-full h-full`} style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
      {children}
    </div>
  );
};

export default memo(FullScreenLayout);
