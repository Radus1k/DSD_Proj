import mongoose from 'mongoose';

const AuctionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    expires: {
        required: true,
        type: Date
    }
});

AuctionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
AuctionSchema.set('toJSON', {
    virtuals: true,
});


export const Auction = mongoose.model('Auction', AuctionSchema);
