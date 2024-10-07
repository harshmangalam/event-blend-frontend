import React from "react"
export default function Help(){
    return(
        <> <section className="bg-gray-800 py-10">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold">How can we help you today?</h1>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 w-1/3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-400 mt-2">
              Popular searches: leadership team, meetup pro, upload photos
            </p>
          </div>
        </div>
      </section> </>
    );
}