/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@boda-lc/server/api/trpc";
import { env } from "@boda-lc/env";
import notion from "@boda-lc/lib/notion";

export const confirmationRouter = createTRPCRouter({
  confirmar: publicProcedure
    .input(
      z.object({
        nombre: z.string().min(1, "El nombre es obligatorio"),
        email: z.string().trim().email("Email inválido"),
        asistira: z.boolean(),
        tieneAcompanante: z.boolean(),
        nombreAcompanante: z.string().optional(),
        restriccionesAlimenticias: z.string().optional(),
        restriccionesAcompanante: z.string().optional(),
        mensaje: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const {
        nombre,
        email,
        asistira,
        tieneAcompanante,
        nombreAcompanante,
        restriccionesAlimenticias,
        restriccionesAcompanante,
        mensaje,
      } = input;

      try {
        // Consulta si ya existe una confirmación con este email
        const existEmailInDB = await notion.dataSources.query({
          data_source_id: env.NOTION_DATASOURCE_ID,
          filter: {
            property: "Email",
            email: { equals: email },
          },
          page_size: 1,
        });

        if (existEmailInDB.results?.length > 0) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Ya has confirmado tu asistencia previamente.",
          });
        }

        const properties = {
          Nombre: {
            title: [
              {
                text: {
                  content: nombre,
                },
              },
            ],
          },
          Email: {
            email: email,
          },
          "Confirmo asistencia": {
            checkbox: asistira,
          },
          "Restriccion alimenticia": {
            rich_text: [
              {
                text: {
                  content: restriccionesAlimenticias ?? "-",
                },
              },
            ],
          },
          "Con acompañante": {
            checkbox: tieneAcompanante,
          },
          "Nombre acompañante": {
            rich_text: [
              {
                text: {
                  content: nombreAcompanante ?? "-",
                },
              },
            ],
          },
          "Rest alimenticia acompañante": {
            rich_text: [
              {
                text: {
                  content: restriccionesAcompanante ?? "-",
                },
              },
            ],
          },
          "Mensaje para los novios": {
            rich_text: [
              {
                text: {
                  content: mensaje ?? "-",
                },
              },
            ],
          },
        };

        const page = await notion.pages.create({
          parent: {
            type: "data_source_id",
            data_source_id: env.NOTION_DATASOURCE_ID,
          },
          properties: properties,
        });

        return page;
      } catch (err: any) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: err?.message ?? "Error al procesar la confirmación",
        });
      }
    }),
});
