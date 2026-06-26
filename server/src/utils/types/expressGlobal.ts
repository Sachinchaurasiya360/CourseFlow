
declare global {
  namespace Express {
    interface Request {
      userId?: string; 
      role?:string
      name?:string
    }
  }
}