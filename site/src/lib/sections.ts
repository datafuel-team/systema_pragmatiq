export type SectionId =
  | 'kb'
  | 'products'
  | 'cases'
  | 'services'
  | 'articles'
  | 'principles'
  | 'blog'
  | 'stories';

export interface SectionDef {
  id: SectionId;
  title: string;
  /** короткая подпись для hub-страницы и meta description */
  description: string;
  order: number;
}

export const SECTIONS: SectionDef[] = [
  {
    id: 'kb',
    title: 'База знаний',
    description:
      'Методологии маркетинга недвижимости: сегментация покупателей, работа со спросом, воронки застройщика.',
    order: 1,
  },
  {
    id: 'products',
    title: 'Продукты',
    description:
      'Продукты агентства «Прагматик»: ИИ-аудит, исследования аудитории, CJM, CRM-маркетинг.',
    order: 2,
  },
  {
    id: 'cases',
    title: 'Кейсы',
    description:
      'Кейсы рекламных кампаний застройщиков: цифры, каналы, что сработало.',
    order: 3,
  },
  {
    id: 'services',
    title: 'Сервисы',
    description:
      'Интерактивные инструменты: конструктор УТП, база решений для застройщиков.',
    order: 4,
  },
  {
    id: 'articles',
    title: 'Статьи',
    description:
      'Разборы и лонгриды о маркетинге недвижимости: спрос, креатив, аналитика.',
    order: 5,
  },
  {
    id: 'principles',
    title: 'Принципы',
    description: 'Как мы работаем: подход агентства «Прагматик» к маркетингу застройщиков.',
    order: 6,
  },
  {
    id: 'blog',
    title: 'Блог',
    description: 'Короткие заметки: наблюдения из кампаний, гипотезы, новости системы.',
    order: 7,
  },
  {
    id: 'stories',
    title: 'Рассказы',
    description:
      'Сатирическая проза о маркетинге недвижимости: нейробиолог Герман продаёт квартиры и объясняет, как устроена голова покупателя.',
    order: 8,
  },
];

export const SITE_NAME = 'Система прагматичного маркетинга недвижимости';
export const SITE_URL = 'https://sistema.pragmatiq.online';

export const CONTACTS = {
  telegram: 'https://t.me/pragmatik_agency',
  telegramLabel: '@pragmatik_agency',
  email: 'hello@pragmatiq.ru',
  phone: '+7 915 388 04 01',
  site: 'https://pragmatiq.ru',
  siteLabel: 'pragmatiq.ru',
};
