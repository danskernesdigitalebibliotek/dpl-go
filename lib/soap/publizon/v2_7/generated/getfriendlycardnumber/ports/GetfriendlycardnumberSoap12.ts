import { GetFriendlyCardnumber } from "../definitions/GetFriendlyCardnumber";
import { GetFriendlyCardnumberResponse } from "../definitions/GetFriendlyCardnumberResponse";

export interface GetfriendlycardnumberSoap12 {
    GetFriendlyCardnumber(getFriendlyCardnumber: GetFriendlyCardnumber, callback: (err: any, result: GetFriendlyCardnumberResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
