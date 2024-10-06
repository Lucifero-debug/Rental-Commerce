import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { orders, currentCart } from "@wix/ecom";
import { members } from '@wix/members';

export const wixApiServer = async () => {
  const wixClient = createClient({
    modules: {
      products,
      collections,
      orders,
      members,
      currentCart,
    },
    auth: ApiKeyStrategy({
      siteId: process.env.NEXT_PUBLIC_WIX_SITE_ID,
      apiKey: process.env.NEXT_PUBLIC_WIX_API_ID,
    }),
  });

  return wixClient;
};
