import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Demo from "@/components/Demo";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Demo />
      <Community />
      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Index;