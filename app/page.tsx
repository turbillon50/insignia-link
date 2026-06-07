import { SplashScreen } from "@/components/splash-screen"
import { LandingNav } from "@/components/landing/landing-nav"
import {
  LandingHero,
  LandingValues,
  LandingServices,
  LandingStats,
  LandingTestimonials,
  LandingCTA,
} from "@/components/landing/landing-sections"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function HomePage() {
  return (
    <>
      <SplashScreen />
      <div className="flex min-h-screen flex-col">
        <LandingNav />
        <main className="flex-1">
          <LandingHero />
          <LandingValues />
          <LandingServices />
          <LandingStats />
          <LandingTestimonials />
          <LandingCTA />
        </main>
        <LandingFooter />
      </div>
    </>
  )
}
