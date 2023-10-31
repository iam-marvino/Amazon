import Products from "@/Components/Products";
import ResponsiveCarousel from "@/Components/ResponsiveCarousel";
import "./globals.css";

export const metadata = {
  title: "Amazon 2.0",
  description: "Amazon 2.0 Ecommerce App",
};

export default async function HomePage() {
  let productData;
  try {
    let data = await fetch("https://fakestoreapiserver.reactbd.com/tech");
    productData = await data.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="bg-gray-300">
      <section className="max-w-screen-2xl mx-auto pb-[3rem]">
        <ResponsiveCarousel />
        <div className="relative md:-mt-32 lgl:-mt-32 xl:-mt-60 z-20 mb-10 pt-5 md:pt-0">
          <Products productData={productData} />
        </div>
      </section>
    </main>
  );
}
