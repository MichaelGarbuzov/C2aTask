describe("webTest", () => {
  it("test", () => {
    cy.visit("https://www.demoblaze.com/");

    // I click the login button to open the modal
    cy.get("#login2").click();

    // I wait for the modal to become visible
    cy.get("#logInModal").should("be.visible");

    cy.get("#loginusername")
      .eq(0)
      .type("automatedUser26@example.com", { force: true });

    cy.get("#loginpassword").eq(0).type("4r4nd0mp4ssw0rd", { force: true });

    // I click the "Log in" button
    cy.get("#logInModal .modal-content .btn-primary").click();

    cy.get("#nameofuser")
      .should("be.visible")
      .contains("Welcome automatedUser26@example.com");

    // I click on the "Phones" category
    cy.get("a[onclick=\"byCat('phone')\"]").click();

    // I find all the phone cards on the page
    cy.get("#tbodyid .card").then(($cards) => {
      let cheapestPhone = null;
      let cheapestPrice = Infinity;

      // Iterate through each phone card
      $cards.each((index, card) => {
        const priceText = Cypress.$(card).find("h5").text();
        const price = parseFloat(priceText.replace("$", ""));

        if (price < cheapestPrice) {
          cheapestPhone = Cypress.$(card).find(".hrefch");
          cheapestPrice = price;
        }
      });

      //I click on the cheapest phone
      if (cheapestPhone) {
        cy.wrap(cheapestPhone).click();
      }
      // I click on "add to cart button"
      cy.get('a[onclick="addToCart(6)"]').click();

      // I navigate to the cart section
      cy.get('ul.navbar-nav li.nav-item a[href="cart.html"]').click();

      // I checked if the phone has been added
      cy.get("table tbody tr").should("exist");
    });
  });
});
