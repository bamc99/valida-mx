"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Checkbox } from "@/components/ui/checkbox"; // Asegúrate de tener el Checkbox de ShadCN correctamente importado

// Esquema de validación RFC con Zod
const rfcSchema = z.object({
  rfc: z
    .string()
    .length(13, "El RFC debe tener 13 caracteres"),
  omitVerificationDigit: z.boolean().optional(), // Checkbox para omitir el dígito verificador
});

type RfcFormValues = z.infer<typeof rfcSchema>;

export default function RfcVerifier() {
  const [verificationResult, setVerificationResult] = useState<{
    status: "success" | "error" | null;
    message: string;
  }>({ status: null, message: "" });

  const form = useForm<RfcFormValues>({
    resolver: zodResolver(rfcSchema),
    defaultValues: {
      rfc: "",
      omitVerificationDigit: false, // Valor inicial para el checkbox
    },
  });

  async function onSubmit(data: RfcFormValues) {
    try {

      // Aquí puedes enviar omitVerificationDigit como parte de la solicitud
      
      const response = await fetch('/api/validate/rfc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rfc: data.rfc,
          omitVerificationDigit: data.omitVerificationDigit, // Incluir el estado del checkbox
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setVerificationResult({
          status: "success",
          message: result.message || "RFC válido"
        })
      } else {
        setVerificationResult({
          status: "error",
          message: result.message || "Error al verificar RFC"
        })
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
            name="rfc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RFC</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. XAXX010101000"
                    {...field}
                    className="uppercase"
                  />
                </FormControl>
                <FormDescription>
                  Ingresa tu RFC con homoclave (13 caracteres)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Checkbox para omitir el dígito verificador */}
          <FormField
            control={form.control}
            name="omitVerificationDigit"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    } // Aseguramos que `checked` sea un booleano
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Omitir dígito verificador</FormLabel>
                  <FormDescription>
                    Si marcas esta opción, no se verificará el dígito
                    verificador del RFC.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Verificar RFC
          </Button>
        </form>
      </Form>

      {verificationResult.status && (
        <Alert
          variant={
            verificationResult.status === "success" ? "default" : "destructive"
          }
          className={`border ${
            verificationResult.status === "success"
              ? "border-green-200 bg-green-50 text-green-800 dark:bg-green-800/10 dark:border-green-900 dark:text-green-500"
              : "border-red-200 bg-red-50"
          }`}
        >
          {verificationResult.status === "success" ? (
            <CheckCircle2 className="h-4 w-4 " />
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
