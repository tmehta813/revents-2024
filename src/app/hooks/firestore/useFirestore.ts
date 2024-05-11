import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../store/store";
import { GenericActions } from "../../store/genericSlice";
import { DocumentData, collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"; // Added "doc" import
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

type ListenerState = {
    name?: string;
    unsubscribe: () => void;
};

export const useFireStore = <T extends DocumentData>(path: string) => {
    const listenersRef = useRef<ListenerState[]>([]);

    useEffect(() => {
        let listenerRefValue: ListenerState[] | null = null;
        if (listenersRef.current) {
            listenerRefValue = listenersRef.current;
        }
        return () => {
            if (listenerRefValue) {
                listenerRefValue.forEach(listener => {
                    listener.unsubscribe();
                });
            }
        };
    }, []);

    const dispatch = useAppDispatch();

    const loadCollection = useCallback((actions: GenericActions<T>) => {
        dispatch(actions.loading());
        const query = collection(db, path);

        const listener = onSnapshot(query, {
            next: querySnapshot => {
                const data: DocumentData[] = [];
                if (querySnapshot.empty) {
                    dispatch(actions.success([] as unknown as T));
                    return;
                }

                querySnapshot.forEach(doc => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                dispatch(actions.success(data as unknown as T));
            },
            error: error => {
                dispatch(actions.error(error.message));
                console.error('collection error:', error.message);
            }
        });
        listenersRef.current.push({ name: path, unsubscribe: listener });

    }, [dispatch, path]);

    const loadDocument = useCallback((id: string, actions: GenericActions<T>) => { // Added parentheses around parameters
        dispatch(actions.loading());
        const docRef = doc(db, path, id);
        const listener = onSnapshot(docRef, {
            next: doc => {
                if (!doc.exists) {
                    dispatch(actions.error('Document does not exist'));
                    return;
                }
                dispatch(actions.success({ id: doc.id, ...doc.data() } as unknown as T)); // Fixed typo
            }
        });
        listenersRef.current.push({ name: path + '/' + id, unsubscribe: listener });

    }, [dispatch, path]);

    const create = async (data: T) => {
        try {
            const ref = doc(collection(db, path))
            await (setDoc(ref, data))
            return ref
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const update = async (id: string, data: T) => {
        const docRef = doc(db, path, id)
        try {
            return await updateDoc(docRef, data);
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const remove = async (id: string) => {
        const docRef = doc(db, path, id)
        try {
            return await deleteDoc(docRef);
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const set = async (id: string, data: any) => {
        try {
            return await setDoc(doc(db, path, id), data)
        } catch (error: any) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return { loadCollection, loadDocument, create, update, remove, set };
};
