import { filter, head, uniqBy } from "lodash"

import { SlideSelectOption } from "@/components/shared/slideSelect/SlideSelect"
import goConfig from "@/lib/config/goConfig"
import {
  ManifestationSearchPageTeaserFragment,
  ManifestationWorkPageFragment,
  WorkFullWorkPageFragment,
} from "@/lib/graphql/generated/fbi/graphql"
import { LibraryProfile, LoanListResult } from "@/lib/rest/publizon/adapter/generated/model"

export const getManifestationMaterialType = (
  manifestation: ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment
) => {
  return manifestation.materialTypes?.[0].materialTypeSpecific
}

const allowedMaterialTypes = [
  "GRAPHIC_NOVEL",
  "GRAPHIC_NOVEL_ELECTRONIC",
  "GRAPHIC_NOVEL_ONLINE",
  "COMIC",
  "COMIC_ELECTRONIC",
  "COMIC_ONLINE",
  "BOOK",
  "BOOK_ELECTRONIC",
  "PICTURE_BOOK",
  "PICTURE_BOOK_ELECTRONIC",
  "PICTURE_BOOK_ONLINE",
  "AUDIO_BOOK_ONLINE",
  "EBOOK",
]
export const hasManifestationAllowedMaterialTypes = (
  manifestation: ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment
) => {
  return manifestation.materialTypes.some(type =>
    allowedMaterialTypes.includes(type.materialTypeSpecific.code)
  )
}

// filter out unallowed material types from manifestations
export const filterMaterialTypes = (
  manifestations: ManifestationWorkPageFragment[] | ManifestationSearchPageTeaserFragment[]
) => {
  const filteredManifestationsMaterialTypes = manifestations.map(manifestation => {
    const filteredMaterialTypes = manifestation.materialTypes.filter(materialType => {
      return allowedMaterialTypes.includes(materialType.materialTypeSpecific.code)
    })
    return {
      ...manifestation,
      materialTypes: filteredMaterialTypes,
    }
  })
  return filteredManifestationsMaterialTypes
}

// TODO: write unit tests for this function
// Exclude manifestations with material types that are not allowed
export const filterManifestationsByMaterialType = (
  manifestations: ManifestationWorkPageFragment[] | ManifestationSearchPageTeaserFragment[]
): (ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment)[] => {
  return filter(manifestations, manifestation => {
    const isAllowedMaterialType = hasManifestationAllowedMaterialTypes(manifestation)
    return isAllowedMaterialType
  })
}

// TODO: write unit tests for this function
// If multiple manifestations share the same material type, keep only the latest edition
export const filterManifestationsByEdition = (
  manifestations: ManifestationWorkPageFragment[] | ManifestationSearchPageTeaserFragment[]
): (ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment)[] => {
  return manifestations.reduce(
    (acc: (ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment)[], current) => {
      const existing = acc.find(
        item =>
          item?.materialTypes?.[0].materialTypeSpecific.code ===
          current?.materialTypes?.[0].materialTypeSpecific.code
      )
      if (!existing) {
        acc.push(current)
      } else {
        const existingEdition = existing.edition?.publicationYear?.year || 0
        const currentEdition = current.edition?.publicationYear?.year || 0
        if (currentEdition > existingEdition) {
          acc = acc.filter(
            item =>
              item?.materialTypes?.[0].materialTypeSpecific.code !==
              current?.materialTypes?.[0].materialTypeSpecific.code
          )
          acc.push(current)
        }
      }
      return acc
    },
    []
  )
}

// Sort manifestations by materialTypeSortPriority
export const sortManifestationsBySortPriority = (
  manifestations: ManifestationWorkPageFragment[] | ManifestationSearchPageTeaserFragment[]
): ManifestationWorkPageFragment[] | ManifestationSearchPageTeaserFragment[] => {
  const sortPriority = goConfig("materialtypes.sortpriority")
  return manifestations.sort((manifestationA, manifestationB) => {
    const priorityA = sortPriority.indexOf(
      manifestationA.materialTypes[0].materialTypeSpecific.code
    )
    const priorityB = sortPriority.indexOf(
      manifestationB.materialTypes[0].materialTypeSpecific.code
    )
    return priorityA - priorityB
  })
}

// If no ebook manifestation is found, return the best representation or a fallback manifestation
export const getEbookManifestationOrFallbackManifestation = (
  bestRepresentation: ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment,
  manifestations: ManifestationWorkPageFragment[] | ManifestationSearchPageTeaserFragment[]
): ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment => {
  const ebookManifestation = manifestations.find(manifestation =>
    isManifestationEbook(manifestation)
  )

  if (ebookManifestation) {
    return ebookManifestation
  }

  return getBestRepresentationOrFallbackManifestation(bestRepresentation, manifestations)
}

// If no best representation is found, return the first manifestation in sortedManifestations
export const getBestRepresentationOrFallbackManifestation = (
  bestRepresentation: ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment,
  manifestations: ManifestationWorkPageFragment[] | ManifestationSearchPageTeaserFragment[]
): ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment => {
  const filteredBestRepresentation = filterManifestationsByMaterialType(
    filterMaterialTypes([bestRepresentation])
  )
  // check if bestRepresentation is located in manifestations
  const isBestRepresentationInManifestations = manifestations.some(
    manifestation => manifestation.pid === bestRepresentation.pid
  )
  // if not, set bestRepresentation to the first manifestation in sortedManifestations
  if (!filteredBestRepresentation.length || !isBestRepresentationInManifestations) {
    return manifestations[0]
  }
  return filteredBestRepresentation[0]
}

