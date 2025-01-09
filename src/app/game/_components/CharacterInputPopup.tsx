"use client";

import { useState } from "react";

interface CharacterInputPopupProps {
  onClose: () => void;
  onSubmit: (char: string) => void;
}

const CharacterInputPopup: React.FC<CharacterInputPopupProps> = ({
  onClose,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue(""); // Clear input
    } else {
      setErrorMessage("*Input cannot be empty");
    }
  };

  return (
    <div className="absolute w-[30rem] h-[15rem] rounded-2xl drop-shadow-2xl bg-grey-tertiary p-6 flex items-center justify-center border-BH-primary border-[4px]">
      <div className="h-full relative">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between h-full"
        >
          <div className="flex flex-col gap-4">
            <label
              htmlFor="characterInput"
              className="text-BH-primary font-pixel-semibold text-2xl"
            >
              Enter a Unicode character:
            </label>
            <div className="w-full flex flex-col items-center justify-center">
              <input
                type="text"
                id="characterInput"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="outline-none bg-grey-tertiary border-2 px-2 py-1 text-BH-primary font-pixel-semibold border-BH-primary rounded-md"
              />
              {errorMessage && (
                <p className="text-red-error font-pixel-semibold text-lg mt-2">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-BH-primary text-2xl font-pixel-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-BH-primary text-2xl font-pixel-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* <div
        className="absolute text-3xl font-pixel-bold text-BH-primary right-3 top-0 cursor-pointer"
        onClick={onClose}
      >
        x
      </div> */}
    </div>
  );
};

export default CharacterInputPopup;
