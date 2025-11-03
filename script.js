const SUPABASE_URL = "https://hvxyydtubqvbtmheluec.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eHl5ZHR1YnF2YnRtaGVsdWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTg2NzMsImV4cCI6MjA3NzU3NDY3M30.am66MDwDqnCKHDNPT8a-S_dUwuEoMzDrHgk802uWKDU";
const TABLE_NAME = "ESP_Data"; // must match your Supabase table exactly

async function fetchLatestData() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=accel_x,accel_y,accel_z,gyro_x,gyro_y,gyro_z,angle_magnitude,posture_status&order=id.desc&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Supabase REST error:", response.status, await response.text());
      return;
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    if (data.length > 0) {
      const d = data[0];
      document.getElementById("angleMagnitude").textContent = (d.angle_magnitude ?? 0).toFixed(2);
      document.getElementById("accel").textContent = `${d.accel_x}, ${d.accel_y}, ${d.accel_z}`;
      document.getElementById("gyro").textContent = `${d.gyro_x}, ${d.gyro_y}, ${d.gyro_z}`;

      const statusEl = document.getElementById("status");
      if (d.posture_status === "Bad") {
        statusEl.textContent = "⚠️ Bad Posture";
        statusEl.style.color = "red";
      } else {
        statusEl.textContent = "✅ Good Posture";
        statusEl.style.color = "green";
      }
    } else {
      console.warn("No data found in table.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

setInterval(fetchLatestData, 2000);
fetchLatestData();
