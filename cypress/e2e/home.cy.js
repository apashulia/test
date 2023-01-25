describe("home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it(`button with 'all users' text should be present in the document`, () => {
    cy.get(".button").contains("All users");
  });

  it(`popup should be opened after pressing button "All users"`, () => {
    cy.get(".button").contains("All users").click();
    cy.get(".popup-body");
    cy.get(".popup-body > div > ul");
    cy.get(".btn").click();

    cy.get(".popup-body > div > ul").should("not.be.true");
  });

  it(`button with 'grouping' text should be present in the document`, () => {
    cy.get(".button").contains("Grouping");
  });

  it(`popup should be opened after pressing button "Grouping"`, () => {
    cy.get(".button").contains("Grouping").click();
    cy.get(".popup-body");
    cy.get('[data-test="grouping select"]');
    cy.get('[data-test="reset-btn"]');
    cy.get('[data-test="apply-btn"]');
    cy.get('[data-test="popup btn"]').click();

    cy.get(".popup-body").should("not.be.true");
  });

  it(`after pressing select table should be regrouped"`, () => {
    cy.get(".button").contains("Grouping").click();
    cy.get('[data-test="grouping select"]')
      .select("Name")
      .should("have.value", "name");
  });

  it(`after pressing apply btn popup should be closed"`, () => {
    cy.get(".button").contains("Grouping").click();
    cy.get('[data-test="grouping select"]')
      .select("Name")
      .should("have.value", "name");

    cy.get('[data-test="apply-btn"]').click();
    cy.get(".popup-body").should("not.be.true");
  });

  it(`after pressing close btn popup should be closed"`, () => {
    cy.get(".button").contains("Grouping").click();
    cy.get('[data-test="grouping select"]')
      .select("Name")
      .should("have.value", "name");

    cy.get('[data-test="popup btn"]').click();
    cy.get(".popup-body").should("not.be.true");
  });

  it(`custom tool panel should not contain header`, () => {
    cy.get('[data-test="tool panel header"]').should("not.be.true");
  });

  it(`custom tool panel should contain header when mouse over icon`, () => {
    cy.get('[data-test="tool panel icon"]').trigger("mouseover");
    cy.get('[data-test="tool panel header"]');
  });

  it(`custom tool panel should contain list of data`, () => {
    cy.get("ul > :nth-child(1)").should("contain", "name");
    cy.get("ul > :nth-child(2)").should("contain", "username");
    cy.get("ul > :nth-child(3)").should("contain", "email");
    cy.get("ul > :nth-child(4)").should("contain", "latitude");
    cy.get("ul > :nth-child(5)").should("contain", "longitude");
    cy.get("ul > :nth-child(6)").should("contain", "street");
    cy.get("ul > :nth-child(7)").should("contain", "city");
    cy.get("ul > :nth-child(8)").should("contain", "companyName");
  });
});
