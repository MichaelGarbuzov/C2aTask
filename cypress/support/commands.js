const fs = require("fs");
const pdf = require("pdf-parse");

Cypress.Commands.add("comparePDFs", (pdfPath1, pdfPath2) => {
  const getTextFromPDF = (pdfPath) => {
    const dataBuffer = fs.readFileSync(pdfPath);
    return pdf(dataBuffer);
  };

  cy.wrap(getTextFromPDF(pdfPath1)).then((pdf1Data) => {
    cy.wrap(getTextFromPDF(pdfPath2)).then((pdf2Data) => {
      expect(pdf1Data.text).to.equal(pdf2Data.text);
    });
  });
});
