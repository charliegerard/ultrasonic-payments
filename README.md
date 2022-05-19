# Ultrasonic payments

_⚠️ This is not a real Stripe product ⚠️_

I've been experimenting with ultrasonic data transmission in the context of ultrasonic payments. This repository contains a small demo sending a [Stripe Payment Link](https://stripe.com/payments/payment-links) between a merchant's transmitter device (e.g. tablet) and a customer's receiver (e.g. mobile phone).

It is relying on [quiet.js](https://github.com/quiet/quiet-js/) and sends data via inaudible sounds.

If you want to try it out, play around with the live demo, and if you want to learn more, check out the blog post.

## How to run

If you want to run this locally, start by cloning this repository, and start a Python server with:

```bash
python -m SimpleHTTPServer 3000
```
