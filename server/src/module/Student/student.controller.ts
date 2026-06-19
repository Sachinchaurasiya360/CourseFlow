import { studentService } from "./student.service.js";
export class studentClass {
  constructor(private readonly studentService: studentService) {}

  async updateProfile(req: Request, res: Response) {
    
  }
}
