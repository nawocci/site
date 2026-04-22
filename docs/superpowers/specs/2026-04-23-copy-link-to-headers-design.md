# Design Doc: Copy Link to Headers

Enable users to easily copy direct links to specific sections of a blog post.

## Problem Statement
Readers often want to share or reference specific parts of a blog post. Currently, they have to manually construct a URL fragment or share the entire page.

## Proposed Solution
Add a functional link to all headers (`h2`, `h3`, `h4`) in the blog post body.

### Interaction Model
- **Desktop:**
    - Show a `FiLink` (chain) icon in the left margin when hovering over a header.
    - Clicking the icon copies the full URL with the header's fragment ID (e.g., `/blog/my-post#my-header`) to the clipboard.
    - Provide visual feedback (icon change to `FiCheck`) on successful copy.
- **Mobile:**
    - The entire header text acts as a hyperlink (`<a>`).
    - Styled to match the header text color (avoiding default `prose-a` primary color/underlines).
    - Supports native long-press to "Copy Link".

## Technical Design

### 1. ID Generation
Headers in Sanity's `PortableText` do not come with IDs by default. We will use a utility to "slugify" the text content of each header.
- Utility: `slugify(text)` -> `hello-world-id`.
- Handle edge cases (special characters, duplicate IDs on same page).

### 2. Header Components
Create a custom `LinkedHeader` component that handles `h2`, `h3`, and `h4`.

```tsx
type LinkedHeaderProps = {
  level: 2 | 3 | 4;
  id: string;
  children: React.ReactNode;
}
```

### 3. Clipboard API
Use the native `navigator.clipboard.writeText` API for copying. Ensure it handles the full URL by using `window.location.origin + window.location.pathname + "#" + id`.

### 4. Styling
- **Prose Overrides:** Use Tailwind classes to ensure headers inside `prose` don't look like standard links.
    - `no-underline`
    - `text-inherit`
    - `hover:text-primary` (optional, for subtle feedback)
- **Positioning:** Use `group relative` on the header and `absolute -left-8` for the icon to keep it in the margin on desktop.

## Components to Modify/Create
1. **`src/app/blog/[slug]/LinkedHeader.tsx`**: New client component for the interactive logic.
2. **`src/app/blog/[slug]/portableText.components.tsx`**: Update to use `LinkedHeader` for `block` styles `h2`, `h3`, `h4`.
3. **`src/lib/utils.ts`**: (or similar) Add `slugify` and `toPlainText` helpers.

## Acceptance Criteria
- [ ] Headers have unique IDs in the DOM.
- [ ] Hovering on desktop shows a link icon.
- [ ] Clicking the icon copies the URL and shows a checkmark.
- [ ] Headers on mobile are long-pressable hyperlinks.
- [ ] Header color on mobile is NOT the primary blue used for other links.
