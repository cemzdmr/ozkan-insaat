# Özkan İnşaat - Admin Panel User Guide

## 🎯 Overview

The admin panel provides complete control over website content, including pages, projects, references, and settings. All content is managed through an intuitive interface without requiring technical knowledge.

## 🔐 Accessing Admin Panel

1. Navigate to: `http://localhost:3000/admin` (or your domain/admin)
2. Login with your credentials
3. Dashboard will display after successful authentication

## 📋 Main Features

### 1. Dashboard

The dashboard provides an overview of:
- Total projects, references, and form submissions
- Recent activities
- Quick actions
- System status

### 2. Pages Management

#### Creating a Page

1. Go to **Pages** in the sidebar
2. Click **"Add New Page"**
3. Fill in basic information:
   - Page slug (URL-friendly name)
   - Page type (Home, About, Projects, etc.)
   - Published status

4. Add content for each language:
   - Click language tabs (TR / EN / AR)
   - Enter title and description
   - Fill SEO metadata

5. Add sections to the page:
   - Click **"Add Section"**
   - Choose section type:
     - **Hero**: Fullscreen banner with video/image
     - **Text + Image**: Content block with media
     - **Services**: Service cards grid
     - **Projects Grid**: Showcase projects
     - **Statistics**: Animated counters
     - **Logo Carousel**: Client logos slider
     - **CTA**: Call-to-action block
     - **Custom HTML**: Advanced custom content

6. Configure section settings:
   - **Layout**: Choose layout variant
   - **Background**: Color, image, or video
   - **Parallax**: Enable/disable parallax effect
   - **Animations**: Configure entrance animations
   - **Visibility**: Show/hide section

7. Reorder sections:
   - Drag and drop sections to rearrange
   - Changes save automatically

8. Save and publish

#### Editing Sections

Each section type has specific options:

**Hero Section:**
- Background type (image/video)
- Overlay opacity
- Headline text (per language)
- Subheadline text (per language)
- Button text and links
- Text alignment

**Text + Image Section:**
- Content position (left/right)
- Image or video
- Heading and body text
- Button (optional)

**Services Section:**
- Number of columns
- Service items (icon, title, description)
- Layout style (grid/carousel)

**Projects Grid:**
- Filter by category
- Number of items
- Layout (grid/masonry)
- Featured only toggle

**Statistics:**
- Counter items (value, label, icon)
- Animation duration
- Number format (with/without separators)

**Logo Carousel:**
- Auto-play speed
- Items per row
- Grayscale effect toggle

**CTA Section:**
- Heading and text
- Button text and link
- Background style

### 3. Projects Management

#### Adding a Project

1. Go to **Projects** → **Add New**
2. Upload cover image
3. Fill in project details:
   - Status (Ongoing/Completed/Planned)
   - Year
   - Location
   - Featured toggle

4. Add content for each language:
   - Project title
   - Description
   - Detailed information

5. Select categories
6. Add gallery images/videos:
   - Upload multiple files
   - Drag to reorder
   - Set captions

7. Add highlights (bullet points)
8. Save and publish

#### Managing Projects

- **Filter**: By category, status, or featured
- **Sort**: By date, title, or custom order
- **Bulk Actions**: Publish, unpublish, or delete multiple
- **Reorder**: Drag projects to change display order

### 4. Categories

Categories help organize projects.

#### Creating a Category

1. Go to **Projects** → **Categories**
2. Click **"Add Category"**
3. Enter slug (URL-friendly identifier)
4. Add names for each language
5. Save

#### Managing Categories

- Edit category names
- Reorder categories
- View project count per category
- Delete unused categories

### 5. References (Clients)

#### Adding a Reference

1. Go to **References** → **Add New**
2. Upload client logo
3. Fill in information:
   - Company name (per language)
   - Testimonial (optional, per language)
   - Author name and position

4. Set order
5. Publish

#### Managing References

- Reorder by dragging
- Enable/disable testimonials display
- Choose layout (grid/slider)
- Publish/unpublish individual references

### 6. Contact Management

#### Contact Information

1. Go to **Contact** → **Information**
2. Edit for each language:
   - Address
   - Phone numbers
   - Email
   - Map URL
   - WhatsApp number
   - Working hours

3. Save changes

#### Form Submissions

View and manage contact form submissions:

- **All Submissions**: View chronologically
- **Unread**: New submissions
- **Archived**: Processed submissions

Actions:
- Mark as read
- Archive
- Delete
- Export to CSV

### 7. Media Library

Centralized media management for all uploaded files.

#### Uploading Media

1. Go to **Media Library**
2. Click **"Upload"** or drag & drop files
3. Supported formats:
   - Images: JPG, PNG, GIF, WEBP
   - Videos: MP4, MOV, AVI