export const getManifestationMaterialTypeSpecific = (
  manifestation: ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment
): "e-bog" | "lydbog" | "podcast" | null => {
  if (isManifestationEbook(manifestation)) {
    return "e-bog"
  }
  if (isManifestationAudioBook(manifestation)) {
    return "lydbog"
  }
  if (isManifestationPodcast(manifestation)) {
    return "podcast"
  }
  return null
}

export const getManifestationByMaterialType = (
  work: WorkFullWorkPageFragment,
  materialType: string
): ManifestationWorkPageFragment | undefined => {
  return work.manifestations.all.find(manifestation =>
    manifestation.materialTypes.some(type => type.materialTypeSpecific.display === materialType)
  )
}

const isManifestationOfMaterialType = (
  manifestation: ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment,
  materialType: string
) => {
  return manifestation.materialTypes.some(type => type.materialTypeSpecific.code === materialType)
}

export const isManifestationBook = (
  manifestation: ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment
) => {
  if (!manifestation) return false
  return isManifestationOfMaterialType(manifestation, "BOOK")
}

export const isManifestationEbook = (
  manifestation: ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment
) => {
  if (!manifestation) return false
  return isManifestationOfMaterialType(manifestation, "EBOOK")
}

export const isManifestationAudioBook = (
  manifestation: ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment
) => {
  if (!manifestation) return false
  return isManifestationOfMaterialType(manifestation, "AUDIO_BOOK_ONLINE")
}

export const isManifestationPodcast = (
  manifestation: ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment
) => {
  if (!manifestation) return false
  return isManifestationOfMaterialType(manifestation, "PODCAST")
}

export const getManifestationLanguageIsoCode = (manifestation: ManifestationWorkPageFragment) => {
  if (!manifestation) return undefined

  const uniqueLanguagesWithIsoCode = uniqBy(manifestation.languages?.main, "isoCode")

  // We only want to set the lang attribute if there is only one isoCode
  const uniqIsoCode =
    uniqueLanguagesWithIsoCode.length === 1 && head(uniqueLanguagesWithIsoCode)?.isoCode

  if (uniqIsoCode) {
    return uniqIsoCode
  }
  // if there is no isoCode it return undefined so that the lang attribute is not set
  return undefined
}

export const translateMaterialTypesStringForRender = (code: string): string => {
  return goConfig("materialtypes.translations")[code]
}

export const getIconNameFromMaterialType = (materialType: string) => {
  const code = materialType
  if (goConfig("materialtypes.categories").reading.includes(code)) {
    return "book"
  }
  if (goConfig("materialtypes.categories").ebook.includes(code)) {
    return "ebook"
  }
  if (goConfig("materialtypes.categories").listening.includes(code)) {
    return "headphones"
  }
  if (goConfig("materialtypes.categories").gaming.includes(code)) {
    return "controller"
  }
  if (goConfig("materialtypes.categories").video.includes(code)) {
    return "video"
  }
  if (goConfig("materialtypes.categories").podcast.includes(code)) {
    return "podcast"
  }
}

export const slideSelectOptionsFromMaterialTypes = (
  workMaterialTypes: { code: string; display: string }[]
) => {
  return workMaterialTypes.map(materialType => {
    return {
      code: materialType.code,
      display: translateMaterialTypesStringForRender(materialType.code),
    }
  }) as SlideSelectOption[]
}

export const getManifestationMaterialTypeIcon = (
  manifestation: ManifestationWorkPageFragment | ManifestationSearchPageTeaserFragment
) => {
  const materialType = getManifestationMaterialType(manifestation)
  // If we couldn't find the right material type, we show the icon for "question-mark"
  // Note that this has to be the same as the name of the icon in the icon library.
  return getIconNameFromMaterialType(materialType.code) || "question-mark"
}

export const canUserLoanMoreMaterials = (
  dataLoans: LoanListResult | null | undefined,
  dataLibraryProfile: LibraryProfile | null | undefined,
  manifestation: ManifestationWorkPageFragment
) => {
  if (!manifestation) {
    return false
  }

  const materialType = getManifestationMaterialType(manifestation)
  if (materialType.code === "AUDIO_BOOK_ONLINE") {
    if (
      dataLibraryProfile?.maxConcurrentAudioLoansPerBorrower &&
      dataLoans?.userData?.totalAudioLoans &&
      dataLibraryProfile.maxConcurrentAudioLoansPerBorrower > dataLoans.userData.totalAudioLoans
    ) {
      return true
    } else {
      return false
    }
  }
  if (materialType.code === "EBOOK") {
    if (
      dataLibraryProfile?.maxConcurrentEbookLoansPerBorrower &&
      dataLoans?.userData?.totalEbookLoans &&
      dataLibraryProfile.maxConcurrentEbookLoansPerBorrower > dataLoans.userData.totalEbookLoans
    ) {
      return true
    } else {
      return false
    }
  }
  // Podcasts are always loanable, unless user has reached the limit of 30 costFree loans
  if (materialType.code === "PODCAST") {
    return canUserLoanMoreCostFreeMaterials(dataLoans)
  }
  // Default to false
  return false
}

export const canUserLoanMoreCostFreeMaterials = (dataLoans: LoanListResult | undefined | null) => {
  // If we can't determine the total costFree loans, we can't determine if the user can loan more
  if (
    dataLoans?.userData?.totalAudioLoans === undefined ||
    dataLoans?.userData?.totalEbookLoans === undefined ||
    dataLoans?.loans === undefined ||
    dataLoans?.loans === null
  ) {
    return false
  }
  // Check if the user has reached a total of 30 costFree loans - if so, no more can be loaned
  const costFreeLoans =
    dataLoans.loans.length -
    (dataLoans.userData.totalAudioLoans + dataLoans.userData.totalEbookLoans)

  return costFreeLoans < 30
}
