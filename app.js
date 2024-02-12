const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/calculate', (req, res) => {
  const totalCommission = parseFloat(req.body.totalCommission);
  const premiumHomesCommission = totalCommission * 0.2;
  const deskFee = 1350;
  const nettCommission = totalCommission - premiumHomesCommission - deskFee;
  const tax = 0.22 * nettCommission;
  const church = 0.1 * nettCommission;
  const community = 0.05 * nettCommission;
  const backIntoCompany = 0.1 * totalCommission;
  const sellerGift = 0.02 * nettCommission;
  const buyerGift = 0.02 * nettCommission;
  const referralFee = req.body.referralFee ? 0.04 * nettCommission : 0;
  let takeHome;

  if (req.body.referralFee) {
    takeHome = 0.45 * nettCommission;
  } else {
    takeHome = 0.49 * nettCommission;
  }

  res.render('result', {
    totalCommission,
    premiumHomesCommission,
    deskFee,
    nettCommission,
    tax,
    church,
    community,
    backIntoCompany,
    sellerGift,
    buyerGift,
    referralFee,
    takeHome
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
