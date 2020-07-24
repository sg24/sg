const express = require('express');
const router = express.Router();
const passport = require('passport');
let authenticate = require('../serverDB/middleware/authenticate');
const {qchat} = require('../serverDB/serverDB');
const braintree = require('braintree')
let gateway = braintree.connect({
    accessToken: process.env.PaypalAccessToken
});

router.post('/', authenticate, (req, res, next) => {
    if (req.header('data-categ') && req.header('data-categ') === 'clienttoken') {
        gateway.clientToken.generate({}, function (err, response) {
            if (!err) {
                res.status(200).send(response.clientToken);
                return;
            }
            res.sendStatus(500)
          });
        return;
    }

    if (req.header('data-categ') && req.header('data-categ') === 'checkout') {
        qchat.findById(req.body.id).then(cnt => {
            if (cnt) {
                let saleRequest = {
                    amount: cnt.amount,
                    merchantAccountId: "USD",
                    paymentMethodNonce: req.body.nonce
                  }
                  gateway.transaction.sale(saleRequest, function (err, result) {
                    if (err) {
                        res.sendStatus(500)
                    } else if (result.success) {
                        qchat.findByIdAndUpdate(req.body.id, {$addToSet: { paid: { $each: [req.user] }}}).then(result => {
                            res.sendStatus(200)
                        })
                    } else {
                        res.sendStatus(500)
                    }
                })
                return
            }
            res.sendStatus(422);
        })
        
        return;
    }
})

module.exports = router
