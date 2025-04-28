import config from '../config/config.js';

class MonitoringService {
    constructor() {
        this.config = config.monitoring;
        this.metrics = {
            cpu: [],
            memory: [],
            gpu: [],
            requests: [],
            latency: []
        };
        this.alerts = [];
    }

    startMonitoring() {
        // Start periodic monitoring
        setInterval(() => {
            this.collectMetrics();
        }, this.config.refreshRate);
    }

    async collectMetrics() {
        try {
            // Collect system metrics
            const systemMetrics = await this.getSystemMetrics();
            this.updateMetrics(systemMetrics);

            // Check thresholds and trigger alerts if needed
            this.checkThresholds(systemMetrics);

            // Emit metrics for dashboard updates
            this.emitMetrics();

        } catch (error) {
            console.error('Error collecting metrics:', error);
        }
    }

    async getSystemMetrics() {
        // Implementation for getting system metrics
        // This would typically use system APIs or commands
        const metrics = {
            cpu: {
                usage: Math.floor(Math.random() * 100),
                temperature: Math.floor(45 + Math.random() * 20)
            },
            memory: {
                used: Math.floor(Math.random() * 16),
                total: 16,
                percentage: Math.floor(Math.random() * 100)
            },
            gpu: {
                usage: Math.floor(Math.random() * 100),
                memory: Math.floor(Math.random() * 100)
            }
        };

        // Ensure all values are valid numbers
        if (isNaN(metrics.cpu.usage)) metrics.cpu.usage = 0;
        if (isNaN(metrics.memory.percentage)) metrics.memory.percentage = 0;
        if (isNaN(metrics.gpu.usage)) metrics.gpu.usage = 0;

        return metrics;
    }

    updateMetrics(newMetrics) {
        // Update metrics history
        Object.keys(newMetrics).forEach(key => {
            if (this.metrics[key]) {
                this.metrics[key].push({
                    timestamp: new Date(),
                    value: newMetrics[key]
                });

                // Keep only last hour of data
                const oneHourAgo = Date.now() - 3600000;
                this.metrics[key] = this.metrics[key].filter(
                    metric => metric.timestamp > oneHourAgo
                );
            }
        });
    }

    checkThresholds(metrics) {
        // Check CPU threshold
        if (metrics.cpu.usage > this.config.thresholds.cpu) {
            this.createAlert('CPU usage exceeds threshold', 'warning', metrics.cpu);
        }

        // Check memory threshold
        if (metrics.memory.percentage > this.config.thresholds.memory) {
            this.createAlert('Memory usage exceeds threshold', 'warning', metrics.memory);
        }

        // Check GPU threshold
        if (metrics.gpu.usage > this.config.thresholds.gpu) {
            this.createAlert('GPU usage exceeds threshold', 'warning', metrics.gpu);
        }
    }

    createAlert(message, level, data) {
        const alert = {
            timestamp: new Date(),
            message,
            level,
            data
        };

        this.alerts.push(alert);

        // Keep only last 100 alerts
        if (this.alerts.length > 100) {
            this.alerts.shift();
        }

        // Send alert through configured channels
        this.sendAlert(alert);
    }

    sendAlert(alert) {
        if (!this.config.alerts.enabled) return;

        this.config.alerts.channels.forEach(channel => {
            switch (channel) {
                case 'dashboard':
                    this.sendDashboardAlert(alert);
                    break;
                case 'log':
                    console.log('ALERT:', alert.message, alert);
                    break;
                default:
                    console.warn('Unknown alert channel:', channel);
            }
        });
    }

    sendDashboardAlert(alert) {
        // Implementation for sending alerts to dashboard
        // This would typically use WebSocket or Server-Sent Events
        const event = new CustomEvent('omegaai-alert', { detail: alert });
        window.dispatchEvent(event);
    }

    emitMetrics() {
        // Emit metrics for real-time dashboard updates
        const event = new CustomEvent('omegaai-metrics', {
            detail: {
                metrics: this.metrics,
                timestamp: new Date()
            }
        });
        window.dispatchEvent(event);
    }

    getMetricsHistory() {
        return this.metrics;
    }

    getAlertHistory() {
        return this.alerts;
    }
}

export default new MonitoringService();
