# Kala Jawi Design System

**Last Updated**: 2026-07-16  
**Version**: 1.0.0

---

## Identified Inconsistencies (Pre-Audit)

### ❌ Current Issues

#### 1. **Typography Scale**

- Homepage: Logo image (no h1 text)
- Game Info: `text-4xl sm:text-5xl lg:text-6xl`
- Tentang: `text-5xl sm:text-6xl lg:text-7xl`
- Kontak: `text-3xl sm:text-4xl md:text-6xl`
- **Issue**: Inconsistent heading sizes across pages

#### 2. **Spacing & Padding**

- Homepage: `px-4 sm:px-8 md:px-20 py-12 pt-28`
- Game Info: `px-4 pt-32 pb-20`
- Tentang: `pt-32 pb-24 px-4`
- Kontak: `px-4 py-6 pt-20 sm:px-8 sm:py-8 sm:pt-24 md:px-12 lg:px-16`
- **Issue**: No unified padding pattern

#### 3. **Text Colors**

- Homepage: `text-white` (on gradient bg)
- Game Info: `text-brand-dark` (on gradient bg) — low contrast!
- Tentang: `text-brand-dark` (on gradient bg)
- Kontak: `text-white` (on gradient bg)
- **Issue**: Inconsistent text color choices, contrast issues

#### 4. **Card Styles**

- Game Info: `border-brand-gold/40 bg-brand-dark/95 backdrop-blur-md` (dark cards)
- Tentang: Uses different card pattern
- Kontak: `border-white/20 bg-white/10 backdrop-blur-md` (glass cards)
- **Issue**: Different card aesthetics

#### 5. **Animation Timing**

- Homepage: `duration: 1` (1000ms)
- Game Info: `duration: 0.6` (600ms)
- Tentang: `duration: 0.7` (700ms)
- Kontak: `duration: 0.8` (800ms)
- **Issue**: No standard timing scale

#### 6. **Layout Max Width**

- Game Info: `max-w-7xl`
- Tentang: `max-w-6xl`
- Kontak: `max-w-7xl`
- **Issue**: Inconsistent container widths

---

## ✅ Standardized Design System

### 1. Typography Scale

```typescript
// Heading Scale (Caveat - Display Font)
h1: "text-5xl sm:text-6xl lg:text-7xl" // Hero pages
h2: "text-4xl sm:text-5xl lg:text-6xl" // Section headers
h3: "text-3xl sm:text-4xl lg:text-5xl" // Sub-sections
h4: "text-2xl sm:text-3xl" // Card titles
h5: "text-xl sm:text-2xl" // Small headings

// Body Scale (Inter)
body-lg: "text-lg sm:text-xl" // Lead paragraphs
body-base: "text-base sm:text-lg" // Standard text
body-sm: "text-sm" // Secondary text
```

**Rule**: All pages use same heading scale for consistency.

---

### 2. Spacing System

```typescript
// Page Padding (Unified)
px: "px-4 sm:px-8 lg:px-16" // Horizontal
pt: "pt-28 sm:pt-32" // Top (below navbar)
pb: "pb-20 sm:pb-24" // Bottom

// Container Max Width
container: "max-w-7xl mx-auto"

// Section Spacing
section-gap: "space-y-12 sm:space-y-16 lg:space-y-20"
```

**Rule**: All pages use consistent padding and container widths.

---

### 3. Color Usage

```typescript
// Text Colors (on gradient background)
heading: "text-white" // Always white for readability
body: "text-white/80" // White with 80% opacity
secondary: "text-white/60" // White with 60% opacity

// Brand Colors (for accents)
accent: "text-brand-gold"
accent-light: "text-brand-light-gold"

// Cards on Gradient Background
dark-card: "bg-brand-dark/95 border-brand-gold/40 backdrop-blur-md"
glass-card: "bg-white/10 border-white/20 backdrop-blur-md" // Use sparingly
```

**Rule**: Use white text on gradient backgrounds for maximum contrast. Never use `text-brand-dark` on `from-brand-tan to-brand-medium` gradient.

