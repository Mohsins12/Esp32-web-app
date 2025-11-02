// script.js — fetch latest row from Esp_data_log and update DOM
console.log("Script loaded!");
const SUPABASE_URL = "https://hvxyydtubqvbtmheluec.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eHl5ZHR1YnF2YnRtaGVsdWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTg2NzMsImV4cCI6MjA3NzU3NDY3M30.am66MDwDqnCKHDNPT8a-S_dUwuEoMzDrHgk802uWKDU";

// If your table name has uppercase letters keep them quoted in the URL.
// We use double quotes encoded in URL as %22 — easier: include table name exactly with quotes.


const TABLE = '%22Esp_data_log%22'; // equals "Esp_data_log"

async function fetchLatest() {
  try {
    const url = `${SUPABASE_URL}/rest/v1/${TABLE}?select=sensor_value,deflection&order=id.desc&limit=1`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Supabase REST error:', res.status, text);
      return;
    }

    const rows = await res.json();
    if (!rows || rows.length === 0) {
      // no data yet
      document.getElementById('sensorValue').textContent = '--';
      document.getElementById('deflection').textContent = '--';
      document.getElementById('status').textContent = '--';
      return;
    }

    const row = rows[0];
    // handle missing fields gracefully
    const sensor = (row.sensor_value !== null && row.sensor_value !== undefined) ? Number(row.sensor_value) : null;
    const deflection = (row.deflection !== null && row.deflection !== undefined) ? Number(row.deflection) : null;

    document.getElementById('sensorValue').textContent = (sensor !== null) ? sensor.toFixed(2) : '--';
    document.getElementById('deflection').textContent = (deflection !== null) ? deflection.toFixed(3) : '--';

    // ON/OFF logic — change threshold as you need
    const threshold = 0.5;
    const statusEl = document.getElementById('status');
    if (deflection === null) {
      statusEl.textContent = '--';
      statusEl.style.color = '#333';
    } else if (deflection > threshold) {
      statusEl.textContent = 'ON';
      statusEl.style.color = 'green';
    } else {
      statusEl.textContent = 'OFF';
      statusEl.style.color = 'red';
    }

  } catch (err) {
    console.error('Fetch error:', err);
  }
}

// refresh every 2s
setInterval(fetchLatest, 2000);
fetchLatest();
