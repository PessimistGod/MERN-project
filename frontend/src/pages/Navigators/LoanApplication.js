import React, { useState } from 'react';
import axios from 'axios';

const LoanApplication = () => {
  const [name, setName] = useState('');
  const [yearEstablished, setYearEstablished] = useState('');
  const [loanAmt, setLoanAmt] = useState('');
  const [currency, setCurrency] = useState('');
  const [response, setResponse] = useState(null);


  const [submitted, setSubmitted] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend
      await axios.post('/api/submit-application', { name, yearEstablished });

      // Update the UI to show submission success
      setSubmitted(true);
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 h-[80vh]">
      {submitted && response ? (
        <section>

          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Loan application submitted successfully.</span>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Loan Application Details</h2>
            <p>
              <strong>Name:</strong> {response.businessDetails.name}
            </p>
            <p>
              <strong>Year Established:</strong> {response.businessDetails.yearEstablished}
            </p>
            <p>
              <strong>Profit/Loss Summary (2023):</strong> {response.businessDetails.summaryOfProfitLossByYear['2023']}
            </p>
            <p>
              <strong>Pre-assessment Value:</strong> {response.preAssessment}
            </p>
          </div>
        </section>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-semibold mb-4">Loan Application Form</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Business Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearEstablished">
              Year Established
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="yearEstablished"
              type="number"
              placeholder="Year"
              value={yearEstablished}
              onChange={(e) => setYearEstablished(e.target.value)}
              required
            />
          </div>


          {/* Loan Amount */}
          <div className="col-span-full mt-6">
            <label htmlFor="loanAmt" className="inputTagline">
              Loan Amount
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="loanAmt"
                id="loanAmt"
                className="inputField"
                placeholder="0.00"
                value={loanAmt}
                onChange={(e) => setLoanAmt(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="inputField"
                >
                  <option>INR</option>
                  <option>USD</option>
                  {/* Other Currency */}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='flexCenter'>
            <button type="submit" className="authBtn mt-4">
              Get preAssessment Value
            </button>
          </div>
        </form>


      )
      }
    </div>
  )
};
export default LoanApplication;
