"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auction_1 = require("../models/auction");
const offer_1 = require("../models/offer");
exports.offerRouter = express_1.default.Router();
exports.offerRouter.get(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const offerList = yield offer_1.Offer.find();
    if (!offerList) {
        res.status(500).json({ success: false });
    }
    res.send(offerList);
}));
exports.offerRouter.get(`/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const offer = yield offer_1.Offer.findById(req.params.id).populate('auction');
    if (!offer_1.Offer) {
        res.status(500).json({ success: false });
    }
    res.send(offer);
}));
exports.offerRouter.post(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield auction_1.Auction.findById(req.body.category);
    if (!category) {
        return res.status(400).send('Invalid Auction');
    }
    let offer = new offer_1.Offer({
        name: req.body.name,
        price: req.body.price,
        auction: req.body.auction,
    });
    offer = yield offer.save();
    if (!offer) {
        return res.status(500).send('The offer cannot be created');
    }
    res.send(offer);
}));
exports.offerRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Offer Id');
    }
    const category = yield auction_1.Auction.findById(req.body.category);
    if (!category) {
        return res.status(400).send('Invalid Auction');
    }
    const offer = yield offer_1.Offer.findById(req.params.id);
    if (!offer) {
        return res.status(400).send('Invalid Offer!');
    }
    const updatedOffer = yield offer_1.Offer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    }, { new: true });
    if (!updatedOffer) {
        return res.status(500).send('the offer cannot be updated!');
    }
    res.send(updatedOffer);
}));
exports.offerRouter.delete('/:id', (req, res) => {
    offer_1.Offer.findByIdAndRemove(req.params.id).then(offer => {
        if (offer) {
            return res.status(200).json({ success: true, message: 'the offer is deleted!' });
        }
        else {
            return res.status(404).json({ success: false, message: "offer not found!" });
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    });
});
//# sourceMappingURL=offer.js.map