"use client";

import React from 'react';
import NavBar from "@/components/ui/navBar";
import { Footer7 } from "@/components/footer-7";
import PrivacyPolicyContent from "./privacy-policy";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-black">
      <NavBar />
      
      <div className="flex-grow pt-24">
        <PrivacyPolicyContent />
      </div>

      <Footer7 />
    </main>
  );
}
