import { Loader2, Sparkles } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="max-w-2xl mx-auto mt-12 animate-fade-up">
      <div className="card p-8 text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-amber/20"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-amber animate-spin"></div>
          <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-amber animate-pulse" />
        </div>
        
        <h3 className="text-white font-display text-lg mb-2">
          Curating Your Perfect Venue
        </h3>
        
        <p className="text-dim text-sm max-w-sm mx-auto mb-6">
          Our AI is analyzing your requirements and finding the ideal venue match...
        </p>
        
        <div className="flex flex-col gap-2 text-xs text-muted">
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 bg-amber rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <span>Analyzing event requirements</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 bg-amber rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span>Searching venue database</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 bg-amber rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <span>Generating personalized proposal</span>
          </div>
        </div>
      </div>
    </div>
  );
}