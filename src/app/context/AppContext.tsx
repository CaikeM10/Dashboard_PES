import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import {
  User,
  Sector,
  StrategicObjective,
  Goal,
  ProgressUpdate,
  GoalStatus,
  Challenge,
  Delivery,
  Action,
  School,
  Student,
  GoalClosure,
  users as initialUsers,
  sectors as initialSectors,
  objectives as initialObjectives,
  goals as initialGoals,
  progressUpdates as initialUpdates,
  challenges as initialChallenges,
  deliveries as initialDeliveries,
  actions as initialActions,
  schools as initialSchools,
  students as initialStudents,
} from "../data/mockData";

interface AppContextType {
  // Auth
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // Data
  users: User[];
  sectors: Sector[];
  challenges: Challenge[];
  objectives: StrategicObjective[];
  deliveries: Delivery[];
  goals: Goal[];
  progressUpdates: ProgressUpdate[];
  actions: Action[];
  schools: School[];
  students: Student[];

  // CRUD - Challenges
  addChallenge: (challenge: Omit<Challenge, "id" | "number">) => void;
  updateChallenge: (id: string, data: Partial<Challenge>) => void;
  deleteChallenge: (id: string) => void;

  // CRUD - Objectives
  addObjective: (obj: Omit<StrategicObjective, "id" | "number">) => void;
  updateObjective: (id: string, data: Partial<StrategicObjective>) => void;
  deleteObjective: (id: string) => void;

  // CRUD - Deliveries
  addDelivery: (delivery: Omit<Delivery, "id">) => void;
  updateDelivery: (id: string, data: Partial<Delivery>) => void;
  deleteDelivery: (id: string) => void;

  // CRUD - Goals
  addGoal: (goal: Omit<Goal, "id" | "lastUpdate">) => void;
  updateGoal: (id: string, data: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  updateGoalProgress: (
    goalId: string,
    userId: string,
    newPercent: number,
    status: GoalStatus,
    observations: string
  ) => void;
  closeGoal: (goalId: string, closure: GoalClosure) => void;

  // CRUD - Actions
  addAction: (action: Omit<Action, "id">) => void;
  updateAction: (id: string, data: Partial<Action>) => void;
  deleteAction: (id: string) => void;

  // CRUD - Sectors
  addSector: (name: string) => void;
  updateSector: (id: string, name: string) => void;
  deleteSector: (id: string) => void;

  // CRUD - Users
  addUser: (user: Omit<User, "id">) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // CRUD - Schools
  addSchool: (school: Omit<School, "id">) => void;
  updateSchool: (id: string, data: Partial<School>) => void;
  deleteSchool: (id: string) => void;

  // CRUD - Students
  addStudent: (student: Omit<Student, "id">) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  // Filter
  goalFilter: GoalFilter;
  setGoalFilter: (filter: GoalFilter) => void;
}

export interface GoalFilter {
  objectiveId?: string;
  sectorId?: string;
  status?: GoalStatus | "";
  deadline?: string;
  search?: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [sectors, setSectors] = useState<Sector[]>(initialSectors);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [objectives, setObjectives] = useState<StrategicObjective[]>(initialObjectives);
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [progressUpdates, setProgressUpdates] = useState<ProgressUpdate[]>(initialUpdates);
  const [actions, setActions] = useState<Action[]>(initialActions);
  const [schools, setSchools] = useState<School[]>(initialSchools);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [goalFilter, setGoalFilter] = useState<GoalFilter>({});

  const login = useCallback(
    (email: string, password: string): boolean => {
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        setCurrentUser(user);
        return true;
      }
      return false;
    },
    [users]
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  // Challenges
  const addChallenge = useCallback((data: Omit<Challenge, "id" | "number">) => {
    setChallenges((prev) => {
      const maxNum = prev.reduce((max, o) => Math.max(max, o.number), 0);
      return [...prev, { ...data, id: `c${Date.now()}`, number: maxNum + 1 }];
    });
  }, []);

  const updateChallenge = useCallback((id: string, data: Partial<Challenge>) => {
    setChallenges((prev) => prev.map((o) => (o.id === id ? { ...o, ...data } : o)));
  }, []);

  const deleteChallenge = useCallback((id: string) => {
    setChallenges((prev) => prev.filter((o) => o.id !== id));
  }, []);

  // Objectives
  const addObjective = useCallback((data: Omit<StrategicObjective, "id" | "number">) => {
    setObjectives((prev) => {
      const maxNum = prev.reduce((max, o) => Math.max(max, o.number), 0);
      return [...prev, { ...data, id: `o${Date.now()}`, number: maxNum + 1 }];
    });
  }, []);

