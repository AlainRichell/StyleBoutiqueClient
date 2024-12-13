import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="pt-16 container-custom py-8">
      <h1 class="text-3xl font-bold mb-8 mt-8">Acerca de nosotros</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-2xl font-semibold mb-4">Nuestra historia</h2>
          <p class="text-gray-600 mb-4">
            Style Boutique se fundó con una misión simple: hacer que la moda sea accesible para todos. 
            Creemos que todos merecen verse y sentirse lo mejor posible sin tener que gastar mucho dinero.
          </p>
          <p class="text-gray-600 mb-4">
            Nuestra colección cuidadosamente seleccionada presenta las últimas tendencias y clásicos atemporales,
            asegurándose de que encontrará exactamente lo que está buscando.
          </p>
        </div>
        
        <div>
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04" 
            alt="About Us" 
            class="w-full h-64 object-cover rounded-lg shadow-md">
        </div>
      </div>

      <div class="mt-12">
        <h2 class="text-2xl font-semibold mb-4">Nuestros valores</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-2">Calidad</h3>
            <p class="text-gray-600">Nunca comprometemos la calidad, asegurando que cada artículo cumpla con nuestros altos estándares.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-2">Sustentabilidad</h3>
            <p class="text-gray-600">Estamos comprometidos a reducir nuestro impacto ambiental a través de prácticas sustentables.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-2">Primero el cliente</h3>
            <p class="text-gray-600">Su satisfacción es nuestra principal prioridad y siempre estamos aquí para ayudar.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}