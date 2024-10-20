import { Address, AddressExistingLexofficeContact, AddressNonExistingLexofficeContact, CustomLineItem, CustomLineItemXRechnung, LineItem, TaxType, TextLineItem } from "./invoice.type";

export type DeliveryNote = {
    id: string;
    organizationId: string;
    createdDate: string;
    updatedDate: string;
    version: number;
    language: string;
    archived: boolean;
    voucherStatus: string;
    voucherNumber: string;
    voucherDate: string;
    dueDate: string | null;
    // 1
    address: Address | AddressExistingLexofficeContact | AddressNonExistingLexofficeContact;
    lineItems: (LineItem | CustomLineItemXRechnung | CustomLineItem | TextLineItem)[];
    taxConditions: {
        taxType: TaxType;
        taxTypeNote?: string;
    };
    readonly relatedVouchers: any;
    printLayoutId?: string;
    title?: string;
    introduction?: string;
    remark?: string;
    deliveryTerms?: string;
    readonly files: { documentFileId: string };
}