import Menu from '@/components/menu/Menu';
import New from '@/components/projects/new';
import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY!,
  }),
});

const newProj = () => {
  return (
    <LivepeerConfig client={livepeerClient}>
      <Menu />
      <New />
    </LivepeerConfig>
  );
};

export default newProj;
