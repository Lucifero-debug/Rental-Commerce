// src/app/api/auth/callback/route.js
import axios from 'axios';

export async function GET(req) {
  // Extract the authorization code from the query parameters
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code'); // Get the authorization code

  if (!code) {
    return new Response(JSON.stringify({ error: 'Authorization code not found' }), {
      status: 400,
    });
  }

  try {
    // Prepare the request to exchange the authorization code for tokens
    const tokenResponse = await axios.post('https://www.wixapis.com/oauth/access', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:3000/auth/callback', // Your redirect URI
        client_id: process.env.NEXT_PUBLIC_WIX_CLIENT_ID, // Your client ID
        client_secret: process.env.NEXT_PUBLIC_WIX_API_ID, // Your client secret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // You should receive the access token and refresh token here
    const { access_token, refresh_token } = tokenResponse.data;
    console.log("rajveer",access_token)
    console.log("balveer",refresh_token)
 
    // Store tokens securely (e.g., in a database or session)
    // For demonstration purposes, we will just return them in the response
    return new Response(JSON.stringify({
      access_token,
      refresh_token,
    }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error exchanging authorization code for tokens:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.response?.status || 500,
    });
  }
}
