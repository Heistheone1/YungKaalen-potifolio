import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface ContentData {
  [key: string]: any;
}

interface ContentContextType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  content: ContentData;
  updateSection: (section: string, data: any) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<ContentData>({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "content"), (snapshot) => {
      const data: ContentData = {};
      snapshot.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      setContent(data);
    });
    return () => unsubscribe();
  }, []);

  const updateSection = async (section: string, data: any) => {
    try {
      await setDoc(doc(db, "content", section), data, { merge: true });
    } catch (error) {
      console.error("Error updating section:", error);
      throw error;
    }
  };

  return (
    <ContentContext.Provider value={{ isAdmin, setIsAdmin, content, updateSection }}>
      {children}
    </ContentContext.Provider>
  );
}
