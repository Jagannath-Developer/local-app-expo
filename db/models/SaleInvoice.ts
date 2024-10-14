import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';

export default class SaleInvoice extends Model {
  static table = 'sale_invoices';

  static associations: Associations = {
    product_sales: { type: 'has_many', foreignKey: 'sale_invoice_id' }, // A sale invoice can have many products
  };

  @field('invoice_number') invoiceNumber!: string;
  @field('date') date!: Date;
  @field('total') total!: number;
}
