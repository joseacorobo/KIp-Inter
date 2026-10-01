const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Configuración del motor de plantillas y archivos públicos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares para procesar datos de formularios y JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal: Renderiza el Dashboard
app.get('/', async (req, res) => {
    try {
        // Traemos todos los tickets con su operador asignado
        const tickets = await prisma.ticket.findMany({
            include: { asignado_a: true },
            orderBy: { createdAt: 'desc' }
        });
        
        // Operadores registrados disponibles
        const operadores = await prisma.user.findMany({
            where: { rol: 'OPERADOR' },
            orderBy: { nombre: 'asc' }
        });

        // Métricas de KPIs
        const ticketsActivos = await prisma.ticket.count({
            where: { estado_actual: { not: 'CERRADO' } }
        });
        const ticketsRealizados = await prisma.ticket.count({
            where: { estado_actual: 'CERRADO' }
        });
        const criticosSinAsignar = await prisma.ticket.count({
            where: { 
                asignado_a_id: null,
                puntos_complejidad: { gte: 5 }
            }
        });
        const operadoresDisponibles = await prisma.user.count({
            where: { rol: 'OPERADOR', estado_operativo: 'DISPONIBLE' }
        });
        const totalOperadores = operadores.length;

        res.render('index', { 
            titulo: 'NOC Portal - Dashboard Operativo',
            ticketsActivos,
            ticketsRealizados,
            criticosSinAsignar,
            tiempoAtencion: '14.2',
            operadoresDisponibles,
            totalOperadores,
            operadores,
            tickets
        });
    } catch (error) {
        console.error('Error al cargar dashboard:', error);
        res.status(500).send('Error en el servidor');
    }
});

