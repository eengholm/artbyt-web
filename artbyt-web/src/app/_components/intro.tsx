"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface IntroProps {
  title?: string;
  subtitle?: string;
}

export function Intro({
  title = "ArtByT",
  subtitle = "Din lokala designstudio",
}: IntroProps) {
  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {subtitle}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Jag hjälper ditt företag att skapa en stark visuell identitet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
