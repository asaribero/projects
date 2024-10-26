import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
const PATH = 'chat-room';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _firestore = inject(Firestore);
  private messages: Subject<string>;
  private _collection = collection(this._firestore, PATH);
  constructor() {
    this.messages = new Subject<string>();
  }

  // Método para enviar un mensaje al servidor (simulado aquí como un observable)
  sendMessage(message: string): void {
    // Aquí deberías implementar la lógica para enviar el mensaje al servidor
    // Por ejemplo, a través de un WebSocket o una API HTTP.
    
    // Simulamos la recepción del mensaje inmediatamente como eco
    this.messages.next(message);
  }

  // Método para obtener los mensajes del servidor
  getMessages(): Observable<string> {
    // Aquí deberías implementar la lógica para recibir los mensajes del servidor
    // Puede ser a través de un WebSocket o una API HTTP que emite eventos.
    
    // Devuelve el observable al que se suscribirá el componente
    return this.messages.asObservable();
  }
}
