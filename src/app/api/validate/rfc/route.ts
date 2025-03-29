import validateRfc from "validate-rfc";

// Tipos de datos para la solicitud
interface RequestBody {
  rfc: string;
  omitVerificationDigit?: boolean; // Opcional
}

// El handler para este endpoint
export async function POST(req: Request) {
  try {
    // Verificar que el cuerpo de la solicitud no esté vacío
    if (req.headers.get("content-length") === "0") {
      return new Response(
        JSON.stringify({
          error: "Solicitud vacía. El cuerpo de la solicitud es necesario.",
        }),
        { status: 400 }
      );
    }

    // Intentar leer el cuerpo de la solicitud
    const { rfc, omitVerificationDigit }: RequestBody = await req.json();

    // Validar si se pasó el RFC
    if (!rfc) {
      return new Response(
        JSON.stringify({ error: 'El campo "rfc" es requerido.' }),
        { status: 400 }
      );
    }

    // Validar el RFC utilizando la librería con la opción omitVerificationDigit si se proporciona
    const response = validateRfc(rfc, {
      omitVerificationDigit: omitVerificationDigit ?? false, // Usar el valor de omitVerificationDigit si se pasa, o false si no
    });

    // Comprobar si el RFC es válido
    if (response.isValid) {
      return new Response(
        JSON.stringify({ valid: true, rfc: response.rfc, type: response.type }),
        { status: 200 }
      );
    } else {
      // Si no es válido, manejar los errores que puede devolver validateRfc
      let errorMessage = "RFC no válido.";

      // Si existen errores, los procesamos
      if (response.errors && response.errors.length > 0) {
        // Creamos un array de mensajes de error para cada tipo de error
        const errorMessages: string[] = [];

        // Manejamos cada tipo de error según la respuesta
        if (response.errors.includes("INVALID_FORMAT")) {
          errorMessages.push("El RFC tiene un formato incorrecto.");
        }
        if (response.errors.includes("INVALID_VERIFICATION_DIGIT")) {
          errorMessages.push("El dígito verificador no es válido.");
        }
        if (response.errors.includes("FORBIDDEN_WORD")) {
          errorMessages.push("El RFC contiene una palabra prohibida.");
        }

        // Si no se encuentra un error específico, usamos un mensaje genérico
        if (errorMessages.length === 0) {
          errorMessages.push("El RFC no es válido.");
        }

        // Concatenamos los mensajes de error
        errorMessage = errorMessages.join(" "); // Se unen todos los mensajes en una sola cadena
      }

      return new Response(
        JSON.stringify({
          valid: false,
          message: errorMessage,
          errors: response.errors,
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    // Capturamos errores de la solicitud (por ejemplo, si no se puede parsear el JSON)
    return new Response(
      JSON.stringify({ error: "Hubo un error al procesar la solicitud." }),
      { status: 500 }
    );
  }
}
