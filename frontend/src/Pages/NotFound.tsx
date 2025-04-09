export default function NotFound() {
  return (
    <div className="text-center mt-20 flex flex-col justify-center items-center">
      <div className="card card-border card-xl shadow-sm bg-error text-error-content w-96">
        <div className="card-body">
          <h2 className="card-title">404 - Not Found</h2>
          <p className="text-2xl">
            Die gesuchte Seite konnte nicht gefunden werden!
          </p>
          <div className="card-actions justify-end">
            <a className="btn btn-soft btn-wide" href="/">
              Zur Startseite
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
