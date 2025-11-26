#!/bin/bash

# Sitemap Validation Script - Complete Check
# This script validates all sitemap requirements before Google Search Console submission

echo "════════════════════════════════════════════════════════"
echo "     SITEMAP VALIDATION - GOOGLE SEARCH CONSOLE READY"
echo "════════════════════════════════════════════════════════"
echo ""

ERRORS=0
WARNINGS=0

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check 1: Verify all dates are July 2025
echo -e "${BLUE}[1/8] Checking sitemap dates...${NC}"
JULY_COUNT=$(grep "2025-07-15" /app/frontend/public/sitemap*.xml | wc -l)
if [ "$JULY_COUNT" -eq 30 ]; then
    echo -e "${GREEN}✅ All 30 dates updated to July 15, 2025${NC}"
else
    echo -e "${RED}❌ Expected 30 dates with 2025-07-15, found $JULY_COUNT${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 2: Verify robots.txt is minimal (3 lines)
echo -e "${BLUE}[2/8] Checking robots.txt...${NC}"
ROBOTS_LINES=$(wc -l < /app/frontend/public/robots.txt | tr -d ' ')
if [ "$ROBOTS_LINES" -eq 2 ] || [ "$ROBOTS_LINES" -eq 3 ]; then
    echo -e "${GREEN}✅ robots.txt is minimal ($ROBOTS_LINES lines)${NC}"
    echo "   Content:"
    cat /app/frontend/public/robots.txt | sed 's/^/   │ /'
else
    echo -e "${RED}❌ robots.txt should be 2-3 lines, found $ROBOTS_LINES${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 3: Verify no fragment URLs
echo -e "${BLUE}[3/8] Checking for fragment URLs (#)...${NC}"
FRAGMENTS=$(grep "#" /app/frontend/public/sitemap*.xml 2>/dev/null | grep -v "<!--" | grep "<loc>" | wc -l || echo "0")
if [ "$FRAGMENTS" -eq 0 ]; then
    echo -e "${GREEN}✅ No fragment URLs found${NC}"
else
    echo -e "${RED}❌ Found $FRAGMENTS fragment URLs${NC}"
    grep "#" /app/frontend/public/sitemap*.xml | grep -v "<!--" | grep "<loc>"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 4: Verify total URL count
echo -e "${BLUE}[4/8] Counting total URLs...${NC}"
TOTAL_URLS=$(grep "<loc>" /app/frontend/public/sitemap.xml /app/frontend/public/sitemap-services.xml /app/frontend/public/sitemap-images.xml | wc -l)
if [ "$TOTAL_URLS" -eq 27 ]; then
    echo -e "${GREEN}✅ Exactly 27 URLs found${NC}"
    echo "   • sitemap.xml: $(grep -c "<loc>" /app/frontend/public/sitemap.xml) URLs"
    echo "   • sitemap-services.xml: $(grep -c "<loc>" /app/frontend/public/sitemap-services.xml) URLs"
    echo "   • sitemap-images.xml: $(grep -c "<loc>" /app/frontend/public/sitemap-images.xml) URLs"
else
    echo -e "${RED}❌ Expected 27 URLs, found $TOTAL_URLS${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 5: Verify all URLs use correct domain
echo -e "${BLUE}[5/8] Checking domain consistency...${NC}"
WRONG_DOMAIN=$(grep "<loc>" /app/frontend/public/sitemap*.xml | grep -v "toiral-development.web.app" | wc -l)
if [ "$WRONG_DOMAIN" -eq 0 ]; then
    echo -e "${GREEN}✅ All URLs use correct Firebase domain${NC}"
else
    echo -e "${RED}❌ Found $WRONG_DOMAIN URLs with wrong domain${NC}"
    grep "<loc>" /app/frontend/public/sitemap*.xml | grep -v "toiral-development.web.app"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 6: Validate XML structure
echo -e "${BLUE}[6/8] Validating XML structure...${NC}"
python3 << 'EOF'
import xml.etree.ElementTree as ET
import sys

files = [
    "/app/frontend/public/sitemap-index.xml",
    "/app/frontend/public/sitemap.xml",
    "/app/frontend/public/sitemap-services.xml",
    "/app/frontend/public/sitemap-images.xml"
]

all_valid = True
for file in files:
    try:
        tree = ET.parse(file)
        root = tree.getroot()
    except Exception as e:
        print(f"❌ {file.split('/')[-1]}: {str(e)}")
        all_valid = False
        
if all_valid:
    print("✅ All XML files are well-formed")
    sys.exit(0)
else:
    sys.exit(1)
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ All XML files validated successfully${NC}"
else
    echo -e "${RED}❌ XML validation failed${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 7: Verify firebase.json has XML headers
echo -e "${BLUE}[7/8] Checking firebase.json XML headers...${NC}"
if grep -q "application/xml" /app/firebase.json; then
    echo -e "${GREEN}✅ XML Content-Type header configured${NC}"
    echo "   Content-Type: application/xml; charset=utf-8"
else
    echo -e "${RED}❌ XML Content-Type header not found in firebase.json${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 8: Verify sitemap-index.xml references all sitemaps
echo -e "${BLUE}[8/8] Checking sitemap index...${NC}"
INDEX_REFS=$(grep -c "<loc>" /app/frontend/public/sitemap-index.xml)
if [ "$INDEX_REFS" -eq 3 ]; then
    echo -e "${GREEN}✅ sitemap-index.xml references all 3 child sitemaps${NC}"
    grep "<loc>" /app/frontend/public/sitemap-index.xml | sed 's/^/   │ /'
else
    echo -e "${RED}❌ sitemap-index.xml should reference 3 sitemaps, found $INDEX_REFS${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Summary
echo "════════════════════════════════════════════════════════"
echo "                    VALIDATION SUMMARY"
echo "════════════════════════════════════════════════════════"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}🎉 SUCCESS! All checks passed!${NC}"
    echo ""
    echo -e "${GREEN}✅ Ready for Google Search Console submission${NC}"
    echo ""
    echo "Next Steps:"
    echo "1. Build frontend: cd /app/frontend && yarn build"
    echo "2. Deploy to Firebase"
    echo "3. Test live XML headers: curl -I https://toiral-development.web.app/sitemap-index.xml"
    echo "4. Submit to Google Search Console: sitemap-index.xml"
    echo ""
    exit 0
else
    echo -e "${RED}❌ FAILED with $ERRORS error(s)${NC}"
    echo ""
    echo "Please fix the errors above before submitting to Google Search Console"
    echo ""
    exit 1
fi
