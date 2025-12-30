#!/bin/bash

# BeyondChats Assignment - Quick Deployment Check
# This script helps verify your project is ready for deployment

echo "🚀 BeyondChats Assignment - Deployment Readiness Check"
echo "======================================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

echo ""
echo "📂 Checking project structure..."

# Check backend
if [ -d "backend" ]; then
    echo -e "${GREEN}✓${NC} backend/ directory exists"
    if [ -f "backend/server.js" ]; then
        echo -e "${GREEN}✓${NC} backend/server.js exists"
    else
        echo -e "${RED}✗${NC} backend/server.js not found"
    fi
    if [ -f "backend/package.json" ]; then
        echo -e "${GREEN}✓${NC} backend/package.json exists"
    else
        echo -e "${RED}✗${NC} backend/package.json not found"
    fi
else
    echo -e "${RED}✗${NC} backend/ directory not found"
fi

# Check frontend
if [ -d "frontend" ]; then
    echo -e "${GREEN}✓${NC} frontend/ directory exists"
    if [ -f "frontend/package.json" ]; then
        echo -e "${GREEN}✓${NC} frontend/package.json exists"
    else
        echo -e "${RED}✗${NC} frontend/package.json not found"
    fi
    if [ -d "frontend/src" ]; then
        echo -e "${GREEN}✓${NC} frontend/src/ directory exists"
    else
        echo -e "${RED}✗${NC} frontend/src/ directory not found"
    fi
else
    echo -e "${RED}✗${NC} frontend/ directory not found"
fi

# Check script
if [ -d "script" ]; then
    echo -e "${GREEN}✓${NC} script/ directory exists"
    if [ -f "script/scrape.js" ]; then
        echo -e "${GREEN}✓${NC} script/scrape.js exists"
    else
        echo -e "${RED}✗${NC} script/scrape.js not found"
    fi
    if [ -f "script/rewriteArticles.js" ]; then
        echo -e "${GREEN}✓${NC} script/rewriteArticles.js exists"
    else
        echo -e "${RED}✗${NC} script/rewriteArticles.js not found"
    fi
else
    echo -e "${RED}✗${NC} script/ directory not found"
fi

# Check documentation
echo ""
echo "📄 Checking documentation..."
if [ -f "README.md" ]; then
    echo -e "${GREEN}✓${NC} README.md exists"
else
    echo -e "${RED}✗${NC} README.md not found"
fi

if [ -f ".env.example" ]; then
    echo -e "${GREEN}✓${NC} .env.example exists"
else
    echo -e "${YELLOW}⚠${NC} .env.example not found (recommended)"
fi

if [ -f "DEPLOYMENT.md" ]; then
    echo -e "${GREEN}✓${NC} DEPLOYMENT.md exists"
else
    echo -e "${YELLOW}⚠${NC} DEPLOYMENT.md not found (recommended)"
fi

# Check .env file
echo ""
echo "🔐 Checking environment configuration..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    
    # Check for required variables
    if grep -q "DATABASE_URL" .env; then
        echo -e "${GREEN}✓${NC} DATABASE_URL configured"
    else
        echo -e "${YELLOW}⚠${NC} DATABASE_URL not found in .env"
    fi
    
    if grep -q "GOOGLE_API_KEY" .env; then
        echo -e "${GREEN}✓${NC} GOOGLE_API_KEY configured"
    else
        echo -e "${YELLOW}⚠${NC} GOOGLE_API_KEY not found in .env"
    fi
    
    if grep -q "LLM_API_KEY" .env; then
        echo -e "${GREEN}✓${NC} LLM_API_KEY configured"
    else
        echo -e "${YELLOW}⚠${NC} LLM_API_KEY not found in .env"
    fi
else
    echo -e "${YELLOW}⚠${NC} .env file not found (needed for local testing)"
    echo "   Create one using: cp .env.example .env"
fi

# Check git
echo ""
echo "🔄 Checking Git status..."
if command -v git &> /dev/null; then
    if git rev-parse --git-dir > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Git repository initialized"
        
        # Check for uncommitted changes
        if git diff-index --quiet HEAD --; then
            echo -e "${GREEN}✓${NC} No uncommitted changes"
        else
            echo -e "${YELLOW}⚠${NC} You have uncommitted changes"
            echo "   Run: git add . && git commit -m 'your message'"
        fi
        
        # Check remote
        if git remote -v | grep -q "origin"; then
            echo -e "${GREEN}✓${NC} Remote repository configured"
        else
            echo -e "${YELLOW}⚠${NC} No remote repository configured"
        fi
    else
        echo -e "${RED}✗${NC} Not a git repository"
    fi
else
    echo -e "${RED}✗${NC} Git not installed"
fi

echo ""
echo "======================================================"
echo "📋 Deployment Checklist:"
echo ""
echo "1. ☐ Create MongoDB Atlas database"
echo "2. ☐ Get Google Custom Search API key"
echo "3. ☐ Get LLM API key (Gemini/OpenAI)"
echo "4. ☐ Deploy backend to Render"
echo "5. ☐ Deploy frontend to Vercel"
echo "6. ☐ Update README with live URLs"
echo "7. ☐ Test deployed application"
echo "8. ☐ Submit repository link"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🎉 Your project structure looks good!"
echo "   Ready to deploy! Follow DEPLOYMENT.md"
echo ""
