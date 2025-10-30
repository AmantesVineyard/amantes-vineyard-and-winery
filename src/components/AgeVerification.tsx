import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AgeVerification = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified");
    if (!verified) {
      setOpen(true);
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem("ageVerified", "true");
    setOpen(false);
  };

  const handleNo = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Age Verification</DialogTitle>
          <DialogDescription className="text-center text-base pt-4">
            We need to verify that you are 21 years of age or older to enter this site.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-4 sm:justify-center pt-4">
          <Button onClick={handleYes} size="lg" className="flex-1">
            Yes, I'm 21+
          </Button>
          <Button onClick={handleNo} variant="outline" size="lg" className="flex-1">
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerification;
