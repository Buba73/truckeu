import { getLatestRoadworks, Roadwork } from "@/lib/supabase";

export const revalidate = 7200; // ISR – obnoví každé 2 hodiny

async function loadRoadworks(): Promise<Roadwork[]> {
  try {
    return await getLatestRoadworks(6);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const roadworks = await loadRoadworks();
  return (
    <>
      <header>
        <a className="logo" href="/">TRUCK<span>EU</span></a>
        <nav>
          <a href="/" className="active">Přehled</a>
          <a href="/zakazy">Zákazy jízd</a>
          <a href="/upozorneni">Omezení</a>
          <a href="/upozorneni">Uzavírky</a>
          <a href="/rady">Rady</a>
          <a href="/zeme">Státy EU</a>
        </nav>
        <div className="header-right">
          <div className="live-badge"><div className="live-dot"></div>LIVE</div>
        </div>
      </header>

      <div className="hero">
        <div className="hero-tag">Bezplatný portál pro dopravce</div>
        <h1>VŠE CO<br />ŘIDIČ <em>POTŘEBUJE</em></h1>
        <p className="hero-sub">Zákazy jízd, omezení, uzavírky a rady pro celou EU – přehledně, zdarma a na jednom místě.</p>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">27</span><span className="stat-label">zemí EU</span></div>
          <div className="stat"><span className="stat-num">100%</span><span className="stat-label">zdarma</span></div>
          <div className="stat"><span className="stat-num">24/7</span><span className="stat-label">aktualizace</span></div>
        </div>
      </div>

      <div className="alert-bar">
        <div className="alert-icon">🚨</div>
        <div className="alert-text">
          <strong>AKTIVNÍ ZÁKAZ – Německo</strong>
          <p>Zákaz jízdy vozidel nad 7,5 t platí tuto neděli 20. 4. od 00:00 do 22:00 na celém území.</p>
        </div>
        <div className="alert-time">Dnes 00:01</div>
      </div>

      <div className="search-wrap">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Hledat stát, omezení, radu..." />
          <span className="search-kbd">⌘K</span>
        </div>
      </div>

      <div className="main-grid">

        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="icon">🚫</span> Zákazy jízd</div>
            <span className="card-badge badge-red">Tento víkend</span>
          </div>
          <div className="ban-list">
            <div className="ban-item">
              <div className="flag">🇩🇪</div>
              <div className="ban-info">
                <div className="ban-country">Německo</div>
                <div className="ban-detail">Ned 00:00–22:00 · vozidla nad 7,5 t</div>
              </div>
              <div className="ban-status status-active">AKTIVNÍ</div>
            </div>
            <div className="ban-item">
              <div className="flag">🇦🇹</div>
              <div className="ban-info">
                <div className="ban-country">Rakousko</div>
                <div className="ban-detail">Ned 00:00–22:00 · vozidla nad 7,5 t</div>
              </div>
              <div className="ban-status status-active">AKTIVNÍ</div>
            </div>
            <div className="ban-item">
              <div className="flag">🇫🇷</div>
              <div className="ban-info">
                <div className="ban-country">Francie</div>
                <div className="ban-detail">Sob 22:00 – Ned 22:00 · nad 3,5 t</div>
              </div>
              <div className="ban-status status-active">AKTIVNÍ</div>
            </div>
            <div className="ban-item">
              <div className="flag">🇨🇭</div>
              <div className="ban-info">
                <div className="ban-country">Švýcarsko</div>
                <div className="ban-detail">Ned 00:00–24:00 · průjezdní tranzit</div>
              </div>
              <div className="ban-status status-active">AKTIVNÍ</div>
            </div>
            <div className="ban-item">
              <div className="flag">🇮🇹</div>
              <div className="ban-info">
                <div className="ban-country">Itálie</div>
                <div className="ban-detail">Příští sob 08:00–22:00 · nad 7,5 t</div>
              </div>
              <div className="ban-status status-soon">ZA 6 DNÍ</div>
            </div>
            <div className="ban-item">
              <div className="flag">🇨🇿</div>
              <div className="ban-info">
                <div className="ban-country">Česko</div>
                <div className="ban-detail">Žádný zákaz tento víkend</div>
              </div>
              <div className="ban-status status-free">VOLNO</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="icon">⚖️</span> Omezení</div>
            <span className="card-badge badge-orange">Hmotnost &amp; rozměry</span>
          </div>
          <div className="restrict-list">
            <div className="restrict-item">
              <div className="flag">🇩🇪</div>
              <div className="restrict-info">
                <div className="restrict-country">Německo</div>
                <div className="restrict-tags">
                  <span className="tag">Max 40 t</span>
                  <span className="tag">Šířka 2,55 m</span>
                  <span className="tag">Výška 4 m</span>
                  <span className="tag tag-warn">LKW-Maut povinná</span>
                </div>
              </div>
            </div>
            <div className="restrict-item">
              <div className="flag">🇦🇹</div>
              <div className="restrict-info">
                <div className="restrict-country">Rakousko</div>
                <div className="restrict-tags">
                  <span className="tag">Max 40 t</span>
                  <span className="tag">Výška 4 m</span>
                  <span className="tag tag-warn">GO-Maut povinná</span>
                  <span className="tag tag-warn">Sektorový zákaz Brenner</span>
                </div>
              </div>
            </div>
            <div className="restrict-item">
              <div className="flag">🇫🇷</div>
              <div className="restrict-info">
                <div className="restrict-country">Francie</div>
                <div className="restrict-tags">
                  <span className="tag">Max 44 t</span>
                  <span className="tag">Šířka 2,55 m</span>
                  <span className="tag tag-warn">Vignette Crit&apos;Air</span>
                </div>
              </div>
            </div>
            <div className="restrict-item">
              <div className="flag">🇵🇱</div>
              <div className="restrict-info">
                <div className="restrict-country">Polsko</div>
                <div className="restrict-tags">
                  <span className="tag">Max 40 t</span>
                  <span className="tag">Výška 4 m</span>
                  <span className="tag">e-TOLL povinný</span>
                </div>
              </div>
            </div>
            <div className="restrict-item">
              <div className="flag">🇨🇭</div>
              <div className="restrict-info">
                <div className="restrict-country">Švýcarsko</div>
                <div className="restrict-tags">
                  <span className="tag tag-warn">Max 40 t</span>
                  <span className="tag tag-warn">LSVA poplatek</span>
                  <span className="tag">Noční klid 22:00–05:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="card">
            <div className="card-header">
              <div className="card-title"><span className="icon">🔗</span> Rychlé odkazy</div>
            </div>
            <div className="quick-links">
              <a className="quick-link" href="/zakazy"><div className="quick-link-left"><span className="ql-icon">🚫</span> Zákazy jízd v EU</div><span className="ql-arrow">→</span></a>
              <a className="quick-link" href="/upozorneni"><div className="quick-link-left"><span className="ql-icon">⚠️</span> Uzavírky &amp; Omezení</div><span className="ql-arrow">→</span></a>
              <a className="quick-link" href="/rady"><div className="quick-link-left"><span className="ql-icon">📋</span> Rady &amp; Tipy</div><span className="ql-arrow">→</span></a>
              <a className="quick-link" href="/rady"><div className="quick-link-left"><span className="ql-icon">📞</span> Tísňová čísla EU</div><span className="ql-arrow">→</span></a>
              <a className="quick-link" href="/zeme"><div className="quick-link-left"><span className="ql-icon">🌍</span> Státy EU</div><span className="ql-arrow">→</span></a>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title"><span className="icon">🚧</span> Uzavírky DE</div>
              <span className="card-badge badge-blue">{roadworks.length > 0 ? "Live DB" : "API"}</span>
            </div>
            <div className="news-list">
              {roadworks.length > 0 ? (
                roadworks.map((rw) => (
                  <div className="news-item" key={rw.identifier}>
                    <div className="news-meta">
                      <span className="news-flag">🇩🇪</span>
                      <span className="news-time">{rw.autobahn} · {rw.type === "closure" ? "Uzavírka" : "Práce"}</span>
                    </div>
                    <div className="news-title">{rw.title_cs}</div>
                    {rw.description_cs && (
                      <div className="news-excerpt">{rw.description_cs.split("\n")[0]}</div>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <div className="news-item">
                    <div className="news-meta"><span className="news-flag">🇩🇪</span><span className="news-time">autobahn.de</span></div>
                    <div className="news-title">Data se načítají po prvním sync</div>
                    <div className="news-excerpt">Zavolej /api/sync-roadworks pro první synchronizaci</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="icon">💡</span> Rady řidičům</div>
            <span className="card-badge badge-green">Aktuální</span>
          </div>
          <div className="tips-list">
            <div className="tip-item">
              <div className="tip-num">01</div>
              <div className="tip-content">
                <div className="tip-cat">Dokumenty</div>
                <div className="tip-title">Co musíš mít vždy u sebe v EU</div>
                <div className="tip-text">Řidičský průkaz, profesní průkaz (CPC), CMR, osvědčení o vozidle, pojistka a kabotážní povolení pokud je potřeba.</div>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-num">02</div>
              <div className="tip-content">
                <div className="tip-cat">Digitální tachograf</div>
                <div className="tip-title">Povinné přestávky a doby řízení</div>
                <div className="tip-text">Max 4,5 h řízení, pak 45 min přestávka. Denní limit 9 h (2× týdně 10 h). Týdenní max 56 h.</div>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-num">03</div>
              <div className="tip-content">
                <div className="tip-cat">Švýcarsko</div>
                <div className="tip-title">Pozor na LSVA – výpočet poplatku</div>
                <div className="tip-text">Poplatek závisí na hmotnosti, ujetých km a emisní třídě. Nezapomeň se přihlásit před vstupem.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="icon">🌍</span> Státy EU</div>
            <span className="card-badge badge-orange">27 zemí</span>
          </div>
          <div className="country-grid">
            {[
              ["🇨🇿","Česko"],["🇩🇪","Německo"],["🇦🇹","Rakousko"],["🇫🇷","Francie"],
              ["🇵🇱","Polsko"],["🇮🇹","Itálie"],["🇪🇸","Španělsko"],["🇸🇰","Slovensko"],
              ["🇭🇺","Maďarsko"],["🇷🇴","Rumunsko"],["🇧🇬","Bulharsko"],["🇳🇱","Holandsko"],
              ["🇧🇪","Belgie"],["🇨🇭","Švýcarsko"],["🇸🇮","Slovinsko"],["🇭🇷","Chorvatsko"],
            ].map(([flag, name]) => (
              <a key={name} className="country-btn" href={`/zeme/${name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`}>
                <span className="country-flag">{flag}</span>
                <span className="country-name">{name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer>
        <div>© 2025 TruckEU · Zdarma pro všechny řidiče</div>
        <div style={{display:"flex",gap:"16px"}}>
          <a href="#">O portálu</a>
          <a href="#">Nahlásit chybu</a>
          <a href="#">Přidat info</a>
          <a href="#">Kontakt</a>
        </div>
        <div style={{fontFamily:"var(--font-mono)",color:"var(--muted)"}}>Poslední aktualizace: dnes 08:42</div>
      </footer>
    </>
  );
}
