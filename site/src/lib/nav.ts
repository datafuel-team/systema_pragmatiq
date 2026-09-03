import { getCollection } from 'astro:content';
import { SECTIONS, type SectionDef } from './sections';

/**
 * Разделы, в которых есть хотя бы один опубликованный материал.
 * Пустые не показываем нигде: ни в меню, ни на главной, ни отдельной страницей.
 */
export async function visibleSections(): Promise<SectionDef[]> {
  const out: SectionDef[] = [];
  for (const s of SECTIONS) {
    const items = await getCollection(s.id, ({ data }) => !data.draft);
    if (items.length > 0) out.push(s);
  }
  return out;
}
