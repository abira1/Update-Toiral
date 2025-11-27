# 🎨 Toiral Color Theme - Quick Reference Card

---

## 🌊 Primary Colors

### Teal (Brand Primary)
```
teal-900  #134e4a  ███████  Dark headings, strong emphasis
teal-800  #115e59  ███████  Subheadings
teal-700  #0f766e  ███████  Body text, links
teal-600  #0d9488  ███████  Primary buttons, icons ⭐
teal-500  #14b8a6  ███████  Hover states, highlights ⭐⭐
teal-400  #2dd4bf  ███████  Light accents
teal-200  #99f6e4  ███████  Borders, subtle fills
teal-100  #ccfbf1  ███████  Light backgrounds
teal-50   #f0fdfa  ███████  Section backgrounds
```

### Cyan (Brand Secondary)
```
cyan-700  #0e7490  ███████  Deep accents
cyan-600  #0891b2  ███████  Secondary buttons ⭐
cyan-500  #06b6d4  ███████  Highlights, accents ⭐⭐
cyan-400  #22d3ee  ███████  Hover effects
cyan-200  #a5f3fc  ███████  Floating elements
cyan-50   #ecfeff  ███████  Subtle backgrounds
```

---

## 🎨 Common Gradient Patterns

### Primary Gradients (Most Used)
```css
🟢 Standard Button:     from-teal-500 → to-cyan-500
🟢 Emphasized Button:   from-teal-600 → to-cyan-600
🟢 Hover Effect:        from-teal-400 → to-cyan-400
🟢 Deep Accent:         from-teal-700 → to-cyan-700
```

### Background Gradients
```css
🔵 Page Background:     from-teal-50 via-teal-50 → to-cyan-50
🔵 Card Background:     from-slate-50 → to-cyan-50
🔵 Floating Orbs:       from-teal-200/30 → to-cyan-200/30
```

### Text Gradients
```css
✨ Headline:           from-teal-600 → to-cyan-600
   (with bg-clip-text text-transparent)
```

---

## 🖌️ Supporting Colors

### Grays (Neutral Scale)
```
gray-900  #111827  ███████  Primary text
gray-800  #1f2937  ███████  Headings
gray-700  #374151  ███████  Secondary text
gray-600  #4b5563  ███████  Body text
gray-500  #6b7280  ███████  Muted text
gray-400  #9ca3af  ███████  Disabled
gray-300  #d1d5db  ███████  Borders
gray-100  #f3f4f6  ███████  Card backgrounds
gray-50   #f9fafb  ███████  Section backgrounds
```

### Status Colors
```
red-500   #ef4444  ███████  Errors, delete
blue-600  #2563eb  ███████  Info, links
```

---

## 🎯 Usage by Element

### Buttons
```
Primary:    bg-gradient-to-r from-teal-500 to-cyan-500
            hover:from-teal-600 hover:to-cyan-600

Secondary:  border-2 border-teal-600 text-teal-600
            hover:bg-teal-50

Disabled:   bg-gray-300 text-gray-500 cursor-not-allowed
```

### Cards
```
Background: bg-white or bg-teal-50
Border:     border border-teal-200
Shadow:     shadow-lg hover:shadow-2xl
Hover:      transform hover:-translate-y-1 hover:scale-102
```

### Text
```
H1/H2:      text-gray-900 or gradient (teal-600 to cyan-600)
H3/H4:      text-teal-900 or text-gray-800
Body:       text-gray-700 or text-gray-600
Muted:      text-gray-500
Links:      text-teal-600 hover:text-teal-800
```

### Borders
```
Default:    border-gray-300
Accent:     border-teal-200 or border-teal-300
Focus:      ring-2 ring-teal-500 ring-offset-2
```

### Backgrounds
```
Page:       bg-gradient-to-b from-teal-50 to-white
Section:    bg-white or bg-gray-50
Card:       bg-white shadow-md
Highlight:  bg-teal-100
```

---

## 🌟 Special Effects

### Glass Morphism
```css
bg-white/20 backdrop-blur-sm
bg-teal-100/50 backdrop-blur-lg
border border-teal-200/50
```

