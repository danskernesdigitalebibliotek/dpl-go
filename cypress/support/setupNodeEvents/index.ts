import {
  MockGraphQLMutationParams,
  MockGraphQLQueryParams,
  MockRestResponseParams,
  MockSoapResponseParams,
} from "../commands"
import MockApiServer from "./mockApiServer"

export const e2eNodeEvents: Cypress.Config["e2e"]["setupNodeEvents"] = (on, config) => {
  const mockApiServer = new MockApiServer()

  on("before:run", () => {
    mockApiServer.start()

    if (config.env.viewport) {
      log("Running test with viewport:", config.env.viewport, true)
    }
  })

  on("after:run", () => {
    mockApiServer.stop()
  })

  function log(requestType: string, operationName: string, force: boolean = false) {
    if (process.env.DEBUG_MOCK_SERVER === "true" || force) {
      console.info(`\x1b[32m${requestType}`, `\x1b[34m${operationName}`)
    }
  }

  on("task", {
    mockGraphQLQuery({ operationName, data }: MockGraphQLQueryParams) {
      log("Mocking GraphQL query", operationName)

      mockApiServer.mockGraphQLQuery({ operationName, data })
      return null // Return null to indicate that the task has been completed
    },

    mockGraphQLMutation({ operationName, data }: MockGraphQLMutationParams) {
      log("Mocking GraphQL mutation", operationName)

      mockApiServer.mockGraphQLMutation({ operationName, data })
      return null // Return null to indicate that the task has been completed
    },

    mockRestResponse({ method, path, data }: MockRestResponseParams) {
      log("Mocking REST response", `${method} ${path}`)

      mockApiServer.mockRestResponse({ method, path, data })
      return null // Return null to indicate that the task has been completed
    },

    mockSoapResponse({ path, data }: MockSoapResponseParams) {
      log("Mocking SOAP response", path)
      mockApiServer.mockSoapResponse({ path, data })
      return null // Return null to indicate that the task has been completed
    },

    resetApiMocks() {
      mockApiServer.reset()
      return null
    },
  })
}
