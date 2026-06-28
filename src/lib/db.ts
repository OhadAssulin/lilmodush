import { Parent, Child } from "@/types";

const STORAGE_KEY = "lilmodush_data";

interface Database {
  parents: Record<string, Parent>;
}

function getDb(): Database {
  if (typeof window === "undefined") {
    return { parents: {} };
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { parents: {} };
  }
  return JSON.parse(stored);
}

function saveDb(db: Database): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function loginParent(username: string): Parent {
  const db = getDb();
  if (!db.parents[username]) {
    db.parents[username] = {
      username,
      children: [],
      createdAt: new Date().toISOString(),
    };
    saveDb(db);
  }
  return db.parents[username];
}

export function getParent(username: string): Parent | null {
  const db = getDb();
  return db.parents[username] || null;
}

export function addChild(username: string, child: Child): void {
  const db = getDb();
  if (!db.parents[username]) return;
  db.parents[username].children.push(child);
  saveDb(db);
}

export function updateChild(username: string, childId: string, updates: Partial<Child>): void {
  const db = getDb();
  if (!db.parents[username]) return;
  const childIndex = db.parents[username].children.findIndex((c) => c.id === childId);
  if (childIndex === -1) return;
  db.parents[username].children[childIndex] = {
    ...db.parents[username].children[childIndex],
    ...updates,
  };
  saveDb(db);
}

export function deleteChild(username: string, childId: string): void {
  const db = getDb();
  if (!db.parents[username]) return;
  db.parents[username].children = db.parents[username].children.filter((c) => c.id !== childId);
  saveDb(db);
}

export function getChildById(childId: string): { child: Child; parentUsername: string } | null {
  const db = getDb();
  for (const [username, parent] of Object.entries(db.parents)) {
    const child = parent.children.find((c) => c.id === childId);
    if (child) {
      return { child, parentUsername: username };
    }
  }
  return null;
}

export function updateChildProgress(
  childId: string,
  subject: keyof Child["progress"],
  progress: number
): void {
  const db = getDb();
  for (const parent of Object.values(db.parents)) {
    const childIndex = parent.children.findIndex((c) => c.id === childId);
    if (childIndex !== -1) {
      parent.children[childIndex].progress[subject] = Math.min(100, progress);
      saveDb(db);
      return;
    }
  }
}
