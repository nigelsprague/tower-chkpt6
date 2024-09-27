import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
  name: { type: String, minlength: 3, maxlength: 50, required: true },
  description: { type: String, minlength: 15, maxlength: 1000, required: true },
  coverImg: { type: String, maxlength: 500, required: true },
  location: { type: String, minlength: 1, maxlength: 500, required: true },
  capacity: { type: Number, min: 1, max: 5000, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, default: false, required: true },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true },
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})


TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  ref: 'Ticket',
  foreignField: 'eventId',
  count: true
})