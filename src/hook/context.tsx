import { collection, getDocs } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { db } from "../firebase";

interface PropType {
  children: ReactNode;
}
interface DataType {
  id: string;
  name: string;
  company: string;
  age: string;
  mobile: string;
  email: string;
}

interface ContextType {
  data: DataType;
  fetchData: () => void;
}
export const MyContext = createContext<ContextType>({
  data: [],
  fetchData: () => {},
});

export const ContextProvider = ({ children }: PropType) => {
  const [data, setData] = useState<DataType[]>([]);

  const fetchData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "data"));
      const comingData = snapshot.docs.map((doc) => ({
        ...(doc.data() as Omit<DataType, "id">),
        id: doc.id,
      }));
      setData(comingData);
    } catch (error) {
      console.log("Error while fetching : ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <MyContext.Provider value={{ data, fetchData }}>
      {children}
    </MyContext.Provider>
  );
};
