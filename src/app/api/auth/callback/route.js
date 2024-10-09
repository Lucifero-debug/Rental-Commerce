import axios from 'axios';
import qs from 'qs';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return new Response(JSON.stringify({ error: 'Authorization code not found' }), {
      status: 400,
    });
  }

  try {
    const tokenResponse = await axios.post('https://www.wixapis.com/oauth/access', qs.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:3000/auth/callback',
      client_id: process.env.WIX_CLIENT_ID, // Use a non-public client ID
      client_secret: process.env.WIX_API_ID, // Use a non-public client secret
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token } = tokenResponse.data;
    
    // Store tokens securely here

    // Redirect to a success page (optional)
    return new Response(JSON.stringify({
      access_token,
      refresh_token,
    }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error exchanging authorization code for tokens:', error.response?.data || error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.response?.status || 500,
    });
  }
}
