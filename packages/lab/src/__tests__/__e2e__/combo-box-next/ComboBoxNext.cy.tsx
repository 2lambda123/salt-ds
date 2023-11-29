import { composeStories } from "@storybook/react";
import * as comboBoxNextStories from "@stories/combo-box-next/combo-box-next.stories";

import { CustomFloatingComponentProvider, FLOATING_TEST_ID } from "../common";

const { Default, Readonly, Disabled } = composeStories(comboBoxNextStories);

describe("Given a ComboBox", () => {
  it("should be able to filter and select an option with a mouse", () => {
    const selectionChangeSpy = cy.stub().as("selectionChange");
    cy.mount(<Default onSelectionChange={selectionChangeSpy} />);

    cy.findByRole("combobox").realClick();
    cy.findByRole("combobox").should("be.focused");

    cy.realType("Ala");

    cy.findByRole("option", { name: "Alabama" }).realClick();

    cy.findByRole("combobox").should("be.focused");
    cy.findByRole("combobox").should("have.value", "Alabama");
    cy.get("@selectionChange").should(
      "have.been.calledWith",
      Cypress.sinon.match.any,
      Cypress.sinon.match.array.deepEquals(["Alabama"])
    );
  });

  it("should be able to filter and select an option with a keyboard", () => {
    const selectionChangeSpy = cy.stub().as("selectionChange");
    cy.mount(<Default onSelectionChange={selectionChangeSpy} />);

    cy.findByRole("combobox").realClick();

    cy.realType("Ala");
    cy.findByRole("option", { name: "Alabama" }).should("be.activeDescendant");
    cy.realPress("ArrowDown");
    cy.findByRole("option", { name: "Alaska" }).should("be.activeDescendant");
    cy.realPress("Enter");

    cy.findByRole("combobox").should("be.focused");
    cy.findByRole("combobox").should("have.value", "Alaska");
    cy.get("@selectionChange").should(
      "have.been.calledWith",
      Cypress.sinon.match.any,
      Cypress.sinon.match.array.deepEquals(["Alaska"])
    );
  });

  it("should be able to filter and select quick-select an option with Enter", () => {
    const selectionChangeSpy = cy.stub().as("selectionChange");
    cy.mount(<Default onSelectionChange={selectionChangeSpy} />);

    cy.findByRole("combobox").realClick();

    cy.findByRole("option", { name: "Alabama" }).should("be.activeDescendant");
    cy.realType("C");
    cy.findByRole("option", { name: "California" }).should(
      "be.activeDescendant"
    );
    cy.realPress("Enter");

    cy.findByRole("combobox").should("be.focused");
    cy.findByRole("combobox").should("have.value", "California");
    cy.get("@selectionChange").should(
      "have.been.calledWith",
      Cypress.sinon.match.any,
      Cypress.sinon.match.array.deepEquals(["California"])
    );
  });

  it("should be able to filter and select quick-select an option with Tab", () => {
    const selectionChangeSpy = cy.stub().as("selectionChange");
    cy.mount(<Default onSelectionChange={selectionChangeSpy} />);

    cy.findByRole("combobox").realClick();

    cy.findByRole("option", { name: "Alabama" }).should("be.activeDescendant");
    cy.realType("C");
    cy.findByRole("option", { name: "California" }).should(
      "be.activeDescendant"
    );
    cy.realPress("Tab");

    cy.findByRole("combobox").should("not.be.focused");
    cy.findByRole("combobox").should("have.value", "California");
    cy.get("@selectionChange").should(
      "have.been.calledWith",
      Cypress.sinon.match.any,
      Cypress.sinon.match.array.deepEquals(["California"])
    );
  });

  it("should open and close when clicking the button", () => {
    cy.mount(<Default />);

    cy.findByRole("listbox").should("not.exist");
    cy.findByRole("button").realClick();
    cy.findByRole("listbox").should("exist");
    cy.findByRole("button").realClick();
    cy.findByRole("listbox").should("not.exist");
  });

  it("should open the list when clicked", () => {
    cy.mount(<Default />);

    cy.findByRole("combobox").realClick();
    cy.findByRole("listbox").should("exist");
  });

  it("should not open the list when focused via keyboard", () => {
    cy.mount(<Default />);

    cy.realPress("Tab");
    cy.findByRole("combobox").should("be.focused");
    cy.findByRole("listbox").should("not.exist");
  });

  it("should focus the first item when the down arrow is pressed", () => {
    cy.mount(<Default />);

    cy.realPress("Tab");
    cy.realPress("ArrowDown");
    cy.findByRole("option", { name: "Alabama" }).should("be.activeDescendant");
  });

  it("should focus the last item when the up arrow is pressed", () => {
    cy.mount(<Default />);

    cy.realPress("Tab");
    cy.realPress("ArrowUp");
    cy.findByRole("option", { name: "Georgia" }).should("be.activeDescendant");
  });

  it("should open the list but not focus an option when the alt + down arrow is pressed", () => {
    cy.mount(<Default />);

    cy.realPress("Tab");
    cy.findByRole("combobox").should("be.focused");
    cy.realPress(["Alt", "ArrowDown"]);
    cy.findByRole("listbox").should("exist");
    cy.findAllByRole("option").should("not.be.activeDescendant");
  });

  it("should support keyboard navigation", () => {
    cy.mount(<Default />);

    cy.findByRole("combobox").realClick();
    cy.findByRole("listbox").should("exist");
    cy.findAllByRole("option").eq(0).should("be.activeDescendant");

    // should not wrap
    cy.realPress(["ArrowUp"]);
    cy.findAllByRole("option").eq(0).should("be.activeDescendant");

    cy.realPress(["ArrowDown"]);
    cy.findAllByRole("option").eq(1).should("be.activeDescendant");

    // should try to go down 10, but only 9 items in list
    cy.realPress(["PageDown"]);
    cy.findAllByRole("option").eq(-1).should("be.activeDescendant");

    // should not wrap
    cy.realPress(["ArrowDown"]);
    cy.findAllByRole("option").eq(-1).should("be.activeDescendant");

    // should try to go up 10, but only 9 items in list
    cy.realPress(["PageUp"]);
    cy.findAllByRole("option").eq(0).should("be.activeDescendant");

    // should go to the last item
    cy.realPress(["End"]);
    cy.findAllByRole("option").eq(-1).should("be.activeDescendant");

    cy.realPress(["ArrowUp"]);
    cy.findAllByRole("option").eq(-2).should("be.activeDescendant");

    // should go to the first item
    cy.realPress(["Home"]);
    cy.findAllByRole("option").eq(0).should("be.activeDescendant");
  });

  it("should not allow the value to be changed when it is readonly", () => {
    cy.mount(<Readonly />);
    cy.findByRole("combobox").should("have.value", "California");
    cy.findByRole("combobox").realClick();

    cy.findByRole("combobox").should("be.focused");
    cy.findByRole("listbox").should("not.exist");

    cy.realType("abc");
    cy.findByRole("combobox").should("have.value", "California");
  });

  it("should not receive focus ");

  describe("When used with a custom floating component", () => {
    it("should render the custom floating component", () => {
      cy.mount(
        <CustomFloatingComponentProvider>
          <Default open />
        </CustomFloatingComponentProvider>
      );

      cy.findByTestId(FLOATING_TEST_ID).should("exist");
    });
  });
});
