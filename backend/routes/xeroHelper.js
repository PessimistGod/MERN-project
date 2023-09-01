// xeroHelper.js

const xeroNode = require('xero-node');

// Xero configuration
const xeroConfig = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUris: [process.env.AUTHOR_URI],
};

// Initialize Xero Client
const xero = new xeroNode.XeroClient(xeroConfig);

// Variables to store access token and tenant ID
let accessToken = null;
let tenantId = null;

// Get the authorization URL
function getAuthUrl(req, res) {
  const authUrl = xero.buildConsentUrl();
  res.redirect(authUrl);
}

// Handle the callback after authorization
async function handleCallback(req, res) {
  const code = req.query.code;

  try {
    // Exchange the authorization code for an access token and refresh token
    const tokens = await xero.oauth2Api.getAccessToken(code);
    // Store the tokens securely in your application for future API requests
    accessToken = tokens.process.env.ACCESS_TOKEN;
    tenantId = tokens.process.env.TENANT_ID;

    res.redirect('/success');
  } catch (error) {
    console.error(error);
    res.redirect('/error');
  }
}

// Fetch the balance sheet
async function fetchBalanceSheet(req, res) {
  try {
    // Set the access token in the Xero client
    xero.setTokenSet({ access_token: accessToken });
    const balanceSheetData = await xero.accountingApi.getReportBalanceSheet(tenantId);

    // Return the balance sheet data
    res.status(200).json(balanceSheetData.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAuthUrl,
  handleCallback,
  fetchBalanceSheet,
};
