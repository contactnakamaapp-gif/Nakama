/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakText, TweakSlider, TweakColor, TweakToggle, TweakSelect */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "quoteText": "A man dies when he is forgotten",
  "quoteAuthor": "Unknown",
  "streakDays": 12,
  "matchPercent": 94,
  "showFloatingCards": true,
  "primaryColor": "#8B0FA8",
  "goldAccent": "#F5C249",
  "heroHeadline": "Anime Crew",
  "heroSubtitle": "A social app for anime fans — match on taste, debate hot takes, and find people who actually get why that filler arc made you cry.",
  "ctaLabel": "Download APK",
  "apkSize": "23 MB"
}/*EDITMODE-END*/;

function TweaksApp() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to the live DOM
  React.useEffect(() => {
    // Hero floating quote
    const fq = document.getElementById('floatQuoteText');
    if (fq) fq.textContent = `"${tweaks.quoteText}"`;
    const fs = document.getElementById('floatQuoteStreak');
    if (fs) fs.textContent = `🔥 ${tweaks.streakDays}-day streak`;

    // Feature card quote
    const fqt = document.getElementById('featQuoteText');
    if (fqt) fqt.textContent = tweaks.quoteText;
    const fqs = document.getElementById('featQuoteStreak');
    if (fqs) fqs.textContent = `🔥 ${tweaks.streakDays}`;

    // Match badge in phone mockup
    const mb = document.querySelector('.match-badge');
    if (mb) mb.textContent = `${tweaks.matchPercent}% match`;

    // Floating cards visibility
    const floatCards = document.querySelectorAll('.float-card, .safety-card');
    floatCards.forEach(c => { c.style.display = tweaks.showFloatingCards ? '' : 'none'; });

    // Color tokens
    document.documentElement.style.setProperty('--primary', tweaks.primaryColor);
    document.documentElement.style.setProperty('--gold', tweaks.goldAccent);

    // Hero headline + subtitle
    const headline = document.querySelector('.title-accent');
    if (headline) {
      // Preserve sparkle span
      const sparkle = headline.querySelector('.title-sparkle');
      headline.textContent = tweaks.heroHeadline;
      if (sparkle) headline.appendChild(sparkle);
    }
    const sub = document.querySelector('.hero-sub');
    if (sub) sub.textContent = tweaks.heroSubtitle;

    // CTA labels
    document.querySelectorAll('.btn-primary .btn-label').forEach(el => {
      el.textContent = tweaks.ctaLabel;
    });
    document.querySelectorAll('.btn-primary .btn-size').forEach((el, i) => {
      el.textContent = i === 0 ? tweaks.apkSize : `${tweaks.apkSize} · v1.0`;
    });
  }, [tweaks]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Daily Quote" />
      <TweakText label="Quote" value={tweaks.quoteText} onChange={(v) => setTweak('quoteText', v)} />
      <TweakSlider label="Streak days" value={tweaks.streakDays} min={1} max={365} step={1} onChange={(v) => setTweak('streakDays', v)} />

      <TweakSection label="Hero" />
      <TweakText label="Headline" value={tweaks.heroHeadline} onChange={(v) => setTweak('heroHeadline', v)} />
      <TweakText label="Subtitle" value={tweaks.heroSubtitle} onChange={(v) => setTweak('heroSubtitle', v)} />
      <TweakText label="CTA label" value={tweaks.ctaLabel} onChange={(v) => setTweak('ctaLabel', v)} />
      <TweakText label="APK size" value={tweaks.apkSize} onChange={(v) => setTweak('apkSize', v)} />

      <TweakSection label="Mockup" />
      <TweakSlider label="Match %" value={tweaks.matchPercent} min={0} max={100} step={1} unit="%" onChange={(v) => setTweak('matchPercent', v)} />
      <TweakToggle label="Floating cards" value={tweaks.showFloatingCards} onChange={(v) => setTweak('showFloatingCards', v)} />

      <TweakSection label="Colors" />
      <TweakColor label="Primary" value={tweaks.primaryColor} onChange={(v) => setTweak('primaryColor', v)} />
      <TweakColor label="Gold accent" value={tweaks.goldAccent} onChange={(v) => setTweak('goldAccent', v)} />
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<TweaksApp />);
