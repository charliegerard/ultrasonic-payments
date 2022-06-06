# Ultrasonic payments

_⚠️ This is not a real Stripe product ⚠️_

I've been experimenting with ultrasonic data transmission in the context of ultrasonic payments. This repository contains a small demo sending a [Stripe Payment Link](https://stripe.com/payments/payment-links) between a merchant's transmitter device (e.g. tablet) and a customer's receiver (e.g. mobile phone).

It is relying on [quiet.js](https://github.com/quiet/quiet-js/) and sends data via inaudible sounds.

![GIF showing how I am sending a Stripe Payment Link via ultrasound to my phone](ultrasonic-payment-link-demo.gif)

If you want to try it out, play around with the [live demo](https://ultrasonic-payments.netlify.app), and if you want to learn more, check out the [blog post](https://charliegerard.dev/blog/ultrasonic-payments).

## How to run

If you want to run this locally, start by cloning this repository, and start a Python server with:

```bash
# Using Python 2
python -m SimpleHTTPServer 3000

# Using Python 3
python -m http.server 3000
```
