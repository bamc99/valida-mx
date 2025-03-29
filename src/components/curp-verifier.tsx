"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

// CURP validation schema
const curpSchema = z.object({
  curp: z.string().length(18, "La CURP debe tener exactamente 18 caracteres"),
});

type CurpFormValues = z.infer<typeof curpSchema>;

export default function CurpVerifier() {
  const [verificationResult, setVerificationResult] = useState<{
    status: "success" | "error" | null;
    message: string;
  }>({ status: null, message: "" });

  const form = useForm<CurpFormValues>({
    resolver: zodResolver(curpSchema),
    defaultValues: {
      curp: "",
    },
  });

  async function onSubmit(data: CurpFormValues) {
    try {
      // Enviar solicitud al backend API para verificar la CURP
      const response = await fetch("/api/validate/curp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ curp: data.curp }),
      });

      const result = await response.json();

      if (response.ok) {
        setVerificationResult({
          status: "success",
          message: "CURP válida. La verificación ha sido exitosa.",
        });
      } else {
        setVerificationResult({
          status: "error",
          message: result.message || "Error al verificar la CURP.",
        });
      }
    } catch (error) {
      console.log(error);
      setVerificationResult({
        status: "error",
        message: "Error al procesar la solicitud. Intente nuevamente.",
      });
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="curp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CURP</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. BEML920313HCMLNS09"
                    {...field}
                    className="uppercase"
                  />
                </FormControl>
                <FormDescription>
                  Ingresa tu CURP completa (18 caracteres)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full transition-all">
            Verificar CURP
          </Button>
        </form>
      </Form>

      {verificationResult.status && (
        <Alert
          variant={
            verificationResult.status === "success" ? "default" : "destructive"
          }
          className={`${
            verificationResult.status === "success"
              ? "border-green-200 bg-green-50 text-green-800 dark:bg-green-800/10 dark:border-green-900 dark:text-green-500"
              : "border-red-200 bg-red-50"
          }`}
        >
          {verificationResult.status === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {verificationResult.status === "success"
              ? "Verificación Exitosa"
              : "Error"}
          </AlertTitle>
          <AlertDescription
            className={
              verificationResult.status === "success" ? "text-green-700" : ""
            }
          >
            {verificationResult.message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
