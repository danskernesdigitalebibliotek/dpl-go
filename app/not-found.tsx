import ErrorPageLayout from "@/components/pages/errorPageLayout/ErrorPageLayout"

import DefaultLayout from "./(defaultLayout)/layout"

export default function NotFound() {
  return (
    <DefaultLayout>
      <ErrorPageLayout
        title="Oopsie.."
        description="Vi kan desværre ikke loade siden."
        buttonText="Tilbage til GO! sitet"
        buttonLink="/"
      />
    </DefaultLayout>
  )
}
