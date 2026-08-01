# Premium UI Motion & Micro-Interaction Enhancement Prompt

Act as a Senior UI Motion Designer, Frontend Performance Engineer, and Product Designer.

Transform this application into a premium, modern product with fluid interactions comparable to Linear, Raycast, Framer, Arc Browser, Stripe, Apple, Notion, Vercel, and Figma.

## Goal

The UI should feel:

* Extremely smooth
* Premium
* Responsive
* Delightful
* Natural
* Lightweight
* Professional

Animations should never feel excessive or distracting.

The target experience is "144Hz-ready"—animations should remain smooth on high-refresh-rate displays while degrading gracefully on lower-refresh-rate devices. Prioritize consistent frame pacing and responsiveness over long or flashy effects.

---

## Motion Principles

Use modern motion design principles:

* Spring physics instead of linear easing
* Ease-out for entrances
* Ease-in for exits
* Stagger children naturally
* Motion should communicate hierarchy
* Every animation should have purpose
* Avoid unnecessary movement
* Prefer opacity + transform animations
* Never animate layout unnecessarily
* Use GPU-accelerated transforms
* Respect prefers-reduced-motion

---

## Entire App Review

Review every screen and improve interactions including:

* Landing page
* Dashboard
* Sidebar
* Navigation
* Header
* Hero
* Cards
* Tables
* Charts
* Forms
* Inputs
* Buttons
* Modals
* Sheets
* Dropdowns
* Tooltips
* Popovers
* Tabs
* Accordions
* Toasts
* Notifications
* Loading states
* Empty states
* Error states
* Success states
* Search
* Pagination
* Mobile menu
* Settings pages

No component should feel static.

---

## Buttons

Enhance every button with:

* Hover elevation
* Smooth scale (1.02–1.04)
* Active press animation
* Ripple (optional)
* Soft shadow transition
* Gradient movement where appropriate
* Loading spinner animation
* Success check animation
* Disabled transition

---

## Cards

Improve all cards with:

* Hover lift
* Subtle tilt (optional)
* Shadow interpolation
* Border glow
* Animated highlight
* Smooth reveal
* Content fade
* Image zoom
* Magnetic cursor (where appropriate)

---

## Navigation

Create premium navigation:

* Animated active indicator
* Sliding highlight
* Icon morphs
* Smooth sidebar expand/collapse
* Sticky transitions
* Breadcrumb transitions
* Scroll-aware header
* Active route animation

---

## Lists & Tables

Improve all lists:

* Staggered appearance
* Row hover animation
* Selection animation
* Sorting transitions
* Filter transitions
* Animated pagination
* Skeleton loaders
* Empty state illustration transitions

---

## Forms

Every form should feel premium:

* Floating labels
* Animated validation
* Focus glow
* Success transitions
* Error shake
* Password reveal animation
* Auto-growing textareas
* Character counters
* Progress indicators

---

## Inputs

Improve all inputs:

* Smooth border animation
* Focus ring
* Cursor transitions
* Placeholder fade
* Label transitions
* Search expansion
* Auto-complete animation

---

## Modals

Upgrade dialogs:

* Scale + fade entrance
* Blur backdrop
* Spring opening
* Spring closing
* Nested animations
* Escape animation
* Click-outside animation

---

## Dropdowns

Use:

* Scale
* Fade
* Slight upward motion
* Staggered menu items
* Keyboard navigation animation

---

## Tooltips

Create elegant tooltips:

* Fade
* Scale
* Slight translate
* Smart positioning
* Delay before appearing

---

## Loading Experience

Replace static loaders with:

* Skeleton screens
* Shimmer effects
* Animated placeholders
* Progressive loading
* Lazy image fades
* Number count-up
* Optimistic UI updates

---

## Page Transitions

Implement:

* Route transitions
* Shared element transitions
* Fade between pages
* Preserve scroll where appropriate
* Smooth loading indicators

---

## Scroll Experience

Enhance scrolling:

* Smooth anchor scrolling
* Scroll reveal
* Progressive section appearance
* Parallax (light)
* Sticky animations
* Progress indicator
* Back-to-top animation

---

## Icons

Animate icons:

* Hover rotation
* Morph transitions
* Loading rotation
* Success morph
* Notification pulse
* Interactive feedback

---

## Charts

Improve chart interactions:

* Animated drawing
* Tooltip transitions
* Hover emphasis
* Animated legends
* Smooth value updates
* Count-up statistics

---

## Notifications

Premium toast behavior:

* Slide + fade
* Swipe to dismiss
* Queue animations
* Progress indicator
* Icon animation

---

## Empty States

Make empty states engaging:

* Floating illustrations
* Gentle looping motion
* CTA emphasis
* Fade-in messaging

---

## Theme Transition

Improve theme switching:

* Smooth color interpolation
* Icon morph
* Background transition
* Preserve state
* No flashing

---

## Cursor Interactions

Where appropriate:

* Magnetic buttons
* Cursor-aware cards
* Interactive hover states
* Pointer depth effects

Do not overuse.

---

## Mobile Experience

Ensure animations remain smooth on mobile:

* Touch feedback
* Gesture-friendly transitions
* Bottom sheet animations
* Swipe interactions
* Momentum scrolling

---

## Performance Requirements

Animations must maintain excellent performance.

Requirements:

* Use transform and opacity instead of layout-changing properties whenever possible.
* Avoid forced reflows and layout thrashing.
* Animate only composited properties.
* Lazy-load heavy components.
* Memoize expensive renders where appropriate.
* Minimize unnecessary React re-renders.
* Use requestAnimationFrame for animation loops.
* Respect prefers-reduced-motion.
* Keep animations interruptible and responsive.

---

## Accessibility

Maintain accessibility:

* Respect reduced-motion preferences.
* Preserve keyboard navigation.
* Maintain visible focus indicators.
* Ensure motion does not block interaction.
* Avoid flashing or excessive movement.

---

## Design System

Create a reusable animation system:

* Shared motion tokens
* Standard durations
* Standard easing curves
* Shared spring presets
* Reusable transition utilities
* Consistent hover patterns
* Consistent reveal animations

---

## Deliverables

Implement the enhancements directly in the codebase.

At completion, provide:

1. Every modified file.
2. New animation utilities/components.
3. Performance improvements made.
4. Accessibility considerations.
5. Summary of all added micro-interactions.

The final result should feel polished, cohesive, fast, and production-ready, with every interaction contributing to a premium user experience rather than unnecessary visual effects