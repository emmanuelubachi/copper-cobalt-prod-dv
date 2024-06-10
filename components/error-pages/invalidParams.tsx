export default function ErrorInvalidParams() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-h1 text-red-800">Invalid Parameters!</h1>
        <p className="text-p">
          The parameters provided in the URL are invalid.
        </p>
      </div>
    </div>
  );
}
