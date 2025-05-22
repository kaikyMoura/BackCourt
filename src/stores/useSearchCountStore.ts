import app from '@/firebase/firebaseConfig';
import { collection, doc, getDoc, getDocs, getFirestore, increment, limit, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { create } from 'zustand';

export interface ISearchCount {
  id: string;
  name: string;
  count: number;
}

interface SearchCountStore {
  searchCounts: ISearchCount[];
  incrementePlayerSearchCount: (name: string) => Promise<void>
  getTopSearchedPlayers: () => Promise<ISearchCount[]>;
}

const db = getFirestore(app);

export const useSearchCountStore = create<SearchCountStore>(() => ({
  searchCounts: [],
  incrementePlayerSearchCount: async (name: string) => {
    const docRef = doc(db, "top_rated_players", name.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        count: increment(1),
      });
    } else {
      await setDoc(docRef, {
        name: name,
        count: 1,
      });
    }
  },
  getTopSearchedPlayers: async () => {
    const q = query(collection(db, "top_rated_players"), orderBy("count", "desc"), limit(5));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data()) as ISearchCount[];
  }
}));