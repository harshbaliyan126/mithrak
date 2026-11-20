import fs from 'node:fs';
import path from 'node:path';
import { getTopInstagramPosts, type InstagramPost } from '@/lib/instagram';
import { social } from '@/lib/site';

const LOCAL_DIR = 'images'; // public/images
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

/**
 * Fallback when Instagram isn't connected (no INSTAGRAM_ACCESS_TOKEN) or the API fails:
 * the first six images in /public/images (sorted by file name), each linking to the profile.
 */
function getLocalPosts(count: number): InstagramPost[] {
  try {
    const dir = path.join(process.cwd(), 'public', LOCAL_DIR);
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .slice(0, count)
      .map((f) => ({
        id: f,
        url: social.instagram,
        image: `/${LOCAL_DIR}/${encodeURIComponent(f)}`,
        alt: `${social.handle} on Instagram`,
        likes: 0,
      }));
  } catch {
    return [];
  }
}

/** "The stories we share": the account's six most-liked Instagram posts, images only. */
export async function InstagramStories() {
  const posts = (await getTopInstagramPosts(6, social.handle)) ?? getLocalPosts(6);

  return (
    <section className='stories'>
      <p className='label'>By you</p>
      <h2 className='serif-heading'>The stories we share</h2>
      <div className='stories-grid'>
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target='_blank'
            rel='noopener noreferrer'
            className='story'
            aria-label={`${post.alt} — view on Instagram (opens in a new tab)`}
          >
            {/* Plain <img>: Instagram CDN URLs are signed and already sized. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.alt}
              loading='lazy'
              decoding='async'
              className='story-img'
            />
          </a>
        ))}
      </div>
      <a
        href={social.instagram}
        target='_blank'
        rel='noopener noreferrer'
        className='label'
      >
        {social.handle}
      </a>
    </section>
  );
}
