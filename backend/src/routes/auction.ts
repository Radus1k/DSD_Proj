import express from 'express';
import {Auction } from '../models/auction';

export const auctionsRouter = express.Router();

auctionsRouter.get(`/`, async (req, res) => {
    const auctionsList = await Auction.find();

    if (!auctionsList) {
        res.status(500).json({success: false})
    }
    res.send(auctionsList);
});

auctionsRouter.get('/:id', async (req, res) => {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
        res.status(500).json({message: 'The auction with the given ID was not found.'})
    }
    res.status(200).send(auction);
});

auctionsRouter.post('/', async (req, res) => {
    let auction = new Auction({
        name: req.body.name,
        price: req.body.price,
        expires: req.body.expires,
    })
    auction = await auction.save();

    if (!auction) {
        return res.status(400).send('the auction cannot be created!')
    }

    res.send(auction);
});

auctionsRouter.put('/:id', async (req, res) => {
    const auction = await Auction.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            price: req.body.price,
            expires: req.body.expires,
        },
        {new: true}
    )

    if (!auction) {
        return res.status(400).send('the Auction cannot be created!')
    }

    res.send(auction);
});

auctionsRouter.delete('/:id', (req, res) => {
    Auction.findByIdAndRemove(req.params.id).then(auction => {
        if (auction) {
            return res.status(200).json({success: true, message: 'the auction is deleted!'})
        } else {
            return res.status(404).json({success: false, message: "auction not found!"})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    });
});



