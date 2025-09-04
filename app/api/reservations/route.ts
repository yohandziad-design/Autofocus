import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Ici tu peux traiter la réservation
    // Pour l'instant on retourne juste un succès
    
    return NextResponse.json({ 
      success: true, 
      message: 'Réservation reçue',
      data 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la réservation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'API Reservations' });
}