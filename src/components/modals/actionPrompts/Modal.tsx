import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const APModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#83838D80] bg-opacity-50 transform transition-transform duration-300 ${isOpen ? "scale-100" : "scale-0"}`}
    >
      <div className="bg-white w-1/2 h-[244px] rounded-[20px] p-12 relative">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default APModal;
