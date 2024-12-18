export type MailStatus = "baru" | "diproses" | "selesai";

export interface Mail {
  id: string;
  title: string;
  number: string;
  subject: string;
  sender: string;
  date: string;
  attachment?: File;
  status: MailStatus;
}