import { FC, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Stack, Link } from 'expo-router';
import ItemCard from '~/components/ItemCard';

import { Button } from '~/components/ui/Button';
import { Container } from '~/components/ui/Container';
import database from '~/db';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Product from '~/db/models/Product';

interface IProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  is_available: boolean;
}
export default function Home() {
  const handleRead = async () => {};
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<number>(0);
  const fetchProducts = async () => {
    try {
      const productsCollection = database.get<Product>('products');
      const allProducts = await productsCollection.query().fetch(); // Fetch all products
      setProducts(allProducts);
      console.log(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteAllProducts = async () => {
    try {
      const productsCollection = database.get<Product>('products');
      const allProducts = await productsCollection.query().fetch(); // Fetch all products

      // Mark each product as deleted (soft delete)
      await database.write(async () => {
        allProducts.forEach(async (product) => {
          await product.markAsDeleted(); // Mark as deleted (WatermelonDB handles soft deletion)
        });
      });

      console.log('All products marked as deleted');
    } catch (error) {
      console.error('Error deleting all products:', error);
    }
  };
  const addProduct = async () => {
    const productsCollection = database.get<Product>('products');

    await database.write(async () => {
      try {
        // Creating a new product
        const newProduct = await productsCollection.create((product) => {
          product.title = 'Tomato'; // Ensure this field matches schema
          product.description = 'A fresh vegetable, perfect for salads.'; // Ensure this field matches schema
          product.image =
            'https://5.imimg.com/data5/GX/UH/IE/SELLER-20952956/fresh-tomato-500x500.jpg'; // Ensure this field matches schema
          product.price = 80; // Ensure this field matches schema and data type
          product.quantity = 1; // Ensure this field matches schema and data type
          product.isAvailable = true; // Match the exact field name from schema
        });
        // Update the state with the new product
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        console.log('Product added successfully!');
      } catch (error) {
        console.error('Error adding product:', error);
      }
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerRight: () => <HeaderRightWithBadge />,
        }}
      />
      <Container>
        {/* <View className="flex-row justify-between gap-4"> */}
        <FlatList
          className="flex-1"
          showsVerticalScrollIndicator={false}
          data={products}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <ItemCard image={item.image} title={item.title} price={item.price} />
          )}
        />
        {/* </View> */}
        {/* <View className="my-4 flex-1 justify-end"> */}
        <Button title="Add Product " className="mb-6 mt-3 rounded-lg" onPress={addProduct} />
        {/* </View> */}
      </Container>
    </>
  );
}
type carts = number;
const HeaderRightWithBadge = () => {
  return (
    <View style={styles.iconContainer}>
      <FontAwesome5 name="shopping-cart" size={24} color="#6366F1" />
      {1 > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>1</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative', // Ensure badge is positioned relative to the icon
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
