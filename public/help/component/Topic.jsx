export default function Topic(){
    return(
        <>
        <section className="py-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-semibold flex justify-center">
                Browse by topic
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Topic Card 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Organizing Groups and Events"
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-lg font-medium">
                  Organizing Groups and Events
                </h3>
              </div>

              {/* Topic Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Using Meetup"
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-lg font-medium">Using Meetup</h3>
              </div>

              {/* Topic Card 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Account, Notifications, and Payments"
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-lg font-medium">
                  Account, Notifications, and Payments
                </h3>
              </div>
            </div>
          </section></>
    )
}