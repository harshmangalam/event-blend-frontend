export default function Header() {
  return (
    <>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Meetup Logo */}
          <div>
            <h2 className="text-red-500">Meetup</h2>
          </div>

          {/* Sign In Button */}
          <div>
            <button className="text-red-600 font-semibold">Sign in</button>
          </div>
        </div>
      </header>
    </>
  );
}
