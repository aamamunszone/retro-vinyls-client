/**
 * Test API route to verify server connection
 * GET /api/test
 */

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      return Response.json(
        {
          error: 'API URL not configured',
          env: process.env.NODE_ENV,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      );
    }

    console.log('Testing connection to:', `${apiUrl}/health`);

    // Create timeout controller manually for better compatibility
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(`${apiUrl}/health`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await res.json();

    return Response.json({
      success: res.ok,
      status: res.status,
      apiUrl,
      serverResponse: data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);

    return Response.json(
      {
        error: 'Health check failed',
        message: error.message,
        apiUrl: process.env.NEXT_PUBLIC_API_URL,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
