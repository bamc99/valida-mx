import CurpVerifier from "@/components/curp-verifier";
import RfcVerifier from "@/components/rfc-verifier";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, Github, IdCard } from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-24 overflow-hidden background">
      {/* Círculos decorativos con colores de la bandera mexicana */}
      <div className="absolute top-[-150px] left-[-150px] w-[300px] h-[300px] rounded-full bg-green-600/30 blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] rounded-full bg-red-600/30 blur-3xl" />
      <div className="absolute top-[30%] right-[-120px] w-[200px] h-[200px] rounded-full bg-green-500/20 blur-2xl" />
      <div className="absolute bottom-[20%] left-[-100px] w-[180px] h-[180px] rounded-full bg-red-500/20 blur-2xl" />

      <div className="relative w-full max-w-3xl z-10">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-center mb-2 ">Verificador de RFC y CURP</h1>
          <p className="text-center max-w-md">
            Sistema de verificación de documentos oficiales mexicanos
          </p>
        </div>

        <Tabs defaultValue="rfc" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="rfc">RFC</TabsTrigger>
            <TabsTrigger value="curp">CURP</TabsTrigger>
          </TabsList>
          <TabsContent value="rfc">
            <Card className="shadow-lg backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white">
                    <File />
                  </div>
                  <div>
                    <CardTitle>Verificación de RFC</CardTitle>
                    <CardDescription>Registro Federal de Contribuyentes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <RfcVerifier />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="curp">
            <Card className="shadow-lg backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                    <IdCard />
                  </div>
                  <div>
                    <CardTitle>Verificación de CURP</CardTitle>
                    <CardDescription>Clave Única de Registro de Población</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CurpVerifier />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-8 text-center text-sm text-neutral-500">
          <a href="https://github.com/bamc99/valida-mx" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <Github />
          </a>
        </footer>
      </div>
    </main>
  )
}