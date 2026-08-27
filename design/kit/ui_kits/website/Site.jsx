/* global React */
const { Button, Badge, Card, Icon, SectionHeading, Wordmark, InfoRow, HoursTable, PhotoGrid, SocialRow, WhatsAppBar, PhotoHero, brizaHours, WHATSAPP_LINK } = window.BrizaDesignSystem_ff3119;

const PHOTOS = [
  { src: "../../assets/photos/window-display.png", alt: "חלון הראווה של בריזה עם דוגמניות בלבוש קיצי" },
  { src: "../../assets/photos/interior-rack.png", alt: "מתלה חולצות שחורות עם הדפס בתוך החנות" },
  { src: "../../assets/photos/storefront-sign.png", alt: "חזית החנות בקניון גן העיר עם השלט המואר" },
];

const GROUP_LINK = "https://chat.whatsapp.com/";
const MAP_QUERY = "קניון גן העיר אבן גבירול 71 תל אביב";
const MAP_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}`;
const TAGLINE = "בגדי נשים מיובאים בגן העיר. מבחר שמתחדש כל שבוע, ויחס אישי כבר ארבעים שנה.";

function HeroCta() {
  return (
    <Button variant="whatsapp" size="lg" icon="whatsapp" href={WHATSAPP_LINK}>
      דברו איתנו בוואטסאפ
    </Button>
  );
}

/** A: photo-dominant — the storefront fills the screen, text rides the scrim. */
function HeroPhoto() {
  return (
    <PhotoHero image={PHOTOS[2].src} alt={PHOTOS[2].alt} tagline={TAGLINE} minHeight="88svh">
      <div className="heroline"><span className="rule"></span>בגן העיר, תל אביב · מ־1986</div>
      <HeroCta />
    </PhotoHero>
  );
}

/** B: type-dominant — the sign reproduced on navy, photo as a band beneath. */
function HeroType() {
  return (
    <section className="herotype">
      <div className="wrap herotypeinner">
        <div className="heroline light"><span className="rule"></span>בגן העיר, תל אביב · מ־1986</div>
        <Wordmark size="hero" as="h1" />
        <p className="herotag">{TAGLINE}</p>
        <HeroCta />
      </div>
      <img className="heroband" src={PHOTOS[0].src} alt={PHOTOS[0].alt} />
    </section>
  );
}

function Story() {
  return (
    <section className="section" id="story">
      <div className="wrap story">
        <SectionHeading
          eyebrow="הסיפור שלנו"
          title="ארבעים שנה באותה פינה"
          lead="החנות נפתחה כאן ב־1986, ומאז לא זזה. היום אירית מנהלת אותה, עם חלק מאותן לקוחות מהשנים הראשונות."
        />
        <div className="prose">
          <p>אנחנו בוחרות כל פריט בעצמנו מהיבואנים, בכמויות קטנות, כך שלא תפגשו את אותה חולצה על כל מי שעוברת ברחוב.</p>
          <p>אצלנו לא ממהרים. נשמח לשמוע מה את מחפשת, להביא מידות נוספות מהמחסן, ולהגיד בכיוון אם משהו פחות מחמיא.</p>
        </div>
        <blockquote className="pull">
          <p>״הרבה נשים נכנסות רק להגיד שלום. חלק מהן יוצאות עם שמלה.״</p>
          <footer>אירית, בעלת החנות</footer>
        </blockquote>
      </div>
    </section>
  );
}

const OFFERINGS = [
  { icon: "shirt", title: "יבוא אישי", body: "מבחר מיובא שנבחר פריט־פריט, מתחדש בכל שבוע.", badge: "מבחר חדש כל שבוע", badgeIcon: "sparkles" },
  { icon: "ruler", title: "מידות 38–54", body: "כולל מידות גדולות, עם התאמה במקום.", badge: "38–54", badgeIcon: "ruler" },
  { icon: "tag", title: "מחירים הוגנים", body: "רוב הפריטים בין ₪79 ל־₪390, בלי הפתעות בקופה.", badge: "מ־₪79", badgeIcon: "tag" },
];

function Offering() {
  return (
    <section className="section raised" id="offering">
      <div className="wrap">
        <SectionHeading eyebrow="מה תמצאו אצלנו" title="מבחר קטן ומדויק, לא קטלוג" />
        <div className="cards">
          {OFFERINGS.map((o) => (
            <Card key={o.title}>
              <div className="cardin">
                <span className="iconpad"><Icon name={o.icon} size={28} color="var(--blue-700)" /></span>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
                <Badge tone="ice" icon={o.badgeIcon}>{o.badge}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ onOpen }) {
  return (
    <section className="section inverse" id="gallery">
      <div className="wrap">
        <SectionHeading tone="dark" eyebrow="מהחנות" title="ככה זה נראה אצלנו" lead="תמונות מהחנות בגן העיר. לחצו להגדלה." />
        <PhotoGrid columns={2} photos={PHOTOS} onSelect={onOpen} style={{ marginTop: 24 }} className="gallery" />
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="section" id="visit">
      <div className="wrap">
        <SectionHeading eyebrow="לבקר אצלנו" title="גן העיר, קומת כניסה" />
        <div className="visit">
          <Card>
            <InfoRow icon="map-pin" label="כתובת" value="אבן גבירול 71, קניון גן העיר, קומת כניסה" href={MAP_URL} />
            <div className="hairline" />
            <InfoRow icon="phone" label="טלפון" value={<span dir="ltr">052-4381666</span>} href="tel:+972524381666" />
            <div className="hairline" />
            <InfoRow icon="users" label="קבוצת הוואטסאפ" value="עדכונים על מבחר חדש" href={GROUP_LINK} />
            <div className="visitactions">
              <Button variant="dark" size="md" icon="navigation" href={MAP_URL}>נווטו לחנות</Button>
              <Button variant="outline" size="md" icon="users" href={GROUP_LINK}>הצטרפו לקבוצה</Button>
            </div>
          </Card>
          <Card>
            <h3 className="cardtitle">שעות פתיחה</h3>
            <HoursTable rows={brizaHours} todayIndex={0} />
          </Card>
        </div>
        <div className="map">
          <iframe title="מפת החנות בקניון גן העיר" src={`${MAP_URL}&output=embed&hl=iw`} loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="section inverse footer">
      <div className="wrap footerinner">
        <Wordmark size="md" />
        <p className="footermeta">אבן גבירול 71, קניון גן העיר, תל אביב · <span dir="ltr">052-4381666</span></p>
        <SocialRow links={[{ network: "instagram", href: "#" }, { network: "facebook", href: "#" }, { network: "tiktok" }]} />
        <p className="footerfine">בריזה · בגדי נשים בגן העיר מ־1986</p>
      </div>
    </footer>
  );
}

function Lightbox({ index, onClose }) {
  if (index === null) return null;
  const p = PHOTOS[index];
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-label="תמונה מוגדלת">
      <button className="lbclose" aria-label="סגירת התמונה" onClick={onClose}><Icon name="x" size={28} color="var(--ice-100)" /></button>
      <img src={p.src} alt={p.alt} />
    </div>
  );
}

function Site({ hero = "photo" }) {
  const [open, setOpen] = React.useState(null);
  return (
    <>
      {hero === "type" ? <HeroType /> : <HeroPhoto />}
      <Story />
      <Offering />
      <Gallery onOpen={setOpen} />
      <Visit />
      <Footer />
      <WhatsAppBar visible={open === null} />
      <Lightbox index={open} onClose={() => setOpen(null)} />
    </>
  );
}

Object.assign(window, { Site, HeroPhoto, HeroType, Story, Offering, Gallery, Visit, Footer, Lightbox, PHOTOS });
