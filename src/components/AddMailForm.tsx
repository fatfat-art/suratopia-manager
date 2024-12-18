import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MailStatus } from "@/types/mail";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddMailFormProps {
  onSubmit: (data: Partial<Mail>) => void;
}

const AddMailForm: React.FC<AddMailFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Mail>>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Judul Surat</Label>
        <Input
          id="title"
          {...register("title", { required: true })}
          placeholder="Masukkan judul surat"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">Judul surat wajib diisi</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="number">Nomor Surat</Label>
        <Input
          id="number"
          {...register("number", { required: true })}
          placeholder="Masukkan nomor surat"
        />
        {errors.number && (
          <span className="text-red-500 text-sm">Nomor surat wajib diisi</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Perihal</Label>
        <Textarea
          id="subject"
          {...register("subject", { required: true })}
          placeholder="Masukkan perihal surat"
        />
        {errors.subject && (
          <span className="text-red-500 text-sm">Perihal wajib diisi</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sender">Pengirim</Label>
        <Input
          id="sender"
          {...register("sender", { required: true })}
          placeholder="Masukkan nama pengirim"
        />
        {errors.sender && (
          <span className="text-red-500 text-sm">Pengirim wajib diisi</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Tanggal Surat</Label>
        <Input
          id="date"
          type="date"
          {...register("date", { required: true })}
        />
        {errors.date && (
          <span className="text-red-500 text-sm">Tanggal surat wajib diisi</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachment">Lampiran</Label>
        <Input
          id="attachment"
          type="file"
          accept=".pdf,.doc,.docx"
          {...register("attachment")}
        />
      </div>

      <Button type="submit" className="w-full">
        Tambah Surat
      </Button>
    </form>
  );
};

export default AddMailForm;