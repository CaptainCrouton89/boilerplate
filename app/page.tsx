import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/AnimatedElement";
import AnimatedText from "@/components/animations/AnimatedText";
import { GsapTextReveal } from "@/components/animations/GsapReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Code, CreditCard, FileText, Shield, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Dummy data for the page
  const roleCards = [
    {
      title: "I'm a Client",
      icon: "briefcase",
      gradientFrom: "#ff9a8b",
      gradientTo: "#ff6a88",
      description:
        "Need work done? Post bounties with clear requirements and only pay for completed code that meets your criteria.",
      features: [
        "Post detailed bounties with clear deliverables",
        "Set your budget or timeframe constraints",
        "Review code submissions directly",
        "Pay only for completed work that meets your standards",
      ],
      link: "/client/register",
    },
    {
      title: "I'm a Developer",
      icon: "code",
      gradientFrom: "#4cc9f0",
      gradientTo: "#4361ee",
      description:
        "Find interesting projects, write code, and get paid for your work without lengthy proposal processes.",
      features: [
        "Browse and filter bounties that match your skills",
        "Work on projects that interest you",
        "Submit your code directly via PR",
        "Get paid when your code is accepted",
      ],
      link: "/developer/register",
    },
  ];

  const howItWorksSteps = [
    {
      title: "Post a Bounty",
      description:
        "Create a detailed bounty with clear requirements, deliverables, and acceptance criteria.",
    },
    {
      title: "Set Constraints",
      description:
        "Define your budget or timeframe constraints to attract the right developers.",
    },
    {
      title: "Review Code",
      description: "Review submitted code/PRs directly in the platform.",
    },
    {
      title: "Pay for Results",
      description: "Only pay when you're satisfied with the completed work.",
    },
  ];

  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Direct Code Submission",
      description:
        "Submit and review code directly through PRs, focusing on what matters most.",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Flexible Constraints",
      description:
        "Set either budget or timeframe constraints based on your project needs.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Clear Deliverables",
      description:
        "Detailed requirements and acceptance criteria ensure everyone's on the same page.",
    },
    {
      icon: <Check className="h-6 w-6" />,
      title: "Advanced Filtering",
      description:
        "Developers can find the perfect bounties with powerful search and filtering tools.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Payments",
      description:
        "Escrow-based payment system protects both clients and developers.",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Reputation System",
      description:
        "Build your reputation through successful projects and quality code.",
    },
  ];

  const faqs = [
    {
      question: "How is DevBounty different from other freelance platforms?",
      answer:
        "DevBounty focuses on code-first results rather than proposals. Developers submit actual code via PRs instead of lengthy applications, and clients review the code directly. This streamlines the process and ensures you're paying for actual results.",
    },
    {
      question: "How do I ensure quality work as a client?",
      answer:
        "By providing clear requirements, deliverables, and acceptance criteria in your bounty posting. You'll be able to review the actual code submissions and only pay when the work meets your standards.",
    },
    {
      question: "What if multiple developers work on the same bounty?",
      answer:
        "Clients can review all submitted PRs and choose the one that best meets their requirements. Only the selected developer gets paid for their work.",
    },
    {
      question: "How are payments handled?",
      answer:
        "Clients fund bounties upfront, but money is held in escrow until they approve the completed work. This protects both parties and ensures fair compensation for quality work.",
    },
    {
      question: "What types of projects can be posted?",
      answer:
        "DevBounty supports a wide range of software development projects, from web and mobile applications to backend systems, APIs, data analysis, and more. Any project that can be delivered as code can be posted as a bounty.",
    },
  ];

  const footerLinks = {
    platform: [
      { name: "How it Works", href: "#how-it-works" },
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#" },
      { name: "FAQ", href: "#faq" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
    social: [
      { name: "Twitter", icon: "twitter", href: "#" },
      { name: "LinkedIn", icon: "linkedin", href: "#" },
      { name: "GitHub", icon: "github", href: "#" },
      { name: "Discord", icon: "discord", href: "#" },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />

      {/* Choose Role Section */}
      <section className="py-24" id="choose-role">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <GsapTextReveal
              text="Choose Your Role"
              className="text-4xl font-bold mb-3"
              element="h2"
            />
            <AnimatedText
              text="Select how you want to use DevBounty"
              variant="fadeIn"
              element="p"
              className="text-xl text-muted-foreground"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {roleCards.map((card, index) => (
              <Card
                key={index}
                className="h-full transition-all hover:translate-y-[-5px] hover:shadow-lg border-primary/10"
              >
                <CardHeader>
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-r from-[${card.gradientFrom}] to-[${card.gradientTo}] flex items-center justify-center text-white text-3xl mx-auto mb-4`}
                  >
                    {index === 0 ? (
                      <Image
                        src="/client-profile.webp"
                        alt="Client icon"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <Image
                        src="/developer-profile.webp"
                        alt="Developer icon"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                  </div>
                  <CardTitle className="text-center text-2xl">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {card.description}
                  </p>
                  <StaggerContainer className="space-y-2 mb-6">
                    {card.features.map((feature, i) => (
                      <StaggerItem key={i} className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <span>{feature}</span>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className={`w-full bg-gradient-to-r from-[${card.gradientFrom}] to-[${card.gradientTo}] hover:opacity-90 transition-opacity`}
                  >
                    <Link href={card.link}>{`Join as a ${
                      card.title.split("'")[1]
                    }`}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24" id="how-it-works">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <GsapTextReveal
              text="How It Works"
              className="text-4xl font-bold mb-3"
              element="h2"
            />
            <AnimatedText
              text="A simple, code-focused approach to freelancing"
              variant="fadeIn"
              element="p"
              className="text-xl text-muted-foreground"
            />
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <Button variant="secondary" className="rounded-r-none">
                For Clients
              </Button>
              <Button variant="outline" className="rounded-l-none">
                For Developers
              </Button>
            </div>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <StaggerItem key={index}>
                <Card className="relative backdrop-blur-sm bg-background/50 border-primary/10 overflow-hidden">
                  <div className="absolute top-[-15px] left-[-15px] w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full"></div>
                  <CardHeader>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative" id="features">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl z-10"></div>

        <div className="container mx-auto">
          <div className="text-center mb-16">
            <GsapTextReveal
              text="Platform Features"
              className="text-4xl font-bold mb-3"
              element="h2"
            />
            <AnimatedText
              text="Everything you need for code-first freelancing"
              variant="fadeIn"
              element="p"
              className="text-xl text-muted-foreground"
            />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <div className="flex flex-col items-center group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-2xl mb-5 shadow-lg shadow-primary/20 transform transition-transform group-hover:rotate-6 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="py-24 bg-gradient-to-b from-background to-secondary/30"
        id="faq"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <GsapTextReveal
              text="Frequently Asked Questions"
              className="text-4xl font-bold mb-3"
              element="h2"
            />
            <AnimatedText
              text="Everything you need to know about DevBounty"
              variant="fadeIn"
              element="p"
              className="text-xl text-muted-foreground"
            />
          </div>
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-background/50 p-8 rounded-2xl border border-primary/10 shadow-xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-primary/10 last:border-0"
                >
                  <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-90"></div>
        <div className="container mx-auto text-center relative z-10">
          <AnimatedText
            text="Ready to get started?"
            variant="wordByWord"
            element="h2"
            className="text-4xl font-bold mb-6"
          />
          <AnimatedText
            text="Join DevBounty today and experience a better way to connect clients with developers."
            variant="fadeIn"
            element="p"
            className="text-xl mb-10 max-w-2xl mx-auto"
          />
          <Button
            size="lg"
            variant="secondary"
            className="font-bold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-shadow"
            asChild
          >
            <Link href="/register">Sign Up Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-background text-foreground border-t border-primary/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <h5 className="font-bold text-xl mb-4 flex items-center">
                <span className="text-primary">Dev</span>Bounty
              </h5>
              <p className="text-muted-foreground max-w-md">
                A code-first freelance platform that connects clients with
                developers through direct code submissions.
              </p>
            </div>
            <div>
              <h6 className="font-bold mb-4">Platform</h6>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-4">Company</h6>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-4">Connect</h6>
              <div className="flex space-x-4">
                {footerLinks.social.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    <span className={`fab fa-${link.icon} text-xl`}></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <hr className="my-10 border-primary/10" />
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} DevBounty. All rights reserved.
            </p>
            <p className="text-muted-foreground">
              Made with <span className="text-red-500">♥</span> for developers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
