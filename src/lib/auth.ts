export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: "demo" | "admin";
  city: string;
  organization: string;
  initials: string;
};

const AUTH_KEY = "polumexa_auth_v1";

export const DEMO_USER: DemoUser = {
  id: "demo-001",
  name: "Priya Sharma",
  email: "demo@polumexa.com",
  role: "demo",
  city: "Bhopal",
  organization: "Bhopal Municipal Corporation",
  initials: "PS",
};

export function getStoredUser(): DemoUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoUser;
  } catch {
    return null;
  }
}

export function loginAsDemo(): DemoUser {
  localStorage.setItem(AUTH_KEY, JSON.stringify(DEMO_USER));
  return DEMO_USER;
}

export function loginWithCredentials(email: string, password: string): DemoUser | null {
  const e = email.toLowerCase().trim();
  if (e === "demo@polumexa.com" && password === "demo123") {
    return loginAsDemo();
  }
  if (e === "admin@polumexa.com" && password === "admin123") {
    const admin: DemoUser = {
      id: "admin-001",
      name: "Sanskar Patwa",
      email: "admin@polumexa.com",
      role: "admin",
      city: "Indore",
      organization: "Polumexa Solutions",
      initials: "SP",
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(admin));
    return admin;
  }
  return null;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}
