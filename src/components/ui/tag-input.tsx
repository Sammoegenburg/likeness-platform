"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  label?: string;
  helpText?: string;
}

export function TagInput({ value, onChange, placeholder, suggestions, label, helpText }: TagInputProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
    setShowSuggestions(false);
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const filteredSuggestions = suggestions?.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !value.includes(s)
  );

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-zinc-400">{label}</label>
      )}
      <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-2 focus-within:border-accent/50 transition-colors">
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
            >
              {tag}
              <button
                onClick={() => removeTag(i)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={value.length === 0 ? placeholder : "Add more..."}
            className="min-w-[120px] flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-600 outline-none"
          />
        </div>
      </div>
      {helpText && (
        <p className="mt-1 text-[11px] text-zinc-600">{helpText}</p>
      )}
      {showSuggestions && filteredSuggestions && filteredSuggestions.length > 0 && (
        <div className="mt-1 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-lg">
          {filteredSuggestions.slice(0, 5).map((s) => (
            <button
              key={s}
              onMouseDown={() => addTag(s)}
              className="block w-full rounded-md px-2.5 py-1.5 text-left text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
