import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import { capturePayment } from "@/store/shop/order-slice";


function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Dynamically load Razorpay script once
  useEffect(() => {
    if (document.getElementById("razorpay-script")) {
      setIsRazorpayLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () => {
      toast({
        title: "Failed to load Razorpay SDK. Try refreshing the page.",
        variant: "destructive",
      });
    };
    document.body.appendChild(script);
  }, [toast]);

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity,
        0
      )
      : 0;

const handleInitiateRazorpayPayment = async () => {
  if (!cartItems || cartItems.items.length === 0) {
    toast({ title: "Your cart is empty.", variant: "destructive" });
    return;
  }
  if (currentSelectedAddress === null) {
    toast({ title: "Please select an address.", variant: "destructive" });
    return;
  }
  if (!isRazorpayLoaded) {
    toast({ title: "Razorpay SDK not loaded.", variant: "destructive" });
    return;
  }

  const orderData = {
    userId: user?.id,
    cartId: cartItems?._id,
    cartItems: cartItems.items.map(item => ({
      productId: item.productId,
      title: item.title,
      image: item.image,
      price: item.salePrice > 0 ? item.salePrice : item.price,
      quantity: item.quantity,
    })),
    addressInfo: {
      addressId: currentSelectedAddress?._id,
      address: currentSelectedAddress?.address,
      city: currentSelectedAddress?.city,
      pincode: currentSelectedAddress?.pincode,
      phone: currentSelectedAddress?.phone,
      notes: currentSelectedAddress?.notes,
    },
    orderStatus: "pending",
    paymentMethod: "razorpay",
    paymentStatus: "pending",
    totalAmount: totalCartAmount,
    orderDate: new Date(),
    orderUpdateDate: new Date(),
  };

  console.log("Order Data:", orderData);

  setIsPaymentStart(true);

  try {
    const response = await dispatch(createNewOrder(orderData));
    console.log("Create New Order Full Response:", response);

    const payload = response.payload || {};

    if (payload.success && payload.razorpayOrderId) {
      const options = {
        key: "rzp_test_2KypwyAI4K7nw6",
        amount: payload.amount,
        currency: payload.currency,
        name: "Your Company Name",
        description: "Order Payment",
        order_id: payload.razorpayOrderId,
        handler: async function (razorpayResponse) {
          const paymentId = razorpayResponse.razorpay_payment_id;
          const backendOrderId = payload.orderId; // backend order id if any

          if (!paymentId) {
            toast({ title: "Payment failed.", variant: "destructive" });
            return;
          }

          await dispatch(
            capturePayment({
              paymentId,
              orderId: backendOrderId,
            })
          );

          toast({
            title: "Payment successful & order confirmed!",
          });
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: currentSelectedAddress?.phone,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      toast({
        title: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: `Error: ${error.message || error}`,
      variant: "destructive",
    });
  } finally {
    setIsPaymentStart(false);
  }
};


  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full bg-black text-white">
            <Button
              onClick={handleInitiateRazorpayPayment}
              className="w-full"
              disabled={isPaymentStart}
            >
              {isPaymentStart
                ? "Processing Payment..."
                : "Checkout with Razorpay"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
