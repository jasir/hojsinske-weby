#!/bin/bash

# Script pro opravu permissí cache adresáře v Nette aplikaci
# Používej: ./fix-permission.sh

echo "🔧 Opravuji permisse cache adresáře..."

# Smaž obsah cache adresáře
echo "🗑️  Mažu obsah cache..."
if [ -d "temp/cache" ]; then
    rm -rf temp/cache/*
    echo "✅ Cache obsah smazán"
else
    echo "⚠️  Cache adresář neexistuje, vytvářím..."
fi

# Vytvoř temp a cache adresáře s správnými permissemi
echo "📁 Vytvářím adresáře s správnými permissemi..."
mkdir -p temp/cache
mkdir -p temp/sessions
mkdir -p log

# Nastavení permissí - 755 pro adresáře je bezpečnější než 777
echo "🔒 Nastavuji permisse..."
chmod -R 755 temp/
chmod -R 755 log/

# Ujisti se, že web server může zapisovat do temp a log
chmod -R 775 temp/
chmod -R 775 log/

# Nastavení vlastníka pro Apache (www-data)
echo "👤 Nastavuji vlastníka adresářů pro Apache..."
sudo chown -R www-data:www-data temp/ log/ 2>/dev/null || {
    echo "⚠️  Nelze změnit vlastníka na www-data, zkouším nastavit skupinu..."
    sudo chgrp -R www-data temp/ log/ 2>/dev/null || {
        echo "⚠️  Nelze změnit skupinu, nastavuji permission 777..."
        chmod -R 777 temp/ log/
    }
}

echo "✅ Permisse opraveny!"
echo "📝 Struktura:"
ls -la temp/
echo ""
echo "🚀 Můžeš nyní spustit aplikaci" 