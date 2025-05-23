import { getUniloginWsCredentials } from "@/lib/helpers/unilogin"
import { createClientAsync } from "@/lib/soap/unilogin/wsiinst-v5/generated/ws"

import schemas from "./schemas"

export const getInstitutionRequest = async (institutionId: string) => {
  const client = await createClientAsync("./lib/soap/unilogin/wsiinst-v5/wsdl/ws.wsdl", {
    forceSoap12Headers: true,
  })
  const { username, password } = await getUniloginWsCredentials()
  if (!username || !password) {
    throw new Error("Missing Unilogin credentials")
  }

  const [response] = await client.hentInstitutionAsync({
    wsBrugerid: username,
    wsPassword: password,
    instnr: institutionId,
  })

  return schemas.institution.parse(response.institution)
}
