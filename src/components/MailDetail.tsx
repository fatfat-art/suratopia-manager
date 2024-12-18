import React from "react";
import { Mail } from "@/types/mail";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";

interface MailDetailProps {
  mail: Mail;
  onStatusChange: (status: Mail["status"]) => void;
  onClose: () => void;
}

const MailDetail: React.FC<MailDetailProps> = ({
  mail,
  onStatusChange,
  onClose,
}) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold">{mail.title}</h2>
        <Button variant="outline" onClick={onClose}>
          Tutup
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Nomor Surat</p>
          <p className="font-medium">{mail.number}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Tanggal</p>
          <p className="font-medium">{formatDate(mail.date)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Pengirim</p>
          <p className="font-medium">{mail.sender}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <Select
            value={mail.status}
            onValueChange={(value) => onStatusChange(value as Mail["status"])}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baru">Baru</SelectItem>
              <SelectItem value="diproses">Diproses</SelectItem>
              <SelectItem value="selesai">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">Perihal</p>
        <p className="mt-1">{mail.subject}</p>
      </div>

      {mail.attachment && (
        <div>
          <p className="text-sm text-gray-500 mb-2">Lampiran</p>
          <Button variant="outline" className="w-full">
            Unduh Lampiran
          </Button>
        </div>
      )}
    </Card>
  );
};

export default MailDetail;