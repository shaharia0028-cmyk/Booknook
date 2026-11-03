# BookNook

A community library where readers share, borrow and return books.

**Live site:** https://booknook-rose.vercel.app

## Features

- **Secure authentication:** Register and log in with email and password, or continue with Google. Built with Better Auth and the MongoDB adapter, and the password must have an uppercase letter, a lowercase letter and at least 6 characters.
- **Protected routes:** Guests who open a private page or try to borrow a book are sent to Login, and brought back to that page after logging in.
- **Browse the library:** The All Books page has search by title or author, category filter (Fiction, Science, History, Kids, Others) and pagination.
- **Borrow and return books:** Borrow a book for 7 days from its details page. The copy count goes down when you borrow and back up when you return it, and you cannot borrow the same book twice.
- **Manage your own books:** Add a book with a cover image, then edit or delete it from My Books. Only the owner can change or remove their books.
- **Personal dashboards:** My Books, My Borrows and Profile pages show everything that belongs to the signed-in user.
- **Polished interface:** Responsive layout, Swiper.js hero slider on the home page, light and dark theme, toast messages, a custom 404 page and a page title on every route.

## Tech stack

- **Client:** Next.js (App Router), React, TypeScript, Tailwind CSS, Radix UI, Swiper.js, React Toastify
- **Auth:** Better Auth with the MongoDB adapter, Google login and the JWT plugin
- **Server:** Express and MongoDB (separate `booknook-server` project), which checks the Better Auth JWT with the JWKS endpoint of this app
- **Images:** imgbb

## Pages

Home, All Books, Book Details (Borrow), Add Book, My Books (Edit / Delete), My Borrows (Return), Profile, Login, Register.

## Run it locally

1. Install the packages:
   ```bash
   npm install
   ```
2. Create a `.env.local` file in this folder:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   MONGODB_DB=booknook
   BETTER_AUTH_SECRET=a-long-random-secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:8000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXT_PUBLIC_IMGBB_API_KEY=your-imgbb-api-key
   ```
3. Start the Express server from `booknook-server` first. Its `CLIENT_URL` must be the same origin as `BETTER_AUTH_URL`.
4. Start this app:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000.

For Google login, add `http://localhost:3000/api/auth/callback/google` (and the same path on your live URL) as an authorized redirect URI in the Google Cloud console.