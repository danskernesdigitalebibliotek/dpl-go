import loadArticle from "./loadArticle"

// import loadArticlesSsg from "./loadArticlesSsg"

const Page = async (props: { params: Promise<{ pathElements: string[] }> }) => {
  const params = await props.params

  const { pathElements } = params

  const path = [...pathElements].join("/")
  const data = await loadArticle(path)
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default Page

export async function generateStaticParams() {
  return []
}
