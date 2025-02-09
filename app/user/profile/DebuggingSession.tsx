"use client"

import useSession from "@/hooks/useSession"

const DebuggingSession = () => {
  const session = useSession()

  return (
    <>
      <h2 className="text-typo-heading-5 mt-5">Debugging:</h2>
      <div className="mt-3">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      {session.session?.isLoggedIn && (
        <div className="border-primary-500 mt-5 w-1/2 border-2 border-solid p-5">
          <div className="text-typo-body-lg">
            Imdlertidig logud instrukser (logger ikke ud af SSO&apos;er)
          </div>
          <div className="text-typo-body-md my-10">
            For at logge ud af Adgangsplatform session skal du:
          </div>
          <ul className="text-typo-body-md my-10">
            <li>Slette go-session cookie i din browser</li>
            <li>Slette Drupals session cookie der starter med SESS...</li>
          </ul>
          <hr />
          <div className="text-typo-body-md my-10">For at logge ud af Unilogin skal du:</div>
          <ul className="text-typo-body-md my-10">
            <li>Slette go-session cookie i din browser</li>
          </ul>
        </div>
      )}
    </>
  )
}

export default DebuggingSession
