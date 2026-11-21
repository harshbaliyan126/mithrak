import fs from 'node:fs';
import path from 'node:path';
import { getTopInstagramPosts, type InstagramPost } from '@/lib/instagram';
import { social } from '@/lib/site';
import { StoryCard } from '@/components/StoryCard';

const LOCAL_DIR = 'images'; // public/images
const PER_ROW = 3;
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
  const rows: InstagramPost[][] = [];
  for (let i = 0; i < posts.length; i += PER_ROW) rows.push(posts.slice(i, i + PER_ROW));

  return (
    <section className='stories'>
      <p className='label'>By you</p>
      <h2 className='serif-heading'>The stories we share</h2>
      {/* Like lore.world: rows of three flex cells, each a padded div with the image centred inside. */}
      <div className='stories-rows'>
        {rows.map((row) => (
          <div key={row[0].id} className='stories-row'>
            {row.map((post) => (
              <StoryCard key={post.id} post={post} />
            ))}
          </div>
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
