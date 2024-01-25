describe("tic-tac-toe", () => {
  describe("As a player", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    describe("on page load", () => {
      it("should be able to see board with initial state on page load", () => {
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
    });
    describe("on make move", () => {
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
    });
    describe("on click button", () => {
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
      it.only("should replay the game", () => {
        cy.clock();
        cy.get(cell({ row: 0, col: 0 }))
          .click()
          .as("cell-00");
        cy.get(cell({ row: 1, col: 0 }))
          .click()
          .as("cell-10");
        cy.get(cell({ row: 0, col: 1 }))
          .click()
          .as("cell-01");
        cy.get(cell({ row: 1, col: 1 }))
          .click()
          .as("cell-11");
        cy.get(cell({ row: 0, col: 2 }))
          .click()
          .as("cell-02");

        cy.get(element("replay")).click();

        cy.get("@cell-00").should("have.text", "-");
        cy.get("@cell-10").should("have.text", "-");
        cy.get("@cell-01").should("have.text", "-");
        cy.get("@cell-11").should("have.text", "-");
        cy.get("@cell-02").should("have.text", "-");

        cy.tick(1000);
        cy.get("@cell-00").should("have.text", "x");
        cy.tick(1000);
        cy.get("@cell-10").should("have.text", "o");
        cy.tick(1000);
        cy.get("@cell-01").should("have.text", "x");
        cy.tick(1000);
        cy.get("@cell-11").should("have.text", "o");
        cy.tick(1000);
        cy.get("@cell-02").should("have.text", "x");

        cy.clock().invoke("restore");
      });
      it("should disable undo button on initial turn", () => {
        cy.get(element("undo")).should("be.disabled");
      });
      it("should disable redo button on last turn", () => {
        cy.get(element("redo")).should("be.disabled");
        cy.get(cell({ row: 1, col: 1 }));
        cy.get(element("redo")).should("be.disabled");
      });
    });
    describe("on winning", () => {
      beforeEach(() => {
        cy.get(cell({ row: 0, col: 0 })).click();
        cy.get(cell({ row: 1, col: 0 })).click();
        cy.get(cell({ row: 0, col: 1 })).click();
        cy.get(cell({ row: 1, col: 1 })).click();
        cy.get(cell({ row: 0, col: 2 })).click();
      });
      it("should be able to see who is the winner", () => {
        cy.contains("The winner is x!");
      });
      it("should be unable making move once winner has been announced", () => {
        cy.get(cell({ row: 2, col: 2 }))
          .click()
          .as("col-22");
        cy.get("@col-22").should("have.text", "-");
      });
      it("should clear winning message on click restart", () => {
        cy.get(element("start")).click();
        cy.get(element("winner-message")).should("have.be.empty");
      });
      it("should clear winning message on click undo", () => {
        cy.get(element("undo")).click();
        cy.get(element("winner-message")).should("have.be.empty");
      });
      it("should show back winning message on click redo after undo", () => {
        cy.get(element("undo")).click();
        cy.get(element("redo")).click();
        cy.contains("The winner is x!");
      });
    });
  });
});

function cell({ row, col }) {
  return `[data-test=cell-${row}-${col}]`;
}
function element(el) {
  return `[data-test=${el}]`;
}
