export interface BanWindow {
  days: number[]; // 0=Sun, 1=Mon … 6=Sat
  startHour: number;
  endHour: number; // 24 = midnight end-of-day
  seasonMonths?: number[]; // 1-based; if set, window only applies in these months
}

export interface DrivingBan {
  country: string;
  flag: string;
  weekend: string;
  holiday: string;
  notes: string;
  maxWeight: string;
  countryCode: string;
  timezone: string;
  banWindows: BanWindow[];
}

export function isBanActive(ban: DrivingBan, now: Date = new Date()): boolean {
  const fmt = (type: Intl.DateTimeFormatPartTypes) =>
    new Intl.DateTimeFormat("en", { timeZone: ban.timezone, [type]: type === "weekday" ? "short" : "numeric", hour12: false })
      .formatToParts(now)
      .find((p) => p.type === type)?.value ?? "";

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = dayNames.indexOf(fmt("weekday"));
  const hour = parseInt(
    new Intl.DateTimeFormat("en", { timeZone: ban.timezone, hour: "numeric", hour12: false })
      .formatToParts(now)
      .find((p) => p.type === "hour")?.value ?? "0",
    10
  );
  const month = parseInt(fmt("month"), 10);

  return ban.banWindows.some((w) => {
    if (!w.days.includes(day)) return false;
    if (w.seasonMonths && !w.seasonMonths.includes(month)) return false;
    const end = w.endHour === 24 ? 24 : w.endHour;
    return hour >= w.startHour && hour < end;
  });
}

export interface RoadAlert {
  id: number;
  country: string;
  flag: string;
  type: "closure" | "restriction" | "warning";
  title: string;
  description: string;
  route: string;
  validUntil: string;
  severity: "high" | "medium" | "low";
}

export interface Tip {
  id: number;
  category: string;
  icon: string;
  title: string;
  content: string;
}

