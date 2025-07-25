import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, List, Grid3x3 } from "lucide-react";
import { motion } from "framer-motion";

const mockProducts = [
  { id: 1, name: "T-Shirt", price: 499, img: "/tshirt.jpg" },
  { id: 2, name: "Jeans", price: 999, img: "/jeans.jpg" },
  { id: 3, name: "Shoes", price: 1299, img: "/shoes.jpg" },
  { id: 4, name: "Cap", price: 199, img: "/cap.jpg" },
];

export default function EcommerceStore() {
  const [viewMode, setViewMode] = useState("grid");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCheckout = () => {
    alert("Redirecting to payment gateway...");
    // You can replace this alert with real Stripe Checkout redirect.
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-Commerce Store</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-60"
          />
          <Button onClick={() => setViewMode("grid")} variant="ghost">
            <Grid3x3 />
          </Button>
          <Button onClick={() => setViewMode("list")} variant="ghost">
            <List />
          </Button>
          <Button variant="outline">
            <ShoppingCart className="mr-1" /> {cart.length}
          </Button>
        </div>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            : "space-y-4"
        }
      >
        {filteredProducts.map((product) => (
          <motion.div
            layout
            key={product.id}
            className="transition duration-300"
          >
            <Card className="rounded-2xl shadow-md">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <CardContent className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-muted-foreground">₹{product.price}</p>
                <Button onClick={() => addToCart(product)}>Add to Cart</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="p-4 mt-6 border rounded-xl bg-muted">
          <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                {item.name} - ₹{item.price}
                <Button
                  onClick={() => removeFromCart(item.id)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <Button onClick={handleCheckout} className="bg-green-600 hover:bg-green-700">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
