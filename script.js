// ===== Supabase Configuration =====
const SUPABASE_URL = "https://hvxyydtubqvbtmheluec.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eHl5ZHR1YnF2YnRtaGVsdWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTg2NzMsImV4cCI6MjA3NzU3NDY3M30.am66MDwDqnCKHDNPT8a-S_dUwuEoMzDrHgk802uWKDU";

// Load latest value from esp_data_log
async function fetchLatestData() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/esp_data_log?select=deflection,sensor_value&order=id.desc&limit=1`, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    if (data.length > 0) {
      const deflection = data[0].deflection;
      const sensorValue = data[0].sensor_value;

      document.getElementById("touchValue").textContent = sensorValue ?? "--";
      document.getElementById("floatValue").textContent = deflection?.toFixed(2) ?? "--";

      // Show ON/OFF state based on deflection threshold
      document.getElementById("intValue").textContent =
        deflection > 0.5 ? "ON" : "OFF";
    }
  } else {
    console.error("Error fetching:", await response.text());
  }
}

// Refresh data every 2 seconds
setInterval(fetchLatestData, 2000);
fetchLatestData();
