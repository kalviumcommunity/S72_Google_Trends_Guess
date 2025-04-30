// Worker-compatible backend
export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      const method = request.method;

      // CORS headers
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };

      // Handle OPTIONS requests for CORS
      if (method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

      // Health check route
      if (path === '/health') {
        return new Response(JSON.stringify({
          status: 'ok',
          timestamp: new Date().toISOString(),
          worker: true
        }), {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }

      // API routes
      if (path.startsWith('/api')) {
        // Example: Get trending words
        if (path === '/api/words' && method === 'GET') {
          // Replace with actual KV/D1 database call
          const words = await env.TRENDS_DB.get('trending_words');
          return new Response(words || '[]', {
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }

        // Example: Add new word
        if (path === '/api/words' && method === 'POST') {
          const body = await request.json();
          // Replace with actual KV/D1 database call
          await env.TRENDS_DB.put('trending_words', JSON.stringify(body));
          return new Response(JSON.stringify({ success: true }), {
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }
      }

      // Handle 404
      return new Response(JSON.stringify({
        status: 'error',
        message: `Cannot ${method} ${path}`
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });

    } catch (error) {
      // Error handling
      return new Response(JSON.stringify({
        status: 'error',
        message: error.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  }
}; 