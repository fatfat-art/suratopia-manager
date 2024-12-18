import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "@/types/mail";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const mailSchema = z.object({
  title: z.string().min(1, "Judul surat wajib diisi"),
  number: z.string().min(1, "Nomor surat wajib diisi"),
  subject: z.string().min(1, "Perihal wajib diisi"),
  description: z.string().optional(),
  sender: z.string().min(1, "Pengirim wajib diisi"),
  date: z.string().min(1, "Tanggal surat wajib diisi"),
});

type MailFormData = z.infer<typeof mailSchema>;

interface AddMailFormProps {
  onSubmit: (data: Partial<Mail>) => void;
}

const AddMailForm: React.FC<AddMailFormProps> = ({ onSubmit }) => {
  const form = useForm<MailFormData>({
    resolver: zodResolver(mailSchema),
    defaultValues: {
      title: "",
      number: "",
      subject: "",
      description: "",
      sender: "",
      date: new Date().toISOString().split('T')[0],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Surat</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul surat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Surat</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nomor surat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perihal</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Masukkan perihal surat"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keterangan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan keterangan tambahan"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pengirim</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama pengirim" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Surat</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Tambah Surat
        </Button>
      </form>
    </Form>
  );
};

export default AddMailForm;