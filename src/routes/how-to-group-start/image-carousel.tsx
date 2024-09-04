import { component$ } from "@builder.io/qwik";

export const ImageCarousel = component$(() => {
  return (
    <div>
      <img
        width={320}
        height={320}
        src="https://www.meetup.com/_next/image/?url=%2Fimages%2Fhow-to-group-start%2Fslide-4.webp&w=3840&q=75"
        class="aspect-square h-80 w-full rounded-lg object-cover"
      />
    </div>
  );
});
