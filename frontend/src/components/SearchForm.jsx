import { useState } from "react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import clsx from "clsx";

const EXAMPLES = [
  "10-person leadership retreat in the Himalayas for 3 days, $8k budget",
  "50-person sales kickoff in Mumbai with team-building, $30k budget",
  "Intimate 6-person board strategy offsite in Goa, beachside, 2 days",
  "25-person product team hackathon in Bangalore, urban venue, $15k",
];

export default function SearchForm({ onSubmit, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length >= 10 && !loading) onSubmit(query.trim());
  };

  const handleExample = (ex) => {
    setQuery(ex);
  };

  const isValid = query.trim().length >= 10;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-10 animate-fade-up">
        <div className="inline-flex items-center gap-2 badge mb-6">
          <Sparkles size={12} className="text-amber" />
          <span className="text-amber">AI-Powered Venue Intelligence</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-4">
          Your Perfect
          <br />
          <em className="text-amber not-italic">Corporate Offsite</em>
        </h1>
        <p className="text-dim font-sans text-base sm:text-lg max-w-lg mx-auto">
          Describe your event in plain English. Our AI concierge curates the
          ideal venue proposal — instantly.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="animate-fade-up"
        style={{ animationDelay: "0.1s", opacity: 0 }}
      >
        <div
          className={clsx(
            "relative rounded-2xl transition-all duration-300",
            "bg-charcoal border",
            isValid ? "border-amber/50 shadow-amber" : "border-border",
          )}
        >
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (isValid && !loading) onSubmit(query.trim());
              }
            }}
            placeholder="Describe your event... (e.g. '15-person leadership retreat in the mountains, 4 days, $12k budget, needs breakout rooms and outdoor activities')"
            rows={4}
            disabled={loading}
            className={clsx(
              "w-full bg-transparent px-5 pt-5 pb-16 text-silver placeholder:text-muted",
              "font-sans text-sm sm:text-base resize-none outline-none leading-relaxed",
              "disabled:opacity-60",
            )}
          />

          {/* Character count + submit */}
          <div className="absolute bottom-4 left-5 right-4 flex items-center justify-between">
            <span className="font-mono text-xs text-muted">
              {query.length > 0 && (
                <>
                  {query.trim().length < 10
                    ? `${10 - query.trim().length} more chars needed`
                    : `${query.length} chars`}
                </>
              )}
            </span>

            <button
              type="submit"
              disabled={!isValid || loading}
              className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Planning…
                </>
              ) : (
                <>
                  Find Venues
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Example prompts */}
      <div
        className="mt-5 animate-fade-up"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        <p className="text-center text-muted text-xs font-mono mb-3 uppercase tracking-widest">
          Try an example
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => handleExample(ex)}
              disabled={loading}
              className="text-xs text-dim hover:text-silver border border-border hover:border-amber/40
                         bg-charcoal hover:bg-slate px-3 py-1.5 rounded-lg transition-all duration-200
                         font-sans truncate max-w-[260px] disabled:opacity-40"
            >
              {ex.length > 45 ? ex.slice(0, 45) + "…" : ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