  const updateObjective = useCallback((id: string, data: Partial<StrategicObjective>) => {
    setObjectives((prev) => prev.map((o) => (o.id === id ? { ...o, ...data } : o)));
  }, []);

  const deleteObjective = useCallback((id: string) => {
    setObjectives((prev) => prev.filter((o) => o.id !== id));
    setGoals((prev) => prev.filter((g) => g.objectiveId !== id));
  }, []);

  // Deliveries
  const addDelivery = useCallback((data: Omit<Delivery, "id">) => {
    setDeliveries((prev) => [...prev, { ...data, id: `d${Date.now()}` }]);
  }, []);

  const updateDelivery = useCallback((id: string, data: Partial<Delivery>) => {
    setDeliveries((prev) => prev.map((d) => (d.id === id ? { ...d, ...data } : d)));
  }, []);

  const deleteDelivery = useCallback((id: string) => {
    setDeliveries((prev) => prev.filter((d) => d.id !== id));
  }, []);

  // Goals
  const addGoal = useCallback((data: Omit<Goal, "id" | "lastUpdate">) => {
    const today = new Date().toISOString().split("T")[0];
    setGoals((prev) => [...prev, { ...data, id: `m${Date.now()}`, lastUpdate: today }]);
  }, []);

  const updateGoal = useCallback((id: string, data: Partial<Goal>) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...data } : g)));
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    setProgressUpdates((prev) => prev.filter((u) => u.goalId !== id));
  }, []);

  const updateGoalProgress = useCallback(
    (goalId: string, userId: string, newPercent: number, status: GoalStatus, observations: string) => {
      const today = new Date().toISOString().split("T")[0];
      setGoals((prev) => {
        const goal = prev.find((g) => g.id === goalId);
        const prevPercent = goal?.executionPercent ?? 0;
        const update: ProgressUpdate = {
          id: `pu${Date.now()}`,
          goalId,
          userId,
          previousPercent: prevPercent,
          newPercent,
          status,
          observations,
          date: today,
        };
        setProgressUpdates((upd) => [update, ...upd]);
        return prev.map((g) =>
          g.id === goalId ? { ...g, executionPercent: newPercent, status, lastUpdate: today } : g
        );
      });
    },
    []
  );

  const closeGoal = useCallback((goalId: string, closure: GoalClosure) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId ? { ...g, closure, isClosed: true } : g
      )
    );
  }, []);

  // Actions
  const addAction = useCallback((data: Omit<Action, "id">) => {
    setActions((prev) => [...prev, { ...data, id: `a${Date.now()}` }]);
  }, []);

  const updateAction = useCallback((id: string, data: Partial<Action>) => {
    setActions((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)));
  }, []);

  const deleteAction = useCallback((id: string) => {
    setActions((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // Sectors
  const addSector = useCallback((name: string) => {
    setSectors((prev) => [...prev, { id: `s${Date.now()}`, name }]);
  }, []);

  const updateSector = useCallback((id: string, name: string) => {
    setSectors((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)));
  }, []);

  const deleteSector = useCallback((id: string) => {
    setSectors((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Users
  const addUser = useCallback((data: Omit<User, "id">) => {
    setUsers((prev) => [...prev, { ...data, id: `u${Date.now()}` }]);
  }, []);

  const updateUser = useCallback((id: string, data: Partial<User>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
  }, []);

  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  // Schools
  const addSchool = useCallback((data: Omit<School, "id">) => {
    setSchools((prev) => [...prev, { ...data, id: `sc${Date.now()}` }]);
  }, []);

  const updateSchool = useCallback((id: string, data: Partial<School>) => {
    setSchools((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
  }, []);

  const deleteSchool = useCallback((id: string) => {
    setSchools((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Students
  const addStudent = useCallback((data: Omit<Student, "id">) => {
    setStudents((prev) => [...prev, { ...data, id: `st${Date.now()}` }]);
  }, []);

  const updateStudent = useCallback((id: string, data: Partial<Student>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        users,
        sectors,
        challenges,
        objectives,
        deliveries,
        goals,
        progressUpdates,
        actions,
        schools,
        students,
        addObjective,
        updateObjective,
        deleteObjective,
        addGoal,
        updateGoal,
        deleteGoal,
        updateGoalProgress,
        closeGoal,
        addSector,
        updateSector,
        deleteSector,
        addUser,
        updateUser,
        deleteUser,
        addSchool,
        updateSchool,
        deleteSchool,
        addStudent,
        updateStudent,
        deleteStudent,
        addChallenge,
        updateChallenge,
        deleteChallenge,
        addDelivery,
        updateDelivery,
        deleteDelivery,
        addAction,
        updateAction,
        deleteAction,
        goalFilter,
        setGoalFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}