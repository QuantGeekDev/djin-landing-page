import WaitlistBanner from "./components/waitlist-banner";
import Nav from "./components/nav";
import Hero from "./components/hero";
import ProblemSolution from "./components/problem-solution";
import Comparison from "./components/comparison";
import Features from "./components/features";
import HowItWorks from "./components/how-it-works";
import Testimonials from "./components/testimonials";
import UseCases from "./components/use-cases";
import Specs from "./components/specs";
import Pricing from "./components/pricing";
import FAQ from "./components/faq";
import CTA from "./components/cta";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <WaitlistBanner />
      <Nav />
      <main>
        <Hero />
        <ProblemSolution />
        <Comparison />
        <Features />
        <HowItWorks />
        <Testimonials />
        <UseCases />
        <Specs />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
