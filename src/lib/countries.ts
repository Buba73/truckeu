export interface CountrySource {
  label: string;
  url: string;
}

export interface LocalBan {
  title: string;
  description: string;
  routes?: string;
  period?: string;
  sourceLabel: string;
  sourceUrl: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  capital: string;
  currency: string;
  maxWeight: number;
  maxLength: number;
  maxWidth: number;
  maxHeight: number;
  tollSystem: string;
  tollInfo: string;
  speedHighway: number;
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
  localBans: LocalBan[];
  notes: string;
  slug: string;
  sources: CountrySource[];
}

export const countries: Country[] = [
  {
    code: "DE", name: "Německo", flag: "🇩🇪", capital: "Berlín", currency: "EUR",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Toll Collect (LKW-Maut)", tollInfo: "Povinná OBU jednotka pro vozidla nad 7,5 t na dálnicích a spolkových silnicích.",
    speedHighway: 80, speedRoad: 60, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "Situačně (sníh/náledí) – bez pevného termínu",
    emergencyNumber: "112", policeNumber: "110",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička"],
    banWeekend: "So 0:00–22:00, Ne 0:00–22:00",
    banHoliday: "Státní svátky 0:00–22:00",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "Bavorské zemské svátky – dodatečné dny zákazu",
        description: "V Bavorsku platí zákaz jízdy navíc i na zemské svátky: Zjevení Páně (6. 1.), Nanebevzetí Panny Marie (15. 8.) a Dušičky (1. 11.). Tento zákaz neplatí v ostatních spolkových zemích. Vozidla nad 7,5 t jsou postižena stejně jako o jiných státních svátcích (0:00–22:00).",
        period: "6. 1., 15. 8., 1. 11. (jen Bavorsko)",
        sourceLabel: "BAG – přehled zákazů jízd a státních svátků",
        sourceUrl: "https://www.bag.bund.de/DE/Themen/Gueterverkehr/Fahrverbote/fahrverbote_node.html",
      },
      {
        title: "Lkw-Streckenverbote – zákaz na vedlejších silnicích",
        description: "Nákladní vozidla nad 7,5 t jsou zakázána na řadě spolkových silnic (Bundesstraßen), které byly historicky využívány jako objízdné trasy ke dálnicím. Aktuální seznam vydává BAG a je povinný pro každého řidiče. Porušení je sankcionováno na místě.",
        sourceLabel: "BAG – Lkw-Streckenverbot, aktuální seznam tras",
        sourceUrl: "https://www.bag.bund.de/DE/Themen/Gueterverkehr/Fahrverbote/LKW-Streckenverbote/lkw-streckenverbote_node.html",
      },
    ],
    notes: "Výjimky ze zákazu jízd existují pro přepravu čerstvých potravin, živých zvířat a zásilek typu JIT. Sektorový zákaz na Brenneru (Rakousko) ovlivňuje tranzit DE–IT.",
    slug: "nemecko",
    sources: [
      { label: "BAG – Bundesamt für Güterverkehr (zákazy jízd)", url: "https://www.bag.bund.de/DE/Themen/Gueterverkehr/Fahrverbote/fahrverbote_node.html" },
      { label: "BMDV – Bundesministerium für Digitales und Verkehr", url: "https://www.bmdv.bund.de/DE/Themen/Mobilitaet/Strasse/Gueterverkehr/gueterverkehr.html" },
      { label: "Toll Collect – LKW-Maut DE", url: "https://www.toll-collect.de" },
    ],
  },
  {
    code: "AT", name: "Rakousko", flag: "🇦🇹", capital: "Vídeň", currency: "EUR",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "ASFINAG (GO-Box)", tollInfo: "GO-Box povinná pro vozidla nad 3,5 t na všech mýtných úsecích. Vícekanálová mýtná stání.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "1. listopadu – 15. dubna (na silnicích se zimními podmínkami)",
    emergencyNumber: "112", policeNumber: "133",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Sněhové řetězy (na alpských trasách povinné při značení)"],
    banWeekend: "So 15:00–24:00, Ne 0:00–22:00",
    banHoliday: "Státní svátky 0:00–22:00",
    banNight: "22:00–5:00 na vybraných alpských dálnicích (A12, A13, A10, A9, A2)",
    localBans: [
      {
        title: "Noční zákaz na alpských dálnicích (Nachtfahrverbot)",
        description: "Na nejfrekventovanějších alpských trasách platí celoroční noční zákaz jízdy pro vozidla nad 7,5 t. Konkrétně: A12 Inntalautobahn (Kufstein – Brenner), A13 Brennerautobahn (Innsbruck – italská hranice), A10 Tauernautobahn, A9 Pyhrnautobahn a vybrané úseky A2 Südautobahn. Porušení je trestáno pokutou na místě.",
        routes: "A12 Inntal, A13 Brenner, A10 Tauern, A9 Pyhrn, A2 Süd (vybrané úseky)",
        period: "22:00–5:00 celoročně",
        sourceLabel: "BMK – noční zákazy jízd na dálnicích AT",
        sourceUrl: "https://www.bmk.gv.at/themen/verkehr/strasse/lkw/fahrverbote.html",
      },
      {
        title: "Sektorový zákaz na Brenneru (Sektorales Fahrverbot)",
        description: "46 kategorií zboží (včetně oceli, kamene, automobilů, dřeva a dalších) nesmí být přepravováno po silnici přes Tirolsko na A12/A13. Vozidla přepravující toto zboží musí přejít na kombinovanou přepravu (železnice). Platí pro tranzit i vnitrostátní přepravu přes tento koridor.",
        routes: "A13 Brennerautobahn, A12 Inntalautobahn (tranzit přes Tirolsko)",
        period: "Celoročně",
        sourceLabel: "Land Tirol – sektorový zákaz, seznam kategorií zboží",
        sourceUrl: "https://www.tirol.gv.at/verkehr/lkw-verkehr/sektorales-fahrverbot/",
      },
      {
        title: "Noční omezení průjezdu Innsbruckem",
        description: "Na silnicích procházejících Innsbruckem (B171, B182) platí noční omezení pro nákladní vozidla. Řidiči jsou nuceni používat dálnice A12/A13. Opatření slouží k ochraně obytných oblastí před hlukem.",
        routes: "B171 Inntalstraße, B182 Brennerstraße (průjezd Innsbruckem)",
        period: "22:00–5:00",
        sourceLabel: "BMK – omezení jízd v Innsbrucku",
        sourceUrl: "https://www.bmk.gv.at/themen/verkehr/strasse/lkw/fahrverbote.html",
      },
    ],
    notes: "Jedny z nejpřísnějších předpisů v EU. Sektorový zákaz na Brenneru ovlivňuje přes 70 % transalpského silničního nákladu.",
    slug: "rakousko",
    sources: [
      { label: "BMK – Bundesministerium Klimaschutz (zákazy jízd AT)", url: "https://www.bmk.gv.at/themen/verkehr/strasse/lkw/fahrverbote.html" },
      { label: "ASFINAG – státní mýtný operátor AT, GO-Box", url: "https://www.asfinag.at/maut-vignette/lkw-maut/" },
      { label: "Land Tirol – sektorový zákaz na Brenneru", url: "https://www.tirol.gv.at/verkehr/lkw-verkehr/sektorales-fahrverbot/" },
    ],
  },
  {
    code: "CH", name: "Švýcarsko", flag: "🇨🇭", capital: "Bern", currency: "CHF",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "LSVA (výkonnostní poplatek)", tollInfo: "Výpočet dle ujetých km × hmotnost × emisní třída. Platba přes OBU nebo předem. Povinné pro vozidla nad 3,5 t.",
    speedHighway: 80, speedRoad: 60, speedCity: 50,
    winterTyresRequired: false, winterTyresPeriod: "Nejsou povinné plošně, ale vozidlo musí být vždy způsobilé pro podmínky na silnici",
    emergencyNumber: "112", policeNumber: "117",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička"],
    banWeekend: "Ne 0:00–24:00 pro vozidla nad 3,5 t. So 0:00–24:00 pro jízdní soupravy.",
    banHoliday: "Státní svátky 0:00–24:00",
    banNight: "22:00–5:00 celoroční pro všechna vozidla nad 3,5 t na všech silnicích",
    localBans: [
      {
        title: "Celoroční noční zákaz – všechny silnice CH",
        description: "Na rozdíl od ostatních zemí EU platí ve Švýcarsku plošný noční zákaz jízdy pro všechna motorová vozidla nad 3,5 t na všech silnicích bez výjimky. Výjimky jsou povoleny pouze pro zásobování a kombinovanou přepravu se zvláštním povolením. Základ: čl. 91 VRV (Verkehrsregelnverordnung).",
        period: "22:00–5:00 celoročně",
        sourceLabel: "ASTRA – VRV čl. 91, noční zákaz těžkých vozidel",
        sourceUrl: "https://www.astra.admin.ch/astra/de/home/fachleute/fahrzeuge/schwere-motorfahrzeuge.html",
      },
      {
        title: "Hmotnostní limit 28 t na vedlejších trasách",
        description: "Na silnicích, které nejsou součástí schválené tranzitní sítě, platí limit 28 t celkové hmotnosti. Soupravy 40 t (povolené s LSVA) smí jezdit pouze po hlavních koridorech (A1, A2, A3, A9). Překročení je pokutováno a vozidlo může být odstaveno.",
        sourceLabel: "EZV – LSVA a povolené tranzitní trasy",
        sourceUrl: "https://www.ezv.admin.ch/ezv/de/home/information-firmen/transport-und-verkehr/strassenverkehr/lsva.html",
      },
      {
        title: "Tunel Gotthard – bezpečnostní pauzy a konvoje",
        description: "Při dopravní zátěži je průjezd tunelem řízen v konvojích. Před vstupem jsou povinné bezpečnostní zastávky. Vozidla přepravující ADR zboží kategorie 2 a výše mají zakázán průjezd; musí použít autovlak (RoLa) nebo Gotthard-Basistunnel (jen omezeně pro kamiony).",
        routes: "A2 – tunel Gotthard (Göschenen–Airolo)",
        sourceLabel: "ASTRA – pravidla průjezdu tunelem Gotthard",
        sourceUrl: "https://www.astra.admin.ch/astra/de/home/themen/nationalstrassen/tunnel/gotthardstrassentunnel.html",
      },
    ],
    notes: "Zákazy ve Švýcarsku jsou jedny z nejpřísnějších v Evropě. Kontroly jsou časté a automatizované. LSVA je nutné uhradit před vstupem do CH.",
    slug: "svycarsko",
    sources: [
      { label: "ASTRA – těžká vozidla, zákazy, tunely", url: "https://www.astra.admin.ch/astra/de/home/fachleute/fahrzeuge/schwere-motorfahrzeuge.html" },
      { label: "EZV – LSVA kalkulačka a pravidla", url: "https://www.ezv.admin.ch/ezv/de/home/information-firmen/transport-und-verkehr/strassenverkehr/lsva.html" },
    ],
  },
  {
    code: "FR", name: "Francie", flag: "🇫🇷", capital: "Paříž", currency: "EUR",
    maxWeight: 44, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Télépéage (Liber-t)", tollInfo: "Placené dálnice. Liber-t transponder doporučen. Ceny variabilní dle trasy a kategorie vozidla.",
    speedHighway: 80, speedRoad: 80, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "1. listopadu – 31. března (povinné ve vybraných departmentech dle vyhlášky z r. 2020)",
    emergencyNumber: "112", policeNumber: "17",
    requiredEquipment: ["Výstražný trojúhelník (2×)", "Reflexní vesta", "Lékárnička", "Alkohol tester (doporučen)"],
    banWeekend: "So 22:00 – Ne 22:00 (červenec–srpen), So 22:00 – Ne 20:00 (mimo sezónu)",
    banHoliday: "Státní svátky 0:00–24:00",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "Roční kalendář zákazů Bison Futé – závazné termíny",
        description: "Francie každoročně vydává závazný kalendář zakázaných dnů pro vozidla nad 7,5 t. Dny jsou klasifikovány dle dopravního zatížení: Oranžová (omezení), Červená (zákaz), Černá (úplný zákaz). Termíny se každý rok liší – je nutné vždy ověřit aktuální rok. Plán zahrnuje letní sezónu, Vánoce, svátky a prázdninové přestupy.",
        period: "Dle ročního kalendáře (zveřejněn vždy v prosinci pro následující rok)",
        sourceLabel: "Bison Futé – roční kalendář zakázaných dnů (aktuální rok)",
        sourceUrl: "https://www.bison-fute.gouv.fr/la-circulation-par-periode/les-jours-classes.html",
      },
      {
        title: "Prefekturní zákazy v jednotlivých departmentech",
        description: "Prefekti mohou vydávat lokální vyhlášky zavádějící dodatečná omezení pro nákladní vozidla. Typicky se týkají průjezdu hustě obydlenými oblastmi, turistickými destinacemi nebo silnicemi s omezenou kapacitou. Informujte se u prefektury příslušného departmentu.",
        sourceLabel: "Securité Routière – přehled lokálních omezení",
        sourceUrl: "https://www.securite-routiere.gouv.fr",
      },
      {
        title: "Zóny nízkých emisí (ZFE) – Crit'Air vignette",
        description: "Vozidla vstupující do měst s ZFE (Paříž, Lyon, Grenoble, Strasbourg, Toulouse a další) musí mít platnou Crit'Air vignetu. Pro kamiony platí přísné emisní normy – nejčastěji Euro 6. Starší vozidla mohou mít přístup zcela zakázán nebo omezen na určité hodiny.",
        period: "Celoročně v ZFE oblastech",
        sourceLabel: "Certificat-Air – vydání Crit'Air vignety a mapa ZFE",
        sourceUrl: "https://www.certificat-air.gouv.fr",
      },
    ],
    notes: "Systém Bison Futé je závazný, ne jen doporučující. Roční plán musí mít každý dopravce k dispozici.",
    slug: "francie",
    sources: [
      { label: "Bison Futé – dopravní informace a kalendář FR", url: "https://www.bison-fute.gouv.fr" },
      { label: "Securité Routière – regulace nákladní dopravy", url: "https://www.securite-routiere.gouv.fr" },
      { label: "Crit'Air – vignette a ZFE zóny", url: "https://www.certificat-air.gouv.fr" },
    ],
  },
  {
    code: "IT", name: "Itálie", flag: "🇮🇹", capital: "Řím", currency: "EUR",
    maxWeight: 44, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Autostrade (Telepass)", tollInfo: "Placené dálnice. Telepass transponder doporučen. Platba hotovostí nebo kartou na mýtných stanicích.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "15. října – 15. dubna (variuje dle regionu, alpské oblasti dříve)",
    emergencyNumber: "112", policeNumber: "113",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička"],
    banWeekend: "So 14:00–22:00, Ne 7:00–22:00",
    banHoliday: "Státní svátky 7:00–22:00",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "Letní rozšíření zákazů (červenec–srpen)",
        description: "V letní sezóně (zpravidla červenec–srpen) vydává Ministerstvo infrastruktury (MIT) dekret rozšiřující sobotní zákaz. Sobota je rozšířena na 8:00–22:00 místo standardních 14:00–22:00. Platí na silnicích I. a II. kategorie. Přesné termíny jsou každoročně vyhlašovány v dekretu MIT.",
        period: "Červenec–srpen (dle ročního dekretu MIT)",
        sourceLabel: "MIT – roční dekret o zákazech jízd pro těžká vozidla",
        sourceUrl: "https://www.mit.gov.it/comunicazione/news/divieti-di-circolazione-dei-veicoli-pesanti",
      },
      {
        title: "Tunel Mont Blanc – bezpečnostní konvoje a ADR omezení",
        description: "Průjezd tunelem Mont Blanc je řízen v konvojích s povinnými minimálními rozestupy (150 m). Vozidla s nebezpečným zbožím (ADR) jsou přísně klasifikována – část kategorií má průjezd zcela zakázán. Doporučuje se rezervace termínu průjezdu přes správu tunelu.",
        routes: "A40 / Tunel Mont Blanc (Chamonix–Courmayeur)",
        sourceLabel: "Správa tunelu Mont Blanc – bezpečnostní předpisy a ADR",
        sourceUrl: "https://www.tunnelmb.net/cs/prehled/dopravni-predpisy",
      },
      {
        title: "Tunel Fréjus – střídavý provoz",
        description: "Tunel Fréjus (A32) má dosud jedno provozní jízdní pruhové řízení s minutovými konvoji. Maximální výška vozidla je 4,80 m. Vozidla ADR tříd 1 a 7 mají průjezd zakázán. Předpokládané otevření druhé jízdní trouby zlepší kapacitu.",
        routes: "A32 – Tunel Fréjus (Bardonecchia–Modane)",
        sourceLabel: "SFTRF – správa tunelu Fréjus, provozní předpisy",
        sourceUrl: "https://www.sftrf.fr/en/using-the-tunnel/regulations",
      },
    ],
    notes: "Výjimky ze zákazů platí pro přepravu živých zvířat, čerstvých potravin a novin. Regionální pravidla (provinciale) se mohou lišit.",
    slug: "italie",
    sources: [
      { label: "MIT – roční dekret zákazů jízd IT", url: "https://www.mit.gov.it/comunicazione/news/divieti-di-circolazione-dei-veicoli-pesanti" },
      { label: "Autostrade per l'Italia – mýtné, omezení", url: "https://www.autostrade.it" },
      { label: "Tunel Mont Blanc – předpisy", url: "https://www.tunnelmb.net/cs/prehled/dopravni-predpisy" },
    ],
  },
  {
    code: "ES", name: "Španělsko", flag: "🇪🇸", capital: "Madrid", currency: "EUR",
    maxWeight: 44, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Peaje (placené dálnice)", tollInfo: "Část dálnic zpoplatněna. Trend postupného rušení mýtného (AP-7 Středomoří, AP-9 Galície zdarma od r. 2021).",
    speedHighway: 80, speedRoad: 80, speedCity: 50,
    winterTyresRequired: false, winterTyresPeriod: "Doporučeny, nejsou povinné plošně. Povinné při značení na silnici.",
    emergencyNumber: "112", policeNumber: "091",
    requiredEquipment: ["Výstražný trojúhelník (2×)", "Reflexní vesta (2×)"],
    banWeekend: "So 13:00–Ne 22:00 (červenec–srpen)",
    banHoliday: "Státní svátky 0:00–22:00",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "Autonomní regiony – vlastní předpisy zákazů",
        description: "Španělsko je federální stát a každá autonomní komunita (Katalánsko, Andalusie, Baskicko aj.) má právo vydávat vlastní dopravní předpisy. Katalánsko (Generalitat de Catalunya) vydává samostatný kalendář zákazů jízd, který se může lišit od celostátního. Před jízdou přes více regionů je nutné ověřit každý zvlášť.",
        sourceLabel: "DGT – přehled zákazů po autonomních regionech",
        sourceUrl: "https://www.dgt.es/es/seguridad-vial/normativa-y-legislacion/circulacion/restricciones-de-circulacion/",
      },
      {
        title: "Omezení průjezdu Barcelonou a Madridem (ZBE)",
        description: "Barcelona i Madrid mají zóny nízkých emisí (Zona de Baixes Emissions / Madrid Central). Kamiony starší emisní normy mohou mít vstup zakázán nebo omezený na konkrétní hodiny. Zkontrolujte emisní normu svého vozidla před vstupem do těchto měst.",
        period: "Celoročně (s výjimkami pro víkendy a svátky v některých zónách)",
        sourceLabel: "Ajuntament de Barcelona – Zona de Baixes Emissions",
        sourceUrl: "https://www.barcelona.cat/mobilitat/ca/conduccio-i-aparcament/zona-baixes-emissions",
      },
    ],
    notes: "Pravidla se liší dle regionu. Při přejezdu více autonomních komunit je nutné ověřit každou zvlášť.",
    slug: "spanelsko",
    sources: [
      { label: "DGT – Dirección General de Tráfico", url: "https://www.dgt.es/inicio/" },
      { label: "DGT – zákazy a omezení jízd ES", url: "https://www.dgt.es/es/seguridad-vial/normativa-y-legislacion/circulacion/restricciones-de-circulacion/" },
    ],
  },
  {
    code: "PL", name: "Polsko", flag: "🇵🇱", capital: "Varšava", currency: "PLN",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "e-TOLL (OBU)", tollInfo: "Elektronické mýto povinné pro vozidla nad 3,5 t. OBU nebo mobilní aplikace e-TOLL PL.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: false, winterTyresPeriod: "Doporučeny od října do dubna",
    emergencyNumber: "112", policeNumber: "997",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Hasicí přístroj"],
    banWeekend: "So 18:00–Ne 22:00 (mimo sezónu), So 8:00–22:00 (červenec–srpen)",
    banHoliday: "Státní svátky 8:00–22:00",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "Letní rozšíření zákazů (červenec–srpen)",
        description: "V letní sezóně (zpravidla 1. 7. – 31. 8.) platí rozšíření zákazů jízd nařízením ministra infrastruktury: sobota 8:00–22:00 a neděle 8:00–22:00 pro vozidla nad 12 t. Mimo sezónu je sobotní zákaz jen od 18:00. Rozšíření se vztahuje na všechny silnice v celém Polsku.",
        period: "Červenec–srpen (dle ročního nařízení ministra infrastruktury)",
        sourceLabel: "GDDKiA – roční přehled zákazů jízd PL",
        sourceUrl: "https://www.gddkia.gov.pl",
      },
    ],
    notes: "Přísné kontroly přetížení náprav. Výjimky pro kombinovanou přepravu a zásobování.",
    slug: "polsko",
    sources: [
      { label: "GDDKiA – Generální ředitelství silnic a dálnic PL", url: "https://www.gddkia.gov.pl" },
      { label: "e-TOLL PL – registrace a platby", url: "https://etoll.gov.pl" },
    ],
  },
  {
    code: "CZ", name: "Česko", flag: "🇨🇿", capital: "Praha", currency: "CZK",
    maxWeight: 48, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Elektronické mýto (OBU)", tollInfo: "Povinné pro vozidla nad 3,5 t na dálnicích a silnicích I. třídy. OBU registrace přes Mýto CZ.",
    speedHighway: 80, speedRoad: 80, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "1. listopadu – 31. března",
    emergencyNumber: "112", policeNumber: "158",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Hasicí přístroj"],
    banWeekend: "Ne 13:00–22:00",
    banHoliday: "Státní svátky 13:00–22:00",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "Omezení průjezdu obcemi – místní vyhlášky",
        description: "Řada obcí a měst (Praha, Brno, Ostrava) vydala vlastní dopravní vyhlášky omezující průjezd nákladních vozidel v centru. Tato omezení mají různé hmotnostní limity (3,5 t, 6 t, 12 t) a různé časové rozsahy. Před vjezdem do centra ověřte místní dopravní značení.",
        sourceLabel: "ŘSD – přehled omezení průjezdů obcemi",
        sourceUrl: "https://www.rsd.cz",
      },
    ],
    notes: "Česká republika má relativně mírná pravidla v porovnání se sousedy. Výjimky pro JIT dodávky a zemědělství.",
    slug: "cesko",
    sources: [
      { label: "ŘSD – Ředitelství silnic a dálnic ČR", url: "https://www.rsd.cz" },
      { label: "MDČR – nákladní doprava, zákazy jízd", url: "https://www.mdcr.cz/Silnice-zeleznice/Silnicni-doprava/Nakladni-doprava" },
      { label: "Mýto CZ – elektronické mýto", url: "https://www.mytocz.eu" },
    ],
  },
  {
    code: "SK", name: "Slovensko", flag: "🇸🇰", capital: "Bratislava", currency: "EUR",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Elektronické mýto (OBU)", tollInfo: "Povinné pro vozidla nad 3,5 t. Platba OBU nebo SMS předem.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "15. listopadu – 31. března",
    emergencyNumber: "112", policeNumber: "158",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička"],
    banWeekend: "Ne 13:00–22:00 (celoroční), So 7:00–19:00 (červen–srpen)",
    banHoliday: "Státní svátky 13:00–22:00",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "Letní rozšíření zákazů (červen–srpen)",
        description: "V letní sezóně (1. 6. – 31. 8.) je přidán sobotní zákaz 7:00–19:00 a nedělní zákaz se rozšiřuje na 7:00–22:00 (místo standardního 13:00–22:00). Platí pro vozidla nad 7,5 t na všech silnicích Slovenska.",
        period: "Červen–srpen",
        sourceLabel: "MDV SR – zákazy jízd na Slovensku",
        sourceUrl: "https://www.mindop.sk/ministerstvo-1/cestna-doprava-5",
      },
    ],
    notes: "Letní rozšíření zákazů je pravidelné a každoroční. Ověřujte vždy aktuální nařízení.",
    slug: "slovensko",
    sources: [
      { label: "NDS – Národná diaľničná spoločnosť SK", url: "https://www.ndsas.sk" },
      { label: "MDV SR – predpisy nákladnej dopravy SK", url: "https://www.mindop.sk/ministerstvo-1/cestna-doprava-5" },
    ],
  },
  {
    code: "HU", name: "Maďarsko", flag: "🇭🇺", capital: "Budapešť", currency: "HUF",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "HU-GO (OBU/web)", tollInfo: "Elektronické mýto pro vozidla nad 3,5 t. Registrace a platba přes HU-GO portál nebo aplikaci.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: false, winterTyresPeriod: "Doporučeny november–březen",
    emergencyNumber: "112", policeNumber: "107",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička"],
    banWeekend: "So 22:00–Ne 22:00 (letní rozšíření: So od 15:00 v červenci–srpnu)",
    banHoliday: "Státní svátky 0:00–22:00",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "Letní rozšíření sobotního zákazu (červenec–srpen)",
        description: "V červenci a srpnu je sobotní zákaz rozšířen: začíná již od 15:00 místo standardních 22:00. Platí pro vozidla nad 7,5 t na dálnicích a silnicích I. kategorie. Termíny jsou každoročně potvrzovány nařízením Ministerstva dopravy.",
        period: "Červenec–srpen, So 15:00–24:00",
        sourceLabel: "Maďarské Ministerstvo dopravy – nařízení o zákazech",
        sourceUrl: "https://www.gov.hu/web/itm/kozlekedes",
      },
    ],
    notes: "Přísné kontroly na hraničních přechodech. HU-GO musí být aktivní před vstupem na mýtné úseky.",
    slug: "madarsko",
    sources: [
      { label: "HU-GO – maďarský mýtný systém", url: "https://www.hu-go.hu" },
      { label: "ITM – Ministerstvo inovací a dopravy HU", url: "https://www.gov.hu/web/itm/kozlekedes" },
    ],
  },
  {
    code: "RO", name: "Rumunsko", flag: "🇷🇴", capital: "Bukurešť", currency: "RON",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "ROVINIETA + e-TOLL (DRPCIV)", tollInfo: "Dálniční elektronická vinjeta (ROVINIETA) + elektronické mýto na vybraných úsecích.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "1. listopadu – 1. března",
    emergencyNumber: "112", policeNumber: "112",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Hasicí přístroj"],
    banWeekend: "Ne 7:00–20:00 na silnicích EU koridorů",
    banHoliday: "Státní svátky 7:00–20:00",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "Omezení na horských přechodech v zimě",
        description: "Horské průsmyky (Transfăgărășan, Transalpina, Prislop) jsou v zimě uzavřeny nebo výrazně omezeny pro vozidla nad 3,5 t. Omezení závisí na aktuálním počasí a vydává je CNAIR na základě zprávy správy silnic. Ověřujte vždy den před jízdou.",
        routes: "DN7C Transfăgărășan, DN67C Transalpina, DN18 Prislop",
        period: "Přibližně říjen–duben (dle počasí)",
        sourceLabel: "CNAIR – stav horských průsmyků a omezení",
        sourceUrl: "https://www.cnair.ro",
      },
    ],
    notes: "Silniční infrastruktura v rozvoji. Přísné kontroly přetížení náprav – vážní stanice jsou časté.",
    slug: "rumunsko",
    sources: [
      { label: "CNAIR – Compania Națională de Administrare a Infrastructurii Rutiere", url: "https://www.cnair.ro" },
      { label: "ISCTR – inspekce silniční dopravy RO", url: "https://www.isctr.ro" },
    ],
  },
  {
    code: "NL", name: "Holandsko", flag: "🇳🇱", capital: "Amsterdam", currency: "EUR",
    maxWeight: 50, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Žádné plošné mýto", tollInfo: "Mýto pouze v tunelech (Westerscheldetunnel). Systém kilometrového poplatku se plánuje na 2026.",
    speedHighway: 80, speedRoad: 80, speedCity: 50,
    winterTyresRequired: false, winterTyresPeriod: "Doporučeny, nejsou povinné",
    emergencyNumber: "112", policeNumber: "0900-8844",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta"],
    banWeekend: "Žádný celooplošný zákaz",
    banHoliday: "Žádný celooplošný zákaz",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "Zóny nízkých emisí (ZEZ) – Amsterdam, Rotterdam, Utrecht",
        description: "Velká holandská města provozují ZEZ (Zero Emission Zones) nebo LEZ (Low Emission Zones). Amsterdam zakáže kamiony nesplňující Euro 6 od roku 2025. Rotterdam a Utrecht mají podobná pravidla. Ověřte emisní třídu svého vozidla před vstupem do těchto měst.",
        period: "Celoročně, zpřísnění od 2025",
        sourceLabel: "RDW – mapa LEZ zón v Nizozemí",
        sourceUrl: "https://www.rdw.nl",
      },
    ],
    notes: "Nejliberálnější pravidla víkendových zákazů v EU. Přísné ekologické normy v městských oblastech.",
    slug: "holandsko",
    sources: [
      { label: "RDW – Rijksdienst voor het Wegverkeer (registrace, předpisy)", url: "https://www.rdw.nl" },
      { label: "Rijkswaterstaat – správa silniční sítě NL", url: "https://www.rijkswaterstaat.nl" },
    ],
  },
  {
    code: "BE", name: "Belgie", flag: "🇧🇪", capital: "Brusel", currency: "EUR",
    maxWeight: 44, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "Viapass (OBU)", tollInfo: "Povinné pro vozidla nad 3,5 t. OBU od Satellic, Telepass nebo Axxès. Mýto na všech silnicích.",
    speedHighway: 90, speedRoad: 70, speedCity: 50,
    winterTyresRequired: false, winterTyresPeriod: "Doporučeny november–březen",
    emergencyNumber: "112", policeNumber: "101",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Hasicí přístroj"],
    banWeekend: "Žádný celooplošný zákaz",
    banHoliday: "Žádný celooplošný zákaz",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "LEZ – Brusel, Gent, Antverpy",
        description: "Tři největší belgická města mají aktivní LEZ zóny. Brusel (LEZ) platí od 2018 a je postupně zpřísňován – od 2025 je zakázán vstup pro vozidla pod Euro 6. Gent a Antverpy mají vlastní schémata. Pokuta za vstup bez registrace je 350 EUR.",
        period: "Celoročně",
        sourceLabel: "Cit'air Belgium – LEZ mapa a registrace vozidla",
        sourceUrl: "https://www.lez.brussels",
      },
    ],
    notes: "Belgie nemá víkendové zákazy, ale má jedny z nejpřísnějších LEZ pravidel v EU.",
    slug: "belgie",
    sources: [
      { label: "Viapass – belgický mýtný systém", url: "https://www.viapass.be" },
      { label: "SPF Mobilité – předpisy nákladní dopravy BE", url: "https://mobilit.belgium.be/fr" },
      { label: "LEZ Brusel – info a registrace", url: "https://www.lez.brussels" },
    ],
  },
  {
    code: "SI", name: "Slovinsko", flag: "🇸🇮", capital: "Lublaň", currency: "EUR",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "DarsGo (OBU)", tollInfo: "Elektronické mýto pro vozidla nad 3,5 t zavedené v roce 2022. Registrace přes DarsGo portál.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "15. listopadu – 15. března (nebo při zimních podmínkách)",
    emergencyNumber: "112", policeNumber: "113",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Sněhové řetězy"],
    banWeekend: "Ne 8:00–21:00 (červenec–srpen)",
    banHoliday: "Státní svátky 8:00–21:00",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "Tunel Karawanken – povinné bezpečnostní přestávky",
        description: "Při průjezdu tunelem Karawanken (A2, hranice AT–SI) jsou kamiony povinny dodržovat minimální rozestupy a aplikovat bezpečnostní dobu čekání při zvýšeném provozu. Vozidla s ADR zbožím musí mít potvrzení o bezpečnostní prohlídce.",
        routes: "A2 – tunel Karawanken (hranice Rakousko–Slovinsko)",
        sourceLabel: "DARS – pravidla tunelu Karawanken",
        sourceUrl: "https://www.dars.si",
      },
    ],
    notes: "Slovinsko je hlavní průjezdní koridor na Balkán. V létě zvýšené zatížení turistickou dopravou.",
    slug: "slovinsko",
    sources: [
      { label: "DARS – dálniční správa Slovinska", url: "https://www.dars.si" },
      { label: "DarsGo – elektronické mýto SI", url: "https://www.darsgo.si" },
    ],
  },
  {
    code: "HR", name: "Chorvatsko", flag: "🇭🇷", capital: "Záhřeb", currency: "EUR",
    maxWeight: 40, maxLength: 18.75, maxWidth: 2.55, maxHeight: 4.0,
    tollSystem: "ENC (elektronické mýto)", tollInfo: "Placené dálnice. ENC transponder nebo hotovost/karta na mýtných stanicích.",
    speedHighway: 80, speedRoad: 70, speedCity: 50,
    winterTyresRequired: true, winterTyresPeriod: "15. listopadu – 15. března",
    emergencyNumber: "112", policeNumber: "192",
    requiredEquipment: ["Výstražný trojúhelník", "Reflexní vesta", "Lékárnička", "Rezerva nebo opravný sprej"],
    banWeekend: "Ne 7:00–20:00 (letní sezóna, přibližně červen–září)",
    banHoliday: "Státní svátky 7:00–20:00",
    banNight: "Není celooplošný",
    localBans: [
      {
        title: "Letní omezení na pobřežních silnicích (Jadranska magistrála)",
        description: "Na Jadranské magistrále (D8, E65) a přilehlých silnicích platí v létě dopravní opatření omezující průjezd nákladních vozidel v určitých hodinách kvůli turistickému provozu. Omezení vydává MUP (Ministarstvo unutarnjih poslova) každoročně.",
        routes: "D8 Jadranska magistrála (Split – Dubrovnik a sever)",
        period: "Červen–září (přesné termíny dle ročního nařízení MUP)",
        sourceLabel: "MMPI – Ministarstvo mora, prometa i infrastrukture HR",
        sourceUrl: "https://mmpi.gov.hr",
      },
    ],
    notes: "V letní sezóně je provoz na pobřežních silnicích extrémně přetížen. Doporučujeme noční jízdy mimo hlavní proud.",
    slug: "chorvatsko",
    sources: [
      { label: "HAC – Hrvatska autocesta, dálniční správa HR", url: "https://www.hac.hr" },
      { label: "MMPI – Ministarstvo mora, prometa i infrastrukture HR", url: "https://mmpi.gov.hr" },
    ],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find(c => c.slug === slug);
}
