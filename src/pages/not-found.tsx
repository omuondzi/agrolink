const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-green-50 text-green-800 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFoundPage;
