import { GetLibraryProfile } from "../definitions/GetLibraryProfile";
import { GetLibraryProfileResponse } from "../definitions/GetLibraryProfileResponse";

export interface GetlibraryinfoSoap {
    GetLibraryProfile(getLibraryProfile: GetLibraryProfile, callback: (err: any, result: GetLibraryProfileResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
