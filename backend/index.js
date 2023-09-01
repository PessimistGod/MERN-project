const express = require('express');
const app = express();

const cors = require('cors');

const dotenv = require('dotenv');

const { connectDB } = require('./Middleware/db');
const authRoutes = require('./routes/authRoutes');
const  loanRoutes = require('./routes/loanRoutes');

// const employeeRoutes = require('./routes/employeeRoutes');

// Define your routes here
dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.post('api/submit-application', async (req, res) => {
  const { loanAmount, businessDetails } = req.body;

  try {
    const balanceSheetData = await xeroHelper.fetchBalanceSheet(req, res);
    const twelveMonthsData = balanceSheetData.body.reports[0].rows.slice(0, 12);

    const totalAssets = twelveMonthsData.reduce((sum, row) => sum + parseFloat(row.cells[1].value), 0);
    const averageAssetValue = totalAssets / 12;

    const profitOrLossLast12Months = parseFloat(twelveMonthsData[0].cells[1].value) - parseFloat(twelveMonthsData[1].cells[1].value);

    let preAssessment = 20;
    if (profitOrLossLast12Months > 0) {
      preAssessment = 60;
    }
    if (averageAssetValue > loanAmount) {
      preAssessment = 100;
    }

    const response = {
      businessDetails,
      preAssessment,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
