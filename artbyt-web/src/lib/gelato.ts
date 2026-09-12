import { getStripe } from "@/lib/stripe";

export async function createGelatoOrder(sessionId: string) {
  const session = await getStripe().checkout.sessions.retrieve(sessionId);

  const itemsRaw = session.metadata?.items;

  if (!itemsRaw) {
    throw new Error("No items in session metadata");
  }

  const collected = session.collected_information;
  const shipping = collected?.shipping_details;

  if (!shipping?.address) {
    console.error(
      "[gelato] missing shipping address, session:",
      sessionId,
      collected,
      session.customer_details,
    );
    throw new Error("No shipping address in session");
  }

  const customer = session.customer_details;

  const items: { slug: string; size: string; quantity: number }[] =
    JSON.parse(itemsRaw);

  const gelatoItems = await Promise.all(
    items.map(async (item) => {
      const product = await getStripe().products.retrieve(item.slug);

      let sizes: { name: string; gelato: string }[] = [];
      try {
        const raw = product.metadata?.sizes;
        if (raw) sizes = JSON.parse(raw);
      } catch {
        // invalid sizes metadata
      }

      const sizeConfig = sizes.find((s) => s.name === item.size);
      if (!sizeConfig) {
        throw new Error(
          `Size "${item.size}" not found on product ${item.slug}`,
        );
      }

      const imageUrl =
        product.metadata?.gelato_image_url || product.images?.[0] || "";

      return {
        itemReferenceId: item.slug + "|" + item.size,
        productUid: sizeConfig.gelato,
        files: [{ type: "default", url: imageUrl }],
        quantity: item.quantity,
      };
    }),
  );

  // Fetch available shipment methods from Gelato for the destination country
  const country = shipping.address.country;
  let shipmentMethodUid = "normal";

  try {
    const smRes = await fetch(
      `https://shipment.gelatoapis.com/v1/shipment-methods?country=${country}`,
      {
        headers: { "X-API-KEY": process.env.GELATO_API_KEY! },
      },
    );

    if (smRes.ok) {
      const smData = await smRes.json();
      const methods = smData.shipmentMethods ?? [];

      // Prefer a normal-type method with tracking
      const best = methods.find(
        (m: any) =>
          m.type === "normal" &&
          m.hasTracking === true &&
          m.supportedCountries?.includes(country),
      );

      if (best) {
        shipmentMethodUid = best.shipmentMethodUid;
      }
    }
  } catch (err) {
    console.error("[gelato] failed to fetch shipment methods:", err);
    // fallback to "normal"
  }

  const firstName = shipping.name?.split(" ")[0] || "";
  const lastName = shipping.name?.split(" ").slice(1).join(" ") || "";

  const response = await fetch(
    "https://order.gelatoapis.com/v4/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.GELATO_API_KEY!,
      },
      body: JSON.stringify({
        orderType: "order",
        orderReferenceId: session.id,
        currency: session.currency?.toUpperCase() || "USD",
        items: gelatoItems,
        shipmentMethodUid,
        shippingAddress: {
          firstName,
          lastName,
          addressLine1: shipping.address.line1,
          addressLine2: shipping.address.line2 || undefined,
          city: shipping.address.city,
          state: shipping.address.state,
          postCode: shipping.address.postal_code,
          country: shipping.address.country,
          email: customer?.email || "",
        },
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("[gelato] order creation failed:", response.status, text);
    throw new Error("Gelato order creation failed");
  }

  return response.json();
}
