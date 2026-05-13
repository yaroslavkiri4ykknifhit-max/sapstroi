import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const COMPANY = 'Sapstroi';
const PHONE = '+375 29 174-60-19';
const PHONE_LINK = 'tel:+375291746019';
const BASE_PRICE = 'от 27 BYN/м²';
const CURB_PRICE = 'от 10 BYN';
const REGION_FULL = 'Могилев и область · выезд по Беларуси';

// Telegram-заявки: замените на реальные данные бота владельца.
// Важно: для боевого сайта лучше отправлять через backend, чтобы token не был виден в браузере.
const TELEGRAM_BOT_TOKEN = '8485516200:AAEmWPckhyNFkgv-ukWoheijAQgkq7ZFKk4';
const TELEGRAM_CHAT_ID = '8649177202';

const nav = [
  ['services', 'Услуги'],
  ['projects', 'Работы'],
  ['process', 'Этапы'],
  ['contacts', 'Контакты'],
];

const benefits = [
  [BASE_PRICE, 'укладка и объекты'],
  [`Бордюры ${CURB_PRICE}`, 'отдельная цена'],
  ['замер и расчет', 'до начала работ'],
  ['свои мастера', 'без посредников'],
];

const services = [
  { title: 'Двор под ключ', text: 'Готовим основание, укладываем тротуарную плитку, ставим бордюры и сдаем аккуратный двор.' },
  { title: 'Дорожки и площадки', text: 'Делаем проходы, зоны отдыха и площадки в Могилеве с правильными уклонами и водоотводом.' },
  { title: 'Парковки и въезды', text: 'Устраиваем усиленное основание под автомобиль и подбираем плитку под нагрузку.' },
  { title: 'Объекты застройщиков', text: 'Закрываем большие объемы: дворы, проходы, парковочные зоны и благоустройство территории.' },
  {
    title: 'Установка бордюров',
    text: 'Ставим бордюры для дорожек, площадок и участков. Цена зависит от объема, основания и подготовки.',
    price: CURB_PRICE,
    cta: 'Рассчитать стоимость',
    featured: true,
  },
  { title: 'Ремонт плитки', text: 'Убираем просадки, меняем проблемные зоны и возвращаем аккуратный вид.' },
];

const projects = [
  ['Двор частного дома', '146 м²', '5 дней', 'Могилевская область', 'yard', 'от 27 BYN/м²', '/images/project-yard.png'],
  ['Парковка у коттеджа', '92 м²', '3 дня', 'Могилев', 'parking', 'от 29 BYN/м²', '/images/project-parking.png'],
  ['Дорожки и зона отдыха', '68 м²', '2 дня', 'Быховский район', 'path', 'от 30 BYN/м²', '/images/project-paths.png'],
  ['Территория застройщика', '420 м²', '12 дней', 'Могилев', 'work', 'от 32 BYN/м²', '/images/project-developer.png'],
];

const reasons = [
  ['Честная смета', 'Показываем цену до старта: площадь, основание, бордюры и подрезка.'],
  ['Без посредников', 'Работает своя команда, поэтому проще держать цену и сроки.'],
  ['Под ключ', 'Привозим участок от замера до готового покрытия без лишних хлопот.'],
  ['Оплата удобно', 'Наличный и безналичный расчет для частных клиентов и застройщиков.'],
];

const process = ['Заявка', 'Замер', 'Расчет', 'Работы', 'Сдача'];

const reviews = [
  ['Андрей П.', 'Двор 146 м²', 'Боялся, что цена вырастет после начала работ. В sapstroi сразу показали смету: основание, плитка, бордюры и подрезка. В итоге заплатил ровно за согласованный объем.'],
  ['Елена М.', 'Дорожки у дома', 'После дождя у дома стояла вода, а старая плитка просела. Ребята сделали уклоны и бордюры, теперь дорожки сухие, ровные и не расходятся по краям.'],
  ['Застройщик', 'Территория 420 м²', 'Нужно было закрыть двор без срыва сроков перед сдачей объекта. Бригада вышла в нужный день, каждый этап присылали фото, участок приняли без переделок.'],
];

const faq = [
  ['Сколько стоит укладка?', `Объекты — ${BASE_PRICE}. Точная цена зависит от основания, площади и сложности.`],
  ['Сколько стоят бордюры?', `Установка бордюров — ${CURB_PRICE}. Это отдельная цена, не для всех услуг.`],
  ['Где работаете?', 'Могилев и область. По крупным объектам выезжаем по Беларуси.'],
  ['Можно по безналу?', 'Да, работаем с наличной и безналичной оплатой.'],
  ['Делаете под ключ?', 'Да: замер, расчет, основание, укладка и сдача объекта.'],
];

