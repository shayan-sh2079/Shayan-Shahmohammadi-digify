"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onChange: (value: string) => void;
}

export default function SearchBar(props: Props) {
  const [txt, setTxt] = useState("");
  const prevTxt = useRef("");

  const handleDelete = () => {
    setTxt("");
    props.onChange("");
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (txt !== prevTxt.current) {
      timeout = setTimeout(() => {
        prevTxt.current = txt;
        props.onChange(txt);
      }, 500);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [txt]);

  return (
    <div className="relative grow">
      <input
        type="text"
        placeholder="Search countries..."
        value={txt}
        onChange={(e) => setTxt(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        aria-label="Search countries"
      />
      {txt && (
        <button
          onClick={handleDelete}
          className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
