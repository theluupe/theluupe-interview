const { Router } = require('express');
const { addAsync } = require('@awaitjs/express');

const router = addAsync(Router());

router.getAsync('/login', async (req, res) => {
  res.json({ status: 'ok' });
});

router.getAsync('/signup', async (req, res) => {
  res.json({ status: 'ok' });
});

router.getAsync('/logout', async (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = {
  authRouter: router,
};
