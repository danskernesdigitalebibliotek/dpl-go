import { GetproductloanstatusSoap } from "../ports/GetproductloanstatusSoap";
import { GetproductloanstatusSoap12 } from "../ports/GetproductloanstatusSoap12";

export interface Getproductloanstatus {
    readonly GetproductloanstatusSoap: GetproductloanstatusSoap;
    readonly GetproductloanstatusSoap12: GetproductloanstatusSoap12;
}
