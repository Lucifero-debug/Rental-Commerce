import { OAuthStrategy, createClient,ApiKeyStrategy } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { orders, currentCart } from "@wix/ecom";
import { cookies } from "next/headers";
import { members } from '@wix/members';

export const wixClientServer = async () => {
  let refreshToken;

  try {
    const cookieStore = cookies();
    refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");
  } catch (e) {}

  const wixClient = createClient({
    modules: {
      products,
      collections,
      orders,
      members,
      currentCart,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
    // auth: ApiKeyStrategy({
    //   siteId: process.env.NEXT_PUBLIC_WIX_APP_ID,
    //   apiKey:process.env.NEXT_PUBLIC_WIX_API_ID,
    // }),
  });

  return wixClient;
};