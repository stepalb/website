import rss from '@astrojs/rss';
import { site } from '../site.config';
import { alleTouren } from '../lib/touren';

export async function GET(context) {
  const touren = await alleTouren();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    customData: '<language>de-de</language>',
    items: touren.map((t) => ({
      title: t.data.title,
      description: t.data.description,
      pubDate: t.data.date,
      link: `/touren/${t.id}/`,
    })),
  });
}
