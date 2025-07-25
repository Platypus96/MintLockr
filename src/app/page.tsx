import { MintNftCard } from '@/components/mint-nft-card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">MintLockr</h1>
          <p className="mt-2 text-lg text-muted-foreground">Mint your unique digital assets on the blockchain.</p>
        </header>
        <div className="bg-yellow-500/10 text-yellow-200 border border-yellow-500/20 rounded-lg p-4 text-sm mb-6">
          <strong>Note:</strong> The AI features require a Google AI API key. Please get one from{' '}
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-100">
            Google AI Studio
          </a>{' '}
          and add it to the `.env.local` file in your project.
        </div>
        <MintNftCard />
      </div>
    </main>
  );
}
