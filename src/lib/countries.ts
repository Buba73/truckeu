export interface CountrySource {
  label: string;
  url: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  capital: string;
  currency: string;
  maxWeight: number; // tuny
  maxLength: number; // metry
  maxWidth: number;
  maxHeight: number;
  tollSystem: string;
  tollInfo: string;
  speedHighway: number; // km/h pro kamiony
  speedRoad: number;
  speedCity: number;
  winterTyresRequired: boolean;
  winterTyresPeriod: string;
  emergencyNumber: string;
  policeNumber: string;
  requiredEquipment: string[];
  banWeekend: string;
  banHoliday: string;
  banNight: string;
  notes: string;
  slug: string;
  sources: CountrySource[];
}

export const countries: Country[] = [
  {
    code: "DE", name: "Německo", flag: "🇩🇪", capital: "Berlín", currency: "EUR",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Toll Collect (LKW-Maut)", tollInfo: "Povinná OBU jednotka pro vozidla nad 7,5 t na dálnicích a spolkových silnicích",
    speedHighway: 80, speedRoad: 60, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "Situačně (sníh/led) – bez pevného termínu",
    emergencyNumber: "112", policeNumber: "110",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička"],
    banWeekend: "So 0:00–22:00, Ne 0:00–22:00",
    banHoliday: "Státní svátky 0:00–22:00",
    banNight: "Není plošný",
    notes: "Sektorový zákaz na některých trasách. Výjimky pro čerstvé potraviny, živá zvířata.",
    slug: "nemecko",
    sources: [
      { label: "Bundesamt für Güterverkehr – zákazy jízd", url: "https://www.bag.bund.de/DE/Themen/Gueterverkehr/Fahrverbote/fahrverbote_node.html" },
      { label: "Toll Collect – mýtný systém DE", url: "https://www.toll-collect.de" },
      { label: "ADAC – předpisy pro kamiony", url: "https://www.adac.de/reise-freizeit/ratgeber-urlaub/lkw-fahrverbote/" },
    ],
  },
  {
    code: "AT", name: "Rakousko", flag: "🇦🇹", capital: "Vídeň", currency: "EUR",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "ASFINAG (GO-Box)", tollInfo: "GO-Box povinná pro vozidla nad 3,5 t. Vícekanálová mýtná stání.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "1. listopadu – 15. dubna",
    emergencyNumber: "112", policeNumber: "133",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Sněhové řetězy (doporučeny)"],
    banWeekend: "So 15:00–24:00, Ne 0:00–22:00",
    banHoliday: "Státní svátky 0:00–22:00",
    banNight: "22:00–5:00 na vybraných trasách (Brenner, Inn údolí)",
    notes: "Sektorový zákaz na Brenneru. Zvláštní omezení v nočních hodinách.",
    slug: "rakousko",
    sources: [
      { label: "ASFINAG – mýtné a předpisy", url: "https://www.asfinag.at/maut-vignette/lkw-maut/" },
      { label: "BMK – zákazy jízd AT", url: "https://www.bmk.gv.at/themen/verkehr/strasse/lkw/fahrverbote.html" },
      { label: "ÖAMTC – info pro řidiče", url: "https://www.oeamtc.at/thema/lkw-fahrverbote" },
    ],
  },
  {
    code: "CH", name: "Švýcarsko", flag: "🇨🇭", capital: "Bern", currency: "CHF",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "LSVA (výkonnostní poplatek)", tollInfo: "Výpočet dle hmotnosti × km × emisní třída. Platba předem nebo při výjezdu.",
    speedHighway: 80, speedRoad: 60, speedCity: 50,
    winterTyresRequired: false, winterTyresPeriod: "Doporučeny, nejsou povinné",
    emergencyNumber: "112", policeNumber: "117",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička"],
    banWeekend: "Ne 0:00–24:00 (soupravy). So od 15:00 pro nad 7,5 t",
    banHoliday: "Státní svátky 0:00–24:00",
    banNight: "22:00–5:00 celoroční pro nad 3,5 t",
    notes: "Přísný noční klid. Max 28 t bez speciálního povolení na některých trasách.",
    slug: "svycarsko",
    sources: [
      { label: "ASTRA – předpisy pro těžká vozidla", url: "https://www.astra.admin.ch/astra/de/home/fachleute/fahrzeuge/schwere-motorfahrzeuge.html" },
      { label: "LSVA kalkulačka", url: "https://www.ezv.admin.ch/ezv/de/home/information-firmen/transport-und-verkehr/strassenverkehr/lsva.html" },
    ],
  },
  {
    code: "FR", name: "Francie", flag: "🇫🇷", capital: "Paříž", currency: "EUR",
    maxWeight: 44, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Télépéage (liber-t)", tollInfo: "Placené dálnice. Ceny variabilní dle trasy a kategorie vozidla.",
    speedHighway: 80, speedRoad: 80, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "1. listopadu – 31. března (vybrané departmenty)",
    emergencyNumber: "112", policeNumber: "17",
    requiredEquipment: ["Výstražný trojúhelník (2×)", "Reflexní vesta", "Lékárnička", "Alkohol tester"],
    banWeekend: "So 22:00–Ne 22:00 (červenec–srpen), So 22:00–Ne 20:00 (mimo sezónu)",
    banHoliday: "Státní svátky 0:00–24:00",
    banNight: "Není plošný",
    notes: "Kategorie zákazů A, B, C, D dle sezóny a typu vozidla. Vignette Crit'Air pro LEZ v Paříži.",
    slug: "francie",
    sources: [
      { label: "Bison Futé – dopravní info FR", url: "https://www.bison-fute.gouv.fr" },
      { label: "DREAL – zákazy jízd FR", url: "https://www.securite-routiere.gouv.fr/les-medias/nos-campagnes/bison-fute" },
      { label: "Crit'Air vignette", url: "https://www.certificat-air.gouv.fr" },
    ],
  },
  {
    code: "IT", name: "Itálie", flag: "🇮🇹", capital: "Řím", currency: "EUR",
    maxWeight: 44, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Autostrade (Telepass)", tollInfo: "Placené dálnice. Telepass transponder doporučen. Platba v hotovosti možná.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "15. října – 15. dubna (variuje dle regionu)",
    emergencyNumber: "112", policeNumber: "113",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička"],
    banWeekend: "So 14:00–22:00, Ne 7:00–22:00",
    banHoliday: "Státní svátky 7:00–22:00",
    banNight: "Není plošný",
    notes: "V létě (červenec–srpen) rozšíření zákazů. Výjimky pro čerstvé potraviny a živá zvířata.",
    slug: "italie",
    sources: [
      { label: "MIT – Ministero Infrastrutture", url: "https://www.mit.gov.it/comunicazione/news/divieti-di-circolazione-dei-veicoli-pesanti" },
      { label: "Autostrade per l'Italia", url: "https://www.autostrade.it" },
      { label: "Telepass pro kamiony", url: "https://business.telepass.com/it" },
    ],
  },
  {
    code: "ES", name: "Španělsko", flag: "🇪🇸", capital: "Madrid", currency: "EUR",
    maxWeight: 44, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Peaje (placené dálnice)", tollInfo: "Část dálnic zpoplatněna. Trend rušení mýtného v některých oblastech.",
    speedHighway: 80, speedRoad: 80, speedCity: 50,
    winterTyresRequired: false, winterTyresPeriod: "Dle podmínek na silnici",
    emergencyNumber: "112", policeNumber: "091",
    requiredEquipment: ["Výstražný trojúhelník (2×)", "Reflexní vesta (2×)"],
    banWeekend: "So 13:00–Ne 22:00 (červenec–srpen)",
    banHoliday: "Státní svátky 0:00–22:00",
    banNight: "Není plošný",
    notes: "Pravidla zákazů se liší dle autonomního regionu. Katalánsko má vlastní předpisy.",
    slug: "spanelsko",
    sources: [
      { label: "DGT – španělská dopravní policie", url: "https://www.dgt.es/inicio/" },
      { label: "DGT – zákazy jízd ES", url: "https://www.dgt.es/es/seguridad-vial/normativa-y-legislacion/circulacion/restricciones-de-circulacion/" },
    ],
  },
  {
    code: "PL", name: "Polsko", flag: "🇵🇱", capital: "Varšava", currency: "PLN",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "e-TOLL (OBU)", tollInfo: "Elektronické mýto povinné pro vozidla nad 3,5 t. OBU nebo ViaTOLL app.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: false, winterTyresPeriod: "Doporučeny od října do dubna",
    emergencyNumber: "112", policeNumber: "997",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Hasicí přístroj"],
    banWeekend: "So 18:00–Ne 22:00 (mimo sezónu), So 8:00–22:00 (červenec–srpen)",
    banHoliday: "Státní svátky 8:00–22:00",
    banNight: "Není plošný",
    notes: "Výjimky pro kombinovanou přepravu. Přísné kontroly přetížení.",
    slug: "polsko",
    sources: [
      { label: "GDDKiA – Generální ředitelství silnic PL", url: "https://www.gddkia.gov.pl" },
      { label: "e-TOLL PL", url: "https://etoll.gov.pl" },
      { label: "Viamichelin – trasy PL", url: "https://www.viamichelin.com" },
    ],
  },
  {
    code: "CZ", name: "Česko", flag: "🇨🇿", capital: "Praha", currency: "CZK",
    maxWeight: 48, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Elektronické mýto (OBU)", tollInfo: "Povinné pro vozidla nad 3,5 t na dálnicích a silnicích I. třídy.",
    speedHighway: 80, speedRoad: 80, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "1. listopadu – 31. března",
    emergencyNumber: "112", policeNumber: "158",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Hasicí přístroj"],
    banWeekend: "Ne 13:00–22:00",
    banHoliday: "Státní svátky 13:00–22:00",
    banNight: "Není plošný",
    notes: "Relativně mírná pravidla. Výjimky pro JIT dodávky a zemědělství.",
    slug: "cesko",
    sources: [
      { label: "ŘSD – Ředitelství silnic a dálnic CZ", url: "https://www.rsd.cz" },
      { label: "MDČR – zákazy jízd CZ", url: "https://www.mdcr.cz/Silnice-zeleznice/Silnicni-doprava/Nakladni-doprava" },
      { label: "Mýto CZ", url: "https://www.mytocz.eu" },
    ],
  },
  {
    code: "SK", name: "Slovensko", flag: "🇸🇰", capital: "Bratislava", currency: "EUR",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Elektronické mýto (OBU/SMS)", tollInfo: "Povinné pro vozidla nad 3,5 t. Platba OBU nebo SMS předem.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "15. listopadu – 31. března",
    emergencyNumber: "112", policeNumber: "158",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička"],
    banWeekend: "Ne 13:00–22:00 (So 7:00–19:00 v létě)",
    banHoliday: "Státní svátky 13:00–22:00",
    banNight: "Není plošný",
    notes: "Letní rozšíření zákazů červen–srpen.",
    slug: "slovensko",
    sources: [
      { label: "NDS – Národná diaľničná spoločnosť SK", url: "https://www.ndsas.sk" },
      { label: "MDSR – predpisy nákladnej dopravy", url: "https://www.mindop.sk/ministerstvo-1/cestna-doprava-5" },
    ],
  },
  {
    code: "HU", name: "Maďarsko", flag: "🇭🇺", capital: "Budapešť", currency: "HUF",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "HU-GO (OBU/web)", tollInfo: "Elektronické mýto pro vozidla nad 3,5 t. Registrace a platba přes HU-GO portál.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: false, winterTyresPeriod: "Doporučeny november–březen",
    emergencyNumber: "112", policeNumber: "107",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička"],
    banWeekend: "So 22:00–Ne 22:00 (letní rozšíření So od 15:00)",
    banHoliday: "Státní svátky 0:00–22:00",
    banNight: "Není plošný",
    notes: "Přísné kontroly na hraničních přechodech.",
    slug: "madarsko",
    sources: [
      { label: "HU-GO mýtný systém", url: "https://www.hu-go.hu" },
      { label: "KTI – Dopravní vědecký ústav HU", url: "https://www.kti.hu" },
    ],
  },
  {
    code: "RO", name: "Rumunsko", flag: "🇷🇴", capital: "Bukurešť", currency: "RON",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "ROVINIETA + e-TOLL", tollInfo: "Dálniční známka + elektronické mýto na vybraných úsecích.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "1. listopadu – 1. března",
    emergencyNumber: "112", policeNumber: "112",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Hasicí přístroj"],
    banWeekend: "Ne 7:00–20:00 (mezinárodní trasy)",
    banHoliday: "Státní svátky 7:00–20:00",
    banNight: "Není plošný",
    notes: "Silniční infrastruktura v rozvoji. Pozor na přetížení náprav – přísné kontroly.",
    slug: "rumunsko",
    sources: [
      { label: "CNAIR – správce silnic RO", url: "https://www.cnair.ro" },
      { label: "ISCTR – inspekce silniční dopravy", url: "https://www.isctr.ro" },
    ],
  },
  {
    code: "NL", name: "Holandsko", flag: "🇳🇱", capital: "Amsterdam", currency: "EUR",
    maxWeight: 50, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Žádné plošné mýto", tollInfo: "Mýto pouze v tunelech (Westerscheldetunnel). Plánuje se km poplatek.",
    speedHighway: 80, speedRoad: 80, speedCity: 50,
    winterTyresRequired: false, winterTyresPeriod: "Doporučeny, nejsou povinné",
    emergencyNumber: "112", policeNumber: "0900-8844",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta"],
    banWeekend: "Žádný plošný zákaz",
    banHoliday: "Žádný plošný zákaz",
    banNight: "Není plošný",
    notes: "LEZ zóny v Amsterdamu, Rotterdamu. Přísné normy Euro 6.",
    slug: "holandsko",
    sources: [
      { label: "RDW – registrace a předpisy NL", url: "https://www.rdw.nl" },
      { label: "Rijkswaterstaat – správa silnic NL", url: "https://www.rijkswaterstaat.nl" },
    ],
  },
  {
    code: "BE", name: "Belgie", flag: "🇧🇪", capital: "Brusel", currency: "EUR",
    maxWeight: 44, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Viapass (OBU)", tollInfo: "Povinné pro vozidla nad 3,5 t. OBU jednotka od Satellic, Telepass nebo Axxès.",
    speedHighway: 90, speedRoad: 70, speedCity: 50,
    winterTyresRequired: false, winterTyresPeriod: "Doporučeny november–březen",
    emergencyNumber: "112", policeNumber: "101",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Hasicí přístroj"],
    banWeekend: "Žádný plošný zákaz",
    banHoliday: "Žádný plošný zákaz",
    banNight: "Není plošný",
    notes: "LEZ v Bruselu, Gentu, Antverpách. Přísné ekologické normy.",
    slug: "belgie",
    sources: [
      { label: "Viapass – mýtný systém BE", url: "https://www.viapass.be" },
      { label: "SPF Mobilité – předpisy BE", url: "https://mobilit.belgium.be/fr" },
    ],
  },
  {
    code: "SI", name: "Slovinsko", flag: "🇸🇮", capital: "Lublaň", currency: "EUR",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "DarsGo (OBU)", tollInfo: "Elektronické mýto pro vozidla nad 3,5 t od roku 2022.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "15. listopadu – 15. března",
    emergencyNumber: "112", policeNumber: "113",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Sněhové řetězy"],
    banWeekend: "Ne 8:00–21:00 (červenec–srpen)",
    banHoliday: "Státní svátky 8:00–21:00",
    banNight: "Není plošný",
    notes: "Průjezdní trasa do Chorvatska. Tunely Karavanke – povinná přestávka.",
    slug: "slovinsko",
    sources: [
      { label: "DARS – dálniční správa SI", url: "https://www.dars.si" },
      { label: "DarsGo mýtný systém", url: "https://www.darsgo.si" },
    ],
  },
  {
    code: "HR", name: "Chorvatsko", flag: "🇭🇷", capital: "Záhřeb", currency: "EUR",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "ENC (elektronické mýto)", tollInfo: "Placené dálnice. ENC transponder nebo hotovost/karta.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "15. listopadu – 15. března",
    emergencyNumber: "112", policeNumber: "192",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Rezerva nebo sprej"],
    banWeekend: "Ne 7:00–20:00 (letní sezóna)",
    banHoliday: "Státní svátky 7:00–20:00",
    banNight: "Není plošný",
    notes: "Sezónní vytížení v létě. Příjezdy k pobřeží – pozor na úzké silnice.",
    slug: "chorvatsko",
    sources: [
      { label: "HAC – chorvatská dálniční správa", url: "https://www.hac.hr" },
      { label: "HAK – autoklub HR", url: "https://www.hak.hr/info/strani-vozaci" },
    ],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find(c => c.slug === slug);
}
