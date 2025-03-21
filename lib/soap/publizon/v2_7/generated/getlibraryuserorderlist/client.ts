import { Client as SoapClient, createClientAsync as soapCreateClientAsync, IExOptions as ISoapExOptions } from "soap";
import { GetLibraryUserOrderList } from "./definitions/GetLibraryUserOrderList";
import { GetLibraryUserOrderListResponse } from "./definitions/GetLibraryUserOrderListResponse";
import { GetLibraryUserOrder } from "./definitions/GetLibraryUserOrder";
import { GetLibraryUserOrderResponse } from "./definitions/GetLibraryUserOrderResponse";
import { Getlibraryuserorderlist } from "./services/Getlibraryuserorderlist";

export interface GetlibraryuserorderlistClient extends SoapClient {
    Getlibraryuserorderlist: Getlibraryuserorderlist;
    GetLibraryUserOrderListAsync(getLibraryUserOrderList: GetLibraryUserOrderList, options?: ISoapExOptions): Promise<[result: GetLibraryUserOrderListResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetLibraryUserOrderAsync(getLibraryUserOrder: GetLibraryUserOrder, options?: ISoapExOptions): Promise<[result: GetLibraryUserOrderResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetLibraryUserOrderListAsync(getLibraryUserOrderList: GetLibraryUserOrderList, options?: ISoapExOptions): Promise<[result: GetLibraryUserOrderListResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetLibraryUserOrderAsync(getLibraryUserOrder: GetLibraryUserOrder, options?: ISoapExOptions): Promise<[result: GetLibraryUserOrderResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create GetlibraryuserorderlistClient */
export function createClientAsync(...args: Parameters<typeof soapCreateClientAsync>): Promise<GetlibraryuserorderlistClient> {
    return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
