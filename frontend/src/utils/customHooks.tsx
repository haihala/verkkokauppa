import { useCallback, useEffect, useState } from "react";
import { Buffer } from "buffer";
import { Cat, Product } from "./models";

export const useLogin = () => {
  // TODO: Read from local storage
  const [token, setToken] = useState<string>();
  const loggedIn = !!token;
  const [requestedLogin, setRequestedLogin] = useState(false);

  const login = useCallback((username: string, password: string) => {
    setToken(
      Buffer.from(`${username}:${password}`, "binary").toString("base64")
    );
    setRequestedLogin(false);
  }, []);

  return {
    headers: { Authorization: `Basic ${token}` },
    loggedIn,
    requestedLogin,
    login,
    cancelLogin: useCallback(() => setRequestedLogin(false), []),
    requestLogin: useCallback(() => setRequestedLogin(true), []),
  };
};

const baseUrl = "localhost:8000";

const useFetch = <T,>(
  auth: ReturnType<typeof useLogin>,
  endpoint: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    send?: boolean;
    callback?: (result: T) => void;
    requireLogin?: boolean;
  } = { method: "Get", send: true }
) => {
  const { headers: authHeaders, loggedIn, requestLogin } = auth;

  const makeRequest = useCallback(() => {
    fetch(`http://${baseUrl}/${endpoint}`, {
      method: options.method,
      headers: {
        "Content-Type": "application/json",
        "Accept-Control-Allow-Origin": "*",
        ...authHeaders,
        ...options?.headers,
      },
      body: options?.body,
    })
      .then((response) => response.json())
      .then((newValue) => {
        if (options?.callback) options?.callback(newValue);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    endpoint,
    authHeaders.Authorization,
    options?.body,
    options?.callback,
    options.headers,
  ]);

  useEffect(() => {
    if (!options?.send) return;
    if (options?.requireLogin && !loggedIn) {
      requestLogin();
    } else {
      makeRequest();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.send, options.requireLogin, loggedIn, makeRequest]);
};

export const useCats = (auth: ReturnType<typeof useLogin>) => {
  const [adoptId, setAdoptId] = useState<string>();
  const [cats, setCats] = useState<Cat[]>([]);
  useFetch<Cat[]>(auth, "cats", {
    send: !cats.length,
    callback: useCallback((data: Cat[]) => setCats(data), []),
  });

  useFetch(auth, `adopt?uuid=${adoptId}`, {
    method: "POST",
    requireLogin: true,
    send: !!adoptId,
    callback: useCallback(() => {
      setCats(cats?.filter((cat) => cat.id !== adoptId));
      setAdoptId(undefined);
    }, [cats, adoptId]),
  });

  return {
    cats: cats || [],
    adopt: (id: string) => setAdoptId(id),
  };
};

export const useProducts = (auth: ReturnType<typeof useLogin>) => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [submit, setSumbit] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  useFetch<Product[]>(auth, "items", {
    send: !products.length,
    callback: useCallback((data: Product[]) => setProducts(data), []),
  });

  useFetch(auth, "buy", {
    method: "POST",
    requireLogin: true,
    body: JSON.stringify(
      Object.entries(cart).map(([id, amount]) => {
        return { product: id, amount };
      })
    ),
    send: submit,
    callback: () => {
      setSumbit(false);
      setCart({});
    },
  });

  const addToCart = (id: string) => {
    if (id in cart) {
      setCart({
        ...cart,
        [id]: cart[id] + 1,
      });
    } else {
      setCart({
        ...cart,
        [id]: 1,
      });
    }
  };

  return {
    products,
    cart,
    addToCart,
    submitOrder: () => setSumbit(true),
  };
};
