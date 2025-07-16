#!/bin/bash

# Hojsin Weby Deployment Script
# Deploy to altisima-central-server:/altisima/public-apache-webs/hojsin.cz

set -e  # Exit on any error

# Configuration
LOCAL_PROJECT_PATH="/c/work/projects/hojsin-web"
REMOTE_SERVER="devel.altisima.cz"
REMOTE_PORT="10022"
REMOTE_USER="jarda"
REMOTE_PATH="/altisima/public-apache-webs/hojsin.cz"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[DEPLOY]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Step 1: Verify local project
log "Checking local project structure..."
if [ ! -d "$LOCAL_PROJECT_PATH" ]; then
    error "Project directory not found: $LOCAL_PROJECT_PATH"
    exit 1
fi

cd "$LOCAL_PROJECT_PATH"

# Check git status
if [ -d ".git" ]; then
    if [ -n "$(git status --porcelain)" ]; then
        warn "Working directory is not clean. Consider committing changes first."
        read -p "Continue anyway? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
fi

# Step 2: Install dependencies
log "Installing/updating dependencies..."
if [ ! -d "vendor" ] || [ "composer.json" -nt "vendor/autoload.php" ]; then
    log "Installing Composer dependencies..."
    composer install --no-dev --optimize-autoloader
else
    info "Composer dependencies up to date"
fi

if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
    log "Installing NPM dependencies..."
    npm install
else
    info "NPM dependencies up to date"
fi

# Step 3: Build assets
log "Building assets for both domains..."
npm run build

# Step 4: Prepare deployment
log "Preparing deployment package..."

# Create temporary deployment directory
DEPLOY_DIR="/tmp/hojsin-deploy-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEPLOY_DIR"

info "Deployment directory: $DEPLOY_DIR"

# Copy necessary files
log "Copying files to deployment directory..."

# Core application files
cp -r app/ "$DEPLOY_DIR/"
cp -r config/ "$DEPLOY_DIR/"
cp -r vendor/ "$DEPLOY_DIR/"
cp -r www/ "$DEPLOY_DIR/"

# Copy configuration files
cp composer.json "$DEPLOY_DIR/"
cp composer.lock "$DEPLOY_DIR/"

# Copy .htaccess files
if [ -f ".htaccess" ]; then
    cp .htaccess "$DEPLOY_DIR/"
fi

if [ -f "www/.htaccess" ]; then
    cp www/.htaccess "$DEPLOY_DIR/www/"
fi

# Step 5: Create production config
log "Creating production configuration..."

# Create production config
cat > "$DEPLOY_DIR/config/local.neon" << 'EOF'
parameters:
    debugMode: false
    productionMode: true

application:
    catchExceptions: true
    errorPresenter: Error

services:
    - App\Core\RouterFactory::createRouter
EOF

# Step 6: Create backup on server
log "Creating backup on server..."
ssh -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_SERVER" "
    if [ -d '$REMOTE_PATH' ]; then
        sudo cp -r '$REMOTE_PATH' '$REMOTE_PATH.backup.$(date +%Y%m%d-%H%M%S)'
        echo 'Backup created'
    else
        echo 'No existing deployment found, skipping backup'
    fi
"

# Step 7: Deploy to server
log "Deploying to server..."

# Ensure target directory exists
ssh -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_SERVER" "
    sudo mkdir -p '$REMOTE_PATH'
    sudo chown $REMOTE_USER:$REMOTE_USER '$REMOTE_PATH'
"

# Sync files using rsync
rsync -avz --delete-after \
    -e "ssh -p $REMOTE_PORT" \
    "$DEPLOY_DIR/" \
    "$REMOTE_USER@$REMOTE_SERVER:$REMOTE_PATH/"

# Set proper permissions
ssh -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_SERVER" "
    sudo chown -R www-data:www-data '$REMOTE_PATH'
    sudo find '$REMOTE_PATH' -type f -exec chmod 644 {} \;
    sudo find '$REMOTE_PATH' -type d -exec chmod 755 {} \;
    sudo chmod -R 777 '$REMOTE_PATH/temp' '$REMOTE_PATH/log' 2>/dev/null || true
"

# Step 8: Test deployment
log "Testing deployment..."

# Test both domains
TEST_URLS=(
    "http://hojsin.cz.public.altisima.cz"
    "http://penzionsborovna.cz.public.altisima.cz"
)

for url in "${TEST_URLS[@]}"; do
    info "Testing: $url"
    if curl -s --connect-timeout 10 --max-time 30 "$url" > /dev/null; then
        log "✓ $url is responding"
    else
        error "✗ $url is not responding"
        warn "Deployment may have issues"
    fi
done

# Step 9: Cleanup
log "Cleaning up..."
rm -rf "$DEPLOY_DIR"

# Step 10: Success message
log "🚀 Deployment completed successfully!"
echo
echo "Deployed websites:"
echo "  • http://hojsin.cz.public.altisima.cz"
echo "  • http://penzionsborovna.cz.public.altisima.cz"
echo
echo "Files deployed to: $REMOTE_PATH"
echo "Backup location: $REMOTE_PATH.backup.$(date +%Y%m%d-%H%M%S)"
