import { TUserInfo } from "@/app/(routes)/pubhub/(lib)/types"
import { TCreateLoan } from "@/app/(routes)/pubhub/v1/user/loans/[identifier]/(lib)/types"
import { getPublizonServiceParameters } from "@/lib/helpers/publizon"
import { createClientAsync as createClientAsyncCreateLoan } from "@/lib/soap/publizon/v2_7/generated/createloan"

export const createLoanRequest = async (uniLoginUserInfo: TUserInfo, ebookId: string) => {
  const client = await createClientAsyncCreateLoan("./lib/soap/publizon/v2_7/wsdl/createloan.wsdl")
  const { clientid, retailerid, retailerkeycode } = await getPublizonServiceParameters()
  const institutionid = uniLoginUserInfo.institutionIds[0]
  if (!institutionid) {
    throw new Error("Institution id not found")
  }
  const [response] = await client.CreateLoanAsync({
    retailerid,
    retailerkeycode,
    ebookid: ebookId,
    cardnumber: uniLoginUserInfo.uniid,
    clientid,
    institutionid: institutionid,
  })

  return response.CreateLoanResult as TCreateLoan
}
