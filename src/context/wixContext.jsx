"use client";

import { createClient, OAuthStrategy,ApiKeyStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import Cookies from "js-cookie";
import { createContext } from "react";
import { redirects } from '@wix/redirects';
import { members } from "@wix/members";

// Create the Wix client
const wixClient = (() => {
  // Get the refresh token from cookies
  const refreshTokenCookie = Cookies.get("refreshToken");

  // Check if the cookie exists and is a valid JSON string
  let refreshToken;
  if (refreshTokenCookie) {
    try {
      refreshToken = JSON.parse(refreshTokenCookie);
    } catch (error) {
      console.error("Error parsing refresh token:", error);
      refreshToken = null; // Default to null if parsing fails
    }
  } else {
    refreshToken = null; // Default to null if cookie doesn't exist
  }

  return createClient({
    modules: {
      products,
      collections,
      currentCart,
      redirects,
      members,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });
})();

// Create context for the Wix client
export const WixClientContext = createContext(wixClient);

// Create context provider for the Wix client
export const WixClientContextProvider = ({ children }) => {
  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
