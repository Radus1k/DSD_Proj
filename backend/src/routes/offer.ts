import express from 'express';
import mongoose from 'mongoose';
import {Auction} from "../models/auction";
import {Offer} from "../models/offer";

export const offerRouter = express.Router();

offerRouter.get(`/`, async (req, res) => {
    const offerList = await Offer.find();

    if (!offerList) {
        res.status(500).json({success: false});
    }
    res.send(offerList);
});

offerRouter.get(`/:id`, async (req, res) => {
    const offer = await Offer.findById(req.params.id).populate('auction');

    if (!Offer) {
        res.status(500).json({success: false});
    }
    res.send(offer);
});

offerRouter.post(`/`, async (req, res) => {
    const auction = await Auction.findById(req.body.auction);
    if (!auction) {
        return res.status(400).send('Invalid Auction');
    }

    let offer = new Offer({
        name: req.body.name,
        price: req.body.price,
        auction: req.body.auction,
    });

    offer = await offer.save();

    if (!offer) {
        return res.status(500).send('The offer cannot be created');
    }

    res.send(offer);
})

offerRouter.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Offer Id')
    }
    const auction = await Auction.findById(req.body.auction);
    if (!auction) {
        return res.status(400).send('Invalid Auction');
    }

    const offer = await Offer.findById(req.params.id);
    if (!offer) {
        return res.status(400).send('Invalid Offer!');
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            price: req.body.price,
            auction: req.body.auction,
        },
        {new: true}
    )

    if (!updatedOffer) {
        return res.status(500).send('the offer cannot be updated!');
    }

    res.send(updatedOffer);
});

offerRouter.delete('/:id', (req, res) => {
    Offer.findByIdAndRemove(req.params.id).then(offer => {
        if (offer) {
            return res.status(200).json({success: true, message: 'the offer is deleted!'});
        } else {
            return res.status(404).json({success: false, message: "offer not found!"});
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    })
});
