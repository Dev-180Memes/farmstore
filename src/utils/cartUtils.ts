const CART_KEY = 'cart';

export const getCart = () => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart: any) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (productId: string, name: string, image: string, price: string) => {
    const cart = getCart();
    const existingItem = cart.find((item: any) => item._id === productId);

    if (existingItem) {
        return;
    } else {
        cart.push({ _id: productId, name: name, image: image, price: price, quantity: 1 });
    }

    saveCart(cart);
}

export const removeFromCart = (productId: any) => {
    let cart = getCart();
    cart = cart.filter((item: any) => item._id !== productId);
    saveCart(cart);
}

export const updateQuantity = (productId: string, quantity: number) => {
    let cart = getCart();
    const existingItem = cart.find((item: any) => item._id === productId);

    if (existingItem) {
        existingItem.quantity = quantity;
    }

    saveCart(cart);
}

export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
}