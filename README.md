# Hojsin Web 🌐

Repozitář pro správu dvou webových stránek - **hojsin.cz** a **penzionsborovna.cz** - postavených na Nette frameworku s multidoménovou architekturou a moderním build systémem.

## 🎯 Účel projektu

Tento projekt spravuje:
- **hojsin.cz** - informace o obci Hojsín (modrý design #00aaff)
- **penzionsborovna.cz** - informace o ubytování v penzionu (zelený design #059669)

## 🏗️ Technologie

- **Framework**: Nette 3.3.1
- **Template Engine**: Latte
- **PHP**: 8.x
- **Frontend**: Vanilla CSS/JS s PostCSS processing
- **Build System**: Webpack 4 + PostCSS
- **Development**: Browser-sync pro auto-reload
- **Routing**: Nette Router s multidoménovou podporou

## 🚀 Quick Start

```bash
# Instalace závislostí
npm install

# Development oba weby současně s auto-reload
npm run dev:all

# Production build obou webů
npm run build:all
```

**Development URLs:**
- **Hojšín**: http://localhost:3430 (+ Admin UI: localhost:3432)
- **Penzion**: http://localhost:3431 (+ Admin UI: localhost:3433)

## 📋 NPM Scripts

### 🔧 Development (s auto-reload)
```bash
npm run dev:all         # 🔥 OBA weby současně (doporučeno)
npm run dev:hojsin      # Pouze hojsin.cz
npm run dev:penzion     # Pouze penzionsborovna.cz
npm run dev:both        # Jen hojsin.cz (watch + browser-sync)
```

### 🏗️ Build (production)
```bash
npm run build:all       # 🔥 Build obou webů současně
npm run build           # Obecný build (všechno)
npm run build:hojsin    # Pouze hojsin.cz
npm run build:penzion   # Pouze penzionsborovna.cz
```

### 👀 Watch pouze (bez browser-sync)
```bash
npm run watch:all       # Webpack watch pro oba weby
npm run watch:hojsin    # Pouze hojsin.cz
npm run watch:penzion   # Pouze penzionsborovna.cz
```

## 🌐 Port Configuration

| Služba | Hojšín | Penzion |
|--------|--------|---------|
| **Web** | localhost:3430 | localhost:3431 |
| **Admin UI** | localhost:3432 | localhost:3433 |
| **Apache Local** | hojsin.cz.local | penzionsborovna.cz.local |

## 📁 Multidoménová struktura

Každá doména má svůj vlastní **namespace, presentery, layouty a assety**:

```
app/Presentation/
├── hojsin.cz/                    # Modrý design (#00aaff)
│   ├── @layout.latte            # Layout specifický pro hojsin.cz
│   └── Page/
│       ├── PagePresenter.php    # Namespace: HojsinCz
│       └── templates/
│           ├── default.latte    # Domovská stránka
│           ├── informace.latte  # Informace o obci
│           └── kontakt.latte    # Kontaktní údaje
│
└── penzionsborovna.cz/          # Zelený design (#059669)
    ├── @layout.latte           # Layout specifický pro penzionu
    └── Page/
        ├── PagePresenter.php   # Namespace: PenzionsBorovna
        └── templates/
            ├── default.latte   # Úvodní stránka penzionu
            ├── pokoje.latte    # Přehled pokojů
            └── kontakt.latte   # Kontakt na penzion
```

## 🎨 Asset Pipeline

### Source → Build proces
```
assets/[site]/           →    www/assets/[site]/
├── default.js          →    ├── script.js (minified)
├── styles/             →    ├── style.css (processed)
│   ├── main.css        →    │
│   └── components/     →    │
├── images/             →    ├── images/ (optimized)
└── fonts/              →    └── fonts/
```

### 🛠️ PostCSS Features
- **postcss-nested**: Vnořené CSS selektory
- **autoprefixer**: Automatické vendor prefixy
- **pxtorem**: Konverze px → rem
- **cssnano**: Minifikace v production

### Build Output
```
www/assets/
├── hojsin.cz/
│   ├── style.css        # ~517KB (processed)
│   ├── script.js        # ~126KB (bundled)
│   ├── images/          # Optimized images
│   └── fonts/
└── penzionsborovna.cz/
    ├── style.css        # ~504KB (processed)
    ├── script.js        # ~126KB (bundled)
    ├── images/
    └── fonts/
```

## 🔄 Development Workflow

### 1. Spuštění development serveru
```bash
npm run dev:all
```

**Co se spustí:**
- ✅ **2x Webpack watch** - monitoruje změny v assets/
- ✅ **2x Browser-sync** - proxy + auto-reload
- ✅ **File watching** - PHP, Latte, CSS, JS soubory

### 2. Auto-reload při změnách
- **PHP/Latte soubory** → okamžitý reload stránky
- **CSS soubory** → hot injection (bez refreshe)
- **JS soubory** → rebuild + reload
- **Images/fonts** → kopírování + reload

### 3. Multi-device testing
Browser-sync automaticky:
- Synchronizuje scrollování napříč zařízeními
- Synchronizuje kliky a formuláře
- Zobrazuje QR kód pro mobilní testování

## 🏠 Lokální prostředí

### Apache Virtual Hosts
Projekt běží na Apache s virtual hosts:

- **hojsin.cz**: http://hojsin.cz.local
- **penzionsborovna.cz**: http://penzionsborovna.cz.local

### Konfigurace (/etc/hosts)
```
127.0.0.1 hojsin.cz.local
127.0.0.1 penzionsborovna.cz.local
```

### Apache konfigurace
```bash
# Umístění konfiguračních souborů:
/etc/apache2/sites-available/hojsin.cz.local.conf
/etc/apache2/sites-available/penzionsborovna.cz.local.conf

# Oba směřují na:
DocumentRoot /c/work/projects/hojsin-web/www
```

## ✍️ Jak psát nové stránky

### 1. Vytvořit šablonu
Přidej nový `.latte` soubor do odpovídající domény:

```
app/Presentation/[doména]/Page/templates/nova-stranka.latte
```

### 2. Upravit presenter
V `PagePresenter.php` pro danou doménu:

```php
public function actionNovaStranka(): void
{
    // Logika stránky (pokud potřeba)
}
```

### 3. Přidat do navigace
Upravit `@layout.latte` v příslušné doméně:

```html
<nav>
    <a n:href="Page:default">Domů</a>
    <a n:href="Page:novaStranka">Nová stránka</a>
</nav>
```

### 4. Styly a skripty
Přidej CSS/JS do:
```
assets/[doména]/styles/components/nova-stranka.css
assets/[doména]/scripts/nova-stranka.js
```

## ⚠️ Kritické technické poznámky

### Layout systém
**DŮLEŽITÉ**: Při použití `setFile()` v presenteru musí být `setLayout()` voláno PŘED `setFile()`:

```php
// ✅ SPRÁVNĚ
$this->setLayout(__DIR__ . '/../@layout.latte');
$this->template->setFile($templateFile);

// ❌ ŠPATNĚ - layout se ignoruje
$this->template->setFile($templateFile);
```

### Asset odkazy
V layoutech používej `{$basePath}` místo `n:href` pro statické soubory:

```html
<!-- ✅ SPRÁVNĚ -->
<link rel="stylesheet" href="{$basePath}/assets/hojsin.cz/style.css">

<!-- ❌ ŠPATNĚ -->
<link rel="stylesheet" n:href="assets/hojsin.cz/style.css">
```

### Production deployment
Před nahráním na server vždy spusť:
```bash
npm run build:all
```

## 🧪 Testování

### Ruční testování
```bash
# Testování přes fetch/curl
curl http://hojsin.cz.local/informace
curl http://penzionsborovna.cz.local/pokoje

# Testování buildu
npm run build:all && echo "Build successful"
```

### Browser testing
1. Spusť `npm run dev:all`
2. Otevři localhost:3430 a localhost:3431
3. Otevři na mobilu přes QR kód (Browser-sync UI)
4. Testuj synchronizaci mezi zařízeními

## 🔧 Troubleshooting

### Port conflicts
Pokud jsou porty obsazené:
```bash
# Zkontroluj co běží na portech
lsof -i :3430
lsof -i :3431

# Zabiј procesy pokud potřeba
killall node
```

### Webpack errors
```bash
# Vymaž node_modules a přeinstaluj
rm -rf node_modules package-lock.json
npm install

# Zkontroluj syntaxi v assets/
npm run build:all
```

### Apache nefunguje
```bash
# Zkontroluj virtual hosts
sudo apache2ctl configtest
sudo systemctl restart apache2

# Zkontroluj /etc/hosts
cat /etc/hosts | grep local
```

## 📝 Historie změn

Detailní changelog je v `changelogs/changelog-2025-07.md`. Klíčové milníky:

- **07/2025**: Webpack build systém + PostCSS processing
- **07/2025**: Browser-sync s auto-reload
- **07/2025**: Kompletní multidoménová separace assetů
- **07/2025**: Layout system fix + asset odkazy
- **07/2025**: Apache virtual hosts setup

## 🤝 Development Guidelines

1. **Vždy testuj oba weby** před commitem
2. **Respektuj barevné schéma** (modrá vs. zelená)
3. **Používej `npm run dev:all`** pro development
4. **Build před deploymentem**: `npm run build:all`
5. **Asset organizace**: každá doména má své assety

## 📚 Užitečné odkazy

- **Nette dokumentace**: https://doc.nette.org/
- **Latte template engine**: https://latte.nette.org/
- **Browser-sync docs**: https://browsersync.io/docs
- **PostCSS plugins**: https://postcss.org/

---

*Vytvořeno s ❤️ pomocí Nette frameworku, Webpack a Browser-sync* 💙💚