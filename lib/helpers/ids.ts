import { flatten } from "lodash"

import {
  IdentifierTypeEnum,
  ManifestationIdentifiersFragment,
  WorkTeaserSearchPageFragment,
} from "../graphql/generated/fbi/graphql"
import { filterFalsyValuesFromArray } from "./arrays"

export const getIsbnsFromManifestation = (manifestation: ManifestationIdentifiersFragment) => {
  return manifestation.identifiers.map(identifier => {
    if (identifier.type === IdentifierTypeEnum.Isbn) {
      return identifier.value
    }
  })
}

export const getIsbnsFromWork = (work: WorkTeaserSearchPageFragment) => {
  const isbnsnested = work.manifestations.all.map(manifestation =>
    getIsbnsFromManifestation(manifestation)
  )
  return filterFalsyValuesFromArray(flatten(isbnsnested))
}