const imageMeta = {
  hero: { width: 1000, height: 571 },
  yard: { width: 415, height: 560 },
  parking: { width: 780, height: 780 },
  path: { width: 1024, height: 768 },
  work: { width: 1600, height: 1038 },
};

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Logo() {
  return (
    <button className="logo" onClick={() => scrollToId('top')} aria-label={`${COMPANY} на главную`}>
      <img src="/images/logo-sapstroi.svg" alt="Sapstroi — укладка тротуарной плитки в Могилеве" width="560" height="225" />
    </button>
  );
}

function CTA({ children = 'Получить расчет', onClick, secondary = false, className = '' }) {
  return <button type="button" onClick={onClick} className={`btn ${secondary ? 'btn-secondary' : ''} ${className}`}>{children} <span aria-hidden="true">→</span></button>;
}

function SectionTitle({ label, title, text }) {
  return (
    <div className="section-title">
      {label && <p>{label}</p>}
      <h2>{title}</h2>
      {text && <span>{text}</span>}
    </div>
  );
}

function PriceHighlights() {
  return (
    <div className="price-strip">
      <div><span>Объекты</span><b>{BASE_PRICE}</b></div>
      <div><span>Бордюры</span><b>{CURB_PRICE}</b></div>
      <div><span>Расчет</span><b>после замера</b></div>
    </div>
  );
}

function ServiceCard({ service }) {
  const { title, text, price, cta = 'Узнать цену', featured = false } = service;

  return (
    <article className={`card ${featured ? 'featured-card' : ''}`}>
      {featured && <span className="card-tag">популярно</span>}
      <h3>{title}</h3>
      <p>{text}</p>
      {price && <strong className="service-price"><span>Бордюры</span>{price}</strong>}
      <button type="button" onClick={() => scrollToId('quote')} aria-label={`${cta}: ${title}`}>{cta} →</button>
    </article>
  );
}

function QuoteContact() {
  return (
    <div className="quote-contact">
      <span>Нужна консультация сразу?</span>
      <a href={PHONE_LINK} aria-label={`Позвонить в ${COMPANY}: ${PHONE}`}>{PHONE}</a>
    </div>
  );
}

const visualLabels = {
  yard: `Укладка тротуарной плитки во дворе частного дома в Могилевской области`,
  parking: `Укладка плитки на парковке у коттеджа в Могилеве`,
  path: `Установка бордюров и укладка дорожек в Могилевской области`,
  work: `Благоустройство территории застройщика в Могилеве`,
};

function PavingVisual({ title, price, variant = 'yard', image }) {
  const [hasImage, setHasImage] = useState(true);

  return (
    <div className={`paving-visual ${variant}`} role="img" aria-label={visualLabels[variant]}>
      {hasImage && <img src={image} alt={visualLabels[variant]} loading="lazy" decoding="async" width={imageMeta[variant]?.width} height={imageMeta[variant]?.height} onError={() => setHasImage(false)} />}
      <div className="visual-label"><b>{title}</b><small>{COMPANY} · {price}</small></div>
      <strong className="visual-price">{price}</strong>
      {!hasImage && <><div className="visual-block one" /><div className="visual-block two" /></>}
    </div>
  );
}

async function sendLeadToTelegram(data) {
  const ready = !TELEGRAM_BOT_TOKEN.includes('PASTE') && !TELEGRAM_CHAT_ID.includes('PASTE');
  const message = [
    `Новая заявка с сайта ${COMPANY}`,
    `Имя: ${data.name || 'не указано'}`,
    `Телефон: ${data.phone || 'не указан'}`,
    `Тип работ: ${data.object || 'не указан'}`,
    `Площадь/район: ${data.comment || 'без комментария'}`,
    `Регион: ${REGION_FULL}`,
    `Цена на сайте: объекты ${BASE_PRICE}; бордюры ${CURB_PRICE}`,
  ].join('\n');

  if (!ready) {
    return { demo: true };
  }

  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
  });
  return res.json();
}

