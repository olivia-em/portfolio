# Deprecated Components & Styles

This folder contains components and styles that are no longer actively used in the portfolio but are kept for reference.

## Components

### `/components`

- **Header.jsx** - Old sidebar navigation (removed in favor of magazine layout)
- **Shelf.jsx** - Original shelf component (replaced by CarouselShelf)
- **ShelfItem.jsx** - Original shelf item component
- **DomShelf.jsx** - DOM-based shelf rendering
- **DomShelfItem.jsx** - DOM-based shelf item rendering

These components were part of the original 3D carousel implementation and are no longer imported by the app.

### `/styles`

- **canvas-styles.css** - Styles for the 3D canvas/shelf layout, moved from index.css

## Currently Active Components

For reference, the currently active components are:

- `src/components/WallCanvas.jsx` - 3D canvas renderer (used by /canvas route)
- `src/components/CarouselShelf.jsx` - 3D carousel shelf
- `src/components/ImagePlane.jsx` - 3D image plane
- `src/components/Preloader.jsx` - Loading spinner

## Currently Active Pages

- `src/pages/MagazineHome.jsx` - Homepage with magazine layout
- `src/pages/ProjectPage.jsx` - Individual project detail page
- `src/pages/WebArtPage.jsx` - Web art category page
- `src/pages/DesignPage.jsx` - Design category page
- `src/pages/VideoArtPage.jsx` - Video art category page
- `src/pages/LessonsInPerspective.jsx` - Lessons project page
- `src/pages/NewVoicesPage.jsx` - New Voices project page
- `src/pages/CollagePage.jsx` - Collage page

## Currently Active Styles

- `src/index.css` - Global styles, resets, preloader
- `src/styles/magazine.css` - Magazine homepage layout and collage
- `src/styles/CategoryPage.css` - Category page layouts (grid, video lists)

---

**Note:** These deprecated files can be safely deleted if you're sure you won't need them. They're kept here as a reference in case you want to restore the old carousel functionality or reference the old component architecture.
