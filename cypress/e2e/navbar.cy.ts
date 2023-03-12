describe("NavBar Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have navbar", () => {
    cy.get("header").find("nav").should("exist");
  });

  it("should route via navbar", () => {
    // Check if current Route is shown in navbar
    cy.get("header")
      .find("nav")
      .find(".router-link-active")
      .should("have.text", "Startseite")
      .should("have.css", "color", "rgb(0, 189, 126)");

    // route to 404 Page
    cy.visit("/ichBinNichtVergeben");
    cy.get("header")
      .find("nav")
      .find(".router-link-active")
      .should("not.exist");

    // route back to main Page
    cy.get("header").find("nav").contains("Startseite").should("exist").click();
    cy.get("header")
      .find("nav")
      .find(".router-link-active")
      .should("have.text", "Startseite")
      .should("have.css", "color", "rgb(0, 189, 126)");
  });

  it("should route to GitGub via navbar", () => {
    cy.get("header")
      .find("nav")
      .contains("GitHub")
      .should("exist")
      .should(
        "have.attr",
        "href",
        "https://github.com/lucasschmitz-dev/API-Project"
      );
  });
});
