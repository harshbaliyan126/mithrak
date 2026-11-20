// Server-only: reads the Mithrak Instagram account through the Instagram API
// (Instagram API with Instagram Login — requires a Business or Creator account).
// Never import this from a "use client" component: it uses the access token.
//
// Setup: put a long-lived token in .env.local →  INSTAGRAM_ACCESS_TOKEN=IGAA...
// See README → "Instagram" for how to get and refresh it.

export type InstagramPost = {
  id: string;
  url: string; // permalink to the post on instagram.com
  image: string; // image URL on Instagram's CDN (refreshed on every revalidation)
  alt: string;
  likes: number;
};

type ApiMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  like_count?: number;
  timestamp: string;
  children?: { data: { media_type: ApiMedia["media_type"]; media_url?: string; thumbnail_url?: string }[] };
};

type ApiPage = { data: ApiMedia[]; paging?: { next?: string }; error?: { message: string } };

const API_BASE = process.env.INSTAGRAM_API_BASE ?? "https://graph.instagram.com"; // override only for local testing
const FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,like_count,timestamp,children{media_type,media_url,thumbnail_url}";
const PAGE_SIZE = 50;
const MAX_PAGES = 10; // scans up to 500 most recent posts
export const INSTAGRAM_REVALIDATE_SECONDS = 6 * 60 * 60;

/** Still image for a post: the photo itself, a video's cover, or a carousel's first photo. */
function imageFor(m: ApiMedia): string | undefined {
  if (m.media_type === "IMAGE") return m.media_url;
  if (m.media_type === "VIDEO") return m.thumbnail_url;
  const first = m.children?.data.find((c) => c.media_type === "IMAGE")?.media_url;
  return first ?? m.children?.data[0]?.thumbnail_url ?? m.thumbnail_url ?? m.media_url;
}

function altFor(m: ApiMedia, handle: string) {
  const caption = m.caption?.replace(/\s+/g, " ").trim();
  if (!caption) return `Instagram post by ${handle}`;
  return caption.length > 120 ? caption.slice(0, 117) + "…" : caption;
}

/**
 * The account's `count` most-liked posts, most-liked first.
 * Returns null when no token is configured or the API call fails, so the page can fall back.
 */
export async function getTopInstagramPosts(count = 6, handle = "@mithrak"): Promise<InstagramPost[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  const media: ApiMedia[] = [];
  let url: string | undefined =
    `${API_BASE}/me/media?fields=${encodeURIComponent(FIELDS)}&limit=${PAGE_SIZE}&access_token=${encodeURIComponent(token)}`;

  try {
    for (let page = 0; url && page < MAX_PAGES; page++) {
      const res: Response = await fetch(url, { next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS } });
      const body = (await res.json()) as ApiPage;
      if (!res.ok || body.error) throw new Error(body.error?.message ?? `HTTP ${res.status}`);
      media.push(...body.data);
      url = body.paging?.next;
    }
  } catch (err) {
    console.warn(`[instagram] could not load posts: ${(err as Error).message}`);
    return null;
  }

  return media
    .map((m) => ({ m, image: imageFor(m) }))
    .filter((x): x is { m: ApiMedia; image: string } => Boolean(x.image))
    .sort((a, b) => (b.m.like_count ?? 0) - (a.m.like_count ?? 0) || b.m.timestamp.localeCompare(a.m.timestamp))
    .slice(0, count)
    .map(({ m, image }) => ({ id: m.id, url: m.permalink, image, alt: altFor(m, handle), likes: m.like_count ?? 0 }));
}
