'use server';
import { Vehicle } from '@prisma/client';
import prisma from './prisma';

export async function fetchFeaturedVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { featured: true },
      take: 3,
    });
    return vehicles;
  } catch (error) {
    throw new Error('Failed to fetch featured vehicles');
  }
}