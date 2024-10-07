import React from "react";
import Header from "./component/Header";
import Detail from "./component/Detail"
import Footer from "./component/Footer"
export default function Help() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Top Header Section */}
        <Header/>
        {/* Main Content Section */}
        <Detail/>
        {/* Footer Section */}
        <Footer/>
      </div>
    </>
  );
}

