// Toast.jsx

// eslint-disable-next-line react/prop-types
function Toast({ show, message }) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center">
      <div
        style={{ height: "200px", width: "800px" }}
        className="flex items-center justify-center rounded bg-orange-500 text-xl text-white"
      >
        {message}
      </div>
    </div>
  );
}

export { Toast };
