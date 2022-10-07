import { createContext, useContext, useReducer } from "react";

const BasketContext = createContext(null);

const BasketDispatchContext = createContext(null);

export function BasketProvider({ children }) {
  const [basket, dispatch] = useReducer(basketReducer, []);

  return (
    <BasketContext.Provider value={basket}>
      <BasketDispatchContext.Provider value={dispatch}>
        {children}
      </BasketDispatchContext.Provider>
    </BasketContext.Provider>
  );
}

export function useBasket() {
  return useContext(BasketContext);
}

export function useBasketDispatch() {
  return useContext(BasketDispatchContext);
}

function basketReducer(basket, action) {
  switch (action.type) {
    case "added": {
      return [
        ...basket,
        {
          id: action.id,
          productdisplayname: action.productdisplayname,
          amount: action.amount,
          prize: action.prize,
        },
      ];
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
