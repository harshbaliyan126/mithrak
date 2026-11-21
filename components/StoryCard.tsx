'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { InstagramPost } from '@/lib/instagram';

/** Matches the 900px breakpoint in globals.css. */
const MOBILE_QUERY = '(max-width: 900px)';
const ZOOM_DESKTOP = 1.62;
const ZOOM_MOBILE = 1.45;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);
  return isMobile;
}

/**
 * One story inside its padded .story-frame cell. On hover / keyboard focus the
 * image zooms out from its centre into the frame's padding.
 */
export function StoryCard({ post }: { post: InstagramPost }) {
  const zoom = useIsMobile() ? ZOOM_MOBILE : ZOOM_DESKTOP;
  const reduceMotion = useReducedMotion();

  return (
    <div className='story-frame'>
      <motion.a
        href={post.url}
        target='_blank'
        rel='noopener noreferrer'
        className='story'
        aria-label={`${post.alt} — view on Instagram (opens in a new tab)`}
        whileHover={{ scale: zoom, zIndex: 1 }}
        whileFocus={{ scale: zoom, zIndex: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.325,
          ease: [0.22, 0.61, 0.36, 1],
        }}
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
      </motion.a>
    </div>
  );
}
