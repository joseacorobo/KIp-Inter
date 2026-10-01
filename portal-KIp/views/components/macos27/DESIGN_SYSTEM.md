# macOS 27 Design System & Component Catalog (Apple HIG)

Este catálogo documenta y sintetiza todos los tokens, estilos y especificaciones CSS extraídos de `views/components/assets/MacOs27_Assets/`.

---

## 1. Materiales & Efectos de Vidrio (Liquid Glass)

### Liquid Glass - Large & Medium
Utilizado para modales, paneles flotantes y widgets de alta jerarquía.
```css
.macos-liquid-glass {
  background: linear-gradient(0deg, rgba(191, 191, 191, 0.1), rgba(191, 191, 191, 0.1)), rgba(255, 255, 255, 0.7);
  background-blend-mode: darken, lighten;
  box-shadow: 
    1.25px 0px 0px -0.75px #DBDBDB, 
    -1.25px 0px 0px -0.75px #DBDBDB, 
    0px 0px 0px 0.5px #DBDBDB, 
    0px 18px 48px rgba(0, 0, 0, 0.25),
    inset 0px 40px 10px -40px #282828, 
    inset 0px -40px 10px -40px #282828;
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border-radius: 34px;
}
```

### Liquid Glass - Notification Toast (344px × 77px)
```css
.macos-notification-glass {
  width: 344px;
  min-height: 77px;
  padding: 12px 14px 12px 10px;
  border-radius: 20px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.5)), rgba(240, 240, 245, 0.7);
  box-shadow: 
    1.25px 0px 0px -0.75px #DBDBDB, 
    -1.25px 0px 0px -0.75px #DBDBDB, 
    0px 0px 0px 0.5px #DBDBDB, 
    0px 8px 48px rgba(0, 0, 0, 0.18),
    inset 0px 40px 5px -40px rgba(40, 40, 40, 0.08), 
    inset 0px -40px 5px -40px rgba(40, 40, 40, 0.08);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
}
```

### Scroll Edge Effect (Toolbar & Headers)
```css
.macos-scroll-edge-hard {
  background: rgba(255, 255, 255, 0.85);
  border-bottom: 0.67px solid rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

---

## 2. Controles de Ventana (Window Controls / Semáforo)

Dimensiones: 14px × 14px, separación 9px, borde sutil de 0.5px.

```css
.macos-traffic-lights {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;
  width: 68px;
  height: 14px;
}

.macos-traffic-close {
  width: 14px;
  height: 14px;
  background: #FF5C60;
  border: 0.5px solid rgba(0, 0, 0, 0.45);
  border-radius: 100px;
}

.macos-traffic-minimize {
  width: 14px;
  height: 14px;
  background: #FAC800;
  border: 0.5px solid rgba(0, 0, 0, 0.45);
  border-radius: 100px;
}

.macos-traffic-zoom {
  width: 14px;
  height: 14px;
  background: #35C759;
  border: 0.5px solid rgba(0, 0, 0, 0.45);
  border-radius: 100px;
}
```

---

## 3. Botones (Buttons & Segmented Controls)

### Botón Primario / Accent
```css
.macos-btn-primary {
  height: 28px;
  padding: 0 16px;
  background: #0088FF;
  color: #FFFFFF;
  border-radius: 6px;
  font-family: 'SF Pro Text', -apple-system, sans-serif;
  font-weight: 510;
  font-size: 13px;
  border: none;
  box-shadow: 0 1px 2px rgba(0, 136, 255, 0.2);
  transition: all 0.15s ease;
}
.macos-btn-primary:hover { background: #0077E6; }
.macos-btn-primary:active { background: #0066CC; }
```

### Botón Estándar / Secundario
```css
.macos-btn-secondary {
  height: 24px;
  padding: 0 14px;
  background: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.85);
  border-radius: 6px;
  font-family: 'SF Pro Text', -apple-system, sans-serif;
  font-weight: 510;
  font-size: 13px;
  border: none;
  transition: background 0.15s ease;
}
.macos-btn-secondary:hover { background: rgba(0, 0, 0, 0.12); }
.macos-btn-secondary:active { background: rgba(0, 0, 0, 0.16); }
```

### Botón Destructivo
```css
.macos-btn-destructive {
  height: 28px;
  padding: 0 14px;
  background: rgba(245, 47, 50, 0.18);
  color: #F52F32;
  border-radius: 6px;
  font-weight: 510;
  font-size: 13px;
  border: none;
}
.macos-btn-destructive:hover { background: rgba(245, 47, 50, 0.26); }
```

### Segmented Control
```css
.macos-segmented-control {
  display: inline-flex;
  height: 24px;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  padding: 2px;
  gap: 1px;
}
.macos-segment-item {
  height: 20px;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s ease;
}
.macos-segment-item.active {
  background: #FFFFFF;
  color: #000000;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
}
```

---

## 4. Campos de Entrada (Search Fields & Inputs)

### Campo de Búsqueda Integrado (⌘K)
```css
.macos-search-field {
  height: 26px;
  padding: 0 8px;
  border-radius: 100px;
  background: #FFFFFF;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.08);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  gap: 6px;
}
```

### Input de Formulario
```css
.macos-input-field {
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  background: #EDEDF0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 13px;
  color: #1C1C1E;
  outline: none;
  transition: all 0.15s ease;
}
.macos-input-field:focus {
  background: #FFFFFF;
  border-color: #0088FF;
  box-shadow: 0 0 0 3px rgba(0, 136, 255, 0.25);
}
```

---

## 5. Hojas Modales y Diálogos (Sheets & Dialogs)

### Sheet Modal (410px / 390px)
```css
.macos-sheet-dialog {
  background: #FFFFFF;
  border-radius: 18px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 
    0px 0px 1px rgba(0, 0, 0, 0.4), 
    0px 18px 54px rgba(0, 0, 0, 0.25);
}
```

---

## 6. Tablas y Listas Finder (Finder List & Table Rows)

```css
.macos-table-header {
  height: 28px;
  background: #F5F5F7;
  border-bottom: 1px solid #E5E5EA;
  font-size: 11px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.65);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.macos-table-row {
  height: 32px;
  border-bottom: 1px solid #F2F2F7;
  transition: background-color 0.12s ease;
}
.macos-table-row:hover {
  background-color: #F8F8FA;
}
.macos-table-row.selected {
  background-color: #DCEBFE;
  color: #0062CC;
}
```

---

## 7. Switches & Toggles (Interruptores Nativos)

```css
.macos-switch {
  width: 44px;
  height: 24px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
}
.macos-switch.checked {
  background: #34C759;
}
.macos-switch-knob {
  width: 20px;
  height: 20px;
  background: #FFFFFF;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}
.macos-switch.checked .macos-switch-knob {
  transform: translateX(20px);
}
```

---

## 8. Menú Contextual & Dropdown (Liquid Glass Menu)

```css
.macos-menu-glass {
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.85));
  box-shadow: 
    1.25px 0px 0px -0.75px #DBDBDB, 
    -1.25px 0px 0px -0.75px #DBDBDB, 
    0px 0px 0px 0.5px #DBDBDB, 
    0px 8px 36px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 10px;
  padding: 4px;
}
.macos-menu-item {
  height: 24px;
  padding: 0 8px;
  border-radius: 5px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1C1C1E;
  cursor: pointer;
}
.macos-menu-item:hover {
  background: #0088FF;
  color: #FFFFFF;
}
```

---

## 9. Widgets (OpenGauge & Circulares)
- Diámetros: 72px × 72px.
- Soporte para arcos SVG con gradientes y tipografía tabular `SF Pro Display`.
