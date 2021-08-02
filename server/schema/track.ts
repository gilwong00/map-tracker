import { model, Schema, Document } from 'mongoose';

export interface PointDocument extends Document {
  timestamp: number;
  coords: {
    latitude: number;
    longitude: number;
    altitude: number;
    accuracy: number;
    heading: number;
    speed: number;
  };
}

export interface TrackDocument extends Document {
  userId: string;
  name: string;
  locations: Array<PointDocument>;
}

const pointSchema = new Schema({
  timestamp: {
    type: Number
  },
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
});

const trackSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    default: ''
  },
  locations: [pointSchema]
});

const Track = model<TrackDocument>('Track', trackSchema);

export default Track;
