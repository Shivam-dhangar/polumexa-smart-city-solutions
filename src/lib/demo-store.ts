// ─── Types ──────────────────────────────────────────────────────────────────

export type Bin = {
  id: string;
  code: string;
  location: string;
  zone: string;
  fill: number;
  battery: number;
  sensor: "ok" | "warn" | "error";
  lastUpdated: string;
  capacity: number;
};

export type Collection = {
  id: string;
  date: string;
  zone: string;
  binCode: string;
  vehicleCode: string;
  weightKg: number;
  recycledKg: number;
  driver: string;
  status: "completed" | "pending" | "cancelled";
};

export type Vehicle = {
  id: string;
  code: string;
  driver: string;
  zone: string;
  status: "active" | "idle" | "maintenance";
  loadPercent: number;
  fuelType: "EV" | "CNG" | "Diesel";
  tripsThisMonth: number;
};

export type Citizen = {
  id: string;
  name: string;
  apartment: string;
  zone: string;
  points: number;
  rewardsEarned: number;
  recyclingsThisMonth: number;
  joinedDate: string;
};

export type Store = {
  bins: Bin[];
  collections: Collection[];
  vehicles: Vehicle[];
  citizens: Citizen[];
};

// ─── Seed Data ───────────────────────────────────────────────────────────────

const SEED_BINS: Bin[] = [
  { id: "b1",  code: "BIN-A01", location: "Civic Plaza",       zone: "Zone A", fill: 84, battery: 92, sensor: "ok",   lastUpdated: "2026-06-16T08:22:00", capacity: 120 },
  { id: "b2",  code: "BIN-A02", location: "Town Hall Gate",    zone: "Zone A", fill: 32, battery: 78, sensor: "ok",   lastUpdated: "2026-06-16T07:55:00", capacity: 120 },
  { id: "b3",  code: "BIN-A03", location: "Central Park",      zone: "Zone A", fill: 96, battery: 45, sensor: "ok",   lastUpdated: "2026-06-16T09:10:00", capacity: 120 },
  { id: "b4",  code: "BIN-B01", location: "Tech Park Gate 1",  zone: "Zone B", fill: 58, battery: 88, sensor: "ok",   lastUpdated: "2026-06-16T08:45:00", capacity: 200 },
  { id: "b5",  code: "BIN-B02", location: "Tech Park Gate 3",  zone: "Zone B", fill: 96, battery: 71, sensor: "ok",   lastUpdated: "2026-06-16T09:00:00", capacity: 200 },
  { id: "b6",  code: "BIN-B03", location: "Factory Row",       zone: "Zone B", fill: 72, battery: 62, sensor: "warn", lastUpdated: "2026-06-16T06:30:00", capacity: 300 },
  { id: "b7",  code: "BIN-C01", location: "Greenfield Apt A",  zone: "Zone C", fill: 42, battery: 95, sensor: "ok",   lastUpdated: "2026-06-16T08:00:00", capacity: 80  },
  { id: "b8",  code: "BIN-C02", location: "Greenfield Apt B",  zone: "Zone C", fill: 67, battery: 81, sensor: "ok",   lastUpdated: "2026-06-16T07:40:00", capacity: 80  },
  { id: "b9",  code: "BIN-C03", location: "Riverside Heights", zone: "Zone C", fill: 18, battery: 23, sensor: "warn", lastUpdated: "2026-06-16T05:15:00", capacity: 80  },
  { id: "b10", code: "BIN-D01", location: "St. Mary School",   zone: "Zone D", fill: 55, battery: 90, sensor: "ok",   lastUpdated: "2026-06-16T08:30:00", capacity: 100 },
  { id: "b11", code: "BIN-D02", location: "Riverside Market",  zone: "Zone D", fill: 79, battery: 67, sensor: "ok",   lastUpdated: "2026-06-16T09:05:00", capacity: 100 },
  { id: "b12", code: "BIN-D03", location: "Community Center",  zone: "Zone D", fill: 88, battery: 55, sensor: "ok",   lastUpdated: "2026-06-16T08:55:00", capacity: 100 },
];

