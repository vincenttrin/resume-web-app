import StoreProvider from '@/lib/StoreProvider';
import GridGameDemo from '@/components/demos/GridGameDemo';

export const metadata = {
  title: 'Grid Puzzle Game | Demo',
  description: 'Interactive puzzle game featuring pathfinding algorithms and intelligent hint system.',
};

export default function GridGamePage() {
  return (
    <StoreProvider>
      <GridGameDemo />
    </StoreProvider>
  );
}
