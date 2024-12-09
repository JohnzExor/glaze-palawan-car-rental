import { Gallery } from "./components_gallery";

export function GallerySection() {
  return (
    <section className="py-20 bg-muted" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-primary">
          Explore Palawan
        </h2>
        <Gallery />
      </div>
    </section>
  );
}
