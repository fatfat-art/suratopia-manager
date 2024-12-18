export type MailStatus = "baru" | "diproses" | "selesai";

export interface Mail {
  id: string;
  title: string;
  number: string;
  subject: string;
  sender: string;
  date: string;
  description?: string;
  attachment?: string | null;
  status: MailStatus;
  created_at?: string;
  updated_at?: string;
}