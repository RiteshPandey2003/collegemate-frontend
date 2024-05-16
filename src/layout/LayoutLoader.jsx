import React from "react";

const LayoutLoader = () => {
  return (
    <div className="justify-center items-center h-screen bg-gray-900 text-white px-10 overflow-hidden">
      <header className="w-full md:w-auto bg-gray-300 rounded-md mb-4 animate-pulse h-20"></header>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 ">

        {[...Array(28)].map((_, index) => (
          <div
            key={index}
            className="w-full md:w-auto bg-gray-300 rounded-md mb-4 animate-pulse h-[180px]"
          ></div>
        ))}
      </div>
    </div>
  );
};

export { LayoutLoader };
