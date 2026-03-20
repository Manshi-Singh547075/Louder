import { useState } from "react";
import SearchForm from "./components/SearchForm";
import LoadingState from "./components/LoadingState";
import ProposalCard from "./components/ProposalCard";
// import HistoryPanel from "./components/HistoryPanel";
import { useEventSearch } from "./hooks/UseEventSearch";
import { AlertCircle, X, MapPin, Sparkles } from "lucide-react";

export default function App() {
  const {
    loading,
    error,
    currentResult,
    history,
    historyLoaded,
    historyLoading,
    submit,
    loadHistory,
    remove,
    setCurrentResult,
  } = useEventSearch();

  const [selectedId, setSelectedId] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedId(item._id);
    setViewingItem(item);
    setCurrentResult(null);
  };

  const handleSubmit = (query) => {
    setViewingItem(null);
    setSelectedId(null);
    submit(query);
  };

  const displayResult = currentResult || viewingItem;

  return (
    <div className="min-h-screen bg-obsidian relative overflow-x-hidden">
      {/* Background grid + glow */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]
                      bg-amber-glow pointer-events-none"
      />

      {/* Navbar */}
      <header className="relative z-10 border-b border-border/50 bg-obsidian/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg bg-amber/10 border border-amber/30
                            flex items-center justify-center"
            >
              <MapPin size={15} className="text-amber" />
            </div>
            <div>
              <span className="font-display text-lg text-white font-light tracking-wide">
                Venue
              </span>
              <span className="text-muted text-xs font-mono ml-2 hidden sm:inline">
                AI Event Concierge
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 badge">
            <Sparkles size={11} className="text-amber" />
            <span className="text-amber text-xs">Powered by GPT-4o</span>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Search section — always visible */}
        <SearchForm onSubmit={handleSubmit} loading={loading} />

        {/* Error */}
        {error && (
          <div className="max-w-2xl mx-auto mt-8 animate-fade-up">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-rust/10 border border-rust/30">
              <AlertCircle size={16} className="text-rust shrink-0 mt-0.5" />
              <p className="text-sm text-silver flex-1">{error}</p>
              <button
                onClick={() => {
                  /* clear handled by next submit */
                }}
                className="text-muted hover:text-silver transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && <LoadingState />}

        {/* Results + History two-column layout */}
        {!loading && (displayResult || history.length > 0 || historyLoaded) && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left: proposal */}
            <div className="lg:col-span-2 space-y-4">
              {displayResult ? (
                <ProposalCard
                  result={displayResult}
                  isCurrent={displayResult === currentResult}
                />
              ) : (
                <div className="card p-12 flex flex-col items-center justify-center text-center min-h-[320px]">
                  <div
                    className="w-16 h-16 rounded-full bg-slate border border-border
                                  flex items-center justify-center mb-5"
                  >
                    <MapPin size={24} className="text-muted" />
                  </div>
                  <p className="font-display text-2xl text-white font-light mb-2">
                    Select a past search
                  </p>
                  <p className="text-dim text-sm font-sans max-w-xs">
                    Click any item from your history to view the full venue
                    proposal.
                  </p>
                </div>
              )}
            </div>

            {/* Right: history */}
            {/* <div className="lg:col-span-1">
              <HistoryPanel
                history={history}
                historyLoaded={historyLoaded}
                historyLoading={historyLoading}
                onLoad={loadHistory}
                onSelect={handleSelect}
                onDelete={remove}
                selectedId={selectedId}
              />
            </div> */}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 mt-20 py-8">
        <div
          className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center
                        justify-between gap-3 text-muted text-xs font-mono"
        >
          <span>© 2025 Venue — AI Event Concierge</span>
          <span>React · Vite · Node.js · MongoDB · OpenAI</span>
        </div>
      </footer>
    </div>
  );
}