function LeadForm({ compact = false }) {
  const [form, setForm] = useState({ name: '', phone: '', object: '', comment: '' });
  const [status, setStatus] = useState('idle');
  const set = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const result = await sendLeadToTelegram(form);
      setStatus(result.demo ? 'demo' : 'sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className={`lead-form ${compact ? 'compact' : ''}`} onSubmit={submit} aria-label="Форма расчета стоимости укладки плитки">
      <label className="sr-only" htmlFor="lead-name">Ваше имя</label>
      <input id="lead-name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ваше имя" autoComplete="name" />
      <label className="sr-only" htmlFor="lead-phone">Телефон</label>
      <input id="lead-phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Телефон" inputMode="tel" autoComplete="tel" required />
      {!compact && <>
        <label className="sr-only" htmlFor="lead-object">Тип работ</label>
        <select id="lead-object" value={form.object} onChange={(e) => set('object', e.target.value)}>
          <option value="">Что нужно сделать</option>
          <option>Двор под ключ</option><option>Дорожки</option><option>Парковка / въезд</option><option>Установка бордюров</option><option>Объект застройщика</option><option>Ремонт / перекладка</option>
        </select>
        <label className="sr-only" htmlFor="lead-comment">Площадь, район или комментарий</label>
        <input id="lead-comment" value={form.comment} onChange={(e) => set('comment', e.target.value)} placeholder="Площадь, район или фото" />
      </>}
      <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Отправляем...' : 'Рассчитать стоимость'}</button>
      <div className="form-status" aria-live="polite">
        {status === 'sent' && <em className="ok">Заявка отправлена. Мы скоро свяжемся с вами.</em>}
        {status === 'demo' && <em className="warn">Форма готова. Для Telegram укажите Bot Token и Chat ID.</em>}
        {status === 'error' && <em className="err">Не удалось отправить заявку. Проверьте подключение Telegram.</em>}
      </div>
    </form>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Основная навигация">{nav.map(([id, label]) => <button type="button" key={id} onClick={() => scrollToId(id)}>{label}</button>)}</nav>
        <div className="header-cta"><a href={PHONE_LINK} aria-label={`Позвонить в ${COMPANY}: ${PHONE}`}>{PHONE}</a><CTA onClick={() => scrollToId('quote')}>Узнать цену</CTA></div>
        <button className="menu-btn" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} aria-controls="mobile-menu">{open ? '×' : '☰'}</button>
      </div>
      {open && <nav id="mobile-menu" className="mobile-menu" aria-label="Мобильная навигация">{nav.map(([id, label]) => <button type="button" key={id} onClick={() => { scrollToId(id); setOpen(false); }}>{label}</button>)}<CTA onClick={() => { scrollToId('quote'); setOpen(false); }}>Узнать цену</CTA></nav>}
    </header>
  );
}

function ProjectCard({ item }) {
  const [title, area, days, region, variant, price, image] = item;
  return (
    <article className="project-card">
      <PavingVisual title={title} variant={variant} price={price} image={image} />
      <div>
        <strong className="project-price">{price}</strong>
        <h3>{title}</h3>
        <ul><li><b>Площадь:</b> {area}</li><li><b>Срок:</b> {days}</li><li><b>Регион:</b> {region}</li></ul>
        <p>Основание, укладка, подрезка и чистая сдача.</p>
        <CTA secondary className="wide" onClick={() => scrollToId('quote')}>Рассчитать похожий объект</CTA>
      </div>
    </article>
  );
}

