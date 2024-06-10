export default function ErrorServerError() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-h1 text-red-800">An Error Occurred!</h1>
        <p className="text-p">
          There was an error processing your request. Please try again later.
        </p>
      </div>
    </div>
  );
}
