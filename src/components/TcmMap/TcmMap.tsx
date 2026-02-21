import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Language } from '../../i18n/LanguageContext';
import { pickText, ui } from '../../i18n/strings';
import { tcmMapCities } from '../../data/tcmMapData';
import type { CityInfo, TcmClinic } from '../../data/tcmMapData';

const DEFAULT_CENTER: [number, number] = [35.0, 105.0];
const DEFAULT_ZOOM = 4;

const clinicIcon = L.divIcon({
  className: 'tcmMapMarker',
  html: '<span aria-hidden>🏥</span>',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

interface TcmMapProps {
  lang: Language;
}

export function TcmMap({ lang }: TcmMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [cityInput, setCityInput] = useState('');
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);
  const [notFound, setNotFound] = useState(false);

  const searchCity = () => {
    const q = cityInput.trim();
    if (!q) return;
    const qLower = q.toLowerCase();
    const city = tcmMapCities.find(
      (c) =>
        c.name === q ||
        c.nameEn.toLowerCase() === qLower ||
        c.nameEn.toLowerCase().startsWith(qLower) ||
        (q.length >= 2 && c.name.includes(q))
    );
    setNotFound(!city);
    setSelectedCity(city ?? null);
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const map = L.map(mapRef.current).setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current = [];
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (!selectedCity) {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      return;
    }

    map.setView([selectedCity.lat, selectedCity.lng], selectedCity.zoom);

    selectedCity.clinics.forEach((clinic) => {
      const popup = L.popup().setContent(
        renderPopupContent(clinic, lang)
      );
      const marker = L.marker([clinic.lat, clinic.lng], { icon: clinicIcon })
        .addTo(map)
        .bindPopup(popup);
      markersRef.current.push(marker);
    });
  }, [selectedCity, lang]);

  return (
    <section className="tcmMapSection" aria-label="中医地图">
      <div className="tcmMapSearchBar">
        <input
          type="text"
          className="tcmMapInput"
          placeholder={pickText(ui.caojiShop.tcmMapPlaceholder, lang)}
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchCity()}
        />
        <button type="button" className="tcmMapSearchBtn" onClick={searchCity}>
          {pickText(ui.caojiShop.tcmMapSearch, lang)}
        </button>
      </div>
      <p className="tcmMapDemoHint">{pickText(ui.caojiShop.tcmMapDemoHint, lang)}</p>
      {notFound && (
        <p className="tcmMapNotFound">
          {lang === 'zh' ? '暂未收录该城市，敬请期待～' : 'City not yet available. Coming soon!'}
        </p>
      )}
      <div ref={mapRef} className="tcmMapContainer" />
    </section>
  );
}

function renderPopupContent(clinic: TcmClinic, lang: Language): string {
  const rating = pickText(ui.caojiShop.tcmMapRating, lang);
  const reviews = pickText(ui.caojiShop.tcmMapReviews, lang);
  return `
    <div class="tcmMapPopup">
      <strong>${clinic.name}</strong>
      <p class="tcmMapPopupAddr">${clinic.address}</p>
      <p class="tcmMapPopupRating">${rating}: ${clinic.rating} ★ · ${clinic.reviewCount}${reviews}</p>
      ${clinic.phone ? `<p>${clinic.phone}</p>` : ''}
    </div>
  `;
}
