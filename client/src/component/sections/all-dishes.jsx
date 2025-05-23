import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody, Button, Tabs, Tab, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { debounce } from "lodash";

// Functional Error Boundary
function ErrorBoundary({ children }) {
  //Its purpose is to monitor the rendering of children and catch any errors that occur during their rendering or lifecycle.
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [children]);

  const ErrorComponent = () => {
    if (hasError) {
      return (
        <Card className="text-center p-12 bg-[#3C2F2F]/50 border-2 border-[#FFD700]/20 shadow-lg">
          <CardBody>
            <h2 className="text-3xl font-forum text-white mb-4 font-bold">
              Something Went Wrong
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Please refresh the page or try again later.
            </p>
          </CardBody>
        </Card>
      );
    }
    return children;
  };

  try {
    return <ErrorComponent />;
  } catch (error) {
    setHasError(true);
    return <ErrorComponent />;
  }
}

// Zustand Cart Store
const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addToCart: debounce((item, setActiveTab) => {
        //Uses debounce from Lodash to limit the frequency of the action to once every 300ms, preventing rapid successive calls (e.g., from multiple clicks).
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          const updatedItems = existingItem
            ? state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            : [...state.items, { ...item, quantity: 1 }];
          toast.success(
            <span className="flex items-center gap-2 font-forum">
              <Icon icon="lucide:shopping-cart" className="w-5 h-5" />
              {item.name} added!
            </span>,
            {
              style: {
                background: "#FF4136",
                color: "#FFFFFF",
                border: "2px solid #B22222",
                borderRadius: "8px",
                padding: "10px 16px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              },
              duration: 3000,
            }
          );
          setActiveTab("cart");
          return { items: updatedItems };
        });
      }, 300),
      removeFromCart: debounce((itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      }, 300),
      updateQuantity: debounce((itemId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ),
        }));
      }, 300),
      total: () =>
        get().items.reduce(
          (sum, item) =>
            sum + parseFloat(item.price.replace("$", "") || 0) * item.quantity,
          0
        ),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function MenuAndCart() {
  const { items, addToCart, removeFromCart, updateQuantity, total, clearCart } =
    useCartStore();
  const [activeTab, setActiveTab] = useState("menu");
  const [menuItems, setMenuItems] = useState([]);
  const [isFetchingDishes, setIsFetchingDishes] = useState(true);
  const [isCashfreeLoaded, setIsCashfreeLoaded] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const location = useLocation();
  const pollIntervalRef = useRef(null);

  const CACHE_KEY = "menuItemsCache";
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

  // Load Cashfree SDK
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;
    const checkCashfree = () => {
      if (typeof window.Cashfree !== "undefined") {
        setIsCashfreeLoaded(true);
        setPaymentError(null);
      } else if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(checkCashfree, 500);
      } else {
        setPaymentError("Payment system unavailable. Please refresh.");
      }
    };

    checkCashfree();

    return () => clearTimeout(checkCashfree);
  }, []);

  // Fetch menu items
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMenu() {
      try {
        const cached = localStorage.getItem(CACHE_KEY); //This code checks if we already have saved menu data (like a list of dishes) stored in the browser’s memory (called localStorage). If the saved data is recent enough, it uses that instead of asking the server again which saves time...
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setMenuItems(data);
            setIsFetchingDishes(false);
            return;
          }
        }

        setIsFetchingDishes(true);
        const { data } = await axios.get(
          "https://hotel-cqng.onrender.com/api/menu/dishes?page=1&limit=20",
          { timeout: 5000, signal: controller.signal }
        );

        const dishes = data.menuItems || [];
        const grouped = dishes.reduce((acc, item) => {
          const category = item.category || "Uncategorized";
          const menuItem = {
            id: item._id,
            name: item.name || "Unknown Dish",
            description: item.description || "No description",
            price: item.price || "₹0.00",
            image: item.image || "https://via.placeholder.com/150",
          };
          const cat = acc.find((c) => c.category === category);
          if (cat) cat.items.push(menuItem);
          else acc.push({ category, items: [menuItem] });
          return acc;
        }, []);

        const limited = grouped.map((cat) => ({
          ...cat,
          items: cat.items.slice(0, 10),
        }));

        setMenuItems(limited);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: limited, timestamp: Date.now() })
        );
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Menu fetch error:", error);
          toast.error("Failed to load menu. Using cached data if available.");
          setMenuItems(cached ? JSON.parse(cached).data : []);
        }
      } finally {
        if (!controller.signal.aborted) setIsFetchingDishes(false);
      }
    }

    fetchMenu();

    return () => controller.abort();
  }, []);

  // Payment handler
  async function handlePayment() {
    if (!isCashfreeLoaded || loadingPayment) {
      toast.error("Payment system loading or in progress. Please wait.");
      return;
    }

    setLoadingPayment(true);
    setPaymentError(null);

    try {
      const cartData = {
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price.replace("₹", "") || 0),
          quantity: item.quantity,
        })),
        total: total() + 40,
      };

      const { data } = await axios.post(
        "https://hotel-cqng.onrender.com/api/order/create-order",
        cartData,
        { timeout: 5000 }
      ); //sets a 5-second timeout. If the server doesn’t respond within 5 seconds, the request fails with a timeout error.

      const { payment_session_id, order_id } = data;
      const cashfree = window.Cashfree({ mode: "sandbox" });

      cashfree.checkout({
        //initiates a redirect to the Cashfree payment gateway's user interface (UI), where the payment process is handled.
        paymentSessionId: payment_session_id,
        redirect: true, //If redirect: false were used, the Cashfree SDK would render the payment UI within your application (e.g., in a modal or container)
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
      setPaymentError(error.message);
      setLoadingPayment(false);
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative bg-[#3C2F2F]/95">
        <Toaster position="top-right" />
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="flex justify-center mb-12">
            <Tabs
              variant="solid"
              selectedKey={activeTab}
              onSelectionChange={setActiveTab}
              classNames={{
                tabList:
                  "bg-[#3C2F2F]/80 border-2 border-[#FFD700]/50 rounded-full p-2 shadow-lg",
                tabContent: "text-[#FFD700] font-forum text-xl font-semibold",
                cursor: "bg-[#FFD700]/30 shadow-inner",
                tab: "px-6 py-2",
              }}
            >
              <Tab key="menu" title="Royal Menu" />
              <Tab key="cart" title={`Cart (${items.length})`} />
            </Tabs>
          </div>

          {activeTab === "menu" && (
            <section>
              {isFetchingDishes ? (
                <div className="flex justify-center items-center h-64">
                  <Spinner
                    size="lg"
                    color="warning"
                    label="Loading Menu..."
                    className="text-[#FFD700]"
                  />
                </div>
              ) : menuItems.length === 0 ? (
                <Card className="text-center p-8 bg-[#3C2F2F]/50 border-2 border-[#FFD700]/20 shadow-lg mx-auto max-w-2xl">
                  <CardBody>
                    <h2 className="text-3xl font-forum text-white mb-4 font-bold">
                      No Dishes Available
                    </h2>
                    <p className="text-white/80 mb-8 text-lg">
                      Check back later for our dishes.
                    </p>
                  </CardBody>
                </Card>
              ) : (
                menuItems.map((category) => (
                  <div key={category.category} className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-forum text-white font-bold text-center mb-10">
                      {category.category}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                      {category.items.map((item) => (
                        <Card
                          key={item.id}
                          className="bg-[#3C2F2F]/50 border-2 border-[#FFD700]/20 hover:border-[#FFD700]/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <CardBody className="flex flex-col items-center p-6 sm:p-8">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-32 h-32 rounded-lg object-cover mb-4 border-2 border-[#FFD700]/30"
                              loading="lazy"
                            />
                            <div className="text-center">
                              <h3 className="text-xl font-forum text-[#FFD700] font-semibold mb-2">
                                {item.name}
                              </h3>
                              <p className="text-white/80 text-sm mb-4">
                                {item.description}
                              </p>
                              <div className="flex flex-col items-center gap-4">
                                <span className="text-xl font-forum text-[#FFD700] font-bold">
                                  {item.price}
                                </span>
                                <Button
                                  size="md"
                                  className="bg-[#FFD700] text-[#3C2F2F] font-forum font-bold px-6 py-2 rounded-full border-2 border-[#FFD700]/50 hover:bg-[#2A1F1F] hover:text-[#FFD700] transition-all duration-300"
                                  onClick={() => addToCart(item, setActiveTab)}
                                >
                                  Add to Cart
                                  <Icon
                                    icon="lucide:shopping-cart"
                                    className="ml-2 w-5 h-5"
                                  />
                                </Button>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </section>
          )}

          {activeTab === "cart" && (
            <section className="py-8">
              {items.length === 0 ? (
                <Card className="text-center p-8 bg-[#3C2F2F]/50 border-2 border-[#FFD700]/20 shadow-lg mx-auto max-w-xl">
                  <CardBody>
                    <Icon
                      icon="lucide:shopping-cart"
                      className="w-16 h-16 mx-auto mb-4 text-[#FFD700]"
                    />
                    <h2 className="text-2xl font-forum text-white mb-4 font-bold">
                      Your Cart is Empty
                    </h2>
                    <Button
                      className="bg-[#FFD700] text-[#3C2F2F] font-forum px-6 py-2 rounded-full hover:bg-[#2A1F1F] hover:text-[#FFD700] transition-all duration-300"
                      onClick={() => setActiveTab("menu")}
                    >
                      Explore Menu
                    </Button>
                  </CardBody>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                      <Card
                        key={item.id}
                        className="bg-[#3C2F2F]/50 border-2 border-[#FFD700]/20 hover:border-[#FFD700]/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <CardBody className="flex items-center p-6">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-lg object-cover mr-6 border-2 border-[#FFD700]/30"
                            loading="lazy"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-forum text-[#FFD700] font-semibold">
                                {item.name}
                              </h3>
                              <Button
                                isIconOnly
                                className="text-[#FFD700] hover:text-white"
                                variant="light"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon
                                  icon="lucide:trash-2"
                                  className="w-5 h-5"
                                />
                              </Button>
                            </div>
                            <p className="text-white/80 text-sm mb-4">
                              {item.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-base font-forum text-[#FFD700] font-bold">
                                {item.price}
                              </span>
                              <div className="flex items-center gap-3">
                                <Button
                                  isIconOnly
                                  size="sm"
                                  className="bg-[#FFD700]/20 text-[#FFD700] rounded-full"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  <Icon icon="lucide:minus" />
                                </Button>
                                <span className="w-10 text-center text-white font-bold">
                                  {item.quantity}
                                </span>
                                <Button
                                  isIconOnly
                                  size="sm"
                                  className="bg-[#FFD700]/20 text-[#FFD700] rounded-full"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                >
                                  <Icon icon="lucide:plus" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                  <div className="lg:col-span-1">
                    <Card className="sticky top-8 bg-[#3C2F2F]/50 border-2 border-[#FFD700]/20 shadow-lg p-6">
                      <CardBody>
                        <h3 className="text-xl font-forum text-white font-bold mb-6">
                          Order Summary
                        </h3>
                        <div className="space-y-4 mb-6">
                          <div className="flex justify-between text-white/80">
                            <span>Subtotal</span>
                            <span>₹{total().toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-white/80">
                            <span>Delivery</span>
                            <span>₹40.00</span>
                          </div>
                          <div className="border-t border-[#FFD700]/30 pt-4">
                            <div className="flex justify-between text-[#FFD700] font-bold text-lg">
                              <span>Total</span>
                              <span>₹{(total() + 40).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          className={`w-full font-forum text-base font-semibold py-3 rounded-full border-2 border-[#FFD700]/50 transition-all duration-300 flex items-center justify-center gap-2 ${
                            loadingPayment || !isCashfreeLoaded || paymentError
                              ? "bg-[#FFD700]/50 text-[#3C2F2F]/50 cursor-not-allowed"
                              : "bg-[#FFD700] text-[#3C2F2F] hover:bg-[#2A1F1F] hover:text-[#FFD700]"
                          }`}
                          isDisabled={
                            loadingPayment || !isCashfreeLoaded || paymentError
                          }
                          onClick={handlePayment}
                        >
                          {loadingPayment ? (
                            <>
                              <Spinner size="sm" color="current" />
                              <span>Processing...</span>
                            </>
                          ) : paymentError ? (
                            <span>{paymentError}</span>
                          ) : (
                            <span>Proceed to Payment</span>
                          )}
                        </Button>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default MenuAndCart;
