import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ConceptSection } from "@/components/home/ConceptSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { MethodSection } from "@/components/home/MethodSection";
import { ProofSection } from "@/components/home/ProofSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
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