function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-text">
              <p className="region">{REGION_FULL}</p>
              <h1>Укладка тротуарной плитки в Могилеве</h1>
              <p className="lead">Sapstroi выполняет укладку тротуарной плитки, установку бордюров и благоустройство участков в Могилеве и Могилевской области. Работаем с дворами, дорожками, площадками, частными участками и объектами под ключ. Рассчитываем стоимость заранее и помогаем подобрать оптимальное решение под задачу.</p>
              <PriceHighlights />
              <div className="actions"><CTA onClick={() => scrollToId('quote')}>Рассчитать стоимость</CTA><CTA secondary onClick={() => scrollToId('projects')}>Посмотреть работы</CTA></div>
              <p className="trust-line">Работаем своими мастерами · показываем смету заранее · оплата наличными и безналично</p>
            </div>
            <div className="hero-photo"><img src="/images/hero-main.png" alt="Укладка тротуарной плитки и благоустройство участка в Могилеве" width={imageMeta.hero.width} height={imageMeta.hero.height} fetchPriority="high" decoding="async" /></div>
          </div>
        </section>

        <section className="stats"><div className="container stats-grid">{benefits.map(([v, t]) => <div className="stat" key={v}><b>{v}</b><span>{t}</span></div>)}</div></section>

        <section id="services" className="section"><div className="container"><SectionTitle label="Услуги" title="Благоустройство участков под ключ" text="Выполняем строительные работы в Могилеве: готовим основание, укладываем плитку, ставим бордюры и приводим территорию в аккуратный вид после завершения работ." /><div className="cards">{services.map((service) => <ServiceCard key={service.title} service={service} />)}</div></div></section>

        <section className="section curb-section"><div className="container curb-grid"><div><SectionTitle label="Бордюры" title="Установка бордюров в Могилеве" text={`Бордюры помогают удерживать форму дорожек, площадок и парковок, защищают плитку от расползания и делают участок визуально завершенным. Стоимость установки — ${CURB_PRICE}, точный расчет зависит от объема, основания и подготовки.`} /><CTA onClick={() => scrollToId('quote')}>Рассчитать бордюры</CTA></div><div className="seo-card"><h3>Что входит в работу</h3><p>Разметка, подготовка основания, выставление бордюров по уровню, укрепление и чистая сдача участка. Подскажем, где бордюр обязателен, а где можно сэкономить без потери качества.</p></div></div></section>

        <section id="projects" className="section soft"><div className="container"><SectionTitle label="Работы" title="Примеры объектов" text="Ориентиры по площади, срокам и цене. Точный расчет делаем после замера." /><div className="projects-grid">{projects.map((item) => <ProjectCard key={item[0]} item={item} />)}</div></div></section>

        <section id="process" className="section"><div className="container"><SectionTitle label="Этапы" title="Как проходит работа" text="Без лишней бюрократии: быстро согласуем задачу, считаем стоимость и переходим к благоустройству территории." /><div className="process-grid">{process.map((step, i) => <div className="step" key={step}><b>{i + 1}</b><span>{step}</span></div>)}</div></div></section>

        <section className="section soft"><div className="container"><SectionTitle label={`Почему ${COMPANY}`} title="Почему выбирают Sapstroi" text="Клиенты обращаются к нам за понятным расчетом, аккуратной укладкой плитки и спокойным ведением работ на объекте." /><div className="reason-grid">{reasons.map(([title, text]) => <article className="reason" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

        <section className="section"><div className="container"><SectionTitle label="Отзывы" title="Что говорят клиенты" /><div className="reviews">{reviews.map(([name, object, text]) => <article className="review" key={name}><p>“{text}”</p><b>{name}</b><span>{object}</span></article>)}</div></div></section>

        <section id="quote" className="section soft"><div className="container quote-box"><div><SectionTitle label="Расчет стоимости" title="Цены на работы" text={`Оставьте контакты — уточним площадь, основание, район и подберем оптимальное решение. Укладка тротуарной плитки в Могилеве — ${BASE_PRICE}, бордюры — ${CURB_PRICE}.`} /><ul className="price-list"><li><span>Укладка плитки и объекты</span><b>{BASE_PRICE}</b></li><li><span>Установка бордюров</span><b>{CURB_PRICE}</b></li><li><span>Замер и смета</span><b>до старта</b></li></ul><ul className="check-list"><li>Без навязчивых звонков</li><li>Понятная смета до старта</li><li>Наличный и безналичный расчет</li></ul><QuoteContact /></div><LeadForm /></div></section>

        <section className="section"><div className="container"><SectionTitle label="FAQ" title="Частые вопросы" /><div className="faq">{faq.map(([q, a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></div></section>
      </main>

      <footer id="contacts" className="footer"><div className="container footer-grid"><div><Logo /><p>Укладка тротуарной плитки, установка бордюров и благоустройство территории под ключ для частных клиентов и застройщиков.</p></div><div><a href={PHONE_LINK} aria-label={`Позвонить в ${COMPANY}: ${PHONE}`}>{PHONE}</a><p>{REGION_FULL}</p><p>Наличный и безналичный расчет</p><p>Telegram / Viber / WhatsApp</p></div><div><CTA onClick={() => scrollToId('quote')}>Получить расчет</CTA><CTA secondary onClick={() => scrollToId('projects')}>Посмотреть работы</CTA><small>© 2026 {COMPANY}</small></div></div><div className="container footer-meta"><span>дизайн / разработка веб-сайта: Ярослав Киричук</span></div></footer>

      <CTA className="mobile-sticky-cta" onClick={() => scrollToId('quote')}>Получить консультацию</CTA>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
