import { component$ } from "@builder.io/qwik";
export default component$(() => {
  return (
    <>
      <section className="py-16">
        <div className="mb-10 text-center">
          <h2 className="flex justify-center text-2xl font-semibold">
            Browse by topic
          </h2>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Topic Card 1 */}
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
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
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
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
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
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
      </section>
    </>
  );
});