const SEED_COLLECTIONS: Collection[] = [
  { id: "c1",  date: "2026-06-16", zone: "Zone A", binCode: "BIN-A01", vehicleCode: "EV-01", weightKg: 92,  recycledKg: 71,  driver: "Ramesh K.",  status: "completed" },
  { id: "c2",  date: "2026-06-16", zone: "Zone B", binCode: "BIN-B02", vehicleCode: "EV-03", weightKg: 187, recycledKg: 142, driver: "Suresh P.",  status: "completed" },
  { id: "c3",  date: "2026-06-16", zone: "Zone C", binCode: "BIN-C02", vehicleCode: "EV-02", weightKg: 54,  recycledKg: 40,  driver: "Vikram T.",  status: "pending"   },
  { id: "c4",  date: "2026-06-15", zone: "Zone A", binCode: "BIN-A03", vehicleCode: "EV-01", weightKg: 110, recycledKg: 88,  driver: "Ramesh K.",  status: "completed" },
  { id: "c5",  date: "2026-06-15", zone: "Zone B", binCode: "BIN-B01", vehicleCode: "EV-04", weightKg: 145, recycledKg: 108, driver: "Ankit M.",   status: "completed" },
  { id: "c6",  date: "2026-06-15", zone: "Zone D", binCode: "BIN-D02", vehicleCode: "EV-05", weightKg: 78,  recycledKg: 55,  driver: "Pawan S.",   status: "completed" },
  { id: "c7",  date: "2026-06-14", zone: "Zone A", binCode: "BIN-A02", vehicleCode: "EV-02", weightKg: 66,  recycledKg: 50,  driver: "Vikram T.",  status: "completed" },
  { id: "c8",  date: "2026-06-14", zone: "Zone C", binCode: "BIN-C01", vehicleCode: "EV-03", weightKg: 43,  recycledKg: 34,  driver: "Suresh P.",  status: "completed" },
  { id: "c9",  date: "2026-06-14", zone: "Zone B", binCode: "BIN-B03", vehicleCode: "EV-06", weightKg: 220, recycledKg: 162, driver: "Deepak R.",  status: "completed" },
  { id: "c10", date: "2026-06-13", zone: "Zone D", binCode: "BIN-D01", vehicleCode: "EV-01", weightKg: 58,  recycledKg: 44,  driver: "Ramesh K.",  status: "completed" },
  { id: "c11", date: "2026-06-13", zone: "Zone A", binCode: "BIN-A01", vehicleCode: "EV-04", weightKg: 95,  recycledKg: 72,  driver: "Ankit M.",   status: "completed" },
  { id: "c12", date: "2026-06-13", zone: "Zone B", binCode: "BIN-B02", vehicleCode: "EV-05", weightKg: 178, recycledKg: 130, driver: "Pawan S.",   status: "completed" },
  { id: "c13", date: "2026-06-12", zone: "Zone C", binCode: "BIN-C03", vehicleCode: "EV-02", weightKg: 37,  recycledKg: 28,  driver: "Vikram T.",  status: "completed" },
  { id: "c14", date: "2026-06-12", zone: "Zone A", binCode: "BIN-A03", vehicleCode: "EV-06", weightKg: 103, recycledKg: 82,  driver: "Deepak R.",  status: "completed" },
  { id: "c15", date: "2026-06-12", zone: "Zone D", binCode: "BIN-D03", vehicleCode: "EV-03", weightKg: 81,  recycledKg: 60,  driver: "Suresh P.",  status: "completed" },
  { id: "c16", date: "2026-06-11", zone: "Zone B", binCode: "BIN-B01", vehicleCode: "EV-01", weightKg: 160, recycledKg: 118, driver: "Ramesh K.",  status: "completed" },
  { id: "c17", date: "2026-06-11", zone: "Zone A", binCode: "BIN-A02", vehicleCode: "EV-04", weightKg: 72,  recycledKg: 56,  driver: "Ankit M.",   status: "completed" },
  { id: "c18", date: "2026-06-11", zone: "Zone C", binCode: "BIN-C02", vehicleCode: "EV-05", weightKg: 50,  recycledKg: 38,  driver: "Pawan S.",   status: "completed" },
  { id: "c19", date: "2026-06-10", zone: "Zone D", binCode: "BIN-D01", vehicleCode: "EV-02", weightKg: 62,  recycledKg: 48,  driver: "Vikram T.",  status: "completed" },
  { id: "c20", date: "2026-06-10", zone: "Zone B", binCode: "BIN-B03", vehicleCode: "EV-06", weightKg: 198, recycledKg: 150, driver: "Deepak R.",  status: "completed" },
  { id: "c21", date: "2026-06-10", zone: "Zone A", binCode: "BIN-A01", vehicleCode: "EV-03", weightKg: 88,  recycledKg: 68,  driver: "Suresh P.",  status: "completed" },
  { id: "c22", date: "2026-06-09", zone: "Zone C", binCode: "BIN-C01", vehicleCode: "EV-01", weightKg: 45,  recycledKg: 35,  driver: "Ramesh K.",  status: "completed" },
  { id: "c23", date: "2026-06-09", zone: "Zone D", binCode: "BIN-D02", vehicleCode: "EV-04", weightKg: 76,  recycledKg: 58,  driver: "Ankit M.",   status: "completed" },
];

