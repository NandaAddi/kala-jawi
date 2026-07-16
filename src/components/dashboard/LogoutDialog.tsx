import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { setMockUser } from "@/lib/auth";
import { LogOut } from "lucide-react";

interface LogoutDialogProps {
  trigger?: React.ReactNode;
}

export function LogoutDialog({ trigger }: LogoutDialogProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setMockUser(null);
    navigate({ to: "/login" });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger || (
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-cream hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </div>
        )}
      </div>

      <AlertDialogContent className="bg-brand-cream border-brand-gold/30">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-brand-dark text-xl">Konfirmasi Logout</AlertDialogTitle>
          <AlertDialogDescription className="text-brand-dark/70">
            Apakah Anda yakin ingin keluar dari dashboard?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-brand-gold/30">Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-brand-gold hover:bg-brand-gold/80 text-brand-dark"
          >
            Ya, Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
