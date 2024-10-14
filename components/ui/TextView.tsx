import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

// Define the type of props that the TextView component will accept
interface TextViewProps {
  text: string;
  style?: StyleProp<TextStyle>;
  className?: string;
  numberOfLines?: number; // Optional prop for limiting text to certain lines
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'; // Optional prop for text truncation
}

// Reusable TextView component
const TextView: React.FC<TextViewProps> = ({ text, style, className, numberOfLines=1,ellipsizeMode }) => {
  return (
    <Text className={className} style={style} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>
      {text}
    </Text>
  );
};

export default TextView;
