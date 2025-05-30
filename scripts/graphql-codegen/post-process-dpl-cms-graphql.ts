import { replaceInFile } from "replace-in-file"

const args: string[] = process.argv.slice(2)
const pathToGeneratedFile = args[0] ?? null

if (!pathToGeneratedFile) {
  throw new Error("Missing path to generated file!")
}

// Replace RequestInit['headers'] with RequestInit since
// we need to be able to inject next options in the fetcher:
replaceInFile({
  files: pathToGeneratedFile,
  from: /RequestInit\['headers'\]/g,
  to: "RequestInit & { next?: NextFetchRequestConfig }",
})
  .then((results: unknown) => {
    // eslint-disable-next-line no-console
    console.log("Replacement results:", results)
    // Our fetcher returns go cache tags along with the data
    replaceInFile({
      files: pathToGeneratedFile,
      from: /Query = {/g,
      to: "Query = { go: { cacheTags: string[] } } & {",
    })
      .then((results: unknown) => {
        // eslint-disable-next-line no-console
        console.log("Replacement results:", results)
      })
      .catch((error: unknown) => {
        console.error("Error occurred:", error)
      })
  })
  .catch((error: unknown) => {
    console.error("Error occurred:", error)
  })

export {}
