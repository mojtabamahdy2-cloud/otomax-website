"use client";

import React from 'react';
import NavBar from "@/components/ui/navBar";
import { Footer7 } from "@/components/footer-7";
import TermsAndConditionsComponent from "./TermsAndConditions";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-white text-black">
      <NavBar />
      
      <div className="flex-grow pt-24">
        <TermsAndConditionsComponent />
      </div>

      <Footer7 />
    </main>
  );
}
