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
exports.auctionsRouter = void 0;
const express_1 = __importDefault(require("express"));
const auction_1 = require("../models/auction");
exports.auctionsRouter = express_1.default.Router();
exports.auctionsRouter.get(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryList = yield auction_1.Auction.find();
    if (!categoryList) {
        res.status(500).json({ success: false });
    }
    res.send(categoryList);
}));
exports.auctionsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield auction_1.Auction.findById(req.params.id);
    if (!category) {
        res.status(500).json({ message: 'The auction with the given ID was not found.' });
    }
    res.status(200).send(category);
}));
exports.auctionsRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let auction = new auction_1.Auction({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });
    auction = yield auction.save();
    if (!auction) {
        return res.status(400).send('the auction cannot be created!');
    }
    res.send(auction);
}));
exports.auctionsRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auction = yield auction_1.Auction.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    }, { new: true });
    if (!auction) {
        return res.status(400).send('the category cannot be created!');
    }
    res.send(auction);
}));
exports.auctionsRouter.delete('/:id', (req, res) => {
    auction_1.Auction.findByIdAndRemove(req.params.id).then(auction => {
        if (auction) {
            return res.status(200).json({ success: true, message: 'the auction is deleted!' });
        }
        else {
            return res.status(404).json({ success: false, message: "auction not found!" });
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    });
});
//# sourceMappingURL=auction.js.map