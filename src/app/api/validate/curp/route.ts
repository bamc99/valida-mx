// @ts-expect-error Ignorar error debido a que la librería aún no tiene soporte completo para TypeScript
import validateCurp from "validate-curp";

// Tipos de datos para la solicitud
interface RequestBody {
  curp: string;
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
    const { curp }: RequestBody = await req.json();

    // Validar si se pasó la CURP
    if (!curp) {
      return new Response(
        JSON.stringify({ error: 'El campo "curp" es requerido.' }),
        { status: 400 }
      );
    }

    // Validar la CURP utilizando la librería
    const response = validateCurp(curp);

    // Comprobar si la CURP es válida
    if (response.isValid) {
      return new Response(
        JSON.stringify({ valid: true, curp: response.curp }),
        { status: 200 }
      );
    } else {
      // Si no es válida, manejar los errores que puede devolver validateCurp
      let errorMessage = "CURP no válida.";

      // Si existen errores, los procesamos
      if (response.errors && response.errors.length > 0) {
        // Creamos un array de mensajes de error para cada tipo de error
        const errorMessages: string[] = [];

        // Manejamos cada tipo de error según la respuesta
        if (response.errors.includes("INVALID_FORMAT")) {
          errorMessages.push("El formato de la CURP es incorrecto.");
        }
        if (response.errors.includes("INVALID_DATE")) {
          errorMessages.push("La CURP contiene una fecha inválida.");
        }
        if (response.errors.includes("INVALID_STATE")) {
          errorMessages.push("El estado de la CURP es inválido.");
        }
        if (response.errors.includes("INVALID_CHECK_DIGIT")) {
          errorMessages.push("El dígito verificador de la CURP es incorrecto.");
        }
        if (response.errors.includes("FORBIDDEN_WORD")) {
          errorMessages.push("La CURP contiene una palabra prohibida.");
        }

        // Si no se encuentra un error específico, usamos un mensaje genérico
        if (errorMessages.length === 0) {
          errorMessages.push("La CURP no es válida.");
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