// API: Asignar un ticket a un operador y área
app.post('/api/tickets/assign', async (req, res) => {
    try {
        const { ticketCode, operatorId, areaDesignada } = req.body;
        if (!ticketCode) {
            return res.status(400).json({ success: false, error: 'Falta código de incidencia' });
        }

        const dataToUpdate = {
            estado_actual: 'EN_PROGRESO',
            fecha_asignacion: new Date()
        };

        if (operatorId) {
            dataToUpdate.asignado_a_id = operatorId;
        }
        if (areaDesignada) {
            dataToUpdate.area_designada = areaDesignada;
        }
        if (req.body.prioridad) {
            if (req.body.prioridad === 'P1') dataToUpdate.puntos_complejidad = 8;
            else if (req.body.prioridad === 'P2') dataToUpdate.puntos_complejidad = 5;
            else if (req.body.prioridad === 'P3') dataToUpdate.puntos_complejidad = 1;
        }

        const ticket = await prisma.ticket.update({
            where: { codigo_incidencia: ticketCode },
            data: dataToUpdate,
            include: { asignado_a: true }
        });

        res.json({ success: true, ticket });
    } catch (error) {
        console.error('Error al asignar ticket:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API: Desasignar ticket
app.post('/api/tickets/unassign', async (req, res) => {
    try {
        const { ticketCode } = req.body;
        if (!ticketCode) {
            return res.status(400).json({ success: false, error: 'Falta código de incidencia' });
        }

        const ticket = await prisma.ticket.update({
            where: { codigo_incidencia: ticketCode },
            data: {
                asignado_a_id: null,
                estado_actual: 'NUEVO',
                fecha_asignacion: null
            }
        });

        res.json({ success: true, ticket });
    } catch (error) {
        console.error('Error al desasignar ticket:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API: Asignación masiva (batch)
app.post('/api/tickets/batch-assign', async (req, res) => {
    try {
        const { ticketCodes, operatorId, areaDesignada, prioridad } = req.body;
        if (!ticketCodes || !Array.isArray(ticketCodes) || ticketCodes.length === 0) {
            return res.status(400).json({ success: false, error: 'No se enviaron tickets' });
        }

        const updateData = {
            estado_actual: 'EN_PROGRESO',
            fecha_asignacion: new Date()
        };
        if (operatorId) updateData.asignado_a_id = operatorId;
        if (areaDesignada) updateData.area_designada = areaDesignada;
        if (prioridad) {
            if (prioridad === 'P1') updateData.puntos_complejidad = 8;
            else if (prioridad === 'P2') updateData.puntos_complejidad = 5;
            else if (prioridad === 'P3') updateData.puntos_complejidad = 1;
        }

        await prisma.ticket.updateMany({
            where: { codigo_incidencia: { in: ticketCodes } },
            data: updateData
        });

        res.json({ success: true, count: ticketCodes.length });
    } catch (error) {
        console.error('Error en asignación masiva:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API: Crear nuevo incidente en la cola
app.post('/api/tickets/create', async (req, res) => {
    try {
        const { asunto, descripcion, areaDesignada, prioridad, operatorId, origenIngesta } = req.body;
        if (!asunto || asunto.trim() === '') {
            return res.status(400).json({ success: false, error: 'El asunto del incidente es requerido' });
        }

        // Generar código único de incidencia tipo #INC-XXXXX
        let codigoIncidencia = req.body.codigoIncidencia;
        if (!codigoIncidencia) {
            const randomCode = Math.floor(10000 + Math.random() * 90000);
            codigoIncidencia = `#INC-${randomCode}`;
        }

        let puntosComplejidad = 1;
        if (prioridad === 'P1') puntosComplejidad = 8;
        else if (prioridad === 'P2') puntosComplejidad = 5;

        const ticketData = {
            codigo_incidencia: codigoIncidencia,
            asunto: asunto.trim(),
            descripcion: descripcion ? descripcion.trim() : null,
            area_designada: areaDesignada || 'GENERAL',
            puntos_complejidad: puntosComplejidad,
            origen_ingesta: origenIngesta || 'LLAMADA',
            estado_actual: operatorId ? 'EN_PROGRESO' : 'NUEVO',
            fecha_asignacion: operatorId ? new Date() : null,
            asignado_a_id: operatorId || null
        };

        const nuevoTicket = await prisma.ticket.create({
            data: ticketData,
            include: { asignado_a: true }
        });

        res.json({ success: true, ticket: nuevoTicket });
    } catch (error) {
        console.error('Error al crear ticket:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API: Actualizar estado de un ticket (CERRADO, EN_ESPERA_TERCEROS, EN_PROGRESO)
app.post('/api/tickets/status', async (req, res) => {
    try {
        const { ticketCode, estado } = req.body;
        if (!ticketCode || !estado) {
            return res.status(400).json({ success: false, error: 'Faltan datos de ticket o estado' });
        }

        const validStates = ['NUEVO', 'EN_PROGRESO', 'EN_ESPERA_TERCEROS', 'CERRADO'];
        if (!validStates.includes(estado)) {
            return res.status(400).json({ success: false, error: 'Estado no válido' });
        }

        const updateData = {
            estado_actual: estado
        };

        if (estado === 'CERRADO') {
            updateData.fecha_cierre = new Date();
        } else {
            updateData.fecha_cierre = null;
        }

        const ticket = await prisma.ticket.update({
            where: { codigo_incidencia: ticketCode },
            data: updateData,
            include: { asignado_a: true }
        });

        res.json({ success: true, ticket });
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API: Exportar resumen de turno a CSV
app.get('/api/tickets/export', async (req, res) => {
    try {
        const tickets = await prisma.ticket.findMany({
            include: { asignado_a: true },
            orderBy: { createdAt: 'desc' }
        });

        const headers = ['Codigo', 'Prioridad', 'Estado', 'Area', 'Asunto', 'Operador_Asignado', 'Fecha_Creacion'];
        const rows = tickets.map(t => {
            const prio = t.puntos_complejidad >= 8 ? 'P1' : (t.puntos_complejidad >= 5 ? 'P2' : 'P3');
            const op = t.asignado_a ? `"${t.asignado_a.nombre.replace(/"/g, '""')}"` : 'Sin Asignar';
            const asunto = `"${(t.asunto || '').replace(/"/g, '""')}"`;
            const fecha = t.createdAt ? new Date(t.createdAt).toISOString() : '';
            return [t.codigo_incidencia, prio, t.estado_actual, t.area_designada, asunto, op, fecha].join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="reporte_turno_noc.csv"');
        res.send('\uFEFF' + csvContent);
    } catch (error) {
        console.error('Error al exportar reporte:', error);
        res.status(500).send('Error al generar reporte');
    }
});

// Inicialización del servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor NOC activo en http://localhost:${PORT}`);
});