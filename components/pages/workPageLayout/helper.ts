import { filter, head, uniqBy } from "lodash"

import { SlideSelectOption } from "@/components/shared/slideSelect/SlideSelect"
import goConfig from "@/lib/config/goConfig"
import {
  GeneralMaterialType,
  GeneralMaterialTypeCodeEnum,
  ManifestationWorkPageFragment,
  WorkFullWorkPageFragment,
  WorkMaterialTypesFragment,
} from "@/lib/graphql/generated/fbi/graphql"
import { LibraryProfile, LoanListResult } from "@/lib/rest/publizon/adapter/generated/model"

export const getManifestationMaterialType = (
  manifestation: ManifestationWorkPageFragment
): WorkMaterialTypesFragment["materialTypes"][0]["materialTypeGeneral"] => {
  return manifestation.materialTypes[0].materialTypeGeneral
}

const allowedMaterialTypes = ["BOOKS", "EBOOKS", "AUDIO_BOOKS", "PODCASTS"]
const allowedPhysicalMaterialTypes = ["BOOKS"]

// TODO: write unit tests for this function
// Exclude manifestations with material types that are not allowed
export const filterManifestationsByMaterialType = (
  manifestations: ManifestationWorkPageFragment[]
) => {
  return filter(manifestations, manifestation => {
    // if the manifestation is physical, we only want to include it if it's a an allowed material physical type
    if (manifestation.accessTypes[0].code === "PHYSICAL") {
      return allowedPhysicalMaterialTypes.includes(
        manifestation.materialTypes[0].materialTypeGeneral.code
      )
    }

    return manifestation.materialTypes.some(type =>
      allowedMaterialTypes.includes(type.materialTypeGeneral.code)
    )
  })
}

// TODO: write unit tests for this function
// If multiple manifestations share the same material type, keep only the latest edition
export const filterManifestationsByEdition = (manifestations: ManifestationWorkPageFragment[]) => {
  return manifestations.reduce((acc, current) => {
    const existing = acc.find(
      item =>
        item.materialTypes[0].materialTypeGeneral.code ===
        current.materialTypes[0].materialTypeGeneral.code
    )
    if (!existing) {
      acc.push(current)
    } else {
      const existingEdition = existing.edition?.publicationYear?.year || 0
      const currentEdition = current.edition?.publicationYear?.year || 0
      if (currentEdition > existingEdition) {
        acc = acc.filter(
          item =>
            item.materialTypes[0].materialTypeGeneral.code !==
            current.materialTypes[0].materialTypeGeneral.code
        )
        acc.push(current)
      }
    }
    return acc
  }, [] as ManifestationWorkPageFragment[])
}

// Sort manifestations by materialTypeSortPriority
export const sortManifestationsBySortPriority = (
  manifestations: ManifestationWorkPageFragment[]
): ManifestationWorkPageFragment[] => {
  const sortPriority = goConfig("materialtypes.sortpriority")
  return manifestations.sort((manifestationA, manifestationB) => {
    const priorityA = sortPriority.indexOf(manifestationA.materialTypes[0].materialTypeGeneral.code)
    const priorityB = sortPriority.indexOf(manifestationB.materialTypes[0].materialTypeGeneral.code)
    return priorityA - priorityB
  })
}

export const getManifestationMaterialTypeSpecific = (
  manifestation: ManifestationWorkPageFragment
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
  materialType: GeneralMaterialTypeCodeEnum
): ManifestationWorkPageFragment | undefined => {
  return work.manifestations.all.find(manifestation =>
    manifestation.materialTypes.some(type => type.materialTypeGeneral.display === materialType)
  )
}

const isManifestationOfMaterialType = (
  manifestation: ManifestationWorkPageFragment,
  materialType: GeneralMaterialTypeCodeEnum
) => {
  return manifestation.materialTypes.some(type => type.materialTypeGeneral.code === materialType)
}

export const isManifestationBook = (manifestation: ManifestationWorkPageFragment) => {
  if (!manifestation) return false
  return isManifestationOfMaterialType(manifestation, "BOOKS")
}

export const isManifestationEbook = (manifestation: ManifestationWorkPageFragment) => {
  if (!manifestation) return false
  return isManifestationOfMaterialType(manifestation, "EBOOKS")
}

export const isManifestationAudioBook = (manifestation: ManifestationWorkPageFragment) => {
  if (!manifestation) return false
  return isManifestationOfMaterialType(manifestation, "AUDIO_BOOKS")
}

export const isManifestationPodcast = (manifestation: ManifestationWorkPageFragment) => {
  if (!manifestation) return false
  return isManifestationOfMaterialType(manifestation, "PODCASTS")
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

export const translateMaterialTypesStringForRender = (
  code: GeneralMaterialTypeCodeEnum
): string => {
  return goConfig("materialtypes.translations")[code]
}

export const getIconNameFromMaterialType = (materialType: GeneralMaterialTypeCodeEnum) => {
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

export const slideSelectOptionsFromMaterialTypes = (workMaterialTypes: GeneralMaterialType[]) => {
  return workMaterialTypes.map(materialType => {
    return {
      code: materialType.code,
      display: translateMaterialTypesStringForRender(
        materialType.code as GeneralMaterialTypeCodeEnum
      ),
    }
  }) as SlideSelectOption[]
}

export const getManifestationMaterialTypeIcon = (manifestation: ManifestationWorkPageFragment) => {
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
  if (materialType.code === "AUDIO_BOOKS") {
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
  if (materialType.code === "EBOOKS") {
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
  // Podcasts are always loanable
  if (materialType.code === "PODCASTS") {
    return true
  }
  // Default to false
  return false
}
