import { head, uniqBy } from "lodash"

import { SlideSelectOption } from "@/components/shared/slideSelect/SlideSelect"
import { materialTypeCategories } from "@/components/shared/workCard/helper"
import {
  GeneralMaterialTypeCodeEnum,
  ManifestationWorkPageFragment,
  WorkFullWorkPageFragment,
  WorkMaterialTypesFragment,
} from "@/lib/graphql/generated/fbi/graphql"

export const getWorkMaterialTypes = (
  materialTypes:
    | WorkMaterialTypesFragment["materialTypes"]
    | ManifestationWorkPageFragment["materialTypes"]
): WorkMaterialTypesFragment["materialTypes"][0]["materialTypeGeneral"][] => {
  return materialTypes.map(materialType => materialType.materialTypeGeneral)
}

export const getManifestationMaterialType = (
  manifestation: ManifestationWorkPageFragment
): WorkMaterialTypesFragment["materialTypes"][0]["materialTypeGeneral"]["display"] => {
  return manifestation.materialTypes[0].materialTypeGeneral.display
}

export const getManifestationByMaterialType = (
  work: WorkFullWorkPageFragment,
  materialType: GeneralMaterialTypeCodeEnum[0]
): ManifestationWorkPageFragment | undefined => {
  return work.manifestations.all.find(manifestation =>
    manifestation.materialTypes.some(type => type.materialTypeGeneral.display === materialType)
  )
}

export const getBestRepresentation = (
  work: WorkFullWorkPageFragment
): ManifestationWorkPageFragment => {
  // If best representation is found on "work" we return that
  if (work.manifestations.bestRepresentation) {
    return work.manifestations.bestRepresentation
  }
  // If best representation doesn't exist we choose in the following order:
  // 1. Ebook / 2. Audiobook / 3. Book / 4. First in all manifestations (any)
  const eBook = getManifestationByMaterialType(work, GeneralMaterialTypeCodeEnum.Ebooks)
  if (eBook) {
    return eBook
  }
  const audioBook = getManifestationByMaterialType(work, GeneralMaterialTypeCodeEnum.AudioBooks)
  if (audioBook) {
    return audioBook
  }
  const book = getManifestationByMaterialType(work, GeneralMaterialTypeCodeEnum.Books)
  if (book) {
    return book
  }
  return work.manifestations.all[0]
}

const isOfMaterialType = (
  manifestation: ManifestationWorkPageFragment,
  materialType: GeneralMaterialTypeCodeEnum[0]
) => {
  return manifestation.materialTypes.some(type => type.materialTypeGeneral.code === materialType)
}

export const isEbook = (manifestation: ManifestationWorkPageFragment | undefined | null) => {
  if (!manifestation) return false
  return isOfMaterialType(manifestation, GeneralMaterialTypeCodeEnum.Ebooks)
}

export const isAudioBook = (manifestation: ManifestationWorkPageFragment | undefined | null) => {
  if (!manifestation) return false
  return isOfMaterialType(manifestation, GeneralMaterialTypeCodeEnum.AudioBooks)
}

export const isPodcast = (manifestation: ManifestationWorkPageFragment | undefined | null) => {
  if (!manifestation) return false
  return isOfMaterialType(manifestation, GeneralMaterialTypeCodeEnum.Podcasts)
}

export const getManifestationLanguageIsoCode = (
  manifestation: ManifestationWorkPageFragment | undefined | null
) => {
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

export const materialTypeTranslations = {
  [GeneralMaterialTypeCodeEnum.Articles]: "Artikel",
  [GeneralMaterialTypeCodeEnum.Books]: "Bog",
  [GeneralMaterialTypeCodeEnum.Comics]: "Tegneserie",
  [GeneralMaterialTypeCodeEnum.Ebooks]: "E-bog",
  [GeneralMaterialTypeCodeEnum.ImageMaterials]: "Billedmateriale",
  [GeneralMaterialTypeCodeEnum.NewspaperJournals]: "Avis",
  [GeneralMaterialTypeCodeEnum.AudioBooks]: "Lydbog",
  [GeneralMaterialTypeCodeEnum.Music]: "Musik",
  [GeneralMaterialTypeCodeEnum.Podcasts]: "Podcast",
  [GeneralMaterialTypeCodeEnum.SheetMusic]: "Noder",
  [GeneralMaterialTypeCodeEnum.BoardGames]: "Brætspil",
  [GeneralMaterialTypeCodeEnum.ComputerGames]: "Computerspil",
  [GeneralMaterialTypeCodeEnum.Films]: "Film",
  [GeneralMaterialTypeCodeEnum.TvSeries]: "Tv-serie",
  [GeneralMaterialTypeCodeEnum.Other]: "Andet",
}

export const translateMaterialTypesForRender = (option: SlideSelectOption): SlideSelectOption => {
  return {
    ...option,
    render: materialTypeTranslations[option.value as GeneralMaterialTypeCodeEnum],
  }
}

export const findInitialSliderValue = (
  sliderOptions: SlideSelectOption[] | undefined | null,
  selectedManifestation: ManifestationWorkPageFragment | undefined | null,
  searchParams: URLSearchParams
) => {
  // If we have a material type specified in the URL, we use that
  if (
    !!searchParams.get("type") &&
    sliderOptions?.some(option => option.render === searchParams.get("type"))
  ) {
    return sliderOptions.find(option => option.render === searchParams.get("type"))
  }
  // Else select any
  return sliderOptions?.find(option => {
    return selectedManifestation?.materialTypes.find(materialType => {
      return materialType.materialTypeGeneral.code.includes(option.value)
    })
  })
}

export const addMaterialTypeIconToSelectOption = (option: SlideSelectOption) => {
  const code = option.value as GeneralMaterialTypeCodeEnum
  if (materialTypeCategories.reading.includes(code)) {
    return { ...option, icon: "book" }
  }
  if (materialTypeCategories.listening.includes(code)) {
    return { ...option, icon: "headphones" }
  }
  if (materialTypeCategories.gaming.includes(code)) {
    return { ...option, icon: "controller" }
  }
  if (materialTypeCategories.video.includes(code)) {
    return { ...option, icon: "video" }
  }
  return option
}
