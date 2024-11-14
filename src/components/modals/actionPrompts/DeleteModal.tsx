import React from "react";
import APModal from "./Modal";

interface DeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  itemId: string | number;
  children: React.ReactNode;
}

const DeleteModal: React.FC<DeleteProps> = ({ children, isOpen, onClose }) => {
  return <APModal isOpen={isOpen} onClose={onClose} children={children} />;
};

export default DeleteModal;
