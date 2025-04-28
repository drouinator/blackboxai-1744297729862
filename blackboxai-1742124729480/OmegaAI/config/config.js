const config = {
    // Server Configuration
    server: {
        aiServer: {
            host: 'localhost',
            port: 8000,
            endpoints: {
                start: '/api/start-services',
                stop: '/api/stop-services',
                status: '/api/status'
            }
        },
        sync: {
            interval: 300000, // 5 minutes
            retryAttempts: 3,
            retryDelay: 5000
        }
    },

    // Monitoring Configuration
    monitoring: {
        refreshRate: 5000,
        thresholds: {
            cpu: 80,
            memory: 85,
            gpu: 90
        },
        alerts: {
            enabled: true,
            channels: ['dashboard', 'log']
        }
    },

    // Sync Configuration
    sync: {
        paths: {
            models: '/models',
            configs: '/configs',
            data: '/data'
        },
        excludes: [
            '*.tmp',
            '*.log',
            'node_modules'
        ]
    },

    // Service Worker Configuration
    serviceWorker: {
        cacheName: 'omega-ai-v1',
        assets: [
            '/dashboard.html',
            '/OmegaAI.html',
            '/docs/guide.html',
            '/docs/dashboard-guide.html',
            '/mindmap.html'
        ]
    }
};

export default config;
