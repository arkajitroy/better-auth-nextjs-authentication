import { hash } from "bcryptjs";
import prisma from "@/services/db/prisma";

async function main() {
  const passwordHash = await hash("Password123!", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      username: "admin",
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      phone: "1234567890",
      countryCode: "+1",
      passwordHash,
      acceptedTerms: true,
    },
  });

  console.log("✅ Seed completed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
