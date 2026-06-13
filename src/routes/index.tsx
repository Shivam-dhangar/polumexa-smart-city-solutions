import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Features } from "@/components/site/Features";
import { DashboardDemo } from "@/components/site/Dashboard";
import { SmartBins } from "@/components/site/SmartBins";
import { CarbonDashboard } from "@/components/site/CarbonDashboard";
import { Industries } from "@/components/site/Industries";
import { Government } from "@/components/site/Government";
import { Testimonials } from "@/components/site/Testimonials";
import { Team } from "@/components/site/Team";
import { Pricing } from "@/components/site/Pricing";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Chatbot } from "@/components/site/Chatbot";
import { PageLoader } from "@/components/site/PageLoader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Polumexa Solutions — Smart Recycling for Modern Cities" },
      {
        name: "description",
        content:
          "AI + IoT powered smart waste management for cities, municipalities, factories and apartments. Built by Polumexa Solutions.",
      },
      { property: "og:title", content: "Polumexa Solutions — Smart Recycling for Modern Cities" },
      {
        property: "og:description",
        content: "Transforming cities with intelligent recycling and IoT-powered waste solutions.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen text-foreground">
      <PageLoader />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Hero />
        <About />
        <Features />
        <DashboardDemo />
        <SmartBins />
        <CarbonDashboard />
        <Industries />
        <Government />
        <Testimonials />
        <Team />
        <Pricing />
        <Contact />
      </motion.main>
      <Footer />
      <Chatbot />
    </div>
  );
}
