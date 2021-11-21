describe("tic-tac-toe", () => {
  describe("As a player", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5000");
    });
    it("should be able to see board with initial state", () => {
      cy.get(cell({ row: 0, col: 0 })).should("have.text", "-");
      cy.get(cell({ row: 0, col: 1 })).should("have.text", "-");
      cy.get(cell({ row: 0, col: 2 })).should("have.text", "-");
      cy.get(cell({ row: 1, col: 0 })).should("have.text", "-");
      cy.get(cell({ row: 1, col: 1 })).should("have.text", "-");
      cy.get(cell({ row: 1, col: 2 })).should("have.text", "-");
      cy.get(cell({ row: 2, col: 0 })).should("have.text", "-");
      cy.get(cell({ row: 2, col: 1 })).should("have.text", "-");
      cy.get(cell({ row: 2, col: 2 })).should("have.text", "-");
    });
    it("should be able to mark a cell", () => {
      cy.get(cell({ row: 0, col: 0 })).click();
      cy.contains("x");
    });
    it("should be able to mark a cell with alternate symbol", () => {
      cy.get(cell({ row: 0, col: 0 }))
        .click()
        .as("cell-00");
      cy.get("@cell-00").should("have.text", "x");

      cy.get(cell({ row: 0, col: 1 }))
        .click()
        .as("cell-01");
      cy.get("@cell-01").should("have.text", "o");
    });
    it("should not be able to override marked cell", () => {
      cy.get(cell({ row: 0, col: 0 }))
        .click()
        .as("cell-00");

      cy.get("@cell-00").click();
      cy.get("@cell-00").should("have.text", "x");
    });
    it("should be able to undo operation", () => {
      cy.get(cell({ row: 0, col: 0 }))
        .click()
        .as("cell-00");

      cy.get(element("undo")).click();

      cy.get("@cell-00").should("have.text", "-");
    });
    it("should be able to redo operation", () => {
      cy.get(cell({ row: 0, col: 0 }))
        .click()
        .as("cell-00");

      cy.get(element("undo")).click();
      cy.get(element("redo")).click();

      cy.get("@cell-00").should("have.text", "x");
    });
    it("should be able to see who is the winner", () => {
      cy.get(cell({ row: 0, col: 0 })).click();
      cy.get(cell({ row: 1, col: 0 })).click();
      cy.get(cell({ row: 0, col: 1 })).click();
      cy.get(cell({ row: 1, col: 1 })).click();
      cy.get(cell({ row: 0, col: 2 })).click();
      cy.contains("The winner is x!");
    });
    it("should disable making move once winner has been announced", () => {
      cy.get(cell({ row: 0, col: 0 })).click();
      cy.get(cell({ row: 1, col: 0 })).click();
      cy.get(cell({ row: 0, col: 1 })).click();
      cy.get(cell({ row: 1, col: 1 })).click();
      cy.get(cell({ row: 0, col: 2 })).click();
      cy.contains("The winner is x!");
      cy.get(cell({ row: 2, col: 2 }))
        .click()
        .as("col-22");
      cy.get("@col-22").should("have.text", "-");
    });
  });
});

function cell({ row, col }) {
  return `[data-test=cell-${row}-${col}]`;
}
function element(el) {
  return `[data-test=${el}]`;
}
