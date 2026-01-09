import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/home/HeroSection";
import { ConceptSection } from "@/components/home/ConceptSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { MethodSection } from "@/components/home/MethodSection";
import { ProofSection } from "@/components/home/ProofSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <SEO 
        canonical="/"
        description="Trasforma un sito web piatto in uno 4D. Frontend, WordPress, MVP e ottimizzazione performance."
      />
      <HeroSection />
      <ConceptSection />
      <ServicesSection />
      <MethodSection />
      <ProofSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
