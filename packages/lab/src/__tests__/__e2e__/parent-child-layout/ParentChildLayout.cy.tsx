import { composeStories } from "@storybook/react";
import * as parentChildStories from "@stories/parent-child-layout/parent-child-layout.stories";

const composedStories = composeStories(parentChildStories);

const { Default, SaltStacked } = composedStories;

describe("GIVEN a Parent and Child", () => {
  describe("WHEN no gap values are provided", () => {
    it("THEN it should display a gap by default", () => {
      cy.mount(<Default />);

      cy.get(".saltParentChildLayout").should("have.css", "column-gap", "24px");

      cy.get(".saltParentChildLayout").should("have.css", "row-gap", "24px");
    });
  });

  describe("WHEN passing an array as a parent", () => {
    const parent = ["a", "b", "c", "d", "e"];

    it("THEN it should render as expected", () => {
      cy.mount(<Default parent={parent} />);

      cy.get(".saltParentChildItem")
        .first()
        .should("have.text", parent.join(""));
    });
  });

  describe("WHEN passing an array as a child", () => {
    const child = ["a", "b", "c", "d", "e"];

    it("THEN it should render as expected", () => {
      cy.mount(<Default child={child} />);

      // Make sure both child and parent are rendered before running next test `eq`
      cy.get(".saltParentChildItem").should("have.length", 2);
      cy.get(".saltParentChildItem").eq(1).should("have.text", child.join(""));
    });
  });

  describe("WHEN no stackedAtBreakpoint value is provided", () => {
    it(
      "THEN it should render both components on larger viewports",
      {
        viewportHeight: 900,
        viewportWidth: 1921,
      },
      () => {
        cy.mount(<Default />);
        cy.get(".saltParentChildItem").should("have.length", 2);
      }
    );

    it(
      "THEN it should render only one component on small viewports",
      {
        viewportHeight: 900,
        viewportWidth: 700,
      },
      () => {
        cy.mount(<Default />);
        cy.get(".saltParentChildItem").should("have.length", 1);
      }
    );
  });

  describe("WHEN in stacked view", () => {
    it("THEN it should only display the parent by default", () => {
      cy.mount(<SaltStacked />);

      cy.get(".saltParentChildItem").should("have.length", 1);

      cy.get(".saltParentChildItem > div").should(($div) => {
        expect($div).to.contain("Parent");
      });
    });

    it("THEN it should change to the child view when the button is clicked", () => {
      cy.mount(<SaltStacked />);

      cy.findByRole("button", { name: /Show child/i }).click();

      cy.get(".saltParentChildItem").should("have.length", 1);

      cy.get(".saltParentChildItem > div").should(($div) => {
        expect($div).to.contain("Child");
      });
    });

    it("THEN it should change the direction of animations", () => {
      cy.mount(<SaltStacked orientation="vertical" />);

      cy.get(".saltParentChildItem").should(
        "have.class",
        "saltParentChildItem-slide-bottom"
      );

      cy.mount(<SaltStacked orientation="horizontal" />);

      cy.get(".saltParentChildItem").should(
        "have.class",
        "saltParentChildItem-slide-left"
      );
    });
  });
});
