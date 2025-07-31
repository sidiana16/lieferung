export function getLocation(setAddress) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                // console.log("Широта: " + lat + " Долгота: " + lon);

                try {
                    const res = await fetch(`/api/check_address?lat=${lat}&lon=${lon}`);
                    if (!res.ok) throw new Error('Ошибка при получении адреса');
                    const data = await res.json();

                    setAddress(data);
                } catch (err) {
                    // console.error("Ошибка при запросе адреса:", err);
                    setAddress({'error':err});
                }
            },
            (error) => {
                // console.warn("Ошибка геолокации:", error.message);
                setAddress({'error':error.message});
            }
        );
    } else {
        // console.log("Геолокация не поддерживается.");
        setAddress({'error':"Геолокация не поддерживается."});
    }
}
