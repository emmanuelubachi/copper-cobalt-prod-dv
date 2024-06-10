export default function ErrorProjectNotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-h1 text-red-800">Project Not Found!</h1>
        <p className="text-p">No project found with the given ID.</p>
      </div>
    </div>
  );
}
