import React from 'react';

const LoadingModal = ({ show } : {show:boolean}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80"> {/* 400px width */}
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent border-t-4 border-solid rounded-full animate-spin"></div> {/* Smaller loader */}
        </div>
        <div className="mt-4 text-center">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
