"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import clsx from "clsx";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { buttonVariants } from "../ui/button";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";

export type AuthDialogRef = {
  openDialog: () => void;
  closeDialog: () => void;
};

const AuthDialog = forwardRef<AuthDialogRef>((_, ref) => {
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openDialog: () => setIsOpen(true),
    closeDialog: () => setIsOpen(false),
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-screen overflow-y-auto">
        {page === 0 ? (
          <LoginForm setPage={setPage} setIsOpen={setIsOpen} />
        ) : (
          <SignupForm setPage={setPage} />
        )}
      </DialogContent>
    </Dialog>
  );
});

AuthDialog.displayName = "AuthDialog";

export default AuthDialog;
