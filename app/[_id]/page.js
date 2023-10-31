"use client"
import React from "react";
import DynamicPageContent from "@/Components/DynamicPageContent";

function DynamicPage({ searchParams }) {
  return (
    <main
      className="max-w-screen-xl mx-auto px-4 py-4 
      md:py-10 min-h-[100vh] md:min-h-[70vh]"
    >
      <DynamicPageContent searchParams={searchParams} />
    </main>
  );
}

export default DynamicPage;
