import { Factory } from "fishery"

import { coverFactory } from "./cover"
import { materialTypeAudioBookFactory, materialTypeEbookFactory } from "./materials"
import { Work } from "./works"

type Manifestation = Work["manifestations"]["all"][0]

export const eBookManifestationFactory = Factory.define<Manifestation>(() => ({
  pid: "1",
  accessTypes: [
    {
      code: "ONLINE",
      display: "Digital",
    },
  ],
  access: [],
  genreAndForm: ["myter", "billedbøger"],
  publisher: ["Publisher Name"],
  contributorsFromDescription: [],
  contributors: manifestationContributorFactory.buildList(2),
  cover: coverFactory.build(),
  identifiers: [
    {
      type: "PUBLIZON",
      value: "9788711917145",
    },
    {
      type: "ISBN",
      value: "9788711917145",
    },
  ],
  materialTypes: [materialTypeEbookFactory.build()],
}))

export const audioBookManifestationFactory = Factory.define<Manifestation>(() => ({
  pid: "2",
  accessTypes: [
    {
      code: "ONLINE",
      display: "Digital",
    },
  ],
  access: [],
  genreAndForm: ["myter", "billedbøger"],
  publisher: ["Publisher Name"],
  contributorsFromDescription: [],
  contributors: manifestationContributorFactory.buildList(1),
  cover: coverFactory.build(),
  identifiers: [
    {
      type: "PUBLIZON",
      value: "9788726204353",
    },
    {
      type: "ISBN",
      value: "9788726204353",
    },
  ],
  materialTypes: [materialTypeAudioBookFactory.build()],
}))

export const manifestationContributorFactory = Factory.define<Manifestation["contributors"][0]>(
  ({ sequence }) => ({ display: `Contributor ${sequence}` })
)
