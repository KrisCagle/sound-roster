# SoundRoster

SoundRoster is a music management web app built for managers who need one place to organize artists, tour dates, and artist details.

## Overview

SoundRoster helps music managers manage a roster of artists, browse profiles, create and edit artist records, and track tour dates from a single dashboard.

The current version includes:

- User registration
- Email-based login
- Persistent login state with local storage
- A branded landing page
- A responsive navigation bar with logo, account menu, and mobile hamburger menu
- A **My Roster** page for artists owned by the logged-in manager
- A **Browse All** page for viewing every artist in the system
- Search by artist name on **Browse All**
- Filter by genre on **Browse All**
- Artist profile pages with genre tags, bio, metadata, and tour dates
- Add, edit, and delete functionality for artists
- Add, edit, and delete functionality for tour dates
- Owner-based permissions for artist and tour date management
- Artist-to-genre relationships using a join table

---

## Tech Stack

- **React**
- **React Router**
- **Tailwind CSS**
- **JSON Server**
- **JavaScript**

---

## Current Features

### Authentication
Users can:
- Register for an account
- Log in with email
- Stay logged in using local storage
- Log out from the navigation menu

### Navigation
The app currently includes:
- **Home**
- **Login**
- **Register**
- **My Roster**
- **Browse All**
- **Artist Profile**
- **Add Artist**
- **Edit Artist**
- **Add Tour Date**
- **Edit Tour Date**

### My Roster
The **My Roster** page:
- Pulls artist data from the database
- Filters artists by the logged-in user
- Displays artist photo cards
- Shows artist name
- Shows artist origin city
- Shows genre tags
- Links each card to the full artist profile

### Browse All
The **Browse All** page:
- Displays all artists in the system
- Supports real-time search by artist name
- Supports filtering by genre
- Allows genre pills to act as filter controls
- Shows artist cards with photo, name, city, active year, bio, and genres

### Artist Profiles
The **Artist Profile** page:
- Displays the artist image, name, genres, city, active year, and bio
- Displays all tour dates for the artist
- Formats tour dates into readable text
- Shows ticket links only when a ticket URL exists
- Shows owner-only controls for editing and deleting artists
- Shows owner-only controls for adding, editing, and deleting tour dates

### Artist Management
Managers can:
- Add a new artist
- Edit an existing artist they own
- Delete an artist they own
- Assign multiple genres to an artist
- Preview an artist image live while entering a photo URL

### Tour Date Management
Managers can:
- Add a tour date to an artist they own
- Edit an existing tour date
- Delete an individual tour date from the artist profile page
- View tour dates directly on the artist profile page

### Permissions
The app includes ownership-based permissions:
- Only the owner of an artist can edit or delete that artist
- Only the owner of an artist can add, edit, or delete that artist’s tour dates
- Non-owners can still view artist profiles and public tour date information

---
Styling Notes

The UI uses Tailwind utility classes for:

Layout and spacing
Borders and rounded cards
Shadows and hover effects
Glass-style card backgrounds
Responsive grid layouts
Responsive navigation
Mobile-friendly forms and buttons

## Database Structure

The project currently uses the following resources in `database.json`:

- `users`
- `artists`
- `tourDates`
- `genres`
- `artistGenres`

### Relationships

- A **user** owns many **artists**
- An **artist** has many **tourDates**
- An **artist** can have many **genres**
- A **genre** can belong to many **artists**
- `artistGenres` acts as the join table between artists and genres

---

## Project Structure

```txt
src/
  components/
    NavBar.jsx
  pages/
    Home.jsx
    Login.jsx
    Register.jsx
    MyRoster.jsx
    BrowseAll.jsx
    ArtistProfile.jsx
    AddArtist.jsx
    EditArtist.jsx
    AddTourDate.jsx
    EditTourDate.jsx
  services/
    authService.js
    artistService.js
public/
  images/
    artists/
database.json
