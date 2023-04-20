/* const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
 */
describe("Input Test", () => {
  it("Input Field", () => {
    cy.intercept("http://127.0.0.1:3000/weatherdata/ranked", [
      { id: 1, likes: null },
    ]);
    cy.intercept("http://127.0.0.1:3000/weatherdata/1", {
      fixture: "weatherData.json",
    });
    cy.intercept("http://127.0.0.1:3000/weatherdata/like/1", "true");
    cy.intercept("http://127.0.0.1:3000/weatherdata/dislike/1", "true");
    cy.visit("/");
    const name = "Giraffen sind modisch 1";
    cy.get("#input-0").should("exist");
    cy.get("#input-0").type(name);
    cy.get(".v-btn").should("exist").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        "Es wurde keine Stadt mit dem Namen " + name + " gefunden!"
      );
    });
  });

  // Input Feld überprüfen, schauen ob es , aber wo finde ich den Input Feld als Code?
  // und wie mache ich das bei einer Anzeige?
  it("thumbs up should be green when Image liked", () => {
    cy.intercept("http://127.0.0.1:3000/weatherdata/ranked", [
      { id: 1, likes: null },
    ]);
    cy.intercept("http://127.0.0.1:3000/weatherdata/1", {
      fixture: "weatherData.json",
    });
    cy.intercept("http://127.0.0.1:3000/weatherdata/like/1", "true");
    cy.intercept("http://127.0.0.1:3000/weatherdata/dislike/1", "true");
    cy.visit("/data");
    cy.get(".mdi-thumb-up")
      .should("exist")
      .should("have.css", "color", "rgb(189, 189, 189)")
      .click();
    cy.get(".mdi-thumb-up").should("have.css", "color", "rgb(76, 175, 80)");
    cy.get(".v-card-actions > .v-btn--size-small > .v-btn__content")
      .should("exist")
      .should("have.text", "1");
    cy.get(".mdi-thumb-up").click();
    cy.get(".mdi-thumb-up").should("have.css", "color", "rgb(189, 189, 189)");
  });

  it("thumbs down should be red when Image liked", () => {
    cy.intercept("http://127.0.0.1:3000/weatherdata/ranked", [
      { id: 1, likes: null },
    ]);
    cy.intercept("http://127.0.0.1:3000/weatherdata/1", {
      fixture: "weatherData.json",
    });
    cy.intercept("http://127.0.0.1:3000/weatherdata/like/1", "true");
    cy.intercept("http://127.0.0.1:3000/weatherdata/dislike/1", "true");
    cy.visit("/data");
    cy.get(".mdi-thumb-down")
      .should("exist")
      .should("have.css", "color", "rgb(189, 189, 189)")
      .click();
    cy.get(".mdi-thumb-down")
      .should("have.css", "color", "rgb(244, 67, 54)")
      .click();
  });

  /* it("should download PNG file", () => {
    cy.visit("/data");
    cy.get("INSERT download").click();
    cy.wait(5000);
    cy.task("downloadFile", "downloads", "*.png").then((downloadPath) => {
      cy.readFile(downloadPath).then((fileContent) => {
        expect(fileContent.to.contain("PNG"));
      });
    });
  }); */
});
