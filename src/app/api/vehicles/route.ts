// app/api/vehicles/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import type { VehicleApiResponse } from '@/lib/types';

// Schema for external API validation
const ExternalVehicleSchema = z.object({
  id: z.number(),
  vin: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number(),
  price: z.string(),
  mileage: z.string(),
  city: z.string(),
  state: z.string(),
  condition: z.string(),
  primaryPhotoUrl: z.string().url().optional(),
  bodyType: z.string().optional(),
  trim: z.string().optional(),
  dealerName: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Schema for database vehicle
const DatabaseVehicleSchema = z.object({
  id: z.string(),
  vin: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number(),
  price: z.number(),
  mileage: z.number(),
  // ... other fields from your Prisma schema
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters with defaults
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '12');
    const search = searchParams.get('search') || '';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const source = searchParams.get('source') || 'external'; // 'external' or 'database'

    if (source === 'database') {
      // Fetch from your Prisma database
      const where = {
        AND: [
          search ? { 
            OR: [
              { make: { contains: search, mode: 'insensitive' } },
              { model: { contains: search, mode: 'insensitive' } },
              { vin: { contains: search, mode: 'insensitive' } }
            ]
          } : {},
          minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
          maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {}
        ]
      };

      const [vehicles, totalCount] = await Promise.all([
        prisma.vehicle.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: {
            features: true,
            images: true
          }
        }),
        prisma.vehicle.count({ where })
      ]);

      const validatedVehicles = z.array(DatabaseVehicleSchema).parse(vehicles);

      return NextResponse.json({
        success: true,
        data: validatedVehicles,
        timestamp: new Date().toISOString(),
        pagination: {
          page,
          pageSize,
          totalItems: totalCount,
        },
      } satisfies VehicleApiResponse);
    }

    // Fetch from external API
    const apiKey = process.env.AUTO_DEV_API_KEY;
    if (!apiKey) {
      throw new Error('AUTO_DEV_API_KEY is not set in environment variables.');
    }

    // Cache key for external API
    const cacheKey = `vehicles:${page}:${pageSize}:${search}:${minPrice}:${maxPrice}`;
    
    // Check cache first if you have Redis or similar setup
    // const cached = await redis.get(cacheKey);
    // if (cached) return NextResponse.json(JSON.parse(cached));

    const apiUrl = `https://auto.dev/api/listings?apikey=${apiKey}&page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}${minPrice ? `&price_min=${minPrice}` : ''}${maxPrice ? `&price_max=${maxPrice}` : ''}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Auto.dev API error: ${response.statusText}`);
    }

    const data = await response.json();
    const validatedVehicles = z.array(ExternalVehicleSchema).parse(data.records);

    // Cache the response if needed
    // await redis.set(cacheKey, JSON.stringify(responseData), 'EX', 3600);

    return NextResponse.json({
      success: true,
      data: validatedVehicles,
      timestamp: new Date().toISOString(),
      pagination: {
        page,
        pageSize,
        totalItems: data.totalCount,
      },
    } satisfies VehicleApiResponse, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600',
      },
    });

  } catch (error) {
    console.error('Vehicle API Error:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      data: [],
      timestamp: new Date().toISOString(),
    } satisfies VehicleApiResponse, {
      status: 500,
    });
  }
}