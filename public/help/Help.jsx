import { component$, useResource$ } from "@builder.io/qwik";

export default component$(() => {
  const Header = useResource$(() => import("./component/Header"));
  const Detail = useResource$(() => import("./component/Detail"));
  const Footer = useResource$(() => import("./component/Footer"));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Header Section */}
      <Header />
      {/* Main Content Section */}
      <Detail />
      {/* Footer Section */}
      <Footer />
    </div>
  );
});
