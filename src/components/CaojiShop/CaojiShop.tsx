import { useCallback, useEffect, useState } from 'react';
import type { Language } from '../../i18n/LanguageContext';
import type { TranslatedText } from '../../i18n/strings';
import { pickText, ui } from '../../i18n/strings';
import { shopProducts } from '../../data/shopProducts';
import type { ShopProduct } from '../../data/shopProducts';

const CART_STORAGE = 'caoji-cart';

function loadCart(): Record<string, number> {
  try {
    const raw = localStorage.getItem(CART_STORAGE);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCart(cart: Record<string, number>) {
  localStorage.setItem(CART_STORAGE, JSON.stringify(cart));
}

interface CaojiShopProps {
  lang: Language;
}

export function CaojiShop({ lang }: CaojiShopProps) {
  const [cart, setCart] = useState<Record<string, number>>(loadCart);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToCart = useCallback((id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] <= 1) delete next[id];
      else next[id]--;
      return next;
    });
  }, []);

  const cartCount = Object.values(cart).reduce((a: number, b: number) => a + b, 0);
  const cartItems = shopProducts.filter((p: ShopProduct) => cart[p.id] > 0);
  const cartTotal = cartItems.reduce((sum: number, p: ShopProduct) => sum + p.price * (cart[p.id] ?? 0), 0);

  return (
    <section className="caojiShop" aria-label="文创商城">
      <div className="caojiShopHeader">
        <h3 className="caojiShopTitle">{pickText(ui.caojiShop.shopTitle, lang)}</h3>
        <button
          type="button"
          className="caojiCartBtn"
          onClick={() => setShowCart(!showCart)}
          aria-expanded={showCart}
        >
          🛒 {pickText(ui.caojiShop.cart, lang)} {cartCount > 0 && <span className="caojiCartBadge">{cartCount}</span>}
        </button>
      </div>
      <p className="caojiDemoHint">{pickText(ui.caojiShop.demoHint, lang)}</p>

      <div className="caojiProductGrid">
        {shopProducts.map((p: ShopProduct) => (
          <ProductCard
            key={p.id}
            product={p}
            lang={lang}
            onAddToCart={() => addToCart(p.id)}
            addToCartLabel={ui.caojiShop.addToCart}
          />
        ))}
      </div>

      {showCart && (
        <div className="caojiCartOverlay" onClick={() => setShowCart(false)}>
          <div className="caojiCartDrawer" onClick={(e) => e.stopPropagation()}>
            <h4 className="caojiCartTitle">{pickText(ui.caojiShop.cart, lang)}</h4>
            {cartItems.length === 0 ? (
              <p className="caojiCartEmpty">{pickText(ui.caojiShop.cartEmpty, lang)}</p>
            ) : (
              <>
                <ul className="caojiCartList">
                  {cartItems.map((p: ShopProduct) => (
                    <li key={p.id} className="caojiCartItem">
                      <img src={p.image} alt="" className="caojiCartImg" />
                      <div className="caojiCartInfo">
                        <span className="caojiCartName">{pickText(p.title, lang)}</span>
                        <span className="caojiCartPrice">¥{p.price} × {cart[p.id]}</span>
                      </div>
                      <div className="caojiCartActions">
                        <button type="button" onClick={() => removeFromCart(p.id)}>−</button>
                        <span>{cart[p.id]}</span>
                        <button type="button" onClick={() => addToCart(p.id)}>+</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="caojiCartFooter">
                  <span className="caojiCartTotal">合计 ¥{cartTotal}</span>
                  <button type="button" className="caojiCheckoutBtn" disabled>
                    {lang === 'zh' ? '去结算（演示）' : 'Checkout (demo)'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function ProductCard({
  product,
  lang,
  onAddToCart,
  addToCartLabel
}: {
  product: ShopProduct;
  lang: Language;
  onAddToCart: () => void;
  addToCartLabel: TranslatedText;
}) {
  return (
    <article className="caojiProductCard">
      <div className="caojiProductImage">
        <img src={product.image} alt="" />
      </div>
      <div className="caojiProductInfo">
        <h4 className="caojiProductTitle">{pickText(product.title, lang)}</h4>
        {product.description && (
          <p className="caojiProductDesc">{pickText(product.description, lang)}</p>
        )}
        <div className="caojiProductFooter">
          <span className="caojiProductPrice">¥{product.price}</span>
          <button type="button" className="caojiAddBtn" onClick={onAddToCart}>
            {pickText(addToCartLabel, lang)}
          </button>
        </div>
      </div>
    </article>
  );
}
