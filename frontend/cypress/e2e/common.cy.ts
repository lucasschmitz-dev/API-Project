describe("Common Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("get the global window object", () => {
    cy.window().should("have.property", "top");
  });

  it("get the document object", () => {
    cy.document().should("have.property", "charset").and("eq", "UTF-8");
  });

  it("get the title", () => {
    cy.title().should("include", "API Tool");
  });

  it("should have logo", () => {
    cy.get(".logo").should("exist");
    cy.get(".logo").should("have.css", "height").and("eq", "125px");
    cy.get(".logo").should("have.css", "width").and("eq", "125px");
  });

  it("should have greeting", () => {
    cy.get("header")
      .find(".greetings")
      .find("h1")
      .should("have.text", "API Tool");

    cy.get("header")
      .find(".greetings")
      .find("h3")
      .should("have.text", "zur Wetterdarstelllung mittels KI");
  });

  it("should dispaly text in specific color", () => {
    cy.get("h1").should("have.css", "color", "rgb(0, 189, 126)");
    cy.get("h3").should("have.css", "color", "rgba(235, 235, 235, 0.64)");
    cy.get(".text-content").should(
      "have.css",
      "color",
      "rgba(235, 235, 235, 0.64)"
    );
  });
});
