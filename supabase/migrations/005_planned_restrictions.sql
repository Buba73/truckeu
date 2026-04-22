-- Plánované uzavírky a omezení pro nákladní dopravu
-- Každý záznam musí mít source_url z oficiálního zdroje.
-- NULL v polích = informace není k dispozici z poskytnutého zdroje.

CREATE TABLE IF NOT EXISTS planned_restrictions (
  id              BIGSERIAL PRIMARY KEY,
  country_code    CHAR(2)   NOT NULL,                   -- ISO 3166-1 alpha-2
  country_name    TEXT      NOT NULL,

  -- Časový rozsah
  valid_from      TIMESTAMPTZ,                          -- začátek platnosti omezení
  valid_to        TIMESTAMPTZ,                          -- konec platnosti (NULL = neurčito)

  -- Místo
  location_text   TEXT,                                 -- textový popis úseku / oblasti (např. "A1 km 45–67, směr Praha")
  region          TEXT,                                 -- kraj/region (např. "Bavorsko", "Île-de-France")
  road_number     TEXT,                                 -- číslo silnice / dálnice (např. "A1", "E55")

  -- Typ omezení
  restriction_type TEXT NOT NULL CHECK (restriction_type IN (
    'closure',          -- úplná uzavírka
    'weight_limit',     -- omezení hmotnosti
    'height_limit',     -- omezení výšky
    'width_limit',      -- omezení šířky
    'speed_limit',      -- omezení rychlosti
    'convoy',           -- jízda v koloně / escorts required
    'detour',           -- povinná objížďka
    'ban',              -- zákaz vjezdu HGV
    'other'
  )),

  -- Pro koho platí
  vehicle_type    TEXT DEFAULT 'HGV' CHECK (vehicle_type IN (
    'HGV',        -- těžká nákladní vozidla (>3,5 t)
    'HGV_7_5',    -- >7,5 t
    'HGV_12',     -- >12 t
    'all',        -- všechna vozidla
    'other'
  )),

  -- Popis a zdroj
  description_cs  TEXT,                                 -- stručný popis v češtině (generovaný nebo přeložený)
  description_orig TEXT,                                -- původní popis v jazyce zdroje
  source_url      TEXT NOT NULL,                        -- URL oficiálního zdroje (povinné)
  source_label    TEXT,                                 -- název portálu / instituce

  -- Meta
  is_active       BOOLEAN GENERATED ALWAYS AS (
    valid_from IS NULL OR (
      valid_from <= NOW() AND (valid_to IS NULL OR valid_to >= NOW())
    )
  ) STORED,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Indexy pro časté dotazy
CREATE INDEX idx_pr_country     ON planned_restrictions(country_code);
CREATE INDEX idx_pr_valid_from  ON planned_restrictions(valid_from);
CREATE INDEX idx_pr_valid_to    ON planned_restrictions(valid_to);
CREATE INDEX idx_pr_active      ON planned_restrictions(is_active, country_code);

-- Veřejné čtení
ALTER TABLE planned_restrictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON planned_restrictions
  FOR SELECT TO anon USING (true);

COMMENT ON TABLE planned_restrictions IS
  'Plánované uzavírky, omezení a zákazy pro nákladní dopravu. Každý záznam musí mít source_url z oficiálního dopravního portálu nebo ministerstva.';
COMMENT ON COLUMN planned_restrictions.is_active IS
  'Vypočítáno automaticky: TRUE pokud platnost zahrnuje aktuální čas.';
COMMENT ON COLUMN planned_restrictions.restriction_type IS
  'Typ omezení: closure=uzavírka, weight_limit=omezení hmotnosti, ban=zákaz vjezdu HGV, detour=povinná objížďka, atd.';
