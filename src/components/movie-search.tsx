import { ChangeEvent } from "react";

export default function MovieSearch({ onChange }: { onChange: (term: string) => void }) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const timeOutId = setTimeout(() => {
      onChange(e.target.value.toLowerCase());
    }, 300);

    return () => clearTimeout(timeOutId);    
  }
    
  return <input
    type="text"
    className="border-1 border-solid border-white rounded md:w-100 p-1"
    placeholder="Enter your search term here"
    onChange={(e) => handleChange(e)} />
}