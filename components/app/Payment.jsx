import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Payment() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-4xl rounded-lg bg-card p-6 shadow-lg md:p-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Ticket Checkout</h1>
              <Link
                href="#"
                className="text-primary hover:underline"
                prefetch={false}
              >
                Change Tickets
              </Link>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Avengers: Endgame</h2>
                  <p className="text-muted-foreground">
                    Friday, May 3, 2023 - 7:30 PM
                  </p>
                </div>
                <div className="text-lg font-semibold">$15.99</div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">2 Adult Tickets</p>
                <p className="text-lg font-semibold">$31.98</p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-semibold">Payment Method</h2>
              <RadioGroup
                defaultValue="card"
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="card"
                    id="payment-card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="payment-card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCardIcon className="mb-3 h-6 w-6" />
                    Card
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="paypal"
                    id="payment-paypal"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="payment-paypal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <WalletCardsIcon className="mb-3 h-6 w-6" />
                    Wallet
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="apple"
                    id="payment-apple"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="payment-apple"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <DollarSignIcon className="mb-3 h-6 w-6" />
                    Cash
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-semibold">Payment Details</h2>
              <form>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Name on Card</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                    <div>
                      <Label htmlFor="zip">Zip Code</Label>
                      <Input id="zip" placeholder="12345" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>
            <div className="rounded-lg bg-muted p-4">
              <h2 className="mb-2 text-lg font-semibold">Order Summary</h2>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-muted-foreground">Ticket Price</p>
                <p className="text-lg font-semibold">$31.98</p>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-muted-foreground">Convenience Fee</p>
                <p className="text-lg font-semibold">$2.99</p>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-2xl font-bold">$34.97</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button size="lg">Complete Purchase</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function WalletCardsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
      <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
    </svg>
  );
}
