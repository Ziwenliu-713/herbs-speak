/** 中医馆信息 */
export interface TcmClinic {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  phone?: string;
}

/** 城市中心坐标 */
export interface CityInfo {
  name: string;
  nameEn: string;
  lat: number;
  lng: number;
  zoom: number;
  clinics: TcmClinic[];
}

export const tcmMapCities: CityInfo[] = [
  {
    name: '纽约',
    nameEn: 'New York',
    lat: 40.7128,
    lng: -74.006,
    zoom: 12,
    clinics: [
      { id: 'ny-1', name: 'Kam Woo Herbs & Tea', address: '211 Grand St, New York', lat: 40.718, lng: -73.995, rating: 4.6, reviewCount: 234 },
      { id: 'ny-2', name: 'New York Acupuncture', address: '123 Mott St, Chinatown', lat: 40.716, lng: -73.998, rating: 4.5, reviewCount: 189 },
      { id: 'ny-3', name: 'Eastern Approach TCM', address: '156 Canal St', lat: 40.722, lng: -74.002, rating: 4.7, reviewCount: 312 }
    ]
  },
  {
    name: '洛杉矶',
    nameEn: 'Los Angeles',
    lat: 34.0522,
    lng: -118.2437,
    zoom: 11,
    clinics: [
      { id: 'la-1', name: 'Santa Monica Acupuncture', address: '1234 Montana Ave, Santa Monica', lat: 34.032, lng: -118.491, rating: 4.7, reviewCount: 278 },
      { id: 'la-2', name: 'Chinatown TCM Clinic', address: '900 N Broadway', lat: 34.064, lng: -118.239, rating: 4.5, reviewCount: 156 }
    ]
  },
  {
    name: '巴黎',
    nameEn: 'Paris',
    lat: 48.8566,
    lng: 2.3522,
    zoom: 12,
    clinics: [
      { id: 'par-1', name: 'Centre de Médecine Chinoise', address: '15 rue du Temple, 4e', lat: 48.858, lng: 2.356, rating: 4.6, reviewCount: 198 },
      { id: 'par-2', name: 'Acupuncture Paris Centre', address: '42 rue de Rivoli', lat: 48.855, lng: 2.359, rating: 4.5, reviewCount: 145 }
    ]
  },
  {
    name: '伦敦',
    nameEn: 'London',
    lat: 51.5074,
    lng: -0.1278,
    zoom: 11,
    clinics: [
      { id: 'lon-1', name: 'London School of Acupuncture', address: 'The Bower, Old Street', lat: 51.524, lng: -0.088, rating: 4.7, reviewCount: 267 },
      { id: 'lon-2', name: 'Chinatown TCM Clinic', address: 'Gerrard St, Soho', lat: 51.511, lng: -0.132, rating: 4.6, reviewCount: 212 }
    ]
  },
  {
    name: '阿姆斯特丹',
    nameEn: 'Amsterdam',
    lat: 52.3676,
    lng: 4.9041,
    zoom: 12,
    clinics: [
      { id: 'ams-1', name: 'Acupunctuur Centrum Amsterdam', address: 'Prinsengracht 123', lat: 52.368, lng: 4.884, rating: 4.6, reviewCount: 178 },
      { id: 'ams-2', name: 'Chinese Geneeskunde', address: 'Nieuwendijk 45', lat: 52.375, lng: 4.896, rating: 4.5, reviewCount: 134 }
    ]
  },
  {
    name: '墨尔本',
    nameEn: 'Melbourne',
    lat: -37.8136,
    lng: 144.9631,
    zoom: 12,
    clinics: [
      { id: 'mel-1', name: 'Melbourne Natural Health', address: '235 Bourke St', lat: -37.813, lng: 144.966, rating: 4.7, reviewCount: 289 },
      { id: 'mel-2', name: 'Box Hill TCM Centre', address: 'Whitehorse Rd, Box Hill', lat: -37.819, lng: 145.123, rating: 4.6, reviewCount: 223 }
    ]
  }
];
