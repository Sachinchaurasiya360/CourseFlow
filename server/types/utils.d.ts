declare module "../../utils/config/sendEmail" {
  export function sendEmail(
    to: string,
    subject: string,
    body: string
  ): Promise<any>;
}

declare module "../../utils/config/otpGenerator" {
  export function GenerateOtp(): number;
}

declare module "../../utils/config/uploadToCloudnary" {
  export interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
    [key: string]: any;
  }

  export default function uploadToCloudnary(
    buffer: Buffer,
    folder: string
  ): Promise<CloudinaryUploadResult>;
}
