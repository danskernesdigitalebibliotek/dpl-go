import React from "react"

import ParagraphResolver from "@/components/paragraphs/ParagraphResolver"
import ImageBaseWithPlaceholder from "@/components/shared/image/ImageBaseWithPlaceholder"
import ImageCaptionWrapper from "@/components/shared/image/ImageCaptionWrapper"
import { Maybe, MediaImage, NodeGoArticle } from "@/lib/graphql/generated/dpl-cms/graphql"
import { localeDateStringFromDate } from "@/lib/helpers/helper.dates"

export type TArticlePageLayoutProps = {
  goArticleImage?: Maybe<MediaImage>
  publicationDate: { timestamp: string }
} & NodeGoArticle

function ArticlePageLayout({ pageData }: { pageData: TArticlePageLayoutProps }) {
  const { paragraphs } = pageData
  const { goArticleImage } = pageData

  if (!paragraphs) {
    return null
  }

  const mediaImage = goArticleImage?.mediaImage

  const publicationDate = new Date(pageData.publicationDate.timestamp)
  const localeDateString = localeDateStringFromDate(publicationDate)

  return (
    <div className="gap-y-paragraph-spacing flex flex-col">
      <div className="content-container gap-y-paragraph-spacing grid-go">
        <h1 className="text-typo-heading-1 xs:text-typo-huge md:px-grid-column-half col-span-full text-center">
          {pageData.title}
        </h1>

        <ImageCaptionWrapper caption={goArticleImage?.byline || ""} className="col-span-full">
          <div className="rounded-base relative overflow-hidden">
            <ImageBaseWithPlaceholder
              className="rounded-base"
              sizes="100vw"
              imageSizing="intrinsic"
              src={mediaImage?.url || ""}
              width={mediaImage?.width || 0}
              height={mediaImage?.height || 0}
              alt={mediaImage?.alt || ""}
            />
          </div>
        </ImageCaptionWrapper>

        <p className="text-typo-subtitle-lg max-w-article-max-width col-span-full mx-auto">
          {pageData.subtitle}
        </p>
        <div className="col-span-full space-y-4">
          <hr className="max-w-article-max-width mx-auto w-full" />
          <div className="max-w-article-max-width text-typo-caption mx-auto">
            {localeDateString}
          </div>
        </div>
      </div>
      <div className="gap-y-paragraph-spacing flex w-full flex-col">
        <ParagraphResolver paragraphs={paragraphs} />
      </div>
    </div>
  )
}

export default ArticlePageLayout
