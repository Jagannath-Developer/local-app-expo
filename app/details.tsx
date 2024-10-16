import { Stack, useLocalSearchParams } from 'expo-router';

import { Container } from '~/components/ui/Container';
import { ScreenContent } from '~/components/ui/ScreenContent';

export default function Details() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: 'Details' }} />
      <Container>
        <ScreenContent path="screens/details.tsx" title={`Showing details for user ${name}`} />
      </Container>
    </>
  );
}
