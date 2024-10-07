import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <footer className="bg-gray-100 py-8 text-gray-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          {/* Left Side Links */}
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-sm">
              Back to Meetup
            </a>
            <span className="text-sm">© Meetup 2024</span>
          </div>

          {/* Right Side Links */}
          <div className="flex space-x-4">
            <a href="#" className="text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-sm">
              Cookie Policy
            </a>
            <a href="#" className="text-sm">
              English (US)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});
