import { Clock, Trash2, ChevronRight } from 'lucide-react';

export default function HistoryPanel({ 
  history, 
  historyLoaded, 
  historyLoading, 
  onLoad, 
  onSelect, 
  onDelete, 
  selectedId 
}) {
  if (!historyLoaded && !historyLoading) {
    return (
      <div className="card p-6">
        <button
          onClick={onLoad}
          className="w-full py-3 px-4 bg-amber/10 hover:bg-amber/20 
                     border border-amber/30 rounded-lg transition-all
                     text-amber text-sm font-medium"
        >
          Load History
        </button>
      </div>
    );
  }

  if (historyLoading) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber"></div>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="card p-6 text-center">
        <Clock size={32} className="text-muted mx-auto mb-3" />
        <p className="text-dim text-sm">No history yet</p>
        <p className="text-muted text-xs mt-1">Your past searches will appear here</p>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <h3 className="text-white font-display text-lg mb-3 flex items-center gap-2">
        <Clock size={16} className="text-amber" />
        Recent Searches
      </h3>
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {history.map((item) => (
          <div
            key={item._id}
            className={`group p-3 rounded-lg cursor-pointer transition-all
                       border ${
                         selectedId === item._id
                           ? 'border-amber/50 bg-amber/5'
                           : 'border-border hover:border-amber/30 hover:bg-slate/30'
                       }`}
            onClick={() => onSelect(item)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-silver text-sm font-medium truncate">
                  {item.proposal?.venueName || 'Venue Proposal'}
                </p>
                <p className="text-muted text-xs truncate mt-1">
                  {item.userQuery?.substring(0, 60)}...
                </p>
                <p className="text-dim text-xs mt-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item._id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/10 
                           rounded transition-all text-rust"
                >
                  <Trash2 size={14} />
                </button>
                <ChevronRight size={14} className="text-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}