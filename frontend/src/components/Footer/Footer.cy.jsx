/* eslint-disable no-undef */
import Footer from "./Footer";

describe("<Footer />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Footer />);
  });
});
