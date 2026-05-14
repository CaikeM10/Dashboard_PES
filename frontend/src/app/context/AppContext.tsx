import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { login as loginApi } from "../../services/api";
import { UserRole } from "../../../types/roles";
import {
  Challenge,
  StrategicObjective,
  Delivery,
  Goal,
  GoalStatus,
  ProgressUpdate,
  Sector,
  School,
  Student,
  User as MockUser,
  users as initialUsers,
  sectors as initialSectors,
  challenges as initialChallenges,
  objectives as initialObjectives,
  deliveries as initialDeliveries,
  goals as initialGoals,
  progressUpdates as initialProgressUpdates,
  schools as initialSchools,
  students as initialStudents,
} from "../data/mockData";

interface AuthUser {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
}

interface GoalFilter {
  objectiveId?: string;
  status?: GoalStatus;
}

interface AppContextType {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  loadingAuth: boolean;

  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;

  challenges: Challenge[];
  objectives: StrategicObjective[];
  deliveries: Delivery[];
  goals: Goal[];
  progressUpdates: ProgressUpdate[];
  sectors: Sector[];
  schools: School[];
  students: Student[];
  users: MockUser[];

  goalFilter: GoalFilter;
  setGoalFilter: (filter: GoalFilter) => void;

  addGoal: (goal: Omit<Goal, "id" | "lastUpdate" | "isClosed">) => void;
  updateGoal: (id: string, updatedFields: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  updateGoalProgress: (
    goalId: string,
    userId: string,
    newPercent: number,
    status: GoalStatus,
    observations: string,
  ) => void;

  addChallenge: (challenge: Omit<Challenge, "id">) => void;
  updateChallenge: (id: string, updatedFields: Partial<Challenge>) => void;
  deleteChallenge: (id: string) => void;

  addObjective: (objective: Omit<StrategicObjective, "id">) => void;
  updateObjective: (
    id: string,
    updatedFields: Partial<StrategicObjective>,
  ) => void;
  deleteObjective: (id: string) => void;

  addSector: (sector: Omit<Sector, "id">) => void;
  updateSector: (id: string, updatedFields: Partial<Sector>) => void;
  deleteSector: (id: string) => void;

  addSchool: (school: Omit<School, "id">) => void;
  updateSchool: (id: string, updatedFields: Partial<School>) => void;
  deleteSchool: (id: string) => void;

  addStudent: (student: Omit<Student, "id">) => void;
  updateStudent: (id: string, updatedFields: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  addUser: (user: Omit<MockUser, "id">) => void;
  updateUser: (id: string, updatedFields: Partial<MockUser>) => void;
  deleteUser: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [objectives, setObjectives] =
    useState<StrategicObjective[]>(initialObjectives);
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [progressUpdates, setProgressUpdates] = useState<ProgressUpdate[]>(
    initialProgressUpdates,
  );
  const [sectors, setSectors] = useState<Sector[]>(initialSectors);
  const [schools, setSchools] = useState<School[]>(initialSchools);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [users, setUsers] = useState<MockUser[]>(initialUsers);
  const [goalFilter, setGoalFilter] = useState<GoalFilter>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoadingAuth(false);
  }, []);

  const login = useCallback(async (email: string, senha: string) => {
    const data = await loginApi(email, senha);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setCurrentUser(data.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  }, []);

  const addGoal = useCallback(
    (goal: Omit<Goal, "id" | "lastUpdate" | "isClosed">) => {
      const newGoal: Goal = {
        ...goal,
        id: generateId("g"),
        lastUpdate: new Date().toISOString().slice(0, 10),
        isClosed: false,
      };
      setGoals((prev) => [...prev, newGoal]);
    },
    [],
  );

  const updateGoal = useCallback((id: string, updatedFields: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, ...updatedFields } : goal,
      ),
    );
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  }, []);

  const updateGoalProgress = useCallback(
    (
      goalId: string,
      userId: string,
      newPercent: number,
      status: GoalStatus,
      observations: string,
    ) => {
      setGoals((prev) =>
        prev.map((goal) =>
          goal.id === goalId
            ? {
                ...goal,
                executionPercent: newPercent,
                status,
                lastUpdate: new Date().toISOString().slice(0, 10),
              }
            : goal,
        ),
      );
      setProgressUpdates((prev) => [
        ...prev,
        {
          id: generateId("pu"),
          goalId,
          userId,
          previousPercent:
            goals.find((goal) => goal.id === goalId)?.executionPercent ?? 0,
          newPercent,
          status,
          observations,
          date: new Date().toISOString().slice(0, 10),
        },
      ]);
    },
    [goals],
  );

  const addChallenge = useCallback((challenge: Omit<Challenge, "id">) => {
    setChallenges((prev) => [...prev, { ...challenge, id: generateId("c") }]);
  }, []);

  const updateChallenge = useCallback(
    (id: string, updatedFields: Partial<Challenge>) => {
      setChallenges((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item,
        ),
      );
    },
    [],
  );

  const deleteChallenge = useCallback((id: string) => {
    setChallenges((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addObjective = useCallback(
    (objective: Omit<StrategicObjective, "id">) => {
      setObjectives((prev) => [...prev, { ...objective, id: generateId("o") }]);
    },
    [],
  );

  const updateObjective = useCallback(
    (id: string, updatedFields: Partial<StrategicObjective>) => {
      setObjectives((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item,
        ),
      );
    },
    [],
  );

  const deleteObjective = useCallback((id: string) => {
    setObjectives((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addSector = useCallback((sector: Omit<Sector, "id">) => {
    setSectors((prev) => [...prev, { ...sector, id: generateId("s") }]);
  }, []);

  const updateSector = useCallback(
    (id: string, updatedFields: Partial<Sector>) => {
      setSectors((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item,
        ),
      );
    },
    [],
  );

  const deleteSector = useCallback((id: string) => {
    setSectors((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addSchool = useCallback((school: Omit<School, "id">) => {
    setSchools((prev) => [...prev, { ...school, id: generateId("sc") }]);
  }, []);

  const updateSchool = useCallback(
    (id: string, updatedFields: Partial<School>) => {
      setSchools((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item,
        ),
      );
    },
    [],
  );

  const deleteSchool = useCallback((id: string) => {
    setSchools((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addStudent = useCallback((student: Omit<Student, "id">) => {
    setStudents((prev) => [...prev, { ...student, id: generateId("st") }]);
  }, []);

  const updateStudent = useCallback(
    (id: string, updatedFields: Partial<Student>) => {
      setStudents((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item,
        ),
      );
    },
    [],
  );

  const deleteStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addUser = useCallback((user: Omit<MockUser, "id">) => {
    setUsers((prev) => [...prev, { ...user, id: generateId("u") }]);
  }, []);

  const updateUser = useCallback(
    (id: string, updatedFields: Partial<MockUser>) => {
      setUsers((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item,
        ),
      );
    },
    [],
  );

  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        loadingAuth,
        login,
        logout,
        challenges,
        objectives,
        deliveries,
        goals,
        progressUpdates,
        sectors,
        schools,
        students,
        users,
        goalFilter,
        setGoalFilter,
        addGoal,
        updateGoal,
        deleteGoal,
        updateGoalProgress,
        addChallenge,
        updateChallenge,
        deleteChallenge,
        addObjective,
        updateObjective,
        deleteObjective,
        addSector,
        updateSector,
        deleteSector,
        addSchool,
        updateSchool,
        deleteSchool,
        addStudent,
        updateStudent,
        deleteStudent,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp deve ser usado dentro do AppProvider");
  }

  return context;
}