export const drivingBans: DrivingBan[] = [
  {
    country: "Německo",
    flag: "🇩🇪",
    weekend: "So 0:00–22:00, Ne 0:00–22:00",
    holiday: "Státní svátky 0:00–22:00",
    notes: "Platí pro vozidla nad 7,5 t nebo s přívěsem nad 3,5 t",
    maxWeight: "7,5 t",
    countryCode: "DE",
    timezone: "Europe/Berlin",
    banWindows: [
      { days: [6, 0], startHour: 0, endHour: 22 },
    ],
  },
  {
    country: "Rakousko",
    flag: "🇦🇹",
    weekend: "So 15:00–24:00, Ne 0:00–22:00",
    holiday: "Státní svátky 0:00–22:00",
    notes: "Noční zákaz 22:00–5:00 platí na vybraných trasách celoročně",
    maxWeight: "7,5 t",
    countryCode: "AT",
    timezone: "Europe/Vienna",
    banWindows: [
      { days: [6], startHour: 15, endHour: 24 },
      { days: [0], startHour: 0, endHour: 22 },
    ],
  },
  {
    country: "Francie",
    flag: "🇫🇷",
    weekend: "So 22:00–Ne 22:00 (červenec–srpen)",
    holiday: "Státní svátky 0:00–24:00",
    notes: "Mimo sezónu: So 22:00–Ne 20:00. Kategorie B, C, D dle sezóny",
    maxWeight: "7,5 t",
    countryCode: "FR",
    timezone: "Europe/Paris",
    banWindows: [
      { days: [6], startHour: 22, endHour: 24 },
      { days: [0], startHour: 0, endHour: 20 },
      { days: [0], startHour: 20, endHour: 22, seasonMonths: [7, 8] },
    ],
  },
  {
    country: "Itálie",
    flag: "🇮🇹",
    weekend: "So 14:00–22:00, Ne 7:00–22:00",
    holiday: "Státní svátky 7:00–22:00",
    notes: "V létě rozšíření zákazu. Výjimky pro čerstvé potraviny",
    maxWeight: "7,5 t",
    countryCode: "IT",
    timezone: "Europe/Rome",
    banWindows: [
      { days: [6], startHour: 14, endHour: 22 },
      { days: [0], startHour: 7, endHour: 22 },
    ],
  },
  {
    country: "Španělsko",
    flag: "🇪🇸",
    weekend: "So 13:00–Ne 22:00 (červenec–srpen)",
    holiday: "Státní svátky 0:00–22:00",
    notes: "Pravidla se liší podle autonomního regionu",
    maxWeight: "7,5 t",
    countryCode: "ES",
    timezone: "Europe/Madrid",
    banWindows: [
      { days: [6], startHour: 13, endHour: 24, seasonMonths: [7, 8] },
      { days: [0], startHour: 0, endHour: 22, seasonMonths: [7, 8] },
    ],
  },
  {
    country: "Polsko",
    flag: "🇵🇱",
    weekend: "So 18:00–Ne 22:00",
    holiday: "Státní svátky 8:00–22:00",
    notes: "Červenec–srpen: rozšíření Ne 8:00–22:00 i na So 8:00–22:00",
    maxWeight: "12 t",
    countryCode: "PL",
    timezone: "Europe/Warsaw",
    banWindows: [
      { days: [6], startHour: 18, endHour: 24 },
      { days: [0], startHour: 0, endHour: 22 },
      { days: [6], startHour: 8, endHour: 18, seasonMonths: [7, 8] },
    ],
  },
  {
    country: "Česko",
    flag: "🇨🇿",
    weekend: "Ne 13:00–22:00",
    holiday: "Státní svátky 13:00–22:00",
    notes: "Platí pro vozidla nad 7,5 t",
    maxWeight: "7,5 t",
    countryCode: "CZ",
    timezone: "Europe/Prague",
    banWindows: [
      { days: [0], startHour: 13, endHour: 22 },
    ],
  },
  {
    country: "Slovensko",
    flag: "🇸🇰",
    weekend: "Ne 13:00–22:00",
    holiday: "Státní svátky 13:00–22:00",
    notes: "Červen–srpen: So 7:00–19:00 a Ne 7:00–22:00",
    maxWeight: "7,5 t",
    countryCode: "SK",
    timezone: "Europe/Bratislava",
    banWindows: [
      { days: [0], startHour: 13, endHour: 22 },
      { days: [6], startHour: 7, endHour: 19, seasonMonths: [6, 7, 8] },
      { days: [0], startHour: 7, endHour: 13, seasonMonths: [6, 7, 8] },
    ],
  },
  {
    country: "Švýcarsko",
    flag: "🇨🇭",
    weekend: "So 0:00–24:00 pro jízdní soupravy",
    holiday: "Ne 0:00–24:00",
    notes: "Přísný noční zákaz 22:00–5:00 celoroční pro nad 3,5 t",
    maxWeight: "3,5 t",
    countryCode: "CH",
    timezone: "Europe/Zurich",
    banWindows: [
      { days: [6, 0], startHour: 0, endHour: 24 },
    ],
  },
  {
    country: "Maďarsko",
    flag: "🇭🇺",
    weekend: "So 22:00–Ne 22:00",
    holiday: "Státní svátky 0:00–22:00",
    notes: "V létě (červenec–srpen) rozšíření So od 15:00",
    maxWeight: "7,5 t",
    countryCode: "HU",
    timezone: "Europe/Budapest",
    banWindows: [
      { days: [6], startHour: 22, endHour: 24 },
      { days: [0], startHour: 0, endHour: 22 },
      { days: [6], startHour: 15, endHour: 22, seasonMonths: [7, 8] },
    ],
  },
];

export const roadAlerts: RoadAlert[] = [
  {
    id: 1,
    country: "Rakousko",
    flag: "🇦🇹",
    type: "restriction",
    title: "Brennerský průsmyk – tonážní omezení",
    description: "Omezení pro vozidla nad 7,5 t z důvodu opravy vozovky. Objízdná trasa přes Innsbruck.",
    route: "A13 / E45",
    validUntil: "30.06.2025",
    severity: "high",
  },
  {
    id: 2,
    country: "Německo",
    flag: "🇩🇪",
    type: "closure",
    title: "A8 Mnichov–Stuttgart – částečná uzavírka",
    description: "Pravý pruh uzavřen na úseku 15 km kvůli rekonstrukci mostního díla.",
    route: "A8 km 45–60",
    validUntil: "15.05.2025",
    severity: "medium",
  },
  {
    id: 3,
    country: "Itálie",
    flag: "🇮🇹",
    type: "warning",
    title: "Mont Blanc tunel – zvýšené kontroly",
    description: "Bezpečnostní kontroly nákladních vozidel. Čekací doby až 2 hodiny.",
    route: "A40 / Mont Blanc",
    validUntil: "01.07.2025",
    severity: "medium",
  },
  {
    id: 4,
    country: "Francie",
    flag: "🇫🇷",
    type: "restriction",
    title: "A7 Lyon–Marseille – zákaz předjíždění",
    description: "Trvalý zákaz předjíždění pro nákladní vozidla nad 7,5 t na úseku 80 km.",
    route: "A7 km 310–390",
    validUntil: "Trvalé",
    severity: "low",
  },
  {
    id: 5,
    country: "Švýcarsko",
    flag: "🇨🇭",
    type: "closure",
    title: "San Gotthard – noční uzavírka",
    description: "Tunel uzavřen každou noc 20:30–6:00 z důvodu bezpečnostních prací.",
    route: "A2 / E35",
    validUntil: "31.08.2025",
    severity: "high",
  },
  {
    id: 6,
    country: "Polsko",
    flag: "🇵🇱",
    type: "restriction",
    title: "A1 Łódź – omezení rychlosti",
    description: "Snížení rychlosti na 60 km/h pro vozidla nad 3,5 t na 30km úseku.",
    route: "A1 km 245–275",
    validUntil: "20.06.2025",
    severity: "low",
  },
];

