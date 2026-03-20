import mongoose from 'mongoose';

const venueProposalSchema = new mongoose.Schema({
  venueName: { type: String, required: true },
  location: { type: String, required: true },
  estimatedCost: { type: String, required: true },
  whyItFits: { type: String, required: true },
  amenities: [{ type: String }],
  capacity: { type: String },
  eventType: { type: String },
});

const eventSearchSchema = new mongoose.Schema(
  {
    userQuery: {
      type: String,
      required: true,
      trim: true,
    },
    proposal: {
      type: venueProposalSchema,
      required: true,
    },
    metadata: {
      attendees: String,
      duration: String,
      budget: String,
      location: String,
    },
  },
  {
    timestamps: true,
  }
);

export const EventSearch = mongoose.model('EventSearch', eventSearchSchema);