export function renderLogoMark(name: string, _type?: "client" | "partner") {
  if (name === "Logo 1") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="20 4 36 13 36 27 20 36 4 27 4 13" />
        <circle cx="20" cy="20" r="5" fill="currentColor" fillOpacity="0.25" />
        <line x1="20" y1="4" x2="20" y2="15" />
        <line x1="20" y1="25" x2="20" y2="36" />
      </svg>
    );
  }
  if (name === "Logo 2") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="16" cy="20" r="11" />
        <circle cx="24" cy="20" r="11" strokeDasharray="3 3" />
        <circle cx="20" cy="20" r="4" fill="currentColor" fillOpacity="0.3" />
      </svg>
    );
  }
  if (name === "Logo 3") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="20 3 37 20 20 37 3 20" />
        <polyline points="15 20 20 15 25 20" />
        <polyline points="15 25 20 20 25 25" />
      </svg>
    );
  }
  if (name === "Logo 4") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="7" width="30" height="26" rx="6" />
        <line x1="5" y1="16" x2="35" y2="16" />
        <circle cx="12" cy="25" r="2.5" fill="currentColor" />
        <line x1="18" y1="25" x2="28" y2="25" />
      </svg>
    );
  }
  if (name === "Logo 5") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4L34 9V20C34 28 28 34 20 37C12 34 6 28 6 20V9L20 4Z" />
        <polygon points="20 12 22 17 27 17 23 20 25 25 20 22 15 25 17 20 13 17 18 17" fill="currentColor" fillOpacity="0.25" />
      </svg>
    );
  }
  if (name === "RuPay") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="10 8 26 8 20 32 4 32" fill="currentColor" fillOpacity="0.15" />
        <polygon points="22 8 36 8 30 32 16 32" stroke="var(--orange)" />
      </svg>
    );
  }
  if (name === "Visa") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="10" width="32" height="20" rx="4" />
        <path d="M12 25L15 15H18L15 25H12Z" fill="currentColor" fillOpacity="0.3" />
        <path d="M21 15L19 25H22L24 15H21Z" />
        <path d="M25 15L27 25H30L32 15" />
      </svg>
    );
  }
  if (name === "Mastercard") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="15" cy="20" r="10" fill="currentColor" fillOpacity="0.2" />
        <circle cx="25" cy="20" r="10" stroke="var(--orange)" fill="var(--orange)" fillOpacity="0.15" />
      </svg>
    );
  }
  if (name === "American Express") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="32" height="24" rx="4" />
        <polyline points="10 24 14 16 18 24" />
        <line x1="12" y1="21" x2="16" y2="21" />
        <polyline points="22 24 22 16 26 21 30 16 30 24" stroke="var(--orange)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4L34 9V20C34 28 28 34 20 37C12 34 6 28 6 20V9L20 4Z" />
      <polyline points="14 20 18 24 26 16" stroke="var(--orange)" />
    </svg>
  );
}
