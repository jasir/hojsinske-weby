# Hojsin Web 🌐

Repozitář pro správu dvou webových stránek - **hojsin.cz** a **penzionsborovna.cz** - postavených na Nette frameworku s multidoménovou architekturou.

## 🎯 Účel projektu

Tento projekt spravuje:
- **hojsin.cz** - informace o obci Hojsín (modrý design)
- **penzionsborovna.cz** - informace o ubytování v penzionu (zelený design)

## 🏗️ Technologie

- **Framework**: Nette 3.3.1
- **Template Engine**: Latte
- **PHP**: 8.x
- **Frontend**: Vanilla CSS/JS (oddělené podle domén)
- **Routing**: Nette Router s multidoménovou podporou

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

### 🎨 Oddělené assety

```
www/assets/
├── hojsin.cz/
│   ├── style.css      # Modrý design
│   └── script.js
└── penzionsborovna.cz/
    ├── style.css      # Zelený design  
    └── script.js
```

## 🚀 Lokální vývoj

Projekt běží na Apache virtuálních hostech:

- **hojsin.cz**: http://hojsin.cz.local
- **penzionsborovna.cz**: http://penzionsborovna.cz.local

### Konfigurace (/etc/hosts)
```
127.0.0.1 hojsin.cz.local
127.0.0.1 penzionsborovna.cz.local
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

## 🧪 Testování

Pro testování funkčnosti používej fetch nebo curl na konkrétní lokální domény:

```bash
curl http://hojsin.cz.local/informace
curl http://penzionsborovna.cz.local/pokoje
```

## 📝 Historie změn

Podrobná historie vývoje a oprav multidoménové struktury je k dispozici v dokumentaci projektu. Klíčové milníky:

- **Layout system fix**: Oprava kritického problému s načítáním layoutů
- **Asset separation**: Oddělení CSS/JS souborů podle domén
- **Multidoménová architektura**: Implementace plně oddělených prezenterů a layoutů
- **Apache virtuální hosty**: Nastavení lokálního vývojového prostředí

## 🤝 Příspívání

1. Každá doména má svůj vlastní presenter a layout
2. Assety jsou oddělené podle domén
3. Respektuj barevné schéma (modrá vs. zelená)
4. Testuj na obou doménách před commitem

---

*Vytvořeno pomocí Nette frameworku s láskou k čistému kódu a oddělení zodpovědností* 💙💚 