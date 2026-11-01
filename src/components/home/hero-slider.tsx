"use client";

import Link from "next/link";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import { CatalogCard } from "./catalog-card";

const slides = [
  {
    title: "Find your next favourite book",
    text: "Browse titles shared by our readers, from classic novels to the newest releases.",
    card: {
      callNo: "BN 100",
      title: "Browse",
      rows: ["Search by title or author", "Filter by category", "See what is available now"],
    },
  },
  {
    title: "Share a book from your shelf",
    text: "Add your own books so other readers can discover them and borrow them.",
    card: {
      callNo: "BN 200",
      title: "Share",
      rows: ["Add a cover and details", "Choose a category", "Keep track of your books"],
    },
  },
  {
    title: "Borrow it, read it, return it",
    text: "Borrow in one click and follow every title you have on loan from your own page.",
    card: {
      callNo: "BN 300",
      title: "Borrow",
      rows: ["Borrow with one click", "Check My Borrows anytime", "Return when you finish"],
    },
  },
];

export function HeroSlider() {
  return (
    <section className="border-b bg-muted/40">
      <div className="container-page">
        <Swiper
          className="hero-swiper"
          modules={[A11y, Autoplay, Pagination]}
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className="grid min-h-[600px] items-center gap-10 pb-20 pt-12 lg:min-h-[560px] lg:grid-cols-2 lg:gap-16 lg:pt-16">
                <div>
                  <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="section-text mt-6 max-w-lg">{slide.text}</p>
                  <Button asChild size="lg" className="mt-8">
                    <Link href="/books">Browse Books</Link>
                  </Button>
                </div>
                <CatalogCard {...slide.card} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
