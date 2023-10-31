import React from "react";
import SuccessPageContent from "@/Components/SuccessPageContent";

function SuccessPage() {
 
  return (
    // after successful payment this page will be rendered
    <main className="flex flex-col gap-2 items-center 
    justify-center py-20">
      <SuccessPageContent  />
    </main>
  );
}

export default SuccessPage;
