import CurpVerifier from "@/components/curp-verifier";
import RfcVerifier from "@/components/rfc-verifier";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, IdCard } from "lucide-react";

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
          {/* <div className="w-16 h-16 mb-4">
            <MexicoEagleIcon />
          </div> */}
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
          <p>© {new Date().getFullYear()} Verificador de Documentos Mexicanos</p>
        </footer>
      </div>
    </main>
  )
}

function MexicoEagleIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-slate-800">
      <path
        d="M50,5C25.1,5,5,25.1,5,50s20.1,45,45,45s45-20.1,45-45S74.9,5,50,5z M74.3,68.9c-1.4,1.4-3.6,1.4-5,0
        c-1.4-1.4-1.4-3.6,0-5c1.4-1.4,3.6-1.4,5,0C75.7,65.3,75.7,67.5,74.3,68.9z M50,75c-2,0-3.5-1.6-3.5-3.5c0-2,1.6-3.5,3.5-3.5
        c2,0,3.5,1.6,3.5,3.5C53.5,73.4,52,75,50,75z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15c8.3,0,15,6.7,15,15
        C65,58.3,58.3,65,50,65z M25.7,68.9c-1.4-1.4-1.4-3.6,0-5c1.4-1.4,3.6-1.4,5,0c1.4,1.4,1.4,3.6,0,5
        C29.3,70.3,27.1,70.3,25.7,68.9z M28.2,36.1c-1.4-1.4-1.4-3.6,0-5c1.4-1.4,3.6-1.4,5,0c1.4,1.4,1.4,3.6,0,5
        C31.8,37.5,29.6,37.5,28.2,36.1z M50,25c-2,0-3.5-1.6-3.5-3.5c0-2,1.6-3.5,3.5-3.5c2,0,3.5,1.6,3.5,3.5C53.5,23.4,52,25,50,25z
        M71.8,36.1c-1.4-1.4-1.4-3.6,0-5c1.4-1.4,3.6-1.4,5,0c1.4,1.4,1.4,3.6,0,5C75.4,37.5,73.2,37.5,71.8,36.1z"
      />
      <path
        d="M50,40c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10c5.5,0,10-4.5,10-10C60,44.5,55.5,40,50,40z M50,55
        c-2.8,0-5-2.2-5-5c0-2.8,2.2-5,5-5c2.8,0,5,2.2,5,5C55,52.8,52.8,55,50,55z"
      />
    </svg>
  )
}
