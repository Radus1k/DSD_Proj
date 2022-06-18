"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AuctionSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number
    },
    expires: {
        type: Date
    }
});
AuctionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
AuctionSchema.set('toJSON', {
    virtuals: true,
});
exports.Auction = mongoose_1.default.model('Auction', AuctionSchema);
//# sourceMappingURL=auction.js.map