export const tips: Tip[] = [
  {
    id: 1,
    category: "Dokumenty",
    icon: "📋",
    title: "Povinné dokumenty v EU",
    content: "Řidičský průkaz (sk. C/CE), průkaz způsobilosti (CPC), tachografová karta, doklady k vozidlu (TP, pojištění), nákladní listy (CMR), ADR osvědčení (pokud přepravujete nebezpečné zboží), kabotážní povolení.",
  },
  {
    id: 2,
    category: "Tachograf",
    icon: "⏱️",
    title: "Pravidla doby řízení",
    content: "Denní doba řízení max. 9 h (2× týdně lze 10 h). Týdenní max. 56 h, za 2 týdny max. 90 h. Přestávka po 4,5 h jízdy: 45 min nebo 15+30 min. Denní odpočinek min. 11 h, zkrácený 9 h (max. 3× týdně).",
  },
  {
    id: 3,
    category: "Zimní provoz",
    icon: "❄️",
    title: "Zimní výbava a předpisy",
    content: "Zimní pneumatiky povinné: AT, CH, CZ, SK, SI, BA v zimním období. Sněhové řetězy nutné při dopravní značce. Kapalina do ostřikovačů na -20°C. Lopatka, klín pod kola, reflexní vesta, lékárnička.",
  },
  {
    id: 4,
    category: "Mýtné",
    icon: "💳",
    title: "Mýtné systémy v Evropě",
    content: "DE: Toll Collect (OBU povinná). AT: ASFINAG (GO-Box). CH: LSVA (výpočet dle km+hmotnost). FR: télépéage. IT: Telepass. PL: e-TOLL (OBU). SK/CZ: elektronické mýto OBU. EETS umožňuje jeden systém pro více zemí.",
  },
  {
    id: 5,
    category: "Bezpečnost",
    icon: "🔒",
    title: "Zabezpečení nákladu",
    content: "Zajistěte náklad dle EN 12195. Popruhy kontrolujte po 1 h jízdy a každých 3 h. Těžiště co nejníže. Mezery zaplňte výplní. Pro volně ložený materiál plachta. Celková hmotnost nesmí přesáhnout max. hmotnost vozidla (GVW).",
  },
  {
    id: 6,
    category: "Parkování",
    icon: "🅿️",
    title: "Bezpečné parkování",
    content: "Parkujte pouze na certifikovaných parkovištích (TAPA, ESPORG). Vyhněte se odlehlejším místům. Na odpočívadlech nikdy nenechávejte motor zbytečně běžet. V DE a AT jsou bezpečná parkoviště na dálničních odpočívkách. Použijte app TruckPark nebo Park4Night.",
  },
  {
    id: 7,
    category: "Kabotáž",
    icon: "🔄",
    title: "Kabotážní pravidla",
    content: "Po mezinárodní přepravě max. 3 kabotážní přepravy do 7 dnů. Po 7 dnech povinný odjezd ze země. Výjimka: bilateriální smlouvy. Směrnice o vysílání pracovníků (2020/1057) přináší povinnost registrace v hostitelské zemi. Kontrolní orgány mohou žádat doklady o přepravě.",
  },
  {
    id: 8,
    category: "Ekologie",
    icon: "🌱",
    title: "Emisní normy a zelené zóny",
    content: "LEZ (Low Emission Zones) v DE, NL, BE, IT, FR. Přístup závisí na normě Euro. Euro 6 přijímán všude. Starší vozidla mohou být zakázána. Zkontrolujte před vstupem do měst: lez-beoordeling.nl nebo přímo na webu města. AdBlue vždy plný.",
  },
];
