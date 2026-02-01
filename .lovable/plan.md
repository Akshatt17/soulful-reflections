
# Plan: Harmonizing Hero Image with UI Theme

## The Issue
Your hero image has warm yellow/golden tones that feel peaceful and welcoming. However, the hero section uses `bg-muted` (a cool pink/blush: `hsl(350, 47%, 94%)`), creating a slight visual disconnect.

## Good News
Your existing color palette already includes warm colors that match the image:
- `--beige: 40 33% 93%` (warm beige with yellow undertone)
- `--background: 40 33% 93%` (same warm beige)
- `--cream: 40 33% 97%` (lighter warm cream)

## Recommended Approach: Minimal Change (Option A)

Simply change the hero section background from `bg-muted` (pink) to `bg-beige` or `bg-background` (warm beige). This single change will:
- Match the image's warm tones
- Use colors already in your design system
- Require editing only 1 line of code

**File to change:** `src/components/HeroSection.tsx`
- Line 6: Change `bg-muted` to `bg-beige` or `bg-background`

## Alternative Approaches (If More Blending Needed)

### Option B: Warm up the muted color
If you want to keep using `bg-muted` elsewhere with its pink tone but make the hero warmer, you could:
- Create a new CSS variable like `--muted-warm: 35 40% 94%` (warm cream)
- Use it only in the hero section

### Option C: Add a subtle overlay to the image
Add a very light warm overlay to the image container to unify tones:
```css
/* Optional: warm overlay on image */
.hero-image-container::before {
  background: hsl(40, 50%, 95%, 0.15);
}
```

## My Recommendation

**Go with Option A** - It's the simplest and most effective. Your beige color (`40 33% 93%`) has a warm yellow hue that will naturally complement the image's warm tones, creating a cohesive, welcoming feel.

---

## Technical Details

### Current Color Values
| Color | HSL Value | Visual |
|-------|-----------|--------|
| muted (current hero bg) | `350 47% 94%` | Cool pink/blush |
| beige (recommended) | `40 33% 93%` | Warm beige |
| background | `40 33% 93%` | Warm beige |
| cream | `40 33% 97%` | Light warm cream |

### Code Change (Option A)
```text
File: src/components/HeroSection.tsx
Line 6: <section className="bg-muted">
     to: <section className="bg-beige">
```

This leverages your existing `--beige` CSS variable defined in `index.css` and referenced in `tailwind.config.ts`.
