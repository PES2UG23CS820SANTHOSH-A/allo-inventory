import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Idempotency: if the same Idempotency-Key is replayed, return the cached response.
  const idempotencyKey = req.headers.get("Idempotency-Key");
  if (idempotencyKey) {
    const existing = await prisma.idempotencyKey.findUnique({
      where: { key: idempotencyKey },
    });
    if (existing) {
      return NextResponse.json(JSON.parse(existing.responseBody), {
        status: existing.statusCode,
      });
    }
  }

  let responseBody: object;
  let statusCode: number;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const reservation = await tx.reservation.findUnique({
        where: { id: params.id },
        include: { product: true, warehouse: true },
      });
      if (!reservation) return { error: "Not found", status: 404 };

      // Idempotent: already confirmed — return success without side effects.
      if (reservation.status === "CONFIRMED") {
        return { reservation, status: 200 };
      }

      if (
        reservation.status !== "PENDING" ||
        reservation.expiresAt <= new Date()
      ) {
        return { error: "Reservation has expired", status: 410 };
      }

      // Permanently decrement stock on payment success.
      await tx.stock.update({
        where: {
          productId_warehouseId: {
            productId: reservation.productId,
            warehouseId: reservation.warehouseId,
          },
        },
        data: {
          total: { decrement: reservation.quantity },
          reserved: { decrement: reservation.quantity },
        },
      });

      const confirmed = await tx.reservation.update({
        where: { id: reservation.id },
        data: { status: "CONFIRMED" },
        include: { product: true, warehouse: true },
      });
      return { reservation: confirmed, status: 200 };
    });

    if ("error" in result) {
      responseBody = { error: result.error };
      statusCode = result.status;
    } else {
      const r = result.reservation;
      responseBody = {
        id: r.id,
        status: r.status,
        productName: r.product.name,
        warehouseName: r.warehouse.name,
        quantity: r.quantity,
      };
      statusCode = 200;
    }
  } catch (err) {
    console.error(err);
    responseBody = { error: "Internal server error" };
    statusCode = 500;
  }

  // Store idempotency key so retries return the same response.
  if (idempotencyKey && statusCode < 500) {
    await prisma.idempotencyKey
      .create({
        data: {
          key: idempotencyKey,
          endpoint: `/api/reservations/${params.id}/confirm`,
          responseBody: JSON.stringify(responseBody),
          statusCode,
        },
      })
      .catch(() => {});
  }

  return NextResponse.json(responseBody, { status: statusCode });
}
