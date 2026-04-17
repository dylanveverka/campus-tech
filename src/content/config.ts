import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    rating: z.number().min(0).max(5),
    verdict: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    asin: z.string().optional(),
    affiliateUrl: z.string().optional(),
    price: z.string(),
    category: z.string(),
    publishDate: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

const compare = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    winner: z.string(),
    product1: z.object({
      name: z.string(),
      price: z.string(),
      rating: z.number(),
      asin: z.string().optional(),
      image: z.string().optional(),
      pros: z.array(z.string()),
      cons: z.array(z.string()),
    }),
    product2: z.object({
      name: z.string(),
      price: z.string(),
      rating: z.number(),
      asin: z.string().optional(),
      image: z.string().optional(),
      pros: z.array(z.string()),
      cons: z.array(z.string()),
    }),
    specs: z.array(z.object({
      label: z.string(),
      product1: z.string(),
      product2: z.string(),
      winner: z.enum(['product1', 'product2', 'tie']).optional(),
    })),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    category: z.string(),
    publishDate: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { reviews, compare, guides };
