import SearchFacetsFactory from "../factories/searchFacets"
import SearchWithPaginationFactory from "../factories/searchWithPagination"

describe("Search Result Tests", () => {
  beforeEach(() => {
    // Intercept search request
    cy.interceptGraphql({
      operationName: "searchWithPagination",
      factory: SearchWithPaginationFactory,
    })
    // Intercept search facets
    cy.interceptGraphql({
      operationName: "searchFacets",
      factory: SearchFacetsFactory,
    })
  })

  it("Should get results when searching", () => {
    cy.visit("/")

    // Search for harry potter and press enter
    cy.dataCy("search-input").should("exist").focus().type("harry potter{enter}")

    // Check if search results are displayed
    cy.dataCy("work-card").should("have.length.above", 6)
  })
})