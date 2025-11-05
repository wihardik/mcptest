export type MediaItem = {
  id: string;
  title: string;
  year?: number;
  poster: string;
  description?: string;
};

// Use picsum.photos as royalty-free placeholders
const poster = (n: number) => `https://picsum.photos/seed/poster-${n}/500/750`;

export const rows: { title: string; items: MediaItem[] }[] = [
  {
    title: "Trending Now",
    items: Array.from({ length: 8 }).map((_, i) => ({
      id: `trending-${i}`,
      title: `Trending Movie ${i + 1}`,
      year: 2015 + (i % 8),
      poster: poster(i + 1),
      description: "A thrilling story about people and places.",
    })),
  },
  {
    title: "Top Picks for You",
    items: Array.from({ length: 8 }).map((_, i) => ({
      id: `picks-${i}`,
      title: `Top Pick ${i + 1}`,
      year: 2010 + (i % 10),
      poster: poster(i + 11),
      description: "Critically acclaimed and audience favorite.",
    })),
  },
  {
    title: "Recently Added",
    items: Array.from({ length: 8 }).map((_, i) => ({
      id: `recent-${i}`,
      title: `Recent Show ${i + 1}`,
      year: 2020 + (i % 4),
      poster: poster(i + 21),
      description: "Fresh episodes added this week.",
    })),
  },
  {
    title: "Watch It Again",
    items: Array.from({ length: 8 }).map((_, i) => ({
      id: `again-${i}`,
      title: `Rewatchable ${i + 1}`,
      year: 2000 + (i % 20),
      poster: poster(i + 31),
      description: "Comfort viewing for any mood.",
    })),
  },
];

