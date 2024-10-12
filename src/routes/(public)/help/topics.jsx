import { component$ } from "@builder.io/qwik";
export const Topics = component$(() => {
  return (
    <>
      <section class="py-16">
        <div class="mb-10 text-center">
          <h2 class="flex justify-center text-2xl font-semibold">
            Browse by topic
          </h2>
        </div>
        <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Topic Card 1 */}
          <div class="rounded-lg bg-white p-6 text-center shadow-md">
            <div class="mb-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Organizing Groups and Events"
                class="mx-auto"
              />
            </div>
            <h3 class="text-lg font-medium">Organizing Groups and Events</h3>
          </div>

          {/* Topic Card 2 */}
          <div class="rounded-lg bg-white p-6 text-center shadow-md">
            <div class="mb-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Using Meetup"
                class="mx-auto"
              />
            </div>
            <h3 class="text-lg font-medium">Using Meetup</h3>
          </div>

          {/* Topic Card 3 */}
          <div class="rounded-lg bg-white p-6 text-center shadow-md">
            <div class="mb-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Account, Notifications, and Payments"
                class="mx-auto"
              />
            </div>
            <h3 class="text-lg font-medium">
              Account, Notifications, and Payments
            </h3>
          </div>
        </div>
      </section>
    </>
  );
});
