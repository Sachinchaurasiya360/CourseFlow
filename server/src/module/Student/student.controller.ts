import { studentService } from "./student.service.js";
export class studentClass {
  constructor(private readonly studentService: studentService) {}

  async updateProfile(req: Request, res: Response) {}

  async postReview(req: Request, res: Response) {}

  async getMyCourses(req: Request, res: Response) {}

  async buyCourse(req: Request, res: Response) {}

  async getCartItems(req: Request, res: Response) {}
}
