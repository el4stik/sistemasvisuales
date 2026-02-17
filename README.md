# VJing & Resolume - Taller Interactivo

Una página web interactiva con diseño minimalista negro que presenta un cronograma completo de un taller de VJing y Resolume.

## 🎯 Características Principales

### ✅ Funcionalidades Implementadas

- **Diseño Minimalista Negro**: Interfaz elegante con paleta de colores oscuros y acentos en verde neón (#00ff88) y cyan (#00ccff)
- **Navegación Suave**: Sistema de scroll animado entre secciones
- **Secciones Expandibles**: Tarjetas de temas que se expanden/colapsan al hacer clic
- **Animaciones Interactivas**: 
  - Efecto glitch en el título principal
  - Animaciones de aparición al hacer scroll
  - Efectos hover en todas las tarjetas
  - Partículas flotantes en el hero
- **Responsive Design**: Completamente adaptable a móviles y tablets
- **Atajos de Teclado**: 
  - Presiona `E` para expandir todos los temas
  - Presiona `C` para colapsar todos los temas

## 📚 Estructura del Contenido

### Secciones Principales

1. **Hero Section**: Introducción visual impactante con título animado
2. **Introducción**: Explicación sobre VJing, Resolume y casos de uso
3. **Clase 1** (2 horas): Introducción + Flujo básico + Performance
   - Introducción (10 min)
   - Interfaz de Resolume (25 min)
   - Reproducción y Performance (30 min)
   - Efectos Básicos y Control (30 min)
   - Mini Práctica Guiada (25 min)

4. **Clase 2** (2 horas): Capturas, entradas externas y flujo híbrido
   - Repaso Rápido (10 min)
   - Capturas de Pantalla y Ventanas (30 min)
   - Entrada de Cámara y Video en Vivo (25 min)
   - Spout + Flujo Híbrido (30 min)
   - Construcción de Set Híbrido (25 min)

5. **Resultados del Módulo**: 6 objetivos de aprendizaje con checkmarks

## 🎨 Paleta de Colores

```css
--bg-primary: #000000        /* Negro principal */
--bg-secondary: #0a0a0a      /* Negro secundario */
--bg-card: #111111           /* Fondo de tarjetas */
--accent-primary: #00ff88    /* Verde neón */
--accent-secondary: #00ccff  /* Cyan */
--accent-tertiary: #ff0099   /* Rosa magenta */
--text-primary: #ffffff      /* Texto principal */
--text-secondary: #aaaaaa    /* Texto secundario */
```

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Animaciones, gradientes, flexbox, grid
- **JavaScript (Vanilla)**: Interactividad sin frameworks
- **Font Awesome 6.4.0**: Iconografía
- **Google Fonts (Inter)**: Tipografía moderna

## 📁 Estructura de Archivos

```
/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos completos
├── js/
│   └── script.js       # Funcionalidad interactiva
└── README.md           # Documentación
```

## 🎯 Características Técnicas

### CSS Avanzado
- Variables CSS personalizadas
- Animaciones con keyframes
- Transiciones suaves
- Grid y Flexbox responsive
- Efectos de hover y focus
- Backdrop filters

### JavaScript
- Intersection Observer API para animaciones
- Event listeners optimizados
- Smooth scrolling
- Estado activo de navegación
- Efectos de partículas dinámicas
- Debouncing para rendimiento

## 💡 Uso

### Navegación
- Usa el menú superior para saltar entre secciones
- Haz clic en las tarjetas de temas para expandir/colapsar contenido
- Usa los atajos de teclado `E` y `C` para control rápido

### Personalización
Para personalizar colores, edita las variables CSS en `css/style.css`:
```css
:root {
    --accent-primary: #00ff88;  /* Cambia el color principal */
    --accent-secondary: #00ccff; /* Cambia el color secundario */
}
```

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

## 🎓 Objetivos de Aprendizaje

Al completar el taller, los estudiantes podrán:
- ✅ Manejar la interfaz de Resolume
- ✅ Disparar visuales en vivo
- ✅ Mezclar capas con efectos
- ✅ Usar capturas y cámara
- ✅ Entender un flujo híbrido básico
- ✅ Armar su propio mini live set

## 🔮 Características Interactivas Destacadas

1. **Efecto Glitch**: El título principal tiene un efecto glitch al cargar
2. **Partículas Flotantes**: Fondo animado con partículas en el hero
3. **Scroll Animado**: Elementos aparecen suavemente al hacer scroll
4. **Navegación Inteligente**: Links se activan según la sección visible
5. **Expandibles Suaves**: Transiciones fluidas en las tarjetas de temas

## 📝 Próximos Pasos Recomendados

- [ ] Agregar videos demostrativos en cada sección
- [ ] Crear formulario de inscripción
- [ ] Implementar galería de trabajos de estudiantes
- [ ] Añadir sección de recursos descargables
- [ ] Integrar sistema de comentarios o FAQ
- [ ] Agregar modo de presentación fullscreen
- [ ] Implementar dark/light mode toggle (opcional)

## 🌐 Deployment

Para publicar este sitio web:
1. Ve a la pestaña **Publish**
2. Haz clic en publicar
3. Obtén tu URL en vivo

## 📄 Licencia

Proyecto creado para fines educativos - Taller de VJing y Resolume 2026

---

**Desarrollado con ❤️ para la comunidad de VJs**