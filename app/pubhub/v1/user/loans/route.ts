import { NextRequest, NextResponse } from "next/server"

import { withAuth } from "@/app/pubhub/(lib)/helper"
import { TUserInfo } from "@/app/pubhub/(lib)/types"
import { transformTimeToUtcString } from "@/app/pubhub/helper"

import {
  getGroupsRequest,
  getInstitutionUserRequest,
  getInstitutionsRequest,
  getLibraryUserOrderListRequest,
} from "./(lib)/requests"
import { libraryUserOrderListSchema } from "./(lib)/schemas"
import { isOrderItem } from "./(lib)/types"

async function getLibraryUserOrder(request: NextRequest, context: { userInfo: TUserInfo }) {
  const { userInfo } = context
  const libraryUserOrderList = libraryUserOrderListSchema.transform(orderListData => {
    const orderListResponse = orderListData.response
    const orderItem = orderListResponse.data.orderitem
    const orderItems = isOrderItem(orderItem) ? [orderItem] : orderItem

    return {
      loans: orderItems.map(orderItem => {
        return {
          orderId: orderItem.retailerordernumber,
          orderDateUtc: transformTimeToUtcString(orderItem.orderdate),
          loanExpireDateUtc: transformTimeToUtcString(orderItem.loanexpiredate),
          libraryBook: {
            identifier: orderItem.book.attributes.id,
          },
        }
      }),
      userData: {
        totalLoans: Number(orderListResponse.status.LibraryExtension.usertotalloans),
        totalEbookLoans: Number(orderListResponse.status.LibraryExtension.usertotalebookloans),
        totalAudioLoans: Number(orderListResponse.status.LibraryExtension.usertotalsoundloans),
      },
    }
  })

  try {
    const responseData = await getLibraryUserOrderListRequest(userInfo)
    const groupResponse = await getGroupsRequest("101047")
    const groupData = groupResponse ?? []
    // Debug: groups
    groupData.forEach(group => {
      console.log({ test: group })
    })

    // Debug: institution user (forbidden)
    const instUserResponse = await getInstitutionUserRequest("101047", userInfo)
    console.log({ test: instUserResponse })

    // Debug: institutions
    const institutionsResponse = await getInstitutionsRequest(["101047"], userInfo)
    const institutionsData = institutionsResponse ?? []
    console.log({ test: institutionsData })

    return NextResponse.json(libraryUserOrderList.parse(responseData))
  } catch (error) {
    console.error(error)
    throw new Response("Unprocessable content", { status: 422 })
  }
}

// @todo Fix ts problem about context here.
// @ts-ignore
export const GET = withAuth(getLibraryUserOrder)

export const dynamic = "force-dynamic"
