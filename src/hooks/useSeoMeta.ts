import { useEffect } from 'react';

const DEFAULT_TITLE =
  'TopUp Gems — Instant Game Top-Up Store | ML, PUBG, Free Fire';
const DEFAULT_DESCRIPTION =
  'Instant game top-up in Cambodia. Buy Mobile Legends diamonds, PUBG UC, Free Fire diamonds, Genshin crystals & more. Pay with ABA, KHQR, Wing. Fast, safe, 0% fee.';

export function useSeoMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | TopUp Gems` : DEFAULT_TITLE;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description ?? DEFAULT_DESCRIPTION);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        'content',
        title ? `${title} | TopUp Gems` : 'TopUp Gems — Instant Game Top-Up Store',
      );
    }
  }, [title, description]);
}
