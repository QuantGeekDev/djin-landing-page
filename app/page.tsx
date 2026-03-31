import WaitlistBanner from "./components/waitlist-banner";
import Nav from "./components/nav";
import Hero from "./components/hero";
import ProblemSolution from "./components/problem-solution";
import Comparison from "./components/comparison";
import WhyDjin from "./components/why-djin";
import Features from "./components/features";
import HowItWorks from "./components/how-it-works";
import UseCases from "./components/use-cases";
import Specs from "./components/specs";
import KickstarterTracker from "./components/kickstarter-tracker";
import Pricing from "./components/pricing";
import Testimonials from "./components/testimonials";
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
        <WhyDjin />
        <Features />
        <HowItWorks />
        <UseCases />
        <Specs />
        <KickstarterTracker />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