4. Add alt text for SEO
5. Organize in folders (optional)

#### Managing Media

- View as grid or list
- Filter by type (image/video)
- Search by filename or alt text
- Delete unused files
- View file details (size, dimensions, URL)

### 8. Site Settings

#### General Settings

- Site name (per language)
- Site tagline (per language)
- Logo (light/dark variants)
- Favicon
- Default language
- Social media links

#### SEO Settings

- Default meta description
- Default keywords
- Google Analytics ID
- Google Search Console verification
- Social media preview images

#### Email Settings

- SMTP configuration
- Notification emails
- Contact form recipient

#### Advanced Settings

- Maintenance mode
- Custom CSS
- Custom JavaScript
- Robots.txt
- Analytics code

### 9. Users Management (Admin Only)

#### Adding a User

1. Go to **Users** → **Add New**
2. Fill in:
   - Name
   - Email
   - Password
   - Role (Admin/Editor)

3. Save

#### User Roles

**Admin:**
- Full access to all features
- User management
- Settings management
- Delete permissions

**Editor:**
- Content management (pages, projects, references)
- View form submissions
- Upload media
- No user or settings access

## 🌍 Multi-Language Management

### Working with Multiple Languages

1. **Switch Language**: Use language tabs (TR / EN / AR)
2. **Required Fields**: Title and description must be filled for each language
3. **Independent Content**: Each language version is separate
4. **RTL Support**: Arabic automatically uses right-to-left layout
5. **Preview**: View how content appears in each language

### Best Practices

- Always fill content for all languages before publishing
- Use consistent terminology across languages
- Test RTL layout for Arabic content
- Verify image text doesn't conflict with translations

## 🎨 Visual Controls

### Section Backgrounds

Options for each section:
- **Color**: Solid color background
- **Image**: Background image with parallax option
- **Video**: Background video (MP4)
- **Gradient**: Multiple gradient presets
- **Overlay**: Add dark/light overlay for readability

### Animation Controls

Configure animations per section:
- **Entrance**: Fade in, slide up, scale
- **Duration**: Animation speed
- **Delay**: Stagger animations
- **Easing**: Animation curve

### Layout Options

Most sections support multiple layouts:
- **Grid**: Structured columns
- **Masonry**: Pinterest-style layout
- **Carousel**: Sliding display
- **Full Width**: Edge-to-edge display
- **Contained**: Centered with padding

## 📱 Mobile Preview

Preview how content appears on different devices:

1. Click **Preview** button
2. Select device:
   - Desktop
   - Tablet
   - Mobile

3. Navigate through pages
4. Test interactions
5. Check responsive behavior

## 💾 Auto-Save & Versioning

- Changes auto-save every 30 seconds
- Manual save available
- Version history (Admin only)
- Restore previous versions
- Compare versions

## 🔍 Search & Filter

Use powerful search across all content:

1. Global search in header
2. Search in:
   - Pages
   - Projects
   - References
   - Media
   - Form submissions

3. Advanced filters:
   - Status (published/draft)
   - Date range
   - Category
   - Author

## 📊 Analytics Dashboard

View website statistics:

- Page views
- Popular projects
- Form submission trends
- Traffic sources (if GA integrated)
- Geographic data

## 🆘 Common Tasks

### Changing Logo

1. Go to **Settings** → **General**
2. Click **"Upload Logo"**
3. Select new logo file
4. Optionally upload dark variant
5. Save

### Adding a New Project

1. **Projects** → **Add New**
2. Upload cover image
3. Fill all language versions
4. Add gallery
5. Select category
6. Publish

### Creating a Landing Page

1. **Pages** → **Add New**
2. Choose **Custom** type
3. Add Hero section
4. Add content sections
5. Add CTA section
6. Configure SEO
7. Publish

### Reordering Homepage Sections

1. Go to **Pages** → **Home**
2. Scroll to sections list
3. Drag sections to reorder
4. Changes save automatically

### Managing Testimonials

1. **References** → Edit reference
2. Enable testimonial toggle
3. Fill testimonial text (per language)
4. Add author name and position
5. Save

## 🔐 Security Tips

- Use strong passwords
- Don't share admin credentials
- Log out when finished
- Regular backups (automatic)
- Review user activity logs

## 📞 Getting Help

- Hover over `(?)` icons for contextual help
- Check **Documentation** section in admin
- Contact support: admin@ozkaninsaat.com

## 🎯 Quick Reference

| Action | Location | Shortcut |
|--------|----------|----------|
| Add Page | Pages → Add New | Ctrl+N |
| Save | Any editor | Ctrl+S |
| Preview | Top bar | Ctrl+P |
| Media Library | Media → All | Ctrl+M |
| Global Search | Header | Ctrl+K |
| Dashboard | Sidebar | Ctrl+D |
