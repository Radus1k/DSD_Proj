import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    auction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction',
        required:true
    },
});

OfferSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

OfferSchema.set('toJSON', {
    virtuals: true,
});


export const Offer = mongoose.model('Offer', OfferSchema);
