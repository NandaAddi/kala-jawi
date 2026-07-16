export interface MockUser {
  id: string;
  nama: string;
  email: string;
  role: "guru" | "siswa";
}

const isBrowser = typeof window !== "undefined";

let mockUser: MockUser | null = null;

export function setMockUser(user: MockUser | null) {
  mockUser = user;
  if (isBrowser && user) {
    localStorage.setItem("kj_mock_user", JSON.stringify(user));
  } else if (isBrowser) {
    localStorage.removeItem("kj_mock_user");
  }
}

export function getMockUser(): MockUser | null {
  if (mockUser) return mockUser;

  if (!isBrowser) return null;

  const stored = localStorage.getItem("kj_mock_user");
  if (stored) {
    mockUser = JSON.parse(stored);
    return mockUser;
  }

  return null;
}

export function isAuthenticated(): boolean {
  return !!getMockUser();
}

export function requireAuth() {
  if (!isAuthenticated()) {
    throw new Error("Unauthorized");
  }
  return getMockUser()!;
}
