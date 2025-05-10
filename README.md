# Poortofolio

A dynamic, interactive portfolio website built with modern web technologies featuring vertical presentation and GSAP-powered animations.

## Technology Stack

- **Frontend**: 
  - JavaScript (59.7%)
  - CSS (25.5%)
  - HTML (14.6%)
  - TypeScript (0.2%)
- **Animation**: GSAP (GreenSock Animation Platform) with ScrollTrigger
- **Special Effects**: Particles.js
- **Responsive Design**: Supports various screen sizes

## Features

- Full-screen vertical sliding sections (100vh)
- Smooth transitions powered by GSAP and ScrollTrigger
- Interactive text and image animations
- Parallax background effects
- Particle effects in the contact section
- Responsive design for all screen sizes

## Documentation Feature

The website includes a "Documentation" section with a unique updating mechanism:

### Accessing Edit Mode

1. Navigate to the "Documentation" section
2. Type "murreki" (without quotes, won't be visible on screen)
3. Edit modal will appear for data modification

### Editable Elements

- Event Title
- Event Date
- Google Drive Link
- Background Image URL

### Saving Changes

Changes are stored in browser localStorage. For permanent updates:

1. Click "Export JSON" in the edit modal
2. Download the `data-dokumentasi.json` file
3. Upload the file to the repository

### Configuration File Structure

Documentation configuration is stored in `data-dokumentasi.json`:

```json
{
  "judul": "Event Name",
  "tanggalEvent": "Event Date",
  "linkDrive": "Google Drive URL",
  "backgroundImage": "Background Image URL"
}
```

**Note:** Empty `backgroundImage` field ("") will use default background.

## Project Structure

```
.
├── index.html              # Main page
├── assets/
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   ├── main.js        # Main JavaScript
│   │   └── particles.min.js # Particles.js library
│   └── images/            # Image directory
└── README.md              # Project documentation
```

## Setup Instructions

1. Clone this repository
2. Open `index.html` in your browser
3. Scroll to experience the inter-slide animations

## Required Images

Add your images to `assets/images/` with the following filenames:
- `murreki-portrait.jpg` - Profile photo
- `work-1.jpg` to `work-4.jpg` - Portfolio gallery
- `testimonial-bg.jpg` - Testimonial section background
- `client-1.jpg` to `client-3.jpg` - Client testimonial avatars

## License

This project is available for both personal and commercial use.

---

Made with 💻 by LawlessDragon
