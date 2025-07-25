"use client";

import { useState, useRef, type ChangeEvent } from 'react';
import Image from 'next/image';
import { ethers } from 'ethers';
import {
  Wallet,
  UploadCloud,
  Sparkles,
  Loader2,
  CheckCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MINTLOCKR_CONTRACT_ADDRESS, MINTLOCKR_ABI } from '@/lib/contracts';
import { enhanceImage } from '@/ai/flows/enhance-image-quality';

type Status = 'idle' | 'connecting' | 'enhancing' | 'minting' | 'success';

export function MintNftCard() {
  const [account, setAccount] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [nftAddress, setNftAddress] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const isWorking = status === 'connecting' || status === 'enhancing' || status === 'minting';

  const handleConnectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        variant: 'destructive',
        title: 'MetaMask not found',
        description: 'Please install MetaMask to use this app.',
      });
      return;
    }
    setStatus('connecting');
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setStatus('idle');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Connection Failed',
        description: 'Could not connect to MetaMask. Please try again.',
      });
      setStatus('idle');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({ variant: 'destructive', title: 'Invalid File', description: 'Please upload an image file.' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setEnhancedImage(null);
        setStatus('idle');
        setTxHash(null);
        setTokenId(null);
        setNftAddress(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhanceImage = async () => {
    if (!image) return;
    setStatus('enhancing');
    try {
      const result = await enhanceImage({ photoDataUri: image });
      setEnhancedImage(result.enhancedPhotoDataUri);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'AI Enhancement Failed',
        description: error.message || 'There was an issue enhancing your image.',
      });
    } finally {
      setStatus('idle');
    }
  };

  const handleMint = async () => {
    if (!image || !account) return;
    setStatus('minting');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();

      // In a real app, you would upload the image and metadata to a decentralized
      // storage service like IPFS and get a metadata URI.
      // For this example, we'll use a placeholder URI.
      const metadataUri = 'ipfs://bafkreiem4qwt4hmv3b2z3t36sdk4xquxv564ygrfy3yvj7i2s72s6q43om';

      const contract = new ethers.Contract(MINTLOCKR_CONTRACT_ADDRESS, MINTLOCKR_ABI, signer);
      
      const tx = await contract.safeMint(account, metadataUri);
      const receipt = await tx.wait();

      let mintedTokenId = null;
      if (receipt.logs) {
        for (const log of receipt.logs) {
            try {
                const parsedLog = contract.interface.parseLog(log);
                if (parsedLog && parsedLog.name === "Transfer") {
                    mintedTokenId = parsedLog.args.tokenId.toString();
                    break;
                }
            } catch (error) {
                // This log might not be from your contract, ignore it
            }
        }
      }

      setTxHash(tx.hash);
      setTokenId(mintedTokenId);
      setNftAddress(MINTLOCKR_CONTRACT_ADDRESS);
      setStatus('success');
      toast({
        title: 'NFT Minted!',
        description: 'Your new digital asset is now on the blockchain.',
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Minting Failed',
        description: error.reason || 'The transaction was cancelled or failed.',
      });
      setStatus('idle');
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        toast({ title: 'Copied to clipboard!' });
    });
  };

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>NFT Minter</span>
          {account ? (
            <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              {truncateAddress(account)}
            </div>
          ) : (
            <Button onClick={handleConnectWallet} disabled={isWorking}>
              {status === 'connecting' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wallet className="mr-2 h-4 w-4" />}
              Connect Wallet
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          {account ? 'Upload an image and mint it as a unique NFT.' : 'Connect your wallet to get started.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {account && (
          <>
            <div
              className="relative border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-all duration-300 group"
              onClick={() => !isWorking && fileInputRef.current?.click()}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" disabled={isWorking} />
              {(image || enhancedImage) ? (
                <Image
                  src={enhancedImage || image!}
                  alt="NFT Preview"
                  width={400}
                  height={400}
                  className={`rounded-md w-full h-auto object-contain max-h-80 transition-opacity duration-500 ${status === 'enhancing' ? 'opacity-50' : 'opacity-100'}`}
                  data-ai-hint="abstract art"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <UploadCloud className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110 text-primary" />
                  <span className="font-semibold text-foreground">Click to upload or drag & drop</span>
                  <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
               {status === 'enhancing' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
            </div>

            {status === 'success' && txHash && tokenId && nftAddress ? (
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 space-y-4 animate-in fade-in-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <div>
                      <h3 className="font-bold text-lg text-foreground">Minting Successful!</h3>
                      <p className="text-sm text-muted-foreground">Your NFT has been created on the Sepolia testnet.</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Token ID:</span>
                      <span className="font-mono text-foreground flex items-center gap-2">{tokenId} <Copy className="w-4 h-4 cursor-pointer hover:text-primary" onClick={() => copyToClipboard(tokenId)} /></span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Contract:</span>
                      <span className="font-mono text-foreground flex items-center gap-2">{truncateAddress(nftAddress)} <Copy className="w-4 h-4 cursor-pointer hover:text-primary" onClick={() => copyToClipboard(nftAddress)} /></span>
                    </div>
                     <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Transaction:</span>
                      <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="font-mono text-primary hover:underline flex items-center gap-2">
                        {truncateAddress(txHash)}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
              </div>
            ) : null}
          </>
        )}
      </CardContent>
      {account && image && (
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleEnhanceImage} disabled={isWorking} className="w-full sm:w-auto" variant="secondary">
            {status === 'enhancing' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Enhance with AI
          </Button>
          <Button onClick={handleMint} disabled={isWorking || status === 'success'} className="w-full sm:w-auto flex-grow bg-accent hover:bg-accent/90 text-accent-foreground">
            {status === 'minting' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Mint NFT
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
