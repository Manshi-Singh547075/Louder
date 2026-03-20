import { MapPin, DollarSign, Users, Sparkles, Calendar } from 'lucide-react';

export default function ProposalCard({ result, isCurrent }) {
  const proposal = result.proposal;
  const metadata = result.metadata;
  
  if (!proposal) return null;
  
  return (
    <div className={`card p-6 animate-fade-up ${isCurrent ? 'border-amber/30 shadow-glow' : ''}`}>
      {/* Header */}
      <div className="border-b border-border/50 pb-4 mb-4">
        <h2 className="font-display text-2xl text-white mb-2">
          {proposal.venueName}
        </h2>
        <div className="flex items-center gap-2 text-dim text-sm">
          <MapPin size={14} />
          <span>{proposal.location}</span>
        </div>
      </div>
      
      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 p-3 bg-slate/30 rounded-lg">
          <Users size={16} className="text-amber" />
          <div>
            <p className="text-muted text-xs">Capacity</p>
            <p className="text-silver text-sm font-medium">{proposal.capacity || 'Contact for details'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-slate/30 rounded-lg">
          <DollarSign size={16} className="text-amber" />
          <div>
            <p className="text-muted text-xs">Est. Cost</p>
            <p className="text-silver text-sm font-medium">{proposal.estimatedCost}</p>
          </div>
        </div>
      </div>
      
      {/* Why It Fits */}
      <div className="mb-6 p-4 bg-amber/5 rounded-lg border-l-2 border-amber">
        <p className="text-silver text-sm leading-relaxed">{proposal.whyItFits}</p>
      </div>
      
      {/* Amenities */}
      {proposal.amenities?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
            <Sparkles size={14} className="text-amber" />
            Amenities
          </h3>
          <div className="flex flex-wrap gap-2">
            {proposal.amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs bg-slate/30 text-dim rounded-full border border-border"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Event Details */}
      {metadata && Object.keys(metadata).length > 0 && (
        <div className="pt-4 border-t border-border/30">
          <p className="text-muted text-xs">
            Event Type: {proposal.eventType || metadata.eventType || 'Corporate Event'}
          </p>
          {metadata.attendees && (
            <p className="text-muted text-xs mt-1">
              Attendees: {metadata.attendees}
            </p>
          )}
        </div>
      )}
    </div>
  );
}