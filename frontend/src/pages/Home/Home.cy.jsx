/* eslint-disable no-undef */
import Home from "./Home";

describe("<Home />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Home />);
  });
});
