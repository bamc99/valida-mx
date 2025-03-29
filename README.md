# Valida-MX

## Descripción

**Valida-MX** es un proyecto de práctica que permite validar RFC y CURP de manera sencilla a través de un servicio backend y un frontend desarrollado con React, Next.js, y algunas librerías populares. El objetivo es practicar la integración de API RESTful con un formulario frontend para validar los datos.

Este proyecto fue creado con la colaboración entre el modelo GPT-4 y el desarrollador, y se basa en la integración de APIs de validación como `validate-rfc` y `validate-curp`.

## Tecnologías Usadas

### Backend
- **Node.js** con **Next.js API Routes**.
- **`validate-rfc`** para validación de RFC.
- **`validate-curp`** para validación de CURP.
- **Typescript** para un desarrollo más robusto.
- **Zod** para la validación de esquemas en el backend.

### Frontend
- **React** con **Next.js** para renderizado universal.
- **React Hook Form** con **Zod** para la validación de formularios.
- **ShadCN UI** para el diseño del frontend con componentes accesibles.
- **Lucide-react** para iconos en el frontend.

## Endpoints

### `/api/validate/rfc`
- **Método**: `POST`
- **Descripción**: Este endpoint valida el RFC proporcionado en el cuerpo de la solicitud.
- **Cuerpo de la Solicitud**:
  ```json
  {
    "rfc": "XAXX010101000",
    "omitVerificationDigit": false
  }
  
### `/api/validate/curp`
- **Método**: `POST`
- **Descripción**: Este endpoint valida el RFC proporcionado en el cuerpo de la solicitud.
- **Cuerpo de la Solicitud**:
  ```json
  {
    "curp": "XAXX930411HDFRNN09"
  }
