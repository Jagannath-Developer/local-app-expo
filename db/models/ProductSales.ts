import { Model } from '@nozbe/watermelondb';
import { relation, field } from '@nozbe/watermelondb/decorators';
import Product from './Product';
import SaleInvoice from './SaleInvoice';

export default class ProductSales extends Model {
  static table = 'product_sales';

  @relation('products', 'product_id') product!: Product;
  @relation('sale_invoices', 'sale_invoice_id') saleInvoice!: SaleInvoice;
  @field('quantity') quantity!: number;
}
