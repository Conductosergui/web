# Instrucciones de Desarrollo - Conductos Ergui (Web Semántica)

## 🎯 Contexto del Proyecto

Este repositorio contiene el código fuente y la arquitectura de datos para la web de Conductos Ergui, una empresa de servicios locales (HVAC y Pladur) basada en Cunit (Tarragona, España) con un radio de acción de 50 km (Baix Penedès, Garraf, Alt Penedès, Tarragonès, Baix Llobregat).

## 🛠️ Estándares de Código y Arquitectura

### 1. Datos Estructurados (Schema.org)

- Todo el marcado debe realizarse en JSON-LD estricto dentro de la carpeta /schema/.

- - Cada página de servicio o landing local debe contar con su correspondiente archivo .jsonld mapeado semánticamente.
 
  - - Entidades Core: Utilizar tipos múltiples como ["HVACContractor", "DrywallContractor"] para la Home, y relacionar los nodos mediante propiedades como areaServed, offersService y locatedIn.
   
    - - Validación Factual: Conectar siempre las ubicaciones con sus identificadores Q absolutos de Wikidata verificados (ej. Cunit: Q474489, Baix Penedès: Q15367, Garraf: Q15366) en el array sameAs.
     
      - ### 2. Estructura de Contenido y URLs (Silo Web)
     
      - - Respetar la jerarquía definida en /arquitectura/silo-web.md.
       
        - - Las URLs deben seguir una estructura limpia y optimizada para búsquedas GEO/AEO.
         
          - - El contenido en /contenido/ debe redactarse bajo criterios E-E-A-T, evitando texto de relleno y priorizando especificaciones técnicas de materiales (lana de roca, chapa galvanizada, placas hidrófugas) asociados al contexto local.
           
            - ### 3. Pautas de Programación Web
           
            - - Mantener el HTML semántico limpio y accesible.
             
              - - Asegurar que las inyecciones de scripts JSON-LD se realicen correctamente en el <head> del sitio final sin romper la sintaxis general.
                - 
