import React from 'react';

function Receipt({ customerDetails, paymentMethod, total, orderItems }) {
  const generateReceipt = () => {
    let receiptContent = `
      Customer Name: ${customerDetails.name}
      Email: ${customerDetails.email}
      Phone: ${customerDetails.phone}
      Payment Method: ${paymentMethod}
      Total Amount: $${total.toFixed(2)}
      Items:
    `;
    orderItems.forEach((item, index) => {
      receiptContent += `
        ${index + 1}. ${item.name}: $${item.price.toFixed(2)}
      `;
    });
    return receiptContent;
  };

  const handlePrint = () => {
    const receiptContent = generateReceipt();
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            /* Define your CSS styles for the receipt here */
            body {
              font-family: Arial, sans-serif;
            }
            /* Define additional styles as needed */
          </style>
        </head>
        <body>
          <pre>${receiptContent}</pre>
          <button onClick="window.print()">Print</button>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div>
      <h2>Receipt</h2>
      <button   className="receipt" onClick={handlePrint}>Print Receipt</button>
    </div>
  );
}

export default Receipt;
