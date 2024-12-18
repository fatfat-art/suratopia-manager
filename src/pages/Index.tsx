import React, { useState } from "react";
import { Mail } from "@/types/mail";
import MailList from "@/components/MailList";
import AddMailForm from "@/components/AddMailForm";
import MailDetail from "@/components/MailDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Index = () => {
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch mails using React Query
  const { data: mails = [], isLoading } = useQuery({
    queryKey: ['mails'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mails')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching mails:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  const handleAddMail = async (newMail: Partial<Mail>) => {
    try {
      const { data, error } = await supabase
        .from('mails')
        .insert([{
          title: newMail.title,
          number: newMail.number,
          subject: newMail.subject,
          description: newMail.description,
          sender: newMail.sender,
          date: newMail.date,
          status: 'baru'
        }])
        .select()
        .single();

      if (error) throw error;

      console.log('Mail added successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['mails'] });
      setIsAddDialogOpen(false);
      toast({
        title: "Berhasil",
        description: "Surat berhasil ditambahkan",
      });
    } catch (error) {
      console.error('Error adding mail:', error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menambahkan surat",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (status: Mail["status"]) => {
    if (!selectedMail) return;
    
    try {
      const { error } = await supabase
        .from('mails')
        .update({ status })
        .eq('id', selectedMail.id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['mails'] });
      setSelectedMail(prev => prev ? { ...prev, status } : null);
      toast({
        title: "Berhasil",
        description: "Status surat berhasil diperbarui",
      });
    } catch (error) {
      console.error('Error updating mail status:', error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat memperbarui status",
        variant: "destructive",
      });
    }
  };

  const filteredMails = mails.filter(
    (mail) =>
      mail.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mail.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  return (
    <div className="container mx-auto py-4 md:py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Disposisi Surat Masuk</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Surat
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[600px]">
            <DialogTitle>Tambah Surat Baru</DialogTitle>
            <AddMailForm onSubmit={handleAddMail} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari surat berdasarkan judul, nomor, pengirim, atau keterangan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Daftar Surat</h2>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <MailList
              mails={filteredMails}
              onMailSelect={setSelectedMail}
            />
          )}
        </div>
        <div className="lg:sticky lg:top-4">
          {selectedMail && (
            <MailDetail
              mail={selectedMail}
              onStatusChange={handleStatusChange}
              onClose={() => setSelectedMail(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;