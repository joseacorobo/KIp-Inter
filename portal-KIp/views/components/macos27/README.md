# Arquitectura de Componentes macOS 27 (portal-KIp)

Esta carpeta centraliza los componentes modulares de interfaz gráfica basados en el sistema de diseño **macOS (Liquid Glass / Finder UI / Apple Human Interface)** para el portal de operaciones.

## Estructura de Componentes Propuesta

| Componente | Archivo | Descripción |
| :--- | :--- | :--- |
| **Notification Toast** | `liquid-notification.ejs` | Notificación flotante con efecto *Liquid Glass*, desenfoque de fondo (`backdrop-filter: blur(28px)`), avatar dinámico y animación de entrada/salida. |
| **Modal Sheet** | `assign-modal.ejs` | Hoja modal nativa estilo macOS (410px, bordes redondeados 22px, sombra profunda, dropdowns personalizados y selección de operadores). |
| **Alert Dialog** | `subject-alert.ejs` | Cuadro de diálogo de alerta de sistema macOS para visualización de asunto/detalles. |
| **Unified Titlebar** | `titlebar.ejs` | Barra superior integrada con botones de control (traffic lights), buscador `⌘K`, estado de turno e identidad NOC. |
| **Finder Sidebar** | `sidebar.ejs` | Barra lateral estilo Finder con navegación por secciones, contadores activos y estado de sincronización de servidor. |
| **KPI Widgets** | `kpi-widgets.ejs` | Tarjetas métricas modulares con tipografía tabular (`SF Pro / JetBrains Mono`) e indicadores de estado. |
| **Finder Table** | `finder-table.ejs` | Tabla de incidencias estilo lista de archivos macOS, cabeceras con separador nativo, estados coloreados y barra inferior de estado. |

---

## Cómo usar un componente en una vista EJS

Desde cualquier vista (por ejemplo, `views/index.ejs`):

```html
<!-- Ejemplo: Incluir la Notificación Liquid Glass -->
<%- include('components/macos27/liquid-notification') %>

<!-- Ejemplo: Incluir el Modal de Asignación -->
<%- include('components/macos27/assign-modal', { operadores: operadores }) %>
```

## Buenas Prácticas de Arquitectura
1. **Encapsulamiento**: Cada componente mantiene su propia estructura HTML y estilos específicos.
2. **Reutilización**: Los componentes pueden recibir parámetros locales pasados mediante el segundo argumento de `include()`.
3. **Mantenibilidad**: Reduce el tamaño de `index.ejs`, facilitando la lectura, pruebas y evolución de cada elemento sin riesgo de romper el layout global.
