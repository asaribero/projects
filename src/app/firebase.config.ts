import { importProvidersFrom, EnvironmentProviders } from "@angular/core";
import { provideFirebaseApp } from "@angular/fire/app";
import { getFirestore,provideFirestore} from "@angular/fire/firestore";
import { initializeApp } from "firebase/app";
import { environment } from "../environments/environment.prod";

const firebaseProviders: EnvironmentProviders = importProvidersFrom(
    provideFirebaseApp(() => 
        initializeApp(environment.firebase)
    ),
    provideFirestore(() => getFirestore()),
)


export { firebaseProviders }