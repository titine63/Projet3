// Toast.jsx

// eslint-disable-next-line react/prop-types
export default function Toast({ show, message }) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed left-1/2 top-1/2 z-50 flex h-[200px] w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded bg-orange-500 text-xl text-white">
      {message}
    </div>
  );
}
