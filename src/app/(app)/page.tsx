"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

const Home = () => {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-purple-300 to-indigo-600 text-white py-10">
        <section className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="text-lg font-medium">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>

        <div className="flex justify-center">
          <Carousel
            plugins={[Autoplay({ delay: 2000 })]}
            className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6"
          >
            <CarouselContent className="space-x-4">
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-4">
                    <Card className="bg-purple-100 hover:bg-purple-200 transition-colors duration-300 rounded-lg shadow-md">
                      <CardHeader>{message.title}</CardHeader>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold text-purple-800">
                          {message.content}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full" />
            <CarouselNext className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full" />
          </Carousel>
        </div>
      </main>
      <footer className="bg-purple-700 text-white py-4 text-center">
  <p className="text-sm">&copy; 2023 True Feedback. All rights reserved.</p>
</footer>

    </>
  );
};

export default Home;
