-- Country regulations table
-- Each category has its own source_url (must be official government/regulatory source)
-- NULL = not yet verified from official source

CREATE TABLE IF NOT EXISTS country_regulations (
  id              BIGSERIAL PRIMARY KEY,
  country_code    CHAR(2)  NOT NULL UNIQUE,
  country_name    TEXT     NOT NULL,

  -- RYCHLOSTI (km/h, pro vozidla >3,5 t pokud není uvedeno jinak)
  speed_motorway_kmh   INT,
  speed_road_kmh       INT,
  speed_city_kmh       INT,
  speed_note           TEXT,   -- odchylky dle hmotnostní třídy, regionu apod.
  speed_source_url     TEXT,
  speed_verified_date  DATE,

  -- ZÁKAZY JÍZD
  ban_weekend          TEXT,
  ban_holiday          TEXT,
  ban_night            TEXT,
  ban_summer           TEXT,
  ban_note             TEXT,
  ban_source_url       TEXT,
  ban_verified_date    DATE,

  -- ROZMĚRY A HMOTNOST
  max_weight_t         NUMERIC(5,2),
  max_axle_weight_t    NUMERIC(4,2),
  max_width_m          NUMERIC(4,2),
  max_height_m         NUMERIC(4,2),
  max_length_m         NUMERIC(5,2),
  dimensions_note      TEXT,
  dimensions_source_url TEXT,
  dimensions_verified_date DATE,

  -- POVINNÁ VÝBAVA
  required_equipment       TEXT[],
  equipment_source_url     TEXT,
  equipment_verified_date  DATE,

  -- MÝTNÉ
  toll_system_name     TEXT,
  toll_payment_url     TEXT,
  toll_note            TEXT,
  toll_source_url      TEXT,
  toll_verified_date   DATE,

  -- ALKOHOL (g/l krve)
  alcohol_general_gl       NUMERIC(3,2),   -- obecný limit
  alcohol_professional_gl  NUMERIC(3,2),   -- limit pro profesionální řidiče (kamion/bus)
  alcohol_note             TEXT,
  alcohol_source_url       TEXT,
  alcohol_verified_date    DATE,

  -- META
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  last_ai_sync     TIMESTAMPTZ
);

-- Veřejné čtení (portál)
ALTER TABLE country_regulations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON country_regulations
  FOR SELECT TO anon USING (true);

-- Index
CREATE INDEX idx_country_regulations_code ON country_regulations(country_code);

-- Komentáře
COMMENT ON TABLE country_regulations IS
  'Předpisy silniční nákladní dopravy pro 31 evropských zemí. Každý záznam musí mít source_url z oficiálního vládního nebo regulačního zdroje.';
COMMENT ON COLUMN country_regulations.speed_note IS
  'Odchylky: např. soupravy >12t mají jiný limit než standardní vozidla >3,5t.';
COMMENT ON COLUMN country_regulations.alcohol_professional_gl IS
  'Limit specificky pro profesionální řidiče (kamiony, autobusy). Často přísnější než obecný limit.';
COMMENT ON COLUMN country_regulations.last_ai_sync IS
  'Časová značka posledního ověření daty AI monitoringem z oficiálních zdrojů.';
