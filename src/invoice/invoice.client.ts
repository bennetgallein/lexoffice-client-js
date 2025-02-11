import { Err, Ok, Result } from 'ts-results';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import {
  InvoiceCreate,
  InvoiceCreateResponse,
  InvoiceRetrieveResponse,
  XRechnung,
  DocumentFileId,
} from './invoice-dto.type';
import { OptionalFinalized } from './invoice.type';
import uri from 'uri-tag';
import { DeliveryNote } from './delivery-note.type';

export class InvoiceClient extends BaseClient {
  async createInvoice(
    invoice: InvoiceCreate | XRechnung,
    optionalFinalized?: OptionalFinalized,
  ): Promise<Result<InvoiceCreateResponse, RequestError>> {
    return this.axios
      .post<InvoiceCreateResponse>('/invoices', invoice, { params: optionalFinalized })
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async retrieveInvoice(id: string): Promise<Result<InvoiceRetrieveResponse, RequestError>> {
    return this.axios
      .get<InvoiceRetrieveResponse>(uri`/invoices/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async renderInvoiceDocumentFileId(id: string): Promise<Result<DocumentFileId, RequestError>> {
    return this.axios
      .get<DocumentFileId>(uri`/invoices/${id}/document`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async pursueDeliveryNote(id: string, deliveryNote: DeliveryNote): Promise<Result<DeliveryNote, RequestError>> {
    return this.axios
      .post(uri`/delivery-notes`, deliveryNote, { params: { precedingSalesVoucherId: id } })
      .then(result => Ok(result.data))
      .catch(error => Err(handleRequestError(error)))
  }
}
