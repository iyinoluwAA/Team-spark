import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, Music, Quote, Shield, Sparkles, Users, Wind } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-rose-50">
      {/* Navigation */}
      <nav className="container mx-auto flex items-center justify-between px-4 py-6">
        <div className="flex items-center space-x-2">
          <Image src="/logo.svg" width={32} height={32} alt="EmotiChat Logo" />
          <span className="font-bold text-gray-900 text-xl">EmotiChat</span>
        </div>
        <div className="hidden items-center space-x-8 md:flex">
          <a href="#features" className="text-gray-600 transition-colors hover:text-emerald-600">
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 transition-colors hover:text-emerald-600"
          >
            How It Works
          </a>
          <Button
            variant="outline"
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            asChild
          >
            <Link href="/chat">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <Badge className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            🌿 AI-Powered Emotional Wellness
          </Badge>
          <h2 className="mb-6 font-bold text-5xl text-gray-900 leading-tight md:text-6xl">
            Find Your Inner
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {" "}
              Peace
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600 text-xl leading-relaxed">
            Your AI Companion for Emotional Well-being. Talk or chat with an empathic AI that
            listens and understands you. Recognize, reflect, and heal from deep-rooted emotional
            wounds through personalized conversations.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3 text-white hover:from-emerald-700 hover:to-teal-700"
              asChild
            >
              <Link href="/chat">
                Start Your Journey
                <Sparkles className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl text-gray-900">Healing Through Technology</h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-xl">
            Our AI-driven platform offers personalized support to help you stay calm and grounded
            amidst life's challenges.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur transition-shadow hover:shadow-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-gray-900">Voice & Text Chat</CardTitle>
              <CardDescription>
                Communicate naturally with our AI assistant through voice or text. Advanced emotion
                detection analyzes your tone to understand your emotional state.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur transition-shadow hover:shadow-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-600">
                <Music className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-gray-900">Sound Therapy</CardTitle>
              <CardDescription>
                Curated music and healing frequencies tailored to your emotional state. Time-limited
                sessions designed to promote relaxation and emotional balance.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur transition-shadow hover:shadow-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                <Wind className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-gray-900">Guided Meditation</CardTitle>
              <CardDescription>
                Short, effective breathing exercises and meditation guides. Perfect for quick
                relaxation breaks or deeper mindfulness sessions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur transition-shadow hover:shadow-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                <Quote className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-gray-900">Inspirational Quotes</CardTitle>
              <CardDescription>
                Dynamic, mood-based quotes that adapt to your emotional state. Uplifting messages
                when you need them most.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur transition-shadow hover:shadow-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-gray-900">Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your emotional healing journey over time. Visualize patterns and celebrate
                your growth milestones.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur transition-shadow hover:shadow-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-gray-900">Safe & Private</CardTitle>
              <CardDescription>
                Your emotional journey is completely private and secure. All conversations are
                encrypted and never shared.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white/50 py-20 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-4xl text-gray-900">
              Your Wellness Journey in 3 Steps
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-xl">
              Simple, effective, and personalized emotional support whenever you need it.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600">
                <span className="font-bold text-2xl text-white">1</span>
              </div>
              <h3 className="mb-4 font-semibold text-gray-900 text-xl">Share Your Feelings</h3>
              <p className="text-gray-600">
                Talk or type to our AI assistant about what's on your mind. Our emotion detection
                technology understands your current state.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600">
                <span className="font-bold text-2xl text-white">2</span>
              </div>
              <h3 className="mb-4 font-semibold text-gray-900 text-xl">Get Personalized Support</h3>
              <p className="text-gray-600">
                Receive tailored recommendations including music therapy, breathing exercises, and
                inspirational content based on your emotions.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
                <span className="font-bold text-2xl text-white">3</span>
              </div>
              <h3 className="mb-4 font-semibold text-gray-900 text-xl">Track Your Progress</h3>
              <p className="text-gray-600">
                Monitor your emotional wellness journey over time and celebrate your growth with our
                progress tracking features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-bold text-4xl text-white">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-emerald-100 text-xl">
            Join thousands of users who have found peace and emotional balance with EmotiChat Helper
            AI.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-white px-8 py-3 text-emerald-600 hover:bg-gray-50"
              asChild
            >
              <Link href="/chat">
                Get Started Free
                <Heart className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start justify-between md:flex-row">
            <div className="mb-8 md:mb-0">
              <div className="mb-4 flex items-center space-x-2">
                <Image src="/logo.svg" width={32} height={32} alt="EmotiChat Logo" />
                <span className="font-bold text-xl">EmotiChat</span>
              </div>
              <p className="mb-2 text-gray-400">
                Your AI companion for emotional wellness and healing.
              </p>
              <p className="text-gray-400 text-xs">
                &copy; 2025 EmotiChat Helper AI. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col gap-8 sm:flex-row md:gap-12">
              <div>
                <h4 className="mb-4 font-semibold">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#features" className="transition-colors hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="transition-colors hover:text-white">
                      How it works
                    </a>
                  </li>
                  <li>
                    <Link href="/chat" className="transition-colors hover:text-white">
                      App
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-semibold">Social</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link
                      href="https://github.com/iyinoluwAA/Team-spark"
                      target="_blank"
                      className="transition-colors hover:text-white"
                    >
                      GitHub
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
