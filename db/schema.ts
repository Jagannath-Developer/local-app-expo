import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    // Product Table Schema
    tableSchema({
      name: 'products',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'image', type: 'string' },
        { name: 'price', type: 'number' },
        { name: 'quantity', type: 'number' },
        { name: 'is_available', type: 'boolean' },  // Ensure 'is_available' matches with the field you're trying to use
      ],
    }),

    // Sale Invoice Table Schema
    tableSchema({
      name: 'sale_invoices',
      columns: [
        { name: 'invoice_number', type: 'string' },
        { name: 'date', type: 'number' },  // Use timestamp (number) for dates
        { name: 'total', type: 'number' },
      ],
    }),

    // ProductSales (Join Table) Schema
    tableSchema({
      name: 'product_sales',
      columns: [
        { name: 'product_id', type: 'string', isIndexed: true },  // Foreign key to 'products'
        { name: 'sale_invoice_id', type: 'string', isIndexed: true },  // Foreign key to 'sale_invoices'
        { name: 'quantity', type: 'number' },
      ],
    }),
  ],
});