const SEED_VEHICLES: Vehicle[] = [
  { id: "v1", code: "EV-01", driver: "Ramesh Kumar",  zone: "Zone A", status: "active",      loadPercent: 78,  fuelType: "EV",     tripsThisMonth: 22 },
  { id: "v2", code: "EV-02", driver: "Vikram Thakur", zone: "Zone C", status: "active",      loadPercent: 42,  fuelType: "EV",     tripsThisMonth: 18 },
  { id: "v3", code: "EV-03", driver: "Suresh Patel",  zone: "Zone B", status: "active",      loadPercent: 91,  fuelType: "EV",     tripsThisMonth: 25 },
  { id: "v4", code: "EV-04", driver: "Ankit Mishra",  zone: "Zone A", status: "idle",        loadPercent: 30,  fuelType: "CNG",    tripsThisMonth: 14 },
  { id: "v5", code: "EV-05", driver: "Pawan Singh",   zone: "Zone D", status: "active",      loadPercent: 64,  fuelType: "CNG",    tripsThisMonth: 19 },
  { id: "v6", code: "EV-06", driver: "Deepak Rawat",  zone: "Zone B", status: "maintenance", loadPercent: 0,   fuelType: "Diesel", tripsThisMonth: 11 },
];

const SEED_CITIZENS: Citizen[] = [
  { id: "cz1",  name: "Aisha Verma",    apartment: "Greenfield A-401", zone: "Zone C", points: 4820, rewardsEarned: 960,  recyclingsThisMonth: 28, joinedDate: "2026-01-12" },
  { id: "cz2",  name: "Ravi Gupta",     apartment: "Civic Tower 12B",  zone: "Zone A", points: 4310, rewardsEarned: 862,  recyclingsThisMonth: 24, joinedDate: "2026-02-08" },
  { id: "cz3",  name: "Sunita Joshi",   apartment: "Riverside Hts 5C", zone: "Zone C", points: 3950, rewardsEarned: 790,  recyclingsThisMonth: 21, joinedDate: "2026-01-25" },
  { id: "cz4",  name: "Mohit Sharma",   apartment: "Greenfield B-203", zone: "Zone C", points: 3780, rewardsEarned: 756,  recyclingsThisMonth: 19, joinedDate: "2026-02-15" },
  { id: "cz5",  name: "Kavita Patel",   apartment: "Community Block 7", zone: "Zone D", points: 3420, rewardsEarned: 684, recyclingsThisMonth: 18, joinedDate: "2026-03-05" },
  { id: "cz6",  name: "Arjun Singh",    apartment: "Civic Tower 8A",   zone: "Zone A", points: 3100, rewardsEarned: 620,  recyclingsThisMonth: 16, joinedDate: "2026-02-28" },
  { id: "cz7",  name: "Pooja Mehta",    apartment: "Greenfield A-102", zone: "Zone C", points: 2890, rewardsEarned: 578,  recyclingsThisMonth: 15, joinedDate: "2026-03-18" },
  { id: "cz8",  name: "Sunil Rajput",   apartment: "Market Lane 3",    zone: "Zone D", points: 2650, rewardsEarned: 530,  recyclingsThisMonth: 13, joinedDate: "2026-04-02" },
  { id: "cz9",  name: "Neha Tiwari",    apartment: "Civic Tower 5C",   zone: "Zone A", points: 2440, rewardsEarned: 488,  recyclingsThisMonth: 12, joinedDate: "2026-04-10" },
  { id: "cz10", name: "Ajay Kulkarni",  apartment: "Tech Park Res 2",  zone: "Zone B", points: 2210, rewardsEarned: 442,  recyclingsThisMonth: 11, joinedDate: "2026-04-22" },
];

// ─── Storage ─────────────────────────────────────────────────────────────────

const STORE_KEY = "polumexa_data_v1";

function initStore(): Store {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw) as Store;
  } catch {}
  const seed: Store = {
    bins: SEED_BINS,
    collections: SEED_COLLECTIONS,
    vehicles: SEED_VEHICLES,
    citizens: SEED_CITIZENS,
  };
  localStorage.setItem(STORE_KEY, JSON.stringify(seed));
  return seed;
}

function saveStore(store: Store): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function getStore(): Store {
  return initStore();
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Bin CRUD ─────────────────────────────────────────────────────────────────

export function getBins(): Bin[] {
  return getStore().bins;
}

export function addBin(data: Omit<Bin, "id" | "lastUpdated">): Bin {
  const store = getStore();
  const bin: Bin = { ...data, id: uid(), lastUpdated: new Date().toISOString() };
  store.bins.push(bin);
  saveStore(store);
  return bin;
}

export function updateBin(id: string, data: Partial<Omit<Bin, "id">>): Bin | null {
  const store = getStore();
  const idx = store.bins.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  store.bins[idx] = { ...store.bins[idx], ...data, lastUpdated: new Date().toISOString() };
  saveStore(store);
  return store.bins[idx];
}

export function deleteBin(id: string): void {
  const store = getStore();
  store.bins = store.bins.filter((b) => b.id !== id);
  saveStore(store);
}

// ─── Collection CRUD ──────────────────────────────────────────────────────────

export function getCollections(): Collection[] {
  return getStore().collections.sort((a, b) => b.date.localeCompare(a.date));
}

export function addCollection(data: Omit<Collection, "id">): Collection {
  const store = getStore();
  const col: Collection = { ...data, id: uid() };
  store.collections.unshift(col);
  saveStore(store);
  return col;
}

export function deleteCollection(id: string): void {
  const store = getStore();
  store.collections = store.collections.filter((c) => c.id !== id);
  saveStore(store);
}

// ─── Vehicle CRUD ─────────────────────────────────────────────────────────────

export function getVehicles(): Vehicle[] {
  return getStore().vehicles;
}

export function addVehicle(data: Omit<Vehicle, "id">): Vehicle {
  const store = getStore();
  const v: Vehicle = { ...data, id: uid() };
  store.vehicles.push(v);
  saveStore(store);
  return v;
}

export function updateVehicle(id: string, data: Partial<Omit<Vehicle, "id">>): Vehicle | null {
  const store = getStore();
  const idx = store.vehicles.findIndex((v) => v.id === id);
  if (idx === -1) return null;
  store.vehicles[idx] = { ...store.vehicles[idx], ...data };
  saveStore(store);
  return store.vehicles[idx];
}

export function deleteVehicle(id: string): void {
  const store = getStore();
  store.vehicles = store.vehicles.filter((v) => v.id !== id);
  saveStore(store);
}

// ─── Citizens ─────────────────────────────────────────────────────────────────

export function getCitizens(): Citizen[] {
  return getStore().citizens.sort((a, b) => b.points - a.points);
}

export function updateCitizenPoints(id: string, pointsDelta: number): Citizen | null {
  const store = getStore();
  const idx = store.citizens.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  store.citizens[idx].points += pointsDelta;
  store.citizens[idx].rewardsEarned = Math.round(store.citizens[idx].points * 0.2);
  saveStore(store);
  return store.citizens[idx];
}

// ─── Analytics helpers ────────────────────────────────────────────────────────

export type DailyStats = {
  date: string;
  label: string;
  totalKg: number;
  recycledKg: number;
};

export function getLast7DaysStats(): DailyStats[] {
  const collections = getStore().collections;
  const days: DailyStats[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date("2026-06-16");
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const dayColls = collections.filter((c) => c.date === dateStr);
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    days.push({
      date: dateStr,
      label: labels[d.getDay() === 0 ? 6 : d.getDay() - 1],
      totalKg: dayColls.reduce((s, c) => s + c.weightKg, 0),
      recycledKg: dayColls.reduce((s, c) => s + c.recycledKg, 0),
    });
  }
  return days;
}

export type ZoneStats = {
  zone: string;
  totalKg: number;
  recycledKg: number;
  collections: number;
};

export function getZoneStats(): ZoneStats[] {
  const collections = getStore().collections;
  const zones = ["Zone A", "Zone B", "Zone C", "Zone D"];
  return zones.map((zone) => {
    const zc = collections.filter((c) => c.zone === zone);
    return {
      zone,
      totalKg: zc.reduce((s, c) => s + c.weightKg, 0),
      recycledKg: zc.reduce((s, c) => s + c.recycledKg, 0),
      collections: zc.length,
    };
  });
}

export function getTodayCollections(): Collection[] {
  return getStore().collections.filter((c) => c.date === "2026-06-16");
}

export function resetStore(): void {
  localStorage.removeItem(STORE_KEY);
  initStore();
}
