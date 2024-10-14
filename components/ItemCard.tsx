import { View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import TextView from './ui/TextView';
import { Button } from './ui/Button';
interface IProps {
  image?: string;
  title?: string;
  price?: number;
}
const ItemCard: FC<IProps> = ({ image, title, price }) => {
  return (
    <View className="flex-1 gap-4 rounded-lg bg-white shadow-lg mb-4">
      <Image
        className="h-28 w-28 self-center object-cover"
        source={{
          uri:
            image || 'https://5.imimg.com/data5/GX/UH/IE/SELLER-20952956/fresh-tomato-500x500.jpg',
        }}
      />
      <View className="flex-col gap-2 pb-4 pe-4 ps-6">
        <TextView text={title || 'no item'} className="text-xl font-semibold" />
        <TextView text={`₹ ${price}`} className="text-lg" />
        <Button title="Add Cart" className="rounded-lg py-2" />
      </View>
    </View>
  );
};

export default ItemCard;
