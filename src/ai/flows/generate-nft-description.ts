'use server';

/**
 * @fileOverview Generates a description for an NFT based on an image.
 *
 * - generateNftDescription - A function that generates an NFT description.
 * - GenerateNftDescriptionInput - The input type for the function.
 * - GenerateNftDescriptionOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNftDescriptionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the NFT, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});

export type GenerateNftDescriptionInput = z.infer<typeof GenerateNftDescriptionInputSchema>;

const GenerateNftDescriptionOutputSchema = z.object({
  description: z.string().describe('A creative and compelling description for the NFT, around 2-3 sentences long.'),
});

export type GenerateNftDescriptionOutput = z.infer<typeof GenerateNftDescriptionOutputSchema>;

export async function generateNftDescription(
  input: GenerateNftDescriptionInput
): Promise<GenerateNftDescriptionOutput> {
  return generateNftDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNftDescriptionPrompt',
  input: {schema: GenerateNftDescriptionInputSchema},
  output: {schema: GenerateNftDescriptionOutputSchema},
  prompt: `You are an expert NFT marketer. Based on the image provided, write a creative and compelling description for the NFT. The description should be about 2-3 sentences long and highlight the unique aspects of the artwork.

Image: {{media url=photoDataUri}}`,
});

const generateNftDescriptionFlow = ai.defineFlow(
  {
    name: 'generateNftDescriptionFlow',
    inputSchema: GenerateNftDescriptionInputSchema,
    outputSchema: GenerateNftDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
