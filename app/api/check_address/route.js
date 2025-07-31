export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
        return Response.json({ error: 'Missing lat or lon' }, { status: 400 });
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'NextJS App - yourdomain.com' // Указать обязательно для Nominatim
            }
        });

        if (!response.ok) {
            return Response.json({ error: 'Failed to fetch from OpenStreetMap' }, { status: response.status });
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
}