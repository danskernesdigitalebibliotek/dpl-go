import getLoginUrls from "../factories/getLoginUrls"

describe("Login / Logout Tests", () => {
  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "getLoginUrls",
      data: getLoginUrls.build(),
    })

    cy.visit("/search")

    // Click profile button
    cy.dataCy("profile-button").click()

    // Check if login modal is open and visible
    cy.dataCy("global-sheet").should("be.visible")
  })

  it("Should open and close login modal", () => {
    // Opens login modal with beforeEach

    // Close login modal
    cy.dataCy("global-sheet-close-button").click()

    // Check if login modal is closed
    cy.dataCy("global-sheet").should("not.exist")
  })

  it("Should open unilogin page", () => {
    // Opens login modal with beforeEach

    // Click UNI•Login button
    cy.dataCy("login-sheet-unilogin-button").click()

    // Check if mocked unilogin page is open
    cy.location("pathname").should("not.eq", "/search")
  })

  it("Should open adgangsplatformen page", () => {
    // Opens login modal with beforeEach

    // Click adgangsplatformen button
    cy.dataCy("login-sheet-adgangsplatformen-button").click()

    // Check if mocked adgangsplatformen page is open
    cy.location("pathname").should("eq", "/some-path")
  })
})
