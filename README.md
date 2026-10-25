# Bigsite - Modern Business Website Template

A comprehensive, responsive, and feature-rich website template built with HTML5, CSS3, and vanilla JavaScript.

## Features

### Core Features
- **Fully Responsive Design** - Works on all devices from mobile to desktop
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Performance Optimized** - Fast loading with lazy loading and optimized assets
- **Accessibility Ready** - WCAG compliant with keyboard navigation support
- **SEO Friendly** - Semantic HTML and proper meta tags

### Pages Included
- **Home Page** - Hero section, features, portfolio, testimonials, blog preview
- **About Us** - Company story, team, mission & vision, skills, clients
- **Services** - Comprehensive service listings with pricing and FAQ
- **Blog** - Article listings with categories and featured posts
- **Contact** - Contact form with multiple contact methods and map

### Components
- **Navigation** - Responsive navbar with mobile menu
- **Hero Sections** - Eye-catching hero sections with call-to-action buttons
- **Features Grid** - Showcase your key features
- **Portfolio/Work Showcase** - Display your projects with filtering
- **Testimonials** - Customer testimonials with slider
- **Services Slider** - Horizontal scrolling service cards
- **Blog Grid** - Article cards with metadata
- **Newsletter** - Email subscription form
- **Contact Form** - Full-featured contact form with validation
- **Team Section** - Team member cards with social links
- **Pricing Tables** - Responsive pricing cards
- **FAQ Accordion** - Expandable FAQ items
- **Process Timeline** - Step-by-step process visualization
- **Partners/Clients** - Logo showcase

### Animations & Effects
- **Scroll Animations** - Elements animate in as you scroll
- **Hover Effects** - Interactive hover states for all components
- **Loading Screen** - Smooth loading animation
- **Parallax Effects** - Depth to your sections
- **Ripple Effects** - Button click animations
- **Glitch Effects** - Modern glitch animations
- **Neon Effects** - Glowing elements
- **Particle Effects** - Floating particles
- **Wave Effects** - Animated wave backgrounds
- **Bubble Effects** - Floating bubbles
- **Sparkle Effects** - Shimmering sparkles
- **Glass Effects** - Frosted glass look
- **Chrome Effects** - Shiny metallic look
- **Aurora Effects** - Colorful gradient animations
- **Holographic Effects** - Rainbow gradient animations

### JavaScript Features
- **Form Validation** - Client-side validation with error messages
- **Mobile Menu** - Smooth mobile navigation
- **Sliders** - Touch-enabled sliders for services, testimonials, etc.
- **FAQ Accordion** - Expandable FAQ items
- **Portfolio Filter** - Filter portfolio items by category
- **Back to Top** - Smooth scroll to top button
- **Lazy Loading** - Images load as you scroll
- **Scroll Animations** - Animate elements on scroll
- **Copy to Clipboard** - One-click copy functionality
- **Phone Mask** - Automatic phone number formatting
- **Character Counter** - For textareas with max length
- **Form Auto-save** - Save form progress locally
- **Form Suggestions** - Input suggestions for form fields

## Quick Start

### Option 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Ararat4455/Bigsite.git

# Navigate to the project directory
cd Bigsite

# Open index.html in your browser
open index.html
```

### Option 2: Download and Use

1. Download the repository as a ZIP file
2. Extract the files
3. Open `index.html` in your browser

## Project Structure

```
Bigsite/
├── index.html          # Main home page
├── about.html          # About us page
├── services.html       # Services page
├── blog.html           # Blog page
├── contact.html        # Contact page
├── css/
│   ├── style.css       # Main styles
│   ├── animations.css  # Animation styles
│   └── responsive.css  # Responsive styles
├── js/
│   ├── main.js         # Main JavaScript
│   ├── animations.js   # Animation scripts
│   ├── slider.js       # Slider functionality
│   ├── faq.js          # FAQ accordion
│   └── contact.js      # Contact form handling
├── images/             # Image assets
├── assets/             # Additional assets
├── fonts/              # Font files
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Customization

### Changing Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #4a6bff;    /* Main brand color */
    --secondary-color: #ff6b9d;  /* Secondary color */
    /* ... other colors ... */
}
```

### Adding New Pages

1. Create a new HTML file in the root directory
2. Copy the basic structure from existing pages (header, navigation, footer)
3. Add your content in the main content section
4. Link the page in the navigation menu

### Adding New Services

Edit the services section in `services.html`:

```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-code"></i>
    </div>
    <h3>Your Service Name</h3>
    <p>Description of your service</p>
    <ul class="service-features">
        <li><i class="fas fa-check-circle"></i> Feature 1</li>
        <li><i class="fas fa-check-circle"></i> Feature 2</li>
    </ul>
    <a href="contact.html" class="btn btn-primary">Get Started</a>
</div>
```

### Adding Blog Posts

Edit the blog section in `blog.html`:

```html
<article class="blog-card">
    <div class="blog-image">
        <img src="images/blog-post.jpg" alt="Post Title">
        <span class="blog-category">Category</span>
    </div>
    <div class="blog-content">
        <span class="blog-date"><i class="fas fa-calendar-alt"></i> Date</span>
        <h3>Post Title</h3>
        <p>Post excerpt...</p>
        <a href="#" class="blog-link">Read More</a>
    </div>
</article>
```

### Customizing Navigation

Edit the navigation in all HTML files:

```html
<ul class="nav-links">
    <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
    <li><a href="about.html"><i class="fas fa-info-circle"></i> About</a></li>
    <li><a href="services.html"><i class="fas fa-concierge-bell"></i> Services</a></li>
    <li><a href="blog.html"><i class="fas fa-blog"></i> Blog</a></li>
    <li><a href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
</ul>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Dependencies

This template uses the following external resources:

- **Font Awesome** - Icons (loaded from CDN)
- **Google Fonts** - Poppins font (loaded from CDN)

## Performance Tips

1. **Optimize Images** - Compress images before adding them
2. **Use WebP** - Convert images to WebP format for better compression
3. **Lazy Load** - Images already use lazy loading
4. **Minify CSS/JS** - Minify production assets
5. **CDN** - Use CDN for external resources

## Accessibility

- Semantic HTML structure
- ARIA attributes where needed
- Keyboard navigation support
- Focus states for interactive elements
- Skip to main content link
- Proper contrast ratios

## SEO

- Semantic HTML
- Proper heading hierarchy (h1, h2, h3, etc.)
- Meta tags for each page
- Open Graph meta tags (recommended to add)
- Sitemap (recommended to add)

## Deployment

### Static Hosting

You can deploy this template to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Firebase Hosting
- Surge.sh

### Example: Deploy to Netlify

1. Drag and drop the project folder to Netlify
2. Or connect your GitHub repository
3. Netlify will automatically deploy your site

### Example: Deploy to GitHub Pages

```bash
# Create a gh-pages branch
git checkout -b gh-pages

# Push to GitHub
git push origin gh-pages

# Enable GitHub Pages in repository settings
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, questions, or feedback, please open an issue on GitHub.

---

**Bigsite** - Built with love by Ararat4455

[Visit the live demo](#) | [GitHub Repository](https://github.com/Ararat4455/Bigsite)
