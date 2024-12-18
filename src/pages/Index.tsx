import React, { useState } from "react";
import { Mail } from "@/types/mail";
import MailList from "@/components/MailList";
import AddMailForm from "@/components/AddMailForm";
import MailDetail from "@/components/MailDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";

const Index = () => {
  const [mails, setMails] = useState<Mail[]>([]);
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddMail = (newMail: Partial<Mail>) => {
    const mail: Mail = {
      ...newMail,
      id: Date.now().toString(),
      status: "baru",
    } as Mail;
    
    setMails((prev) => [mail, ...prev]);
    console.log("New mail added:", mail);
  };

  const handleStatusChange = (status: Mail["status"]) => {
    if (!selectedMail) return;
    
    setMails((prev) =>
      prev.map((mail) =>
        mail.id === selectedMail.id ? { ...mail, status } : mail
      )
    );
    setSelectedMail((prev) => prev ? { ...prev, status } : null);
    console.log("Status updated for mail:", selectedMail.id, "New status:", status);
  };

  const filteredMails = mails.filter(
    (mail) =>
      mail.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Disposisi Surat Masuk</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Surat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <AddMailForm onSubmit={handleAddMail} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari surat berdasarkan judul, nomor, atau pengirim..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Daftar Surat</h2>
          <MailList
            mails={filteredMails}
            onMailSelect={setSelectedMail}
          />
        </div>
        <div>
          {selectedMail && (
            <div className="sticky top-4">
              <MailDetail
                mail={selectedMail}
                onStatusChange={handleStatusChange}
                onClose={() => setSelectedMail(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;