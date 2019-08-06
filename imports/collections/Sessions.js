export const Sessions = new Mongo.Collection('session', { idGeneration: 'MONGO' });
export const Heartbeats = new Mongo.Collection('heartbeat', { idGeneration: 'MONGO' });
