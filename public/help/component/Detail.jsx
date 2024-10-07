import Help from "./Help";
import Topic from "./Topic";
export default function Detail(){
    return(
        <>
        <div className="flex-grow">
          {/* Main Header Section */}
          <Help/>
          {/* Browse by Topic Section */}
          <Topic/>
        </div>
        </>
    )
}