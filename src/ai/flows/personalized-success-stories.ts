'use server';

/**
 * @fileOverview AI flow for personalizing success stories based on user demographics and interests.
 *
 * - personalizeSuccessStories - A function that takes user information and returns relevant success stories.
 * - PersonalizedSuccessStoriesInput - The input type for the personalizeSuccessStories function.
 * - PersonalizedSuccessStoriesOutput - The return type for the personalizeSuccessStories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedSuccessStoriesInputSchema = z.object({
  demographics: z
    .string()
    .describe('Demographic information about the user (e.g., age, gender, location).'),
  interests: z
    .string()
    .describe('The user interests related to health, weight loss, and wellness.'),
  productName: z.string().describe('The name of the product being advertised.'),
  allSuccessStories: z.array(z.string()).describe('All available success stories.'),
});

export type PersonalizedSuccessStoriesInput = z.infer<
  typeof PersonalizedSuccessStoriesInputSchema
>;

const PersonalizedSuccessStoriesOutputSchema = z.object({
  relevantSuccessStories: z
    .array(z.string())
    .describe('Success stories most relevant to the user. Should be a maximum of 3 stories.'),
});

export type PersonalizedSuccessStoriesOutput = z.infer<
  typeof PersonalizedSuccessStoriesOutputSchema
>;

export async function personalizeSuccessStories(
  input: PersonalizedSuccessStoriesInput
): Promise<PersonalizedSuccessStoriesOutput> {
  return personalizedSuccessStoriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeSuccessStoriesPrompt',
  input: {schema: PersonalizedSuccessStoriesInputSchema},
  output: {schema: PersonalizedSuccessStoriesOutputSchema},
  prompt: `Given the following user demographics, interests, product and all success stories, select the top 3 most relevant success stories that would resonate with the user.

User Demographics: {{{demographics}}}
User Interests: {{{interests}}}
Product Name: {{{productName}}}
All Success Stories: {{#each allSuccessStories}}- {{{this}}}\n{{/each}}

Return only the relevant success stories in an array.
`,
});

const personalizedSuccessStoriesFlow = ai.defineFlow(
  {
    name: 'personalizedSuccessStoriesFlow',
    inputSchema: PersonalizedSuccessStoriesInputSchema,
    outputSchema: PersonalizedSuccessStoriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
