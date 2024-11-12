# Documentación del Emulador de Sistema Distribuido

Este documento describe la implementación de un emulador de sistema distribuido utilizando JavaScript puro. El emulador simula un entorno de sistema operativo distribuido con múltiples nodos, cada uno capaz de ejecutar procesos, sincronizar el acceso a recursos compartidos, manejar la comunicación entre nodos y redistribuir procesos en caso de fallos.

## Estructura del Proyecto

El proyecto está dividido en varios archivos para modularizar la funcionalidad:

- **Node.js**: Define la clase `Node`, que gestiona los procesos y el acceso a recursos compartidos.
- **Process.js**: Define la clase `Process`, que representa un proceso ejecutable por un nodo.
- **DistributedSystem.js**: Gestiona los nodos y los procesos, manejando la asignación de procesos y la monitorización de nodos.
- **index.js**: Punto de entrada que inicializa el sistema, añade nodos, asigna procesos y simula fallos de nodos y acceso a recursos.

## Descripción de Clases y Métodos

### Node.js

- **Node**: Clase que representa un nodo en el sistema.
  - `constructor(id)`: Inicializa un nodo con un identificador único.
  - `executeProcess(process)`: Ejecuta un proceso y lo añade a la lista de procesos del nodo.
  - `accessResource(resourceId, callback)`: Sincroniza el acceso a un recurso compartido, asegurando acceso exclusivo.
  - `fail()`: Simula el fallo del nodo, marcándolo como inactivo.
  - `recover()`: Recupera un nodo fallido, marcándolo como activo.

### Process.js

- **Process**: Clase que representa un proceso.
  - `constructor(id)`: Inicializa un proceso con un identificador único.
  - `execute()`: Simula la ejecución del proceso.

### DistributedSystem.js

- **DistributedSystem**: Clase que gestiona el sistema distribuido.
  - `constructor()`: Inicializa un sistema distribuido vacío.
  - `addNode(node)`: Añade un nodo al sistema.
  - `assignProcess(process)`: Asigna un proceso a un nodo activo basado en la carga.
  - `redistributeProcesses(failedNode)`: Redistribuye los procesos de un nodo fallido a nodos activos.
  - `monitorNodes()`: Monitorea los nodos y redistribuye procesos de nodos inactivos.

### index.js

- Inicializa el sistema distribuido, añade nodos, asigna procesos y simula fallos de nodos y acceso a recursos.

## Ejecución

Para ejecutar el emulador:

1. Asegúrate de tener Node.js instalado.
2. Ejecuta el archivo `index.js` con el comando:

   ```bash
   node index.js
   ```

## Funcionalidades Clave

- **Gestión de Procesos**: Asignación dinámica de procesos a nodos según la carga.
- **Gestión de Recursos Compartidos**: Sincronización del acceso a recursos compartidos para evitar condiciones de carrera.
- **Tolerancia a Fallos**: Detección de nodos inactivos y redistribución de sus procesos.
- **Escalabilidad**: Permite la adición dinámica de nuevos nodos al sistema.

Este emulador proporciona una base para simular y probar conceptos de sistemas distribuidos, y puede expandirse con características adicionales según sea necesario.