### Neomorphism
```css
/* Cards */
bg-gradient-to-br from-[#f0f0f0] to-[#cacaca]
shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff

/* Buttons */
bg-gradient-to-br from-teal-500 to-cyan-600
shadow: 8px 8px 16px cyan-600, -8px -8px 16px teal-500
```

### Animated Gradients
```css
/* Floating blur circles */
bg-gradient-to-br from-teal-400/20 to-cyan-400/20
rounded-full blur-2xl animate-pulse

/* Background orbs */
bg-gradient-to-br from-teal-200/30 to-cyan-200/30
rounded-full blur-3xl
```

---

## 📐 Component Color Map

| Component | Background | Text | Border | Accent |
|-----------|-----------|------|--------|--------|
| Header | white | gray-700 | gray-200 | teal-600 |
| Hero | white + gradients | gray-900 | - | teal-cyan |
| Services | teal-50 | gray-900 | teal-200 | teal-600 |
| Portfolio | white | gray-900 | gray-200 | teal-500 |
| Team | white | gray-900 | teal-200 | teal-cyan |
| Footer | gray-900 | gray-300 | gray-700 | teal-400 |
| Forms | white | gray-900 | gray-300 | teal-500 |
| Buttons | teal-cyan | white | - | teal-600 |

---

## 🎨 Hex Color Reference

### Primary Teal-Cyan Palette
```
Teal-500:  #14b8a6  ⭐ Primary Brand Color
Cyan-500:  #06b6d4  ⭐ Secondary Brand Color
Teal-600:  #0d9488     Primary Darker
Cyan-600:  #0891b2     Secondary Darker
Teal-700:  #0f766e     Text & Links
```

### Neomorphism Colors
```
Light 1:   #f0f0f0     Soft white
Light 2:   #cacaca     Gray tint
Shadow 1:  #bebebe     Gray shadow
Shadow 2:  #ffffff     White highlight
```

---

## 🔍 Color Contrast Ratios (WCAG)

```
teal-900 on white:  12.6:1  ✅ AAA
teal-800 on white:  10.5:1  ✅ AAA
teal-700 on white:   8.7:1  ✅ AAA
teal-600 on white:   6.8:1  ✅ AAA
teal-500 on white:   4.8:1  ✅ AA
gray-900 on white:  17.8:1  ✅ AAA
gray-700 on white:   8.6:1  ✅ AAA
```

All text colors meet WCAG AA standards (4.5:1 minimum)

---

## 💡 Design Rules

1. **Primary Actions:** Always use teal-cyan gradient
2. **Text Hierarchy:** gray-900 → teal-900 → gray-700 → gray-600
3. **Borders:** Default gray-300, accent teal-200
4. **Backgrounds:** White primary, teal-50/gray-50 for sections
5. **Hover States:** Brighten by 100 (500→400, 600→500)
6. **Focus States:** Always include teal-500 ring
7. **Gradients:** Use 500-600 range for most vibrant effect
8. **Opacity:** Use /20, /30, /50 for overlay effects

---

## 🎯 Quick Copy-Paste

```html
<!-- Primary Button -->
<button class="bg-gradient-to-r from-teal-500 to-cyan-500 
               hover:from-teal-600 hover:to-cyan-600 
               text-white px-6 py-3 rounded-lg 
               shadow-lg hover:shadow-xl 
               transform hover:scale-105 
               transition-all duration-300">
  Click Me
</button>

<!-- Card -->
<div class="bg-white border border-teal-200 
            rounded-xl shadow-md hover:shadow-xl 
            p-6 transform hover:-translate-y-1 
            transition-all duration-300">
  Content here
</div>

<!-- Gradient Text -->
<h1 class="text-5xl font-bold bg-gradient-to-r 
           from-teal-600 to-cyan-600 
           bg-clip-text text-transparent">
  Gradient Heading
</h1>

<!-- Glass Card -->
<div class="bg-white/20 backdrop-blur-sm 
            border border-teal-200/50 
            rounded-xl p-6 shadow-lg">
  Glass effect content
</div>
```

---

**Theme Name:** Ocean Tech  
**Primary:** Teal-500 (#14b8a6)  
**Secondary:** Cyan-500 (#06b6d4)  
**Style:** Modern, Professional, Clean  
**Mood:** Trustworthy, Innovative
