import { component$ } from "@builder.io/qwik";
const infoSections = [
  {
    imageUrl: "https://via.placeholder.com/280",
    title: "Organizing Groups and Events",
    href: "#"
  },
  {
    imageUrl: "https://via.placeholder.com/280",
    title: "Using Meetup",
    href: "#"
  },
  {
    imageUrl: "https://via.placeholder.com/280",
    title: "Account, Notifications, and Payments",
    href: "#"
  },
  {
    imageUrl: "https://via.placeholder.com/280",
    title: "Technical Issues",
    href: "#"
  },
  {
    imageUrl: "https://via.placeholder.com/280",
    title: "EventBlend Pro",
    href: "#"
  },
  {
    imageUrl: "https://via.placeholder.com/280",
    title: "Policies and Community Guidelines",
    href: "#"
  }
];

export const Topics = component$(() => {
  return (
    <>
      <section class="py-16 px-4 mx-auto">
        <div class="mb-10 text-center">
          <h2 class="flex text-3xl font-semibold">
            Browse by topic
          </h2>
        </div>
        <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {infoSections.map((section) => (
            <a
              key={section.title}
              href={section.href}
              class=" block rounded-lg bg-white p-6 text-center hover:shadow-md transform hover:-translate-y-[1px]"
            >
              <div class="mb-4 px-[30px] py-[20px]">
                <img
                  src={section.imageUrl}
                  alt={section.title}
                  class="mx-auto w-[280px]"
                  width={280}
                  height={280}
                />
              </div>
              <h3 class="text-xl font-bold">{section.title}</h3>
            </a>
          ))}
        </div>
      </section>
    </>
  );
});
