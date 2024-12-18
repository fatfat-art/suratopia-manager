import React from "react";
import { Mail } from "@/types/mail";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface MailListProps {
  mails: Mail[];
  onMailSelect: (mail: Mail) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "baru":
      return "bg-status-new text-white";
    case "diproses":
      return "bg-status-process text-white";
    case "selesai":
      return "bg-status-done text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const MailList: React.FC<MailListProps> = ({ mails, onMailSelect }) => {
  return (
    <div className="space-y-4">
      {mails.map((mail) => (
        <Card
          key={mail.id}
          className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onMailSelect(mail)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{mail.title}</h3>
              <p className="text-sm text-gray-600">No: {mail.number}</p>
              <p className="text-sm text-gray-600">Dari: {mail.sender}</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Badge className={getStatusColor(mail.status)}>
                {mail.status.charAt(0).toUpperCase() + mail.status.slice(1)}
              </Badge>
              <span className="text-sm text-gray-500">{formatDate(mail.date)}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MailList;