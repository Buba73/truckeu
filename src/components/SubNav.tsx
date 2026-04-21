export default function SubNav({ active }: { active: string }) {
  const links = [
    { href: "/", label: "Přehled" },
    { href: "/zakazy", label: "Zákazy jízd" },
    { href: "/kalkulacka", label: "Kalkulačka" },
    { href: "/upozorneni", label: "Omezení & Uzavírky" },
    { href: "/rady", label: "Rady & Tipy" },
    { href: "/zeme", label: "Státy EU" },
  ];

  return (
    <header>
      <a className="logo" href="/">TRUCK<span>EU</span></a>
      <nav>
        {links.map((l) => (
          <a key={l.href} href={l.href} className={active === l.href ? "active" : ""}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="header-right">
        <div className="live-badge"><div className="live-dot"></div>LIVE</div>
      </div>
    </header>
  );
}
