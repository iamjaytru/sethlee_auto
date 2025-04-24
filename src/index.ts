import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Example usage
  const newVehicle = await prisma.vehicle.create({
    data: {
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      // ... other fields
    }
  });
  
  console.log('Created vehicle:', newVehicle);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());