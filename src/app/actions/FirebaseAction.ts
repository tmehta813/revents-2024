import { collection, doc, increment, writeBatch } from "firebase/firestore";
import { Profile } from "../../features/profiles/profile";
import { auth, db } from "../config/firebase";

export async function batchFollowToggle(profile: Profile, follow: boolean) {
    const currentUser = auth.currentUser;
    if (!currentUser) throw Error('Must be logged in to do this');
    const followsRef = collection(db, `profiles/${profile.id}/followers`);
    const followerProfileRef = doc(db, `profiles/${currentUser.uid}`); // Use doc() here
    
    const followingRef = collection(db, `profiles/${currentUser.uid}/following`);
    const followingProfileRef = doc(db, `profiles/${profile.id}`); // Use doc() here

    const batch = writeBatch(db);
    if (follow) {
        batch.update(followerProfileRef, { followingCount: increment(1) });
        batch.update(followingProfileRef, { followerCount: increment(1) });
        batch.set(doc(followsRef, currentUser.uid), {
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
        });
        batch.set(doc(followingRef, profile.id), {
            displayName: profile.displayName,
            photoURL: profile.photoURL
        });
    } else {
        batch.update(followerProfileRef, { followingCount: increment(-1) });
        batch.update(followingProfileRef, { followerCount: increment(-1) });
        batch.delete(doc(followsRef, currentUser.uid));
        batch.delete(doc(followingRef, profile.id));
    }

    await batch.commit();
}
