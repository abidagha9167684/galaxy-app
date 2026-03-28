# 🌍 Solar System Explorer

An interactive 3D web application that lets you explore the solar system with beautiful animations and real-time interactions.

## 📋 Features

- **3D Solar System** - All 8 planets with realistic colors and proportional sizes
- **Interactive Controls** - Drag, zoom, and click to explore
- **Animated Orbits** - Watch planets orbit the sun in real-time
- **Planet Information** - Click any planet to see its details
- **Starfield Background** - Immersive space environment with thousands of stars
- **Real-time Stats** - FPS counter and planet count display
- **Responsive Design** - Beautiful glassmorphic UI that adapts to your screen

## 🚀 Quick Start

1. Simply open `index.html` in your web browser
2. No installation or build process required - it works immediately!

## 🎮 Controls

### Mouse & Trackpad
- **Drag** - Rotate the view
- **Scroll** - Zoom in and out

### Keyboard
- **SPACE** - Pause/resume orbital animation
- **R** - Reset camera to default view
- **+/-** - Speed up/slow down the animation

### Interaction
- **Click** on any planet to see its information displayed in the top-left panel

## 📁 File Structure

```
app/
├── index.html      # HTML structure and layout
├── style.css       # Styling and visual effects
├── script.js       # Three.js scene and animation logic
└── README.md       # This file
```

## 🛠️ Technologies Used

- **Three.js** - 3D graphics library for WebGL rendering
- **Vanilla JavaScript** - Pure JS for interaction and animation
- **CSS3** - Modern styling with backdrop filters and animations
- **HTML5** - Semantic markup

## 🌟 Key Components

### Planets (in order from the sun)
1. **Mercury** - Small and fast-orbiting
2. **Venus** - Bright yellow
3. **Earth** - Blue with continents
4. **Mars** - Red planet
5. **Jupiter** - Gas giant with bands
6. **Saturn** - Golden with rings proportions
7. **Uranus** - Cyan-colored ice giant
8. **Neptune** - Deep blue ice giant

### Visual Elements
- **Sun** - Central star with glowing aura
- **Orbital Paths** - Subtle cyan lines showing planet trajectories
- **Starfield** - 1000+ background stars for atmosphere
- **Lighting** - Point light from sun with ambient lighting

## 📊 Scene Details

- **Canvas Size** - Fullscreen (responsive)
- **Render Resolution** - High DPI support
- **Stars** - 1000 procedurally generated
- **Shadow Mapping** - Enabled for depth
- **Animation** - 60 FPS target with adaptive speed control

## 💡 Educational Value

This application is perfect for:
- Learning about our solar system
- Understanding orbital mechanics
- Exploring the relative sizes and distances of planets
- Interactive astronomy education

## 🔧 Customization

You can easily customize the app by editing the values in `script.js`:

```javascript
const planetsData = [
    { name: 'Mercury', size: 3.8, distance: 40, speed: 0.04, color: 0x8c7853 },
    // Adjust size, distance, speed, and color for each planet
];
```

## 📝 Notes

- Planet sizes and distances are proportionally scaled for visibility (not to true scale)
- Orbital speeds are relative to actual speeds but accelerated for visualization
- The application requires a modern browser with WebGL support

## 🎨 UI Theme

The interface uses a dark space theme with:
- Dark blue-purple gradient background
- Cyan accent colors (#64c8ff)
- Glassmorphic panels with blur effects
- Smooth animations and transitions

## 📦 Browser Compatibility

Works on all modern browsers that support:
- WebGL
- CSS Grid & Flexbox
- ES6 JavaScript
- Canvas 2D/3D

## 🌐 Deployment

To deploy online:
1. Upload all four files (index.html, style.css, script.js, README.md) to your web server
2. Access via `https://yourdomain.com/index.html`
3. No backend or build step needed!

---

**Enjoy exploring the solar system!** 🚀✨
