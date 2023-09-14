/* eslint-disable no-undef */
import Login from "./Login";

describe("<Login />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Login />);
  });
});
