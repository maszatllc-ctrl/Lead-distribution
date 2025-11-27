import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrendingUp, ShoppingCart, Package } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-primary-foreground" />
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-balance text-foreground">Welcome to LeadFlow</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
              The modern platform connecting lead sellers with qualified buyers. Streamline your lead distribution and
              grow your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 w-full mt-12">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">I'm a Buyer</h2>
                <p className="text-muted-foreground">Browse and purchase high-quality leads from verified sellers</p>
                <Link href="/buyer" className="w-full">
                  <Button size="lg" className="w-full">
                    Go to Buyer Dashboard
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">I'm a Seller</h2>
                <p className="text-muted-foreground">List your leads and reach qualified buyers instantly</p>
                <Link href="/seller" className="w-full">
                  <Button size="lg" variant="outline" className="w-full bg-transparent">
                    Go to Seller Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
