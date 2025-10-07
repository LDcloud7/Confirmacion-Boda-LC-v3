"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { api } from "@boda-lc/trpc/react";
import weddingConfig from "@boda-lc/lib/weddingConfig.json";
import WeddingCountdown from "@boda-lc/app/_components/WeddingCountdown";

type FormData = {
  nombre: string;
  email: string;
  telefono?: string;
  asistira: boolean;
  tieneAcompanante: boolean;
  nombreAcompanante?: string;
  restriccionesAlimenticias?: string;
  restriccionesAcompanante?: string;
  mensaje?: string;
};

export default function ConfirmacionPage() {
  const defaultFormValues: FormData = {
    nombre: "",
    email: "",
    telefono: "",
    asistira: true,
    tieneAcompanante: false,
    nombreAcompanante: "",
    restriccionesAlimenticias: "",
    restriccionesAcompanante: "",
    mensaje: "",
  };
  const [successDetails, setSuccessDetails] = useState<string>("");
  const [showEventInfo, setShowEventInfo] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: defaultFormValues,
  });

  const asistira = watch("asistira");
  const tieneAcompanante = watch("tieneAcompanante", false);

  const {
    mutateAsync: confirmarMutation,
    isPending,
    error: mutationError,
  } = api.wedding.confirmar.useMutation({
    onSuccess: () => {
      setShowEventInfo(true);
    },
  });

  const onSubmit = async (data: FormData) => {
    setSuccessDetails("");

    try {
      await confirmarMutation({
        nombre: data.nombre,
        email: data.email,
        asistira: data.asistira,
        tieneAcompanante: data.tieneAcompanante,
        nombreAcompanante: data.nombreAcompanante,
        restriccionesAlimenticias: data.restriccionesAlimenticias,
        restriccionesAcompanante: data.restriccionesAcompanante,
        mensaje: data.mensaje,
      });

      let details = "";
      if (data.asistira) {
        details += `Hemos registrado que sí asistirás a nuestra boda.\\n`;
        details += `Preferencias alimentarias para ti: ${data.restriccionesAlimenticias ?? "Ninguna"}.\\n`;
        if (data.tieneAcompanante && data.nombreAcompanante) {
          details += `Acompañante: ${data.nombreAcompanante} - ${data.restriccionesAcompanante ?? "Ninguna"}\\n`;
        }
        details += `La información del evento se muestra a continuación.`;
      } else {
        details += `Hemos registrado que no podrás asistir a nuestra boda.\\n`;
        details += `Lamentamos mucho tu ausencia y te agradecemos por avisarnos.`;
      }
      setSuccessDetails(details);
      reset(defaultFormValues);
    } catch (error) {
      console.error("Error al enviar la confirmación:", error);
    }
  };

  const EVENT = {
    location: "Hacienda Santa María",
    date: "15 de Junio, 2024",
    time: "17:00 horas",
    address: "Camino a la Esperanza #123, Valle de Paz",
    mapUrl:
      "https://www.google.com/maps/place/Hacienda+Santa+Mar%C3%ADa/@19.4326077,-99.133205,17z",
  } as const;

  return (
    <div className="z-[100] min-h-screen px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-10">
        <h1 className="text-center font-serif text-3xl leading-tight font-semibold text-gray-900 sm:text-4xl">
          Confirmación de Asistencia
          <br /> Boda {weddingConfig.novios}
        </h1>

        <div
          className="mt-6 flex flex-col justify-center rounded-xl border border-rose-100 bg-rose-50/50 p-4 sm:p-6"
          aria-live="polite"
        >
          <div className="mb-3 text-center font-medium text-gray-700">
            Límite de confirmación:
          </div>
          <WeddingCountdown />
        </div>
        {!showEventInfo ? (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Nombre completo <span className="text-rose-600">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-500 focus:ring-rose-500 focus:outline-none"
              />
              {errors.nombre && (
                <p className="text-sm text-red-600">{errors.nombre.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Correo electrónico <span className="text-rose-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "El email es obligatorio",
                })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-500 focus:ring-rose-500 focus:outline-none"
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="text-sm font-medium text-gray-700">
                ¿Asistirás a la ceremonia?{" "}
                <span className="text-rose-600">*</span>
              </div>
              <Controller
                name="asistira"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-4">
                    <label className="inline-flex items-center gap-2 text-gray-800">
                      <input
                        type="radio"
                        checked={!!field.value}
                        onChange={() => field.onChange(true)}
                      />
                      Sí, asistiré
                    </label>
                    <label className="inline-flex items-center gap-2 text-gray-800">
                      <input
                        type="radio"
                        checked={!field.value}
                        onChange={() => field.onChange(false)}
                      />
                      No, no podré asistir
                    </label>
                  </div>
                )}
              />
            </div>

            {asistira && (
              <>
                <div className="grid gap-2">
                  <label
                    htmlFor="restriccionesAlimenticias"
                    className="text-sm font-medium text-gray-700"
                  >
                    Tus restricciones alimentarias (opcional)
                  </label>
                  <input
                    id="restriccionesAlimenticias"
                    type="text"
                    {...register("restriccionesAlimenticias")}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-500 focus:ring-rose-500 focus:outline-none"
                    placeholder="Ej: Vegetariana, Alergia a mariscos, etc."
                  />
                </div>
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <div className="text-sm font-medium text-gray-700">
                      ¿Vendrás con un acompañante?
                    </div>
                    <Controller
                      name="tieneAcompanante"
                      control={control}
                      render={({ field }) => (
                        <div className="flex gap-4">
                          <label className="inline-flex items-center gap-2 text-gray-800">
                            <input
                              type="radio"
                              checked={!field.value}
                              onChange={() => field.onChange(false)}
                            />
                            No
                          </label>
                          <label className="inline-flex items-center gap-2 text-gray-800">
                            <input
                              type="radio"
                              checked={!!field.value}
                              onChange={() => field.onChange(true)}
                            />
                            Sí
                          </label>
                        </div>
                      )}
                    />
                  </div>

                  {tieneAcompanante && (
                    <div className="rounded-xl border border-gray-200 p-4">
                      <h3 className="mb-4 font-semibold text-gray-900">
                        Información de tu acompañante
                      </h3>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <label
                            htmlFor="nombreAcompanante"
                            className="text-sm font-medium text-gray-700"
                          >
                            Nombre completo del acompañante{" "}
                            <span className="text-rose-600">*</span>
                          </label>
                          <input
                            id="nombreAcompanante"
                            type="text"
                            {...register("nombreAcompanante", {
                              required: tieneAcompanante
                                ? "El nombre del acompañante es obligatorio"
                                : false,
                            })}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-500 focus:ring-rose-500 focus:outline-none"
                          />
                          {errors.nombreAcompanante && (
                            <p className="text-sm text-red-600">
                              {errors.nombreAcompanante.message}
                            </p>
                          )}
                        </div>

                        <div className="grid gap-2">
                          <label
                            htmlFor="restriccionesAcompanante"
                            className="text-sm font-medium text-gray-700"
                          >
                            Restricciones alimentarias del acompañante
                            (opcional)
                          </label>
                          <input
                            id="restriccionesAcompanante"
                            type="text"
                            {...register("restriccionesAcompanante")}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-500 focus:ring-rose-500 focus:outline-none"
                            placeholder="Ej: Vegetariana, Alergia a mariscos, etc."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700"
                    >
                      Mensaje para los novios (opcional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      {...register("mensaje", {
                        maxLength: {
                          value: 500,
                          message: "Máximo 500 caracteres",
                        },
                      })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-500 focus:ring-rose-500 focus:outline-none"
                      placeholder="¡Déjanos un mensaje especial!"
                    />
                    {errors.mensaje && (
                      <p className="text-sm text-red-600">
                        {errors.mensaje.message}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="flex w-full cursor-pointer justify-center rounded-md bg-rose-600 px-4 py-3 text-white hover:bg-rose-700 disabled:opacity-50"
              >
                {isPending ? "Enviando confirmación..." : "Confirmar"}
              </button>
            </div>

            {isPending && (
              <div className="mt-4 text-center text-sm text-gray-700">
                Enviando confirmación...
              </div>
            )}

            {successDetails && (
              <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-4 whitespace-pre-line text-green-800">
                <strong>¡Gracias por confirmar!</strong>
                <div className="mt-2">{successDetails}</div>
              </div>
            )}

            {mutationError && (
              <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
                <strong>Ha ocurrido un error:</strong> {mutationError.message}
              </div>
            )}
          </form>
        ) : (
          <div
            className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5"
            id="eventInfo"
          >
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Información del evento
            </h3>
            <p className="text-gray-800">
              <strong>Lugar:</strong> <span>{EVENT.location}</span>
            </p>
            <p className="text-gray-800">
              <strong>Fecha:</strong> <span>{EVENT.date}</span>
            </p>
            <p className="text-gray-800">
              <strong>Hora:</strong> <span>{EVENT.time}</span>
            </p>
            <p className="text-gray-800">
              <strong>Dirección:</strong> <span>{EVENT.address}</span>
            </p>
            <p className="mt-2 text-gray-800">
              <strong>Ubicación:</strong>
              <br />
              <a
                href={EVENT.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-rose-700 underline"
              >
                Abrir en Google Maps
              </a>
            </p>
            <p className="mt-2 text-gray-800">
              <strong>Código de vestimenta:</strong>{" "}
              <span>Formal - Etiqueta</span>
            </p>
            <div className="mt-3 text-center text-gray-700">
              ¡Los esperamos con mucha ilusión!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
