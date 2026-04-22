-- Tabulka oficiálních portálů pro každý stát
-- Každý řádek = jeden portál jednoho státu.
-- Tlačítko "Otevřít portál" v UI vybírá záznamy z této tabulky dle country_code + portal_type.

CREATE TABLE IF NOT EXISTS official_portals (
  id           BIGSERIAL PRIMARY KEY,
  country_code CHAR(2)  NOT NULL,   -- ISO 3166-1 alpha-2
  portal_type  TEXT     NOT NULL CHECK (portal_type IN (
    'toll',          -- platba mýtného / registrace OBU
    'traffic_info',  -- dopravní informace, uzavírky, kamery
    'bans',          -- zákazy jízd, svátky, kalendář zákazů
    'regulations',   -- obecné předpisy silniční dopravy
    'permits',       -- povolení nadrozměrné / nebezpečné náklady
    'general'        -- ministerstvo / obecný portál
  )),
  name         TEXT     NOT NULL,   -- název portálu (v originálním jazyce nebo češtině)
  url          TEXT     NOT NULL,
  language     CHAR(2),             -- ISO 639-1 kód jazyka stránky (např. 'de', 'fr', 'en')
  notes        TEXT,                -- volitelná poznámka (např. "Anglická verze dostupná")
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_op_country      ON official_portals(country_code);
CREATE INDEX idx_op_type         ON official_portals(country_code, portal_type);

ALTER TABLE official_portals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON official_portals
  FOR SELECT TO anon USING (true);

COMMENT ON TABLE official_portals IS
  'Oficiální webové portály pro nákladní dopravu v jednotlivých státech. Slouží pro tlačítka "Otevřít portál" v UI a jako zdroje při budoucím sběru dat.';

-- ────────────────────────────────────────────────────────────────
-- SEED: Německo (DE)
-- ────────────────────────────────────────────────────────────────
INSERT INTO official_portals (country_code, portal_type, name, url, language, notes) VALUES
  ('DE', 'toll',         'Toll Collect – LKW-Maut',                   'https://www.toll-collect.de',                                                        'de', 'Registrace OBU, jízdné, zákaznická zóna'),
  ('DE', 'bans',         'BAG – Fahrverbote',                          'https://www.bag.bund.de/DE/Themen/Gueterverkehr/Fahrverbote/fahrverbote_node.html',   'de', 'Národní zákazy jízd, Lkw-Streckenverbote'),
  ('DE', 'traffic_info', 'Autobahn GmbH – Verkehrsinformationen',      'https://www.autobahn.de',                                                            'de', 'Uzavírky, stavby, dopravní situace na dálnicích'),
  ('DE', 'regulations',  'BMDV – Bundesministerium Digitales Verkehr', 'https://www.bmdv.bund.de',                                                           'de', 'Legislativa silniční nákladní dopravy');

-- ────────────────────────────────────────────────────────────────
-- SEED: Francie (FR)
-- ────────────────────────────────────────────────────────────────
INSERT INTO official_portals (country_code, portal_type, name, url, language, notes) VALUES
  ('FR', 'toll',         'Autoroutes – Télépéage',                     'https://www.autoroutes.fr',                                                          'fr', 'Přehled mýtného na francouzských dálnicích'),
  ('FR', 'bans',         'DREAL – Réglementation circulation PL',      'https://www.ecologie.gouv.fr/reglementation-du-transport-routier-marchandises',       'fr', 'Celostátní omezení jízd těžkých vozidel'),
  ('FR', 'traffic_info', 'Bison Futé',                                 'https://www.bison-fute.gouv.fr',                                                     'fr', 'Dopravní předpověď, uzavírky, Niveaux de circulation');

-- ────────────────────────────────────────────────────────────────
-- SEED: Španělsko (ES)
-- ────────────────────────────────────────────────────────────────
INSERT INTO official_portals (country_code, portal_type, name, url, language, notes) VALUES
  ('ES', 'toll',         'Ministerio Transportes – peajes',            'https://www.mitma.gob.es/carreteras/peajes-en-autovia',                               'es', 'Přehled mýtnic a sazeb'),
  ('ES', 'bans',         'DGT – Restricciones circulación',            'https://www.dgt.es/inicio/el-trafico/la-circulacion/restricciones/',                  'es', 'Omezení jízdy nákladních vozidel, svátky'),
  ('ES', 'traffic_info', 'DGT – Información del Tráfico',              'https://www.dgt.es/inicio/el-trafico/la-circulacion/',                               'es', 'Dopravní situace v reálném čase');

-- ────────────────────────────────────────────────────────────────
-- SEED: Nizozemsko (NL)
-- ────────────────────────────────────────────────────────────────
INSERT INTO official_portals (country_code, portal_type, name, url, language, notes) VALUES
  ('NL', 'toll',         'Rijkswaterstaat – tolheffing',               'https://www.rijkswaterstaat.nl/zakelijk/transport-en-logistiek/vrachtwagen',          'nl', 'Informace o mýtném pro nákladní vozidla'),
  ('NL', 'bans',         'RDW – voertuigregelgeving',                  'https://www.rdw.nl',                                                                 'nl', 'Předpisy pro vozidla, povolení, hmotnosti'),
  ('NL', 'traffic_info', 'Rijkswaterstaat – verkeersinformatie',       'https://www.rijkswaterstaat.nl/wegen',                                               'nl', 'Dopravní situace, uzavírky, práce na silnicích');
