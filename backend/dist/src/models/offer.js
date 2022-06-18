"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OfferSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    auction: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Auction',
        required: true
    },
});
OfferSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
OfferSchema.set('toJSON', {
    virtuals: true,
});
exports.Offer = mongoose_1.default.model('Offer', OfferSchema);
//# sourceMappingURL=offer.js.map