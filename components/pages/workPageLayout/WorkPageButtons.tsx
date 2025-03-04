import React, { useMemo, useState } from "react"

import {
  isManifestationAudioBook,
  isManifestationEbook,
  isManifestationPodcast,
} from "@/components/pages/workPageLayout/helper"
import { Button } from "@/components/shared/button/Button"
import Player from "@/components/shared/publizonPlayer/PublizonPlayer"
import ResponsiveDialog from "@/components/shared/responsiveDialog/ResponsiveDialog"
import SmartLink from "@/components/shared/smartLink/SmartLink"
import { ManifestationWorkPageFragment } from "@/lib/graphql/generated/fbi/graphql"
import { resolveUrl } from "@/lib/helpers/helper.routes"
import useGetV1UserLoans from "@/lib/rest/publizon/useGetV1UserLoans"

export type WorkPageButtonsProps = {
  workId: string
  selectedManifestation: ManifestationWorkPageFragment
}

const WorkPageButtons = ({ workId, selectedManifestation }: WorkPageButtonsProps) => {
  const identifier = selectedManifestation?.identifiers[0].value
  const url = resolveUrl({
    routeParams: { work: "work", ":wid": workId, read: "read" },
    queryParams: { id: identifier || "" },
  })
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const getV1UserLoans = useGetV1UserLoans()
  const { data: dataLoans, isLoading: isLoadingLoans, isError: isErrorLoans } = getV1UserLoans()
  const isLoanButtonDisabled = isLoadingLoans || isErrorLoans
  const isLoaned = useMemo(() => {
    return dataLoans?.loans?.some(loan => loan.libraryBook?.identifier === identifier)
  }, [dataLoans?.loans, identifier])

  if (isLoadingLoans) {
    return (
      <>
        <div className="bg-background-skeleton mb-grid-gap-half h-10 w-full animate-pulse rounded-full lg:w-80" />
        <div className="bg-background-skeleton h-10 w-full animate-pulse rounded-full lg:w-80" />
      </>
    )
  }

  return (
    <>
      {isManifestationEbook(selectedManifestation) && (
        <>
          {!isLoaned && (
            <Button
              ariaLabel="Prøv e-bog"
              size={"default"}
              className="mb-grid-gap-half w-full lg:max-w-80 lg:min-w-72"
              asChild
              disabled={!!identifier}>
              <SmartLink linkType="external" href={url}>
                Prøv e-bog
              </SmartLink>
            </Button>
          )}
          <Button
            ariaLabel={isLoaned ? "Læs e-bog" : "Lån e-bog"}
            className="w-full lg:max-w-80 lg:min-w-72"
            theme={"primary"}
            disabled={isLoanButtonDisabled}>
            {isLoaned ? "Læs e-bog" : "Lån e-bog"}
          </Button>
        </>
      )}
      {isManifestationAudioBook(selectedManifestation) && (
        <>
          <Button
            ariaLabel="Prøv lydbog"
            disabled={!!!identifier}
            className="mb-grid-gap-half w-full lg:max-w-80 lg:min-w-72"
            onClick={() => setIsPlayerOpen(!isPlayerOpen)}>
            Prøv lydbog
          </Button>
          <Button
            ariaLabel={isLoaned ? "Læs lydbog" : "Lån lydbog"}
            className="w-full lg:max-w-80 lg:min-w-72"
            theme={"primary"}
            disabled={isLoanButtonDisabled}>
            {isLoaned ? "Læs lydbog" : "Lån lydbog"}
          </Button>
        </>
      )}
      {isManifestationPodcast(selectedManifestation) && (
        <>
          <Button
            ariaLabel="Prøv podcast"
            disabled={!!!identifier}
            className="mb-grid-gap-half w-full lg:max-w-80 lg:min-w-72"
            onClick={() => setIsPlayerOpen(!isPlayerOpen)}>
            Prøv podcast
          </Button>
          <Button
            ariaLabel={isLoaned ? "Læs podcast" : "Hør podcast"}
            className="w-full lg:max-w-80 lg:min-w-72"
            theme={"primary"}
            disabled={isLoanButtonDisabled}>
            {isLoaned ? "Læs podcast" : "Hør podcast"}
          </Button>
        </>
      )}

      {/* Reader / Player dialog */}
      {!!selectedManifestation?.identifiers[0].value && (
        <ResponsiveDialog
          open={isPlayerOpen}
          onOpenChange={() => {
            setIsPlayerOpen(!isPlayerOpen)
          }}
          title={`Prøv ${isManifestationPodcast(selectedManifestation) ? "Podcast" : "Lydbog"}`}
          description={`For at låne ${isManifestationPodcast(selectedManifestation) ? "podcast" : "lydbogen"} skal du være oprettet som bruger på GO.`}>
          <Player type="demo" identifier={selectedManifestation.identifiers[0].value} />
        </ResponsiveDialog>
      )}
    </>
  )
}

export default WorkPageButtons
