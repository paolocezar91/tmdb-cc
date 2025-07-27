'use client';

import React, { createContext, useCallback, useContext, useState } from "react";
import MovieDetails from "./movie-details";

interface ModalContextType {
  showModal: (movie: Record<string, string | number>) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [movie, setMovie] = useState<Record<string, string | number>>();
  
  const showModal = useCallback((m: Record<string, string | number>) => {
    setOpen(true);
    setMovie(m);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal: handleClose }}>
      {children}
      {open &&
        <div
          className="fixed z-99 rounded text-white bg-gray-800 box-shadow z-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-4 w-[80%]"
        >
          <div className="flex items-start py-2 px-4">
            <MovieDetails movie={movie!}></MovieDetails>
            <button
              className="ml-2 bg-transparent text-white font-bold cursor-pointer"
              onClick={handleClose}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </div>
      }
    </ModalContext.Provider>
  );
};
