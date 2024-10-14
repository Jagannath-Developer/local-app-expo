import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';
import { relation, immutableRelation } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
export default class Product extends Model {
  static table = 'products';
  static associations:Associations = {
    product_sales: { type: 'has_many', foreignKey: 'product_id' },
  };

  @text('title') title!: string;
  @text('description') description!: string;
  @text('image') image!: string;
  @field('price') price!: number;
  @field('quantity') quantity!: number;
  @field('is_available') isAvailable!: boolean;
}

class SaleInvoice extends Model {
  static table = 'saleinvoices';
  static associations:Associations = {
    posts: { type: 'belongs_to', key: 'product_id' },
  }
  
 
}