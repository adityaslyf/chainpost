"use client"

import { motion } from "framer-motion"
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight, 
  Bitcoin,
  Star,
  Target,
  Trophy,
  Globe,
  Rocket,
  Link,
  BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { AnimatedGrid, AnimatedGridItem } from "@/components/ui/animated-grid"
import { FeatureCard, FeatureGrid } from "@/components/ui/feature-grid"
import { GridPattern, AnimatedGridPattern } from "@/components/ui/grid-pattern"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
        {/* Grid Pattern Background */}
        <GridPattern 
          width={60}
          height={60}
          className="absolute inset-0 h-full w-full stroke-purple-500/10 fill-purple-500/5 animate-grid-fade"
        />
        
        {/* Secondary Grid Pattern */}
        <GridPattern 
          width={30}
          height={30}
          x={15}
          y={15}
          className="absolute inset-0 h-full w-full stroke-blue-400/8 fill-blue-400/3"
        />
        
        {/* Animated Grid Overlay */}
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.06}
          duration={5}
          repeatDelay={0.2}
          className="absolute inset-0 text-purple-600/30"
        />
        
        {/* CSS Grid Pattern */}
        <div className="absolute inset-0 hero-grid-pattern opacity-30"></div>
        
        {/* Background gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/2 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-medium mb-6">
                🚀 Powered by Solana Blockchain
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Turn Reddit Posts Into
              <span className="block gradient-text">Tradeable Coins</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              TokenReddit revolutionizes social media by letting you tokenize Reddit posts on Solana. 
              Trade viral content, earn rewards, and be part of the future of social finance.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Button size="xl" variant="gradient" className="group">
                Join Waitlist
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="xl" variant="outline" className="border-2 hover:bg-gray-50">
                Watch Demo
              </Button>
            </motion.div>


          </motion.div>
        </div>
      </section>

      {/* How It Works Section with Bento Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, powerful, and designed for everyone. Get started in three easy steps.
            </p>
          </motion.div>

          <BentoGrid className="max-w-6xl mx-auto">
            <BentoGridItem
              title="01. Connect Reddit Post"
              description="Paste any Reddit post URL or use our API to automatically tokenize trending content from your favorite subreddits."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              }
              className="md:col-span-1"
              index={0}
            />
            <BentoGridItem
              title="02. Mint Coin on Solana"
              description="Our smart contracts instantly create a unique token tied to the post, with transparent supply and trading mechanics."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Coins className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              }
              className="md:col-span-1"
              index={1}
            />
            <BentoGridItem
              title="03. Trade & Earn Rewards"
              description="Buy, sell, and trade post tokens. Early supporters and original authors earn rewards based on post performance."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-blue-500 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BarChart3 className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              }
              className="md:col-span-1"
              index={2}
            />
          </BentoGrid>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why TokenReddit?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The first platform to bridge social content with DeFi trading mechanisms.
            </p>
          </motion.div>

          <FeatureGrid>
            <FeatureCard
              icon={TrendingUp}
              title="Monetize Viral Content"
              description="Turn your engagement into earnings. Early supporters of viral posts get rewarded as popularity grows."
              gradient="from-purple-500 to-pink-500"
              index={0}
            />
            <FeatureCard
              icon={Shield}
              title="Solana-Powered Security"
              description="Built on Solana's fast, secure blockchain. All transactions are transparent and verifiable."
              gradient="from-blue-500 to-cyan-500"
              index={1}
            />
            <FeatureCard
              icon={Users}
              title="Community-Driven"
              description="Democratic curation with leaderboards and reputation systems. The community decides what's valuable."
              gradient="from-green-500 to-blue-500"
              index={2}
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast Trading"
              description="Near-instant transactions with minimal fees. Trade post tokens as quickly as you scroll Reddit."
              gradient="from-yellow-500 to-orange-500"
              index={3}
            />
            <FeatureCard
              icon={Trophy}
              title="Reward Original Creators"
              description="Original post authors earn royalties from their content's tokenization and trading activity."
              gradient="from-purple-500 to-indigo-500"
              index={4}
            />
            <FeatureCard
              icon={Target}
              title="Smart Curation"
              description="AI-powered content scoring and optional automated tokenization of trending posts."
              gradient="from-cyan-500 to-blue-500"
              index={5}
            />
          </FeatureGrid>
        </div>
      </section>

      {/* Target Audience Section with Animated Grid */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built For Everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a crypto native or Reddit enthusiast, TokenReddit has something for you.
            </p>
          </motion.div>

          <AnimatedGrid cols={4} className="max-w-6xl mx-auto">
            {[
              {
                emoji: "🚀",
                title: "Web3 Traders",
                description: "Access a new asset class with social sentiment-driven tokens and real utility.",
                gradient: "from-purple-500 to-blue-500"
              },
              {
                emoji: "📱",
                title: "Reddit Users", 
                description: "Monetize your favorite posts and earn from your community engagement.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                emoji: "💎",
                title: "Content Creators",
                description: "Get rewarded for creating viral content that resonates with communities.",
                gradient: "from-cyan-500 to-green-500"
              },
              {
                emoji: "🎯",
                title: "Social Traders",
                description: "Trade based on social trends and community sentiment in real-time.",
                gradient: "from-green-500 to-purple-500"
              }
            ].map((audience, index) => (
              <AnimatedGridItem key={index}>
                <div className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-r ${audience.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-4xl group-hover:scale-110 transition-transform duration-300`}>
                    {audience.emoji}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{audience.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{audience.description}</p>
                </div>
              </AnimatedGridItem>
            ))}
          </AnimatedGrid>
        </div>
      </section>



      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2">
                <Rocket className="h-8 w-8 text-white" />
                <Bitcoin className="h-6 w-6 text-white" />
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Transform
              <span className="block">Social Trading?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Join thousands of early adopters who are already earning from social content. 
              Be part of the future of Web3 social finance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="xl" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                Join Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
            
            <div className="flex justify-center items-center space-x-8 text-white/70">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm">Coming Soon</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Built on Solana</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 gradient-text">TokenReddit</h3>
            <p className="text-gray-400 mb-6">The future of social trading is here</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Telegram</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Reddit</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
