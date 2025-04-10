import config from '../config/config.js';
import syncService from './sync.js';
import monitoringService from './monitoring.js';

class OmegaAIService {
    constructor() {
        this.config = config;
        this.syncService = syncService;
        this.monitoringService = monitoringService;
        this.isRunning = false;
    }

    async start() {
        if (this.isRunning) {
            console.log('OmegaAI services are already running');
            return;
        }

        console.log('Starting OmegaAI services...');

        try {
            // Start monitoring service
            this.monitoringService.startMonitoring();
            console.log('Monitoring service started');

            // Start sync service
            this.syncService.startAutoSync();
            console.log('Sync service started');

            // Initialize event listeners
            this.initializeEventListeners();

            this.isRunning = true;
            console.log('All OmegaAI services started successfully');

        } catch (error) {
            console.error('Failed to start OmegaAI services:', error);
            throw error;
        }
    }

    initializeEventListeners() {
        // Listen for monitoring alerts
        window.addEventListener('omegaai-alert', (event) => {
            this.handleAlert(event.detail);
        });

        // Listen for metrics updates
        window.addEventListener('omegaai-metrics', (event) => {
            this.handleMetricsUpdate(event.detail);
        });

        // Listen for sync events
        window.addEventListener('omegaai-sync', (event) => {
            this.handleSyncEvent(event.detail);
        });
    }

    handleAlert(alert) {
        // Update dashboard with alert
        const dashboardEvent = new CustomEvent('dashboard-update', {
            detail: {
                type: 'alert',
                data: alert
            }
        });
        window.dispatchEvent(dashboardEvent);
    }

    handleMetricsUpdate(metrics) {
        // Update dashboard with new metrics
        const dashboardEvent = new CustomEvent('dashboard-update', {
            detail: {
                type: 'metrics',
                data: metrics
            }
        });
        window.dispatchEvent(dashboardEvent);
    }

    handleSyncEvent(syncData) {
        // Update dashboard with sync status
        const dashboardEvent = new CustomEvent('dashboard-update', {
            detail: {
                type: 'sync',
                data: syncData
            }
        });
        window.dispatchEvent(dashboardEvent);
    }

    async getSystemStatus() {
        return {
            isRunning: this.isRunning,
            monitoring: {
                metrics: this.monitoringService.getMetricsHistory(),
                alerts: this.monitoringService.getAlertHistory()
            },
            sync: {
                lastSync: this.syncService.lastSync,
                inProgress: this.syncService.syncInProgress
            }
        };
    }

    async stop() {
        if (!this.isRunning) {
            console.log('OmegaAI services are not running');
            return;
        }

        try {
            // Stop all services
            // Add cleanup code here

            this.isRunning = false;
            console.log('All OmegaAI services stopped successfully');

        } catch (error) {
            console.error('Failed to stop OmegaAI services:', error);
            throw error;
        }
    }
}

// Create and export singleton instance
const omegaAIService = new OmegaAIService();
export default omegaAIService;

// Auto-start services when imported
omegaAIService.start().catch(console.error);
