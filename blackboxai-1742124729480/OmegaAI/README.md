# OmegaAI Assistant Platform

A comprehensive AI assistant platform with real-time monitoring, synchronization, and offline capabilities.

## Features

- **Real-time Monitoring**
  - CPU, RAM, and GPU usage tracking
  - Performance metrics visualization
  - Alert system for resource thresholds

- **Automatic Synchronization**
  - Seamless sync between AIServer and MacBook Pro
  - File and configuration synchronization
  - Conflict resolution handling

- **Offline Capabilities**
  - Service Worker implementation
  - Offline-first architecture
  - Cached resources and data

- **Dashboard Interface**
  - Real-time resource monitoring
  - Service management
  - System health overview

## System Architecture

### Core Services

1. **Monitoring Service** (`services/monitoring.js`)
   - Real-time resource tracking
   - Performance metrics collection
   - Alert system management

2. **Sync Service** (`services/sync.js`)
   - File synchronization
   - Configuration management
   - Conflict resolution

3. **Main Service** (`services/index.js`)
   - Service coordination
   - Event handling
   - System state management

### Configuration

The system configuration is centralized in `config/config.js`:
- Server settings
- Monitoring thresholds
- Sync intervals
- Cache configuration

### Service Worker

The Service Worker (`sw.js`) provides:
- Offline functionality
- Resource caching
- Background sync
- Push notifications

## Setup and Usage

1. **Initial Setup**
   ```bash
   # Clone the repository
   git clone [repository-url]
   cd OmegaAI

   # Install dependencies
   npm install

   # Start the development server
   npm run dev
   ```

2. **Configuration**
   - Edit `config/config.js` to set up:
     - Server endpoints
     - Sync intervals
     - Resource thresholds
     - Cache settings

3. **Running the Platform**
   - Access the main interface at `http://localhost:8000/OmegaAI.html`
   - Dashboard available at `http://localhost:8000/dashboard.html`
   - Documentation at `http://localhost:8000/docs/guide.html`

## Best Practices

1. **Resource Management**
   - Monitor resource usage regularly
   - Set appropriate alert thresholds
   - Schedule maintenance during low-usage periods

2. **Synchronization**
   - Keep sync intervals balanced
   - Monitor sync logs
   - Handle conflicts appropriately

3. **Offline Support**
   - Test offline functionality regularly
   - Update cached resources when needed
   - Monitor Service Worker performance

## Documentation

- User Guide: `/docs/guide.html`
- Dashboard Guide: `/docs/dashboard-guide.html`
- System Overview: `/mindmap.html`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
