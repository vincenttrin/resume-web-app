import StoreProvider from '@/lib/StoreProvider';
import MorseDecoderDemo from '@/components/demos/MorseDecoderDemo';

export const metadata = {
  title: 'Morse Code Decoder | Demo',
  description: 'Real-time morse code translation and hidden message extraction tool.',
};

export default function MorseDecoderPage() {
  return (
    <StoreProvider>
      <MorseDecoderDemo />
    </StoreProvider>
  );
}
