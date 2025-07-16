# TrueSight.Ai Color Template Reference

Based on the dark-themed website design shown in the provided image, here are the key colors and their usage:

## Primary Colors

### Background Colors
- **Primary Background**: `#0a0b1e` - Very dark blue-black, main page background
- **Secondary Background**: `#1a1b2e` - Slightly lighter dark blue for sections
- **Surface Background**: `#2a2b3e` - For cards and elevated surfaces

### Text Colors
- **Primary Text**: `#ffffff` - Main white text
- **Secondary Text**: `#b8b9c7` - Light gray for descriptions
- **Muted Text**: `#8a8b98` - Subtle gray for less important text

### Brand Colors (Purple Theme)
- **Brand Primary**: `#8b5cf6` - Main purple accent
- **Brand Secondary**: `#a855f7` - Secondary purple variation
- **Brand Light**: `#c084fc` - Lighter purple for hovers
- **Brand Dark**: `#7c3aed` - Darker purple for depth

## Special Effects

### Gradient for TrueSight.Ai Logo/Titles
```css
background: linear-gradient(135deg, #e879f9 0%, #c084fc 25%, #a855f7 50%, #8b5cf6 75%, #7c3aed 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### Button Gradient
```css
background: linear-gradient(135deg, #c084fc 0%, #8b5cf6 50%, #7c3aed 100%);
```

## Usage Examples

### CSS Variables
```css
:root {
  --primary-bg: #0a0b1e;
  --text-primary: #ffffff;
  --brand-primary: #8b5cf6;
  --brand-gradient: linear-gradient(135deg, #c084fc 0%, #8b5cf6 50%, #7c3aed 100%);
}
```

### Applying the Brand Gradient to Text
```css
.brand-text {
  background: var(--brand-gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Interactive States
- **Hover Background**: `rgba(139, 92, 246, 0.1)` - Subtle purple overlay
- **Active Background**: `rgba(139, 92, 246, 0.2)` - Stronger purple overlay
- **Focus Ring**: `rgba(139, 92, 246, 0.4)` - Purple focus indicator

## Color Accessibility
This dark theme provides good contrast ratios:
- White text (`#ffffff`) on dark background (`#0a0b1e`) = ~19.3:1 contrast ratio
- Light gray text (`#b8b9c7`) on dark background = ~9.8:1 contrast ratio
- Purple accent (`#8b5cf6`) meets WCAG AA standards for text usage

## Files Included
1. `truesight-color-template.css` - Complete CSS color template with variables and classes
2. `truesight-demo.html` - Working HTML demo showing the colors in action
3. `color-reference.md` - This reference document