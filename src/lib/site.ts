export const siteConfig = {
  name: "BookNook",
  tagline: "A community library where readers share, borrow and return books.",
  contact: {
    email: "hello@booknook.com",
    phone: "+880 1XXX-XXXXXX",
    address: "Bogura, Bangladesh",
  },
  social: {
    x: "https://x.com",
    facebook: "https://facebook.com",
    github: "https://github.com",
  },
};

export type NavLink = { label: string; href: string; private?: boolean };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "Add Book", href: "/add-book", private: true },
  { label: "My Books", href: "/my-books", private: true },
  { label: "My Borrows", href: "/my-borrows", private: true },
];
