import {
  GeneralMaterialTypeCodeEnum,
  SearchWithPaginationQuery,
  WorkTeaserSearchPageFragment,
} from "@/lib/graphql/generated/fbi/graphql"

export const displayCreators = (
  creators: SearchWithPaginationQuery["search"]["works"][0]["creators"],
  amount: number
) => {
  return creators.reduce((acc, creator, index) => {
    // We shorten to max <amount> creators
    if (index === amount) {
      return acc + ", et. al"
    }
    if (index > amount) {
      return acc
    }
    return acc + (index > 0 ? ", " : "") + creator.display
  }, "")
}

export const materialTypeCategories = {
  reading: [
    GeneralMaterialTypeCodeEnum.Articles,
    GeneralMaterialTypeCodeEnum.Books,
    GeneralMaterialTypeCodeEnum.Comics,
    GeneralMaterialTypeCodeEnum.Ebooks,
    GeneralMaterialTypeCodeEnum.ImageMaterials,
    GeneralMaterialTypeCodeEnum.NewspaperJournals,
  ],
  listening: [
    GeneralMaterialTypeCodeEnum.AudioBooks,
    GeneralMaterialTypeCodeEnum.Music,
    GeneralMaterialTypeCodeEnum.Podcasts,
    GeneralMaterialTypeCodeEnum.SheetMusic,
  ],
  gaming: [GeneralMaterialTypeCodeEnum.BoardGames, GeneralMaterialTypeCodeEnum.ComputerGames],
  video: [GeneralMaterialTypeCodeEnum.Films, GeneralMaterialTypeCodeEnum.TvSeries],
}

export const isOfWorkTypeCategory = (
  materialTypes: SearchWithPaginationQuery["search"]["works"][0]["materialTypes"],
  category: keyof typeof materialTypeCategories
) => {
  return materialTypes.some(materialType =>
    materialTypeCategories[category].includes(materialType.materialTypeGeneral.code)
  )
}

export const getAllWorkPids = (work: WorkTeaserSearchPageFragment) => {
  return work.manifestations.all.map(manifestation => manifestation.pid)
}
