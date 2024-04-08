const LoadingSpinner = () => {
  return (
    <svg
      className="animate-spin h-5 w-5 mr-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.707 4.22l1.48 1.48A5.999 5.999 0 1010 2v2c-2.21 0-4 1.79-4 4.001zM16.879 5.707A7.965 7.965 0 0119.78 11h2.027a9.963 9.963 0 00-3.928-5.573l-1.9 1.9zM20 12c0-2.21-1.79-4-4-4v-2a7.962 7.962 0 013.772 1.217l-1.899 1.899A9.957 9.957 0 0020 12z"
      ></path>
    </svg>
  );
};

export default LoadingSpinner;