---

### 4. Card Patterns

```typescript
// Primary Card (Dark with Gold Border)
"rounded-xl border border-brand-gold/40 bg-brand-dark/95 backdrop-blur-md shadow-xl shadow-brand-gold/10 transition-all duration-300 hover:border-brand-light-gold hover:shadow-2xl hover:shadow-brand-gold/20";

// Secondary Card (Glass Effect - use only for special elements)
"rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-white/15";
```

**Rule**: Use primary (dark) cards for content. Reserve glass cards for special UI elements.

---

### 5. Animation System

```typescript
// Standard Easing
easing: [0.22, 1, 0.36, 1] // Cubic bezier - "ease-out-expo"

// Duration Scale
instant: 0.2 // 200ms - micro interactions
fast: 0.4 // 400ms - button hovers
normal: 0.6 // 600ms - DEFAULT for page elements
slow: 0.8 // 800ms - hero animations
very-slow: 1.2 // 1200ms - special entrance

// Stagger Delays
stagger: 0.1 // 100ms between children
stagger-slow: 0.15 // 150ms for slower reveals
```

**Rule**: Use `0.6s` as default animation duration with standard easing curve.

---

### 6. Layout Grid

```typescript
// Feature Grid (cards)
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8";

// Hero Layout
"grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center";

// Content Grid (text-heavy)
"grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16";
```

**Rule**: Consistent gap spacing across breakpoints.

---

### 7. Background System

```typescript
// All landing pages share:
bg: "bg-gradient-to-br from-brand-tan to-brand-medium"
batik: "opacity-30" (animated drift)
overlay-top: "bg-gradient-to-b from-black/40 via-black/10 to-transparent"
overlay-bottom: "bg-gradient-to-t from-black/40 via-black/10 to-transparent"
```

**Rule**: Unified background treatment across all pages.

---

## Implementation Checklist

### Phase 1: Typography Fix

- [ ] Game Info: Change `text-brand-dark` → `text-white`
- [ ] Tentang: Change `text-brand-dark` → `text-white`
- [ ] Kontak: Already white ✓
- [ ] Homepage: Already white ✓
- [ ] Standardize h1 sizes to `text-5xl sm:text-6xl lg:text-7xl`

### Phase 2: Spacing Fix

- [ ] Game Info: Update padding to standard
- [ ] Tentang: Update padding to standard
- [ ] Kontak: Update padding to standard
- [ ] All: Standardize container to `max-w-7xl`

### Phase 3: Animation Fix

- [ ] Game Info: Update duration to `0.6s`
- [ ] Tentang: Update duration to `0.6s`
- [ ] Kontak: Update duration to `0.6s`
- [ ] Verify all use same easing curve

### Phase 4: Card Consistency

- [ ] Kontak: Change glass cards → dark cards
- [ ] Verify all cards use primary pattern
- [ ] Ensure hover states are consistent

### Phase 5: Final Polish

- [ ] Test responsive behavior at all breakpoints
- [ ] Verify contrast ratios (WCAG AA)
- [ ] Test animations smoothness
- [ ] Cross-page navigation feels seamless

---

## Anti-Patterns to Avoid

❌ **Never** use `text-brand-dark` on gradient background (contrast fail)  
❌ **Never** mix card styles on same page  
❌ **Never** use arbitrary animation durations  
❌ **Never** use different container widths  
❌ **Never** use inconsistent padding patterns

✅ **Always** use white text on gradient backgrounds  
✅ **Always** use dark cards with gold borders  
✅ **Always** use 0.6s duration with standard easing  
✅ **Always** use max-w-7xl containers  
✅ **Always** use unified spacing system

---

## Success Metrics

- **Visual Consistency**: No jarring differences when navigating pages
- **Readability**: All text meets WCAG AA contrast (4.5:1)
- **Animation Cohesion**: Smooth, unified motion language
- **Component Reusability**: Minimal code duplication
- **Maintainability**: Easy to update design system globally

---

**Next Steps**: Implement fixes systematically across all 4 pages.